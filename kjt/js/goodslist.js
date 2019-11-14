class List {
    constructor() {
      this.url="http://localhost/kjt/goods.json";
      this.cont=document.querySelector(".cont")
        console.log(this.cont)
        this.load();

    }

    load() {
       $.ajax({url:this.url,success:(res)=>{
    
           this.res=res;
           console.log(this.res)
             this.display()  
       }})
    }

    display() {
        var str = "";
        console.log(this.res.length
        )
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
        console.log(this.res)
        this.cont.innerHTML= str;
    }
}
//不传参,可能造成元素丢失
new List();

