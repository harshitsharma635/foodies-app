const password = document.querySelector("#pw");
const confirmPassword = document.querySelector("#cpw");
const resetBtn = document.querySelector("input[value = 'Reset password'");
const message = document.querySelector("#message")

resetBtn.addEventListener("click" , async () => {
    try {
        if(password.value && confirmPassword.value){
            let url = window.location.href;
            let urlParams = url.split("/");
            const token = urlParams[urlParams.length - 1];
            //console.log("in resetpw");
            let obj = await axios.patch(`https://foodiess-app.herokuapp.com/api/users/resetpassword/${token}` , {password : password.value , confirmPassword : confirmPassword.valule});
            if(obj.data.flag){
                message.innerHTML = "Successfully changed password";
                setTimeout(() => {
                    window.location.href = "https://foodiess-app.herokuapp.com/login"
                }, 5000);
            }
        }
    } catch (error) {
        console.log(error);
    }
    
    
    
})