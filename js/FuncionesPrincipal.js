var InicioSesion=document.getElementById("IniciarSesion");
//var IconoPer=document.getElementById("IconoPer");
var Registrarse=document.getElementById("Registrarse");
var IconoAñadir=document.getElementById("IconoAñadir");
var NombreU=document.getElementById("NombreUsuario");
var CerrarSesion=document.getElementById("CerrarSesion");
if(localStorage.getItem("Sesion")==null||localStorage.getItem("Sesion")=="inactivo" ){
    localStorage.setItem("Sesion","inactivo")
    NombreU.style.display="none";
    CerrarSesion.style.display="none";
}
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
Nivel1.onclick=function(){
    if(localStorage.getItem("Sesion")=="inactivo"){
        location.href="public/login.html";
    }else{
        location.href="public/nivel1.html";
    }
}
Nivel2.onclick=function(){
    if(localStorage.getItem("Sesion")=="inactivo"){
        location.href="public/login.html";
    }else{
        location.href="public/nivel2.html";
    }
}
Nivel3.onclick=function(){
    if(localStorage.getItem("Sesion")=="inactivo"){
        location.href="public/login.html";
    }else{
        location.href="public/nivel3.html";
    }
}
CerrarSesion.onclick=function(){
    localStorage. clear();
    setTimeout(()=>{window.location.reload();},2000);
}
if(localStorage.getItem("Nombre")!=null){
    var nom=localStorage.getItem("Nombre");
    nom=nom.split(" ");
    NombreU.innerHTML=nom[0];
}
console.log(bowser.name, bowser.version);
window.onresize= function(){
    window.location.reload();
}
window.onload=function(){
    var res= Math.round(window.devicePixelRatio * 100);
    console.log(res);
    var ancho = window.innerWidth;
    console.log(ancho);
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