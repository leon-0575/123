class List {
    constructor(options) {
        this.cont = options.cont;
        this.url = options.url;
        console.log(this.cont)
        this.load();

    }

    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.display();
        })
    }

    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            str += `<li>
                <a href=""><img src="${this.res[i].img}" alt=""></a>
                <a href=""><span>${this.res[i].newprice}</span></a>
                <div>
                    <a href="" class="name">${this.res[i].name}</a></div>
                <div><a href="">佑尔康国际股份有限公司
                    </a> <span>100%好评</span></div>
                <button>加入购物车</button>
                <div>
                    <span>澳大利亚</span>
                    <a href="">海外原装正品
                    </a>
                </div>
            </li>`;
        }
        this.cont.innerHTML= str;
    }
}
new List({
    url: "http://localhost/kjt/goods.json",
    cont: $(".cont")
})
