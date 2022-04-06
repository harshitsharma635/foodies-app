const imageUpload = document.querySelector("#imageUpload");

imageUpload.addEventListener("change" , async (e) =>{
    e.preventDefault();
    let file = imageUpload.files[0];
    //console.log(file);
    let formData = new FormData();
    formData.append("user" , file);

    let obj = await axios.patch("http://localhost:3000/api/users/updateprofilepic" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})