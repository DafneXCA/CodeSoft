//var eye = document.getElementById('Eye');
//var input = document.getElementById('Pass');
//eye.addEventListener("click", function(){
 //   if(input.type == "password"){
 //       input.type = "text"
 //       eye.style.opacity=0.9
 //   }else{
  //      input.type = "password"
  //      eye.style.opacity = 0.4
 //   }

//})


const iconEye = document.querySelector(".IconEye");
iconEye.addEventListener("click", function(){
    if(this.nextElementSibling.type === "password"){
       this.nextElementSibling.type = "text";
    }else{
        this.nextElementSibling.type = "password";
    }

});

const iconEye1 = document.querySelector(".IconEye1");
iconEye1.addEventListener("click", function(){
    if(this.nextElementSibling.type === "password"){
       this.nextElementSibling.type = "text";
    }else{
        this.nextElementSibling.type = "password";
    }

});