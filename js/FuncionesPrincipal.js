
if(localStorage.getItem("Sesion")=="Activo"){
    if(localStorage.getItem("Rol")=="Administrador"){
      location.href="public/IndexAdmonistrador.html";
    }
  }
var Usuarios=[];
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
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db =firebase.firestore();
  db.collection("Usuarios").get().then(function(BaseUsuarios){
     
    BaseUsuarios.forEach(function(doc){
      Usuarios.push({
          Descripcion: doc.data().Usuario,
          ID: doc.id
      });  
    });
});
//---------------------------------------------
var InicioSesion=document.getElementById("IniciarSesion");
//var IconoPer=document.getElementById("IconoPer");
var Registrarse=document.getElementById("Registrarse");
var IconoAñadir=document.getElementById("IconoAñadir");
var NombreU=document.getElementById("NombreUsuario");
var CerrarSesion=document.getElementById("CerrarSesion");
//Cuando no esta logueado
if(localStorage.getItem("Sesion")==null||localStorage.getItem("Sesion")=="inactivo" ){
    localStorage.setItem("Sesion","inactivo")
    NombreU.style.display="none";
    CerrarSesion.style.display="none";
}
//Cuando se loguea
if(localStorage.getItem("Sesion")=="Activo"){
    InicioSesion.style.display="none";
   // IconoPer.style.display="none";
    Registrarse.style.display="none";
    IconoAñadir.style.display="none";
    NombreU.style.display="inline";
    CerrarSesion.style.display="inline";
}
var Nivel1= document.getElementById("nivel1");
var Nivel2= document.getElementById("nivel2");
var Nivel3= document.getElementById("nivel3");
//restringir nive 1
Nivel1.onclick=function(){
    if(localStorage.getItem("Sesion")=="inactivo"){
        location.href="public/login.html";
    }else{
        location.href="public/nivel1.html";
    }
}
//restringir nive 2
Nivel2.onclick=function(){
    if(localStorage.getItem("Sesion")=="inactivo"){
        location.href="public/login.html";
    }else{
        location.href="public/nivel2.html";
    }
}
//restringir nive 3
Nivel3.onclick=function(){
    if(localStorage.getItem("Sesion")=="inactivo"){
        location.href="public/login.html";
    }else{
        location.href="public/nivel3.html";
    }
}
//Cerrar sesion
CerrarSesion.onclick=function(){
    localStorage. clear();
    setTimeout(()=>{window.location.reload();},2000);
}
//poner nombre al inicio y funcion ver perfil
if(localStorage.getItem("Nombre")!=null){
    var nom=localStorage.getItem("Nombre");
    nom=nom.split(" ");
    NombreU.innerHTML=nom[0];
    NombreU.onclick=function(){
        location.href="public/PerfilEstudiante.html";
    }
}
//Responsive footer
//console.log(bowser.name, bowser.version);
window.onresize= function(){
    window.location.reload();
}
window.onload=function(){
    var res= Math.round(window.devicePixelRatio * 100);
    //console.log(res);
    var ancho = window.innerWidth;
    //console.log(ancho);
    if(res<=83 && ancho<=1200 && ancho> 1023){
        var foo=document.getElementsByClassName("footer");
        foo[0].style.position="absolute";
        foo[0].style.bottom="0";
        
    }
    if(res<=63){
        var foo=document.getElementsByClassName("footer");
        foo[0].style.position="absolute";
        foo[0].style.bottom="0";
        
    }
}
setTimeout(()=>{
    if(localStorage.getItem("Id")==null || localStorage.getItem("Id")== "undefined"){
        var aux;
        //console.log(Usuarios);
        for(var i=0; i<Usuarios.length;i++){
            if(localStorage.getItem("Correo")==Usuarios[i].Descripcion.Correo){
                aux=Usuarios[i].ID;
            }
        }
        localStorage.setItem("Id",aux);
    }
},2000);





