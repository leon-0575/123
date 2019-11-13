//1.侧栏:楼梯效果
$(function(){
    
$(".rs li").click(function () {
        $("html").animate({
            scrollTop: $(".floorbox .floor ").eq($(this).index()).offset().top
        })
    })
$(".rs p").click(function(){
    $("html").animate({
        scrollTop:0
    })
})


})

//轮播图

 function Carousel(imgList, train, leftBtn, rightBtn, cirList, interval=1000) {
            // 定义信号量属性
            this.idx = 0;
            // 宽度属性
            this.width = imgList[0].clientWidth;
            // 容器属性
            this.train = train;
            // 图片列表
            this.imgList = imgList;
            // 左按钮
            this.leftBtn = leftBtn;
            // 右按钮
            this.rightBtn = rightBtn;
            // 小圆点列表
            this.cirList = cirList;
            // 间隔
            this.interval = interval;
            // 节流锁 是一个布尔值 它决定是否可以进行动画 如果为true表示可以 反之表示不可以
            this.lock = true; 
            // 定义方法
            // init方法
            this.init = function() {
                this.bindRightEvent();
                this.bindLeftEvent();
                this.bindCirEvent();
                this.bindEnter();
                this.bindLeave();
                this.auto();
            }
            // change方法 用于切换图片
            this.change = function() { 
                console.log("可以执行动画");
                // 关锁
                this.lock = false;
                var _this = this;
                animate(this.train, {left: -this.idx * this.width}, this.interval, function() {
                    if (_this.idx >= _this.cirList.length) {
                        _this.idx = 0;
                        _this.train.style.left = 0;
                    }
                    // 开锁
                    _this.lock = true;
                    _this.changeStyle();
                })
            }
            // 当点击右按钮的时候 
            this.bindRightEvent = function() {
                // 备份this
                var _this = this;
                // 给右按钮绑定事件
                this.rightBtn.onclick = function() {
                    // 判定
                    if (!_this.lock) {
                        console.log("不可以执行动画");
                        return;
                    }
                    // 先让idx++ 
                    _this.idx++;
                    console.log(_this.idx);
                    // 再调用change
                    _this.change();
                }
            }
            // 当点击做按钮的时候
            this.bindLeftEvent = function() {
                // 备份this
                var _this = this;
                // 给左按钮绑定事件
                this.leftBtn.onclick = function() {
                    // 判定
                    if (!_this.lock) {
                        console.log("不可以执行动画");
                        return;
                    }
                    // 先让idx--
                    _this.idx--;
                    if (_this.idx < 0) {
                        _this.idx = _this.cirList.length;
                        _this.train.style.left = -_this.idx * _this.width + 'px';
                        _this.idx--;
                    }
                    _this.change();
                }
            }
            // 绑定小圆点的事件
            this.bindCirEvent = function() {
                // 备份this
                var _this = this;
                // 循环每一个小圆点
                for (let i = 0; i < this.cirList.length; i++) {
                    // 获取单个元素并添加点击事件
                    this.cirList[i].onclick = function() {
                        // 判定
                        if (!_this.lock) {
                            console.log("不可以执行动画");
                            return;
                        }
                        _this.idx = i;
                        _this.change();
                    }
                }
            }
            // 切换小圆点样式方法
            this.changeStyle = function() {
                // 循环所有小圆点
                for (var i = 0; i < this.cirList.length; i++) {
                    // 比较 
                    if (i === this.idx) {
                        this.cirList[i].className = "active";
                    } else {
                        this.cirList[i].className = "";
                    }
                }
            }
            // 自动轮播功能
            this.auto = function() {
                // 备份this
                var _this = this;
                this.timer = setInterval(function() {
                    // 执行右按钮的点击事件
                    _this.rightBtn.onclick();
                }, this.interval + 1000);
            }

            // 添加鼠标进入事件
            this.bindEnter = function() {
                var _this = this;
                this.train.onmouseenter = function() {
                    console.log("鼠标进入 停止定时器")
                    clearInterval(_this.timer)
                }
            }
            // 添加鼠标离开事件
            this.bindLeave = function() {
                var _this = this;
                this.train.onmouseleave = function() {
                    console.log("鼠标离开 开启定时器")
                    _this.auto();
                }
            }
            // 初始化方法在构造函数的最后调用
            this.init();
        }
        var imgList = document.querySelectorAll("#carousel ul:first-child li");
        var train = document.querySelector("#carousel ul:first-child");
        var leftBtn = document.querySelector("#leftBtn");
        var rightBtn = document.querySelector("#rightBtn");
        var cirList = document.querySelectorAll("#carousel ul:last-child li");
        var interval = 2000;


        var carousel = new Carousel(imgList, train, leftBtn, rightBtn, cirList, interval);



        function animate(dom, cssObj, duration, callback) {
    // 定义间隔
    var interval = 20;
    // 定义当前状态对象
    var nowObj = {};
    // 循环cssObj
    for (var i in cssObj) {
        nowObj[i] = parseInt(getStyle(dom, i))
    }
    // 定义总次数
    var allCount = duration / interval;
    // 定义计数器
    var count = 0;
    var timer = setInterval(function () {
        count++;
        for (var i in cssObj) {
            // 计算总距离
            var distance = cssObj[i] - nowObj[i];
            // 计算单次步长
            var step = distance / allCount;
            // 赋予样式
            if (i.toLowerCase() === "opacity") {
                dom.style[i] = nowObj[i] + count * step;
            } else {
                dom.style[i] = nowObj[i] + count * step + "px";
            }
        }
        if (count >= allCount) {
            clearInterval(timer);
            // 判断 有回调函数就执行回调函数 没有回调函数就不执行
            if (callback) {
                callback();
            }
            // callback && callback();
        }
    }, interval);
    // 定义获取样式函数
    function getStyle(dom, cssProp) {
        if (window.getComputedStyle) {
            console.log(dom);
            return window.getComputedStyle(dom)[cssProp];
        }
        return dom.currentStyle[cssProp];
    }
}