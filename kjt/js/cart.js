class Cart {
    constructor() {
        this.url = "http://localhost/kjt/goods.json";
        this.tbody = document.querySelector("tbody")
        this.load();

    }

    load() {
        $.ajax({
            url: this.url,
            success: (res) => {
                //jq不用转换res类型
                this.res = res;
                this.getCookie();
            }
        })
    }
    getCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        this.display()
    }
    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {

            for (var j = 0; j < this.goods.length; j++) {
                if (this.res[i].goodsId === this.goods[j].id) {

                    var cont=this.res[i].newprice*this.goods[j].num;
                   
                    str += `   <tr>
                        <td colspan="2" ${this.goods[j].id}  >
                            <div class="goods-name">
                                <div><input type="checkbox"></div>
                                <div><img src="${this.res[i].img}" alt=""></div>
                                <div> <a href="">${this.res[i].name}</a></div>
                            </div>
            </td>
            <td><span class="goods-price">${this.res[i].newprice}0</span></td>
            <td>
                <button>-</button><input type="text" class="goods-number" value="${this.goods[j].num}"><button>+</button></td>
            <td><span class="goods-cont"></span></td>
            <td><button class="goods-remove">移除</button></td>
            </tr>`
                }
            }
        }
        this.tbody.innerHTML=str;
        $(".cart-empty").css("display","none")
        this.addEvent();
    }
addEvent(){
    var that=this;
    this.tbody.addEventListener("click",function(eve){
        if(eve.target.className=="goods-remove"){
            that.id=eve.target.parentNode.parentNode.getAttribute("index");
            eve.target.parentNode.parentNode.remove();
            that.uppdateCookie(function(i){
                that.goods.splice(i,1);
            })
        }

    })
    this.tbody.addEventListener("input",function(eve){
        if(eve.target.className=="goods-number"){
            that.id=eve.target.parentNode.getAttribute("index");
            that.uppdateCookie(function(i){
                that.goods[i].num=eve.target.value;
            })
        }
    })
}

uppdateCookie(cb){
    for(var i=0;i<this.goods.length;i++){
        if(this.goods[i].id===this.id){
            cb(i)

        }
        setCookie("goods",JSON.stringify(this.goods))
    }
}










}

new Cart();