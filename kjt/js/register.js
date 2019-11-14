 $('form').validate()

 let user = document.querySelector("#username")
 let pass = document.querySelector("#pass")
 let pass2 = document.querySelector("#pass2")
 let check1 = document.querySelector("#check1")
 let reg = document.querySelector("#reg-btn1")
 let login = document.querySelector("#load-btn1")
//  console.log(user, pass, pass2, check1, reg)

 //电话号11位
 // let  reg1=/^\d{11}$/g  //电话号11位
 // let   reg2=/^\w{5,19}$/g //密码6-20位数字字母下划线
 // let str1=user.value
 // let str2=pass.value
 // console.log(reg1.test(str1))
 // console.log(reg2.test(str2))


 reg.addEventListener("click", function () {
     let regarr = [];
     if (user.value != "" && pass.value != "" && pass2.value != "") {
         if (pass.value == pass2.value) {
             if (check1.checked) {
                 regarr.push({
                     "user": user.value,
                     " pass": pass2.value
                 })
                 setCookie("usermsg", JSON.stringify(regarr))
                    alert("注册成功,欢迎老铁")
                
                     location.href = "http://localhost/kjt/html/login.html"
                
             } else {
                 alert("请阅读并勾选服务协议")
             }
         } else {
             alert("请保持前后密码一致")
         }
     } else {
         alert("请确认全部内容后提交")
     }
 })