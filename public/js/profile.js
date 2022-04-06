const imageUpload = document.querySelector("#imageUpload");

imageUpload.addEventListener("change" , async (e) =>{
    e.preventDefault();
    let file = imageUpload.files[0];
    //console.log(file);
    let formData = new FormData();
    formData.append("user" , file);

    let obj = await axios.patch("https://foodiess-app.herokuapp.com/api/users/updateprofilepic" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})