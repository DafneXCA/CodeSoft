if(localStorage.getItem("Rol")!="Administrador" && localStorage.getItem("Rol")!="Estudiante" && localStorage.getItem("Rol")!="Docente"){
    location.href="../index.html";
}
 var contenedor =document.getElementById("contenedor_carga");
 if(localStorage.getItem("Rol")=="Administrador"){
     contenedor.style.display="none";
 }
var logo=document.getElementsByClassName("logo");
logo[0].onclick=function(){
    if(localStorage.getItem("Rol")=="Administrador"){
        location.href="../public/IndexAdmonistrador.html";
    }else{
        location.href="../index.html";
    }
}
var icono=document.getElementsByClassName("BtnHome");
icono[0].onclick=function(){
    if(localStorage.getItem("Rol")=="Administrador"){
        location.href="../public/IndexAdmonistrador.html";
    }else{
        location.href="../index.html";
    }
}
/*
setTimeout(()=>{
    if(localStorage.getItem("Rol")=="Estudiante"){
        var BAceptar= document.getElementsByClassName("BotonAceptar");
        var BBorrar= document.getElementsByClassName("BotonBorrar");
        var BAñadir= document.getElementsByClassName("BotonAñadir");
        var BEditar= document.getElementsByClassName("BotonEditar");
        var BAux=document.getElementsByClassName("SubAux");
        for(var i=0; i<BAceptar.length;i++){
            BAceptar[i].style.display="none";
        }
        for(var i=0; i<BBorrar.length;i++){
            BBorrar[i].style.display="none";
        }
        for(var i=0; i<BAñadir.length;i++){
            BAñadir[i].style.display="none";
        }
        for(var i=0; i<BEditar.length;i++){
            BEditar[i].style.display="none";
        }
        for(var i=0; i<BAux.length;i++){
            BAux[i].style.display="none";
        }
        var nuevoTema= document.getElementById("Nuevo tema");
        nuevoTema.style.display="none";
    }

},2000);
*/