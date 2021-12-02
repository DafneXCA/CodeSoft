
var n1= document.getElementById("N1");
var n2= document.getElementById("N2");
var n3= document.getElementById("N3");
n1.style.display="none";
n2.style.display="none";
n3.style.display="none";
/*----------------Base de datos------------------------------------*/
  // Import the functions you need from the SDKs you need
  const firebaseConfig = {
    apiKey: "AIzaSyD6bMG3VhwxFVxz50AG1FugRJ4QfW2qU5c",
    authDomain: "codesoft-15fe4.firebaseapp.com",
    databaseURL: "https://codesoft-15fe4-default-rtdb.firebaseio.com",
    projectId: "codesoft-15fe4",
    storageBucket: "codesoft-15fe4.appspot.com",
    messagingSenderId: "806557774561",
    appId: "1:806557774561:web:2cdde2a5dee91f6d5bbda0",
    measurementId: "G-4193E2WJWZ"
  };
  firebase.initializeApp(firebaseConfig);
  let db =firebase.firestore();
//-----------------------------------------------------
var saludo= document.getElementById("Saludo");
saludo.innerHTML+=" "+localStorage.getItem("Nombre");
var nombre= document.getElementById("Nombre");
nombre.innerHTML=localStorage.getItem("Nombre");
var correo=document.getElementById("Correo");
correo.innerHTML=localStorage.getItem("Correo");
var contraseña= document.getElementById("Contraseña");
contraseña.innerHTML=localStorage.getItem("Contraseña");
//--------------------------------------------------
var nombreE=document.getElementById("NombreE");
var contraseñaE=document.getElementById("ContraseñaE");
 //***********Ocultar editables*****************************************
nombreE.style.display="none";
contraseñaE.style.display="none";
//----------------------------------------------------
var Editar= document.getElementById("Editar");
Editar.onclick=function(){
    if(Editar.innerHTML=="Editar datos"){
        nombreE.value=nombre.innerHTML;
        contraseñaE.value=contraseña.innerHTML;
        nombreE.style.display="inline";
        contraseñaE.style.display="inline";
        nombre.style.display="none";
        contraseña.style.display="none";
        Editar.innerHTML="Guardar cambios";
        Cancelar.style.display="inline";
    }else{
        var mensaje="";
        var aceptado=0;
        if(nombreE.value=="" || contraseñaE.value == ""){
            aceptado=1
            mensaje+="Llene todos los espacios vacíos<br>";
        }
        if(nombreE.value.length<6){
            if(nombreE.value!=""){
                mensaje+="Nombre muy corto<br>";
            }
            aceptado=1;
        }
        if(nombreE.value.length>40){
            if(nombreE.value!=""){
                mensaje+="Nombre muy largo<br>";
            }
            aceptado=1;
        }
        if(/^[A-Za-z\s]+$/.test(nombreE.value)){   
        }else{
            if(nombreE.value!=""){
                mensaje+="Nombre no valido<br>";
            }
            aceptado=1;
        }
        if(contraseñaE.value.length<8){
            if(contraseñaE.value!=""){
                mensaje+="Constraseña muy corta<br>";
            }
            aceptado=1;
        }
        if(contraseñaE.value.length>20){
            if(contraseñaE.value!=""){
                mensaje+="Constraseña muy larga<br>";
            }
            aceptado=1;
        }
        if(aceptado==0){
            db.collection("Usuarios").doc(localStorage.getItem("Id")).update({
                Usuario:{Nombre: nombreE.value,Correo: localStorage.getItem("Correo"),Contraseña: contraseñaE.value,
            Rol: "Estudiante", Nivel1: localStorage.getItem("Nivel1"), Nivel2: localStorage.getItem("Nivel2"),
            Nivel3: localStorage.getItem("Nivel3"),Nota1: localStorage.getItem("Nota1"),Nota2: localStorage.getItem("Nota2"),
            Nota3: localStorage.getItem("Nota3")}
            })
            localStorage.setItem("Nombre",nombreE.value);
            localStorage.setItem("Contraseña",contraseñaE.value);
            setTimeout(()=>{window.location.reload();},2000); 
            
        }else{html(mensaje)}
    }

}
var Cancelar=document.getElementById("Cancelar");
Cancelar.onclick=function(){
    nombreE.style.display="none";
    contraseñaE.style.display="none";
    nombre.style.display="inline";
    contraseña.style.display="inline";
    Editar.innerHTML="Editar datos";
    Cancelar.style.display="none";
}
Cancelar.style.display="none";

var Eliminar=document.getElementById("Eliminar");
Eliminar.onclick=function(){
    Swal.fire({
        title: '¿Seguro que quiere eliminar?',
        text: "No podrá recuperar el contenido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,quiero eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            db.collection("Usuarios").doc(localStorage.getItem("Id")).delete(); 
        
            setTimeout(()=>{
                localStorage.clear();
                location.href="../index.html";
            },2000);  
        }
      })
    
}
if(localStorage.getItem("Nivel1")=="SI" && Number(localStorage.getItem("Nota1"))>50){
    n1.style.display="inline";
}
if(localStorage.getItem("Nivel2")=="SI" && Number(localStorage.getItem("Nota2"))>50){
    n2.style.display="inline";
}
if(localStorage.getItem("Nivel3")=="SI" && Number(localStorage.getItem("Nota3"))>50){
    n3.style.display="inline";
}
var nota1= document.getElementById("nota1");
var nota2= document.getElementById("nota2");
var nota3= document.getElementById("nota3");
nota1.style.display="none";
nota2.style.display="none";
nota3.style.display="none";
if(localStorage.getItem("Nivel1")=="SI"){
    nota1.style.display="block";
    nota1.innerHTML+="  "+ localStorage.getItem("Nota1")+ " puntos";
}
if(localStorage.getItem("Nivel2")=="SI"){
    nota2.style.display="block";
    nota2.innerHTML+= "  "+localStorage.getItem("Nota2")+ " puntos";
}
if(localStorage.getItem("Nivel3")=="SI"){
    nota3.style.display="inline";
    nota3.innerHTML+= "  "+localStorage.getItem("Nota3")+ " puntos";
}
function html(men){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: men
    })
  }