const loginBtn = document.querySelector('.login input[value = "Login"]');
const  signupBtn = document.querySelector('.login input[value = "Signup"')
const email = document.querySelector('.login input[type = "email" ]');
const password = document.querySelector('.login input[type = "password"]');
const message = document.querySelector("#message");

loginBtn.addEventListener("click" ,async (e) => {
    try {
        //console.log("btn clickedd");
        e.preventDefault();
        if(email.value && password.value){
            let obj = await axios.post("http://localhost:3000/api/users/login" , {email : email.value , password : password.value});
            if(obj.data.data){
                window.location.href = "/";
            }else{
                message.innerHTML = obj.data.message;
            }
        }
    } catch (error) {
        console.log(error);
    }
})

signupBtn.addEventListener("click" , () => {
    window.location.href ="/signup";
})