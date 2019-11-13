 
 

 function Magnifier() {
            this.sbox = document.querySelector(".sbox");
            this.bbox = document.querySelector(".bbox")
            this.shadow = document.querySelector(".shadow")
            this.simg = document.querySelector(".simg")
            this.bimg = document.querySelector(".bimg")
            // console.log(bbox)
            this.init()
 console.log(this.sbox)
        }
        Magnifier.prototype.init = function () {
            var that = this;
            this.sbox.onmouseover = function () {
                that.show()
            }
            this.sbox.onmouseout = function () {
                that.hide()
            }
            this.sbox.onmousemove = function (eve) {
                var e = eve || window.event;
                that.move(e)
            }

        }

        //放大镜:面向对象
        //1鼠标移入,遮罩出现
        //2.遮罩位置随鼠标移动
        //2.1获取鼠标坐标
        //2.2付给遮罩
        //2.3限定边界
        //3.右边大图随遮罩移动而移动

        Magnifier.prototype.show = function () {
            this.shadow.style.display = "block"
            this.bbox.style.display = "block"

            this.shadow.style.width = this.bbox.offsetWidth * this.sbox.offsetWidth / this.bimg.offsetWidth + "px"
            this.shadow.style.height = this.bbox.offsetHeight * this.sbox.offsetHeight / this.bimg.offsetHeight +
                "px"
            Magnifier.prototype.hide = function () {
                this.shadow.style.display = "none"
                this.bbox.style.display = "none"


            }
            Magnifier.prototype.move = function (e) {
                //鼠标在小盒子内坐标
                var shadowleft = e.pageX - this.sbox.offsetLeft
                var shadowtop = e.pageY - this.sbox.offsetTop
                //鼠标所在位置(遮罩中心)
                var shadowX = shadowleft - this.shadow.offsetWidth / 2;
                var shadowY = shadowtop - this.shadow.offsetHeight / 2;
                this.shadow.style.left = shadowX + "px"
                this.shadow.style.top = shadowY + "px"
                //遮罩最大移动距离
                var shadowXmax = this.sbox.offsetWidth - this.shadow.offsetWidth;
                var shadowYmax = this.sbox.offsetHeight - this.shadow.offsetHeight;

                if (shadowX < 0) {
                    shadowX = 0
                }
                if (shadowX > shadowXmax) {
                    shadowX = shadowXmax

                }
                if (shadowY < 0) {
                    shadowY = 0
                }

                if (shadowY > shadowYmax) {
                    shadowY = shadowYmax

                }
                this.shadow.style.left = shadowX + "px";
                this.shadow.style.top = shadowY + "px";
                //shadowX/shadowXmax=imgx/imgxmax
                var bimgXmax = this.bimg.offsetWidth - this.bbox.offsetWidth
                var bimgYmax = this.bimg.offsetHeight - this.bbox.offsetHeight
                var imgX =shadowX*bimgXmax/shadowXmax
                var imgY =shadowY*bimgYmax/shadowYmax

                this.bimg.style.left=-imgX+"px";
                this.bimg.style.top=-imgY+"px";



            }

        }

        new Magnifier();