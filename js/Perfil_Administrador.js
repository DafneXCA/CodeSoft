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
var nombreEdit=document.getElementById("NombreEdit");
var contraseñaEdit=document.getElementById("ContraseñaEdit");
 //***********Ocultar editables*****************************************
nombreEdit.style.display="none";
contraseñaEdit.style.display="none";
//----------------------------------------------------
var Editar= document.getElementById("Editar");
Editar.onclick=function(){
    mensaje="";
    if(Editar.innerHTML=="Editar datos"){
        nombreEdit.value=nombre.innerHTML;
        contraseñaEdit.value=contraseña.innerHTML;
        nombreEdit.style.display="inline";
        contraseñaEdit.style.display="inline";
        nombre.style.display="none";
        contraseña.style.display="none";
        Editar.innerHTML="Guardar cambios";
        Cancelar.style.display="inline";
    }else{
        var aceptado=0;
        if(nombreEdit.value=="" || contraseñaEdit.value == ""){
            aceptado=1
            mensaje+="Llene todos los espacios vacíos<br>";
        }
        if(nombreEdit.value.length<6){
            if(nombreEdit.value!=""){
                mensaje+="Nombre muy corto<br>";
            }
            aceptado=1;
        }
        if(nombreEdit.value.length>40){
            if(nombreEdit.value!=""){
                mensaje+="Nombre muy largo<br>";
            }
            aceptado=1;
        }
        if(/^[A-Za-z\s]+$/.test(nombreEdit.value)){   
        }else{
            if(nombreEdit.value!=""){
                mensaje+="Nombre no valido<br>";
            }
            aceptado=1;
        }
        if(contraseñaEdit.value.length<8){
            if(contraseñaEdit.value!=""){
                mensaje+="Constraseña muy corta<br>";
            }
            aceptado=1;
        }
        if(contraseñaEdit.value.length>20){
            if(contraseñaEdit.value!=""){
                mensaje+="Constraseña muy larga<br>";
            }
            aceptado=1;
        }
        if(aceptado==0){
            db.collection("Usuarios").doc(localStorage.getItem("Id")).update({
                Usuario:{Nombre: nombreEdit.value,Correo: localStorage.getItem("Correo"),Contraseña: contraseñaEdit.value,
            Rol: "Administrador"}
            })
            localStorage.setItem("Nombre",nombreEdit.value);
            localStorage.setItem("Contraseña",contraseñaEdit.value);
            setTimeout(()=>{window.location.reload();},2000); 
            
        }else{
            html(mensaje)
        }
    }

}
var Cancelar=document.getElementById("Cancelar");
Cancelar.onclick=function(){
    nombreEdit.style.display="none";
    contraseñaEdit.style.display="none";
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
function html(men){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: men
    })
  }