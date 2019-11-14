let luser = document.querySelector("#luser")
let lpass = document.querySelector("#lpass")
let login = document.querySelector("#login-btn1")
let usermsg = JSON.parse(getCookie("usermsg"))
// console.log(usermsg[0]["pass"])



let loginmsg=[];
login.addEventListener("click", function () {

            if (luser.value == "") {
                alert("请输入用户名")

            } 
            else {

                if (lpass.value == "") {
                    alert("请输入密码")
                } 
                else {

                    for (i = 0; i < usermsg.length; i++) {
                        if (luser.value == usermsg[i].user) {
                            

                            if (lpass.value 
                            // == usermsg[i].pass
                            ) {
                                loginmsg.push({
                                    "user":luser.value,
                                   " pass":lpass.value
                                })
                               console.log( setCookie("logininfo",JSON.stringify(loginmsg)))
                                alert("登录成功,买买买");
                                location.href = "index.html"

                            }
                            else{
                                alert("请输入正确的密码")
                            }




                        } 
                        
                        else {
                            alert("您不是本站会员,请注册")
                    }
                        }

                    }

                }
            })



        // console.log(a)