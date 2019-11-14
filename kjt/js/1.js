class List {
    constructor(options) {
        // 1.准备属性
        this.cont = options.cont;
        this.url = options.url;

        // 2.开启请求
        this.load();

        // 4.事件委托绑定事件
        this.addEvent();

    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            // 3.渲染页面
            that.display()
        })
    }
    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            str += `<div class="box" index="${this.res[i].goodsId}">
                            <img src="${this.res[i].img}" alt="">
                            <p>${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                            <input type="button" class="btn" value="加入购物车">
                        </div>`;
        }
        this.cont.innerHTML = str;
    }
    addEvent() {
        var that = this;
        this.cont.onclick = function (eve) {
            if (eve.target.className == "btn") {
                // 5.记录id
                that.id = eve.target.parentNode.getAttribute("index");
                // 6.准备存cookie
                that.setCookie();
            }
        }
    }
    setCookie() {
        // 7.存cookie部分

        // 假设存在cookie中数据格式为:
        // [{id:this.id,num:1},{id:this.id,num:4},....]
        // 7-1.读取cookie：
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        if (this.goods.length == 0) {
            // 7-2.为空：第一次加入购物车：cookie为空，直接加入
            this.goods.push({
                id: this.id,
                num: 1
            })
        } else {
            // 7-3.不为空：不是第一次加入购物车：
            var onoff = true; //用来记录是否是新商品的状态
            for (var i = 0; i < this.goods.length; i++) {
                // 7-4.判断当前商品，新还是旧
                if (this.goods[i].id === this.id) {
                    // 7-5.旧：修改数据,同时修改是否是新商品的状态
                    this.goods[i].num++;
                    onoff = false;
                }
            }
            // 7-6.循环结束后，判断是否是新商品的状态，是否发生改变，没有改变，表示没有找到老商品，表示是新商品
            if (onoff) {
                // 7-7.新：增加数据
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            }
            // ===================================
            // var i = 0;
            // var onoff = this.goods.some((val,index)=>{
            //     i = index;
            //     return val.id == this.id;
            // });
            // if(onoff){
            //     this.goods[i].num++;
            // }else{
            //     this.goods.push({
            //         id:this.id,
            //         num:1
            //     })
            // }
        }
        // 8.数组的操作结束后，一定要再存回cookie
        setCookie("goods", JSON.stringify(this.goods));
    }
}


new List({
    url: "http://localhost/1910-server/shopping/goods.json",
    cont: document.querySelector(".cont")
})