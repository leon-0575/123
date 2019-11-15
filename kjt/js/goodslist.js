class List {
    constructor() {
        //1.准备属性
        this.url = "http://localhost/kjt/goods.json";
        this.cont = document.querySelector(".cont")
        this.goodslist = document.querySelector(".goodslist")
        // console.log(this.cont)
        this.load();
    }
    load() {
        //2.请求数据
        $.ajax({
            url: this.url,
            success: (res) => {

                this.res = res;
                // console.log(this.res)
                this.display()
            }
        })
    }
    //3.渲染页面
    display() {
        var str = "";
        // console.log(this.res.length)
        for (var i = 0; i < this.res.length; i++) {
            str += `<li index="${this.res[i].goodsId}">
                <a href=""><img src="${this.res[i].img}" alt=""></a>
                <a href=""><span>${this.res[i].newprice}</span></a>
                <div>
                    <a href="" class="name">${this.res[i].name}</a></div>
                <div><a href="">佑尔康国际股份有限公司
                    </a> <span>100%好评</span></div>
                <button class="btn">加入购物车</button>
                <div>
                    <span>澳大利亚</span>
                    <a href="">海外原装正品
                    </a>
                </div>
            </li>`;
        }
        // console.log(this.res)
        this.cont.innerHTML = str;
        //在渲染后进行绑定,不然不存在按钮
        this.addEvent();

    }
    addEvent() {
        var that = this;
        //用事件监听,防止渲染前获取不到
        this.goodslist.addEventListener("click",function (eve) {
            if (eve.target.className == "btn") {
                console.log(1)

                that.id = eve.target.parentNode.getAttribute("index");
            that.setCookie();
        }
        })




  
    }
    setCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        console.log(this.goods)
        if (this.goods.length == 0) {
            this.goods.push({
                id: this.id,
                num: 1
            })
        } else {
            var onoff = true;
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === this.id) {
                    this.goods[i].num++;
                    onoff = false;
                }
            }
            if (onoff) {
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            }
        }
       console.log(this.res)
        setCookie("goods", JSON.stringify(this.goods));
    }



}
//不建议传参,可能造成元素丢失
new List();


//4.用户登录状态


;(function fn(){
 if(getCookie("logininfo")){
     $("#login-ready").css("display","none");
     $("#login-ok").css("display","block");

    var loginname= JSON.parse(getCookie("logininfo"))[0].user;
 
    console.log(loginname);
    var ln=document.querySelector("#login-name")
    ln.innerHTML=loginname;

 }

 $("#outlogin").click(function(){
     removeCookie("logininfo");
     location.href="index.html"
 })})();