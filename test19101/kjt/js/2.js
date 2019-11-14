 class Car {
     constructor(options) {
         this.url = options.url;
         this.tbody = options.tbody;

         // 1.读取到所有商品数据
         this.load();

         // 5.事件委托绑定事件
         this.addEvent();
     }
     load() {
         var that = this;
         ajaxGet(this.url, function (res) {
             that.res = JSON.parse(res);
             // 2.读取到cookie
             that.getCookie();
         })
     }
     getCookie() {
         this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
         // 3.拿到cookie中的id与所有商品数据的goodsId做比较
         this.display();
     }
     display() {
         var str = "";
         for (var i = 0; i < this.res.length; i++) {
             for (var j = 0; j < this.goods.length; j++) {
                 if (this.res[i].goodsId === this.goods[j].id) {
                     // 4.相同了，渲染这个数据（就是添加到购物车的商品）
                     str += `<tr index="${this.goods[j].id}">
                                    <td><img src="${this.res[i].img}" alt=""></td>
                                    <td>${this.res[i].name}</td>
                                    <td>${this.res[i].price}</td>
                                    <td><input type="number" min="1" value="${this.goods[j].num}"></td>
                                    <td><span>删除</span></td>
                                </tr>`
                 }
             }
         }
         this.tbody.innerHTML = str;
     }
     addEvent() {
         var that = this;
         // 5-1.委托删除的事件
         this.tbody.addEventListener("click", function (eve) {
             if (eve.target.tagName == "SPAN") {
                 // 6-1.保存要删除的数据的id
                 that.id = eve.target.parentNode.parentNode.getAttribute("index");
                 // 7-1.删除DOM元素
                 eve.target.parentNode.parentNode.remove();
                 // 8-1.调用更新cookie方法，传入删除操作
                 // 是真正的删除cookie么？不是
                 // 因为只有一条cookie，里面的数据是数组的形式
                 // 从这条cookie中剔除出这个数据
                 that.updateCookie(function (i) {
                     that.goods.splice(i, 1);
                 });
             }
         })
         // 5-2.委托修改的事件
         this.tbody.addEventListener("input", function (eve) {
             if (eve.target.tagName == "INPUT") {
                 // 6-2.保存要修改的数据的id
                 that.id = eve.target.parentNode.parentNode.getAttribute("index");
                 // 7-2.调用更新cookie的方法，传入修改操作
                 that.updateCookie(function (i) {
                     that.goods[i].num = eve.target.value;
                 });
             }
         })
     }
     updateCookie(cb) {
         // 更新cookie的功能方法：
         // U1.遍历数组，拿到所有数据
         for (var i = 0; i < this.goods.length; i++) {
             // U2.和当前id做比较
             if (this.goods[i].id === this.id) {
                 // U3.符合，执行传入的更新操作
                 cb(i);
             }
         }
         // U4.还得再存回去
         setCookie("goods", JSON.stringify(this.goods))
     }
 }

 new Car({
     url: "http://localhost/1910-server/shopping/goods.json",
     tbody: document.querySelector("tbody")
 })