;
(function fn() {
    if (getCookie("logininfo")) {
        $("#login-ready").css("display", "none");
        $("#login-ok").css("display", "block");

        var loginname = JSON.parse(getCookie("logininfo"))[0].user;

        console.log(loginname);
        var ln = document.querySelector("#login-name")
        ln.innerHTML = loginname;

    }

    $("#outlogin").click(function () {
        removeCookie("logininfo");
        location.href = "index.html"
    })
})();

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
        if (!getCookie("logininfo")) {
            $("#cart-empty-login").css("display", "block");
            $("#cart-empty-add").css("display", "none")
            return;
        }
        this.display();
    }
    display() {
        var str = "";

        if (this.res.length > 0) {
            $("#cart-empty-add").css("display", "none")

        }



        for (var i = 0; i < this.res.length; i++) {


            for (var j = 0; j < this.goods.length; j++) {
                if (this.res[i].goodsId === this.goods[j].id) {
                    str += `   <tr index="${this.goods[j].id}">
                                    <td colspan="2"   >
                                        <div class="goods-name">
                                            <div><input type="checkbox"></div>
                                            <div><img src="${this.res[i].img}" alt=""></div>
                                            <div> <a href="">${this.res[i].name}</a></div>
                                        </div>
                                    </td>
                                    <td>￥<span class="goods-price">${this.res[i].newprice}</span></td>
                                    <td>
                                        <button>-</button><input type="text" class="goods-number" value="${this.goods[j].num}"><button>+</button></td>
                                    <td>￥ <span class="goods-cont" >${this.goods[j].num*this.res[i].newprice}</span>.00
                                   </td>
                                    <td><button class="goods-remove">移除</button></td>
                            </tr>`
                }
            }
        }
        this.tbody.innerHTML = str;
        this.price = $(".goods-price")[0].innerHTML;
        console.log(this.price)

        this.addEvent();
    }
    addEvent() {
        var that = this;
        this.tbody.addEventListener("click", function (eve) {
            if (eve.target.className == "goods-remove") {
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                console.log(that.id)

                eve.target.parentNode.parentNode.remove();
                that.updateCookie(function (i) {
                    that.goods.splice(i, 1);
                });
            }
        });
        this.tbody.addEventListener("input", function (eve) {
            if (eve.target.className == "goods-number") {
                that.id = eve.target.parentNode.parentNode.getAttribute("index");

                that.jiage = eve.target.parentNode.parentNode.children[1].children[0].innerHTML;
                // console.log(that.jiage);
                eve.target.parentNode.parentNode.children[3].children[0].innerHTML = eve.target.value * that.jiage
                that.xiaoji = eve.target.parentNode.parentNode.children[3].children[0].innerHTML
                console.log(that.xiaoji);
                // that.mcsl = [];
                // for (var i = 0; i < that.res.length; i++) {
                //     mcsl[i].push(that.xiaoji)
                //     console.log(that.mcsl)

                // }




                that.updateCookie(function (i) {
                    that.goods[i].num = eve.target.value;
                    // console.log(1)

                });
            }
        });




    }
    updateCookie(cb) {
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === this.id) {
                cb(i);
            }
            setCookie("goods", JSON.stringify(this.goods))
        }
    }

}
new Cart();


//4.用户登录状态