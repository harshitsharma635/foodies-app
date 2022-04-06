const email = document.querySelector("input[type = 'email']");
const sendMailBtn = document.querySelector("input[value = 'Send Mail']");
const message = document.querySelector("#message")

sendMailBtn.addEventListener("click" ,async () => {
    try {
        if(email.value){
            let obj = await axios.post("http://localhost:3000/api/users/forgetpassword" , {email : email.value});
            console.log(obj);
            message.innerHTML = obj.data.message;
            email.value = "";
        }
    } catch (error) {
        console.log(error);
    }
})