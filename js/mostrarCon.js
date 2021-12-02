
const iconEye = document.querySelector(".IconEye");
iconEye.addEventListener("click", function(){
    if(this.nextElementSibling.type === "password"){
       this.nextElementSibling.type = "text";
    }else{
        this.nextElementSibling.type = "password";
    }

});

