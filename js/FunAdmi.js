
if(localStorage.getItem("Rol")!="Administrador"){
    location.href="../index.html";
}
var NombreU=document.getElementById("NombreUsuario");
var nom=localStorage.getItem("Nombre");
    nom=nom.split(" ");
    NombreU.innerHTML=nom[0];
var CerrarSesion=document.getElementById("CerrarSesion");
CerrarSesion.onclick=function(){
    localStorage. clear();
    setTimeout(()=>{location.href="../index.html";},2000); 
}
var Logo=document.getElementsByClassName("logo");
Logo[0].onclick=function(){
    
    location.href="../public/IndexAdmonistrador.html";
}
window.onresize= function(){
    window.location.reload();
}
window.onload=function(){
    var res= Math.round(window.devicePixelRatio * 100);
    
    var ancho = window.innerWidth;
    
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
NombreU.onclick=function(){
    location.href="../public/PerfilAdministrador.html";
}

