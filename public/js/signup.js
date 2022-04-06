const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#pw");
const confirmPassword = document.querySelector("#cpw");
const signupBtn = document.querySelector(".login-form input[value = 'SignUp']");
const loginBtn = document.querySelector(".login-form input[value = 'Login']");


signupBtn.addEventListener("click" , async (evt)=>{
    console.log("clicked!");
    try {
        evt.preventDefault();
        if(userName.value && email.value && password.value && confirmPassword.value && signupBtn.value){
            let signUpObj = {
                name : userName.value,
                email : email.value,
                password : password.value,
                confirmPassword : confirmPassword.value
            }
            let obj = await axios.post("http://localhost:3000/api/users/signup" , signUpObj);
            //console.log(obj);
            if(obj.data.data){
                window.location.href = "http://localhost:3000/login"
            }
        }
    } catch (error) {
        console.log(error);
    }

})

loginBtn.addEventListener("click" , ()=>{
    window.location.href = "/login";
})