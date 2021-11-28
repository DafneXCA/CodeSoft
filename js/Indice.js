/*var temas = document.getElementsByClassName("Tema");
var indice= document.getElementById("Temas");
var TemIn= document.getElementsByClassName("TEMA");
var BTemas=document.getElementsByClassName("B-TEMA");
//Cargar Temas al indice
for(var i=0 ; i<temas.length ; i++){
var tema=temas[i];
var temaN = document.createElement("label");
temaN.innerHTML= tema.id
temaN.title= tema.title;
temaN.className= "B-TEMA"
temaN.style.display="block"
indice.appendChild(temaN);
//LIsta de Subtitulos
var LSub= document.createElement("ul");
LSub.title=tema.title;
LSub.className="TEMA";
indice.appendChild(LSub);
}
//Cargar Subtemas al indice

var subtemas= document.getElementsByClassName("Subtema");
for(var i=0; i<subtemas.length;i++){
    for(var j=0; j<TemIn.length;j++){
        if(subtemas[i].title==TemIn[j].title){
            var subt= document.createElement("label");
            subt.innerHTML="<a href='#"+subtemas[i].id+"'>"+subtemas[i].id+"</a>";
            subt.title=subtemas[i].title;
            subt.className="SUBTEMA"
            subt.style.display="block"
            TemIn[j].appendChild(subt);
        }
    }
}
*/
//mostrar y quitar menu
var indice1 = document.getElementById("Temario");
indice1.onclick=function(){
    if(indice.style.display=="block"){
        indice.style.display= "none";
    }else{
        indice.style.display="block";
    }
    
}
//mostrar y quitar menu con el icono

var botInd= document.getElementById("B-I");
var IND = document.getElementById("IND");
var CON = document.getElementsByClassName("contenido");
botInd.onclick=function(){
    if(IND.style.display=="block"){
        IND.style.display= "none";
        CON[0].style.width= "100%";
    }else{
        IND.style.display="block";
        if(window.innerWidth>700){
            CON[0].style.width= "70%";
        }
    }
}
/*
for(var i=0;i<TemIn.length;i++){
    TemIn[i].onclick=function(){
        
       //console.log(TemIn[0].childNodes.length);
        
        if(TemIn[i].childNodes[j].style.display=="block"){
            for(var j=1;j<TemIn[i].childNodes.length;j++){
                TemIn[i].childNodes[j].style.display="none";
            }
        }else{
            for(var j=1;j<TemIn[i].childNodes.length;j++){
                TemIn[i].childNodes[j].style.display="block";
            }
        }
    }
}   

document.onclick=function(a){
 var f=a.target;
 for(var i=0;i<BTemas.length;i++){
     if(f==BTemas[i]){
        if(TemIn[i].childNodes[1].style.display=="block"){
            for(var j=0;j<TemIn[i].childNodes.length;j++){
                TemIn[i].childNodes[j].style.display="none";
            }
        }else{
            for(var j=0;j<TemIn[i].childNodes.length;j++){
                TemIn[i].childNodes[j].style.display="block";
            }
        }
     }
 }

}
*/
window.onresize = function() {
    var altura= window.innerHeight;
    var footer= document.getElementsByClassName("footer");
    var ancho = window.innerWidth;
    var cabezera = document.getElementsByClassName("logonivel");
    if(altura==1366 && ancho== 1024){
        IND.style.height= altura*0.88+"px";
        CON[0].style.height= altura*0.88+"px";
        footer[0].style.height="150px";
        cabezera[0].style.width="130px"
    }
    if(altura==1024 && ancho==768){
        IND.style.height= altura*0.84+"px";
        CON[0].style.height= altura*0.84+"px";
    }else{
        IND.style.height= altura*0.755+"px";
    CON[0].style.height= altura*0.755+"px";
    }
    window.location.reload();
   
}
window.onload = function(){
    var footer= document.getElementsByClassName("footer");
    var altura= window.innerHeight;
    var ancho = window.innerWidth;
    var cabezera = document.getElementsByClassName("logonivel");
    console.log(altura);
    
    if(altura==1366 && ancho== 1024){
        IND.style.height= altura*0.88+"px";
        CON[0].style.height= altura*0.88+"px";
        footer[0].style.height="150px";
        cabezera[0].style.width="130px"
    }
    if(altura==1024 && ancho==768){
        IND.style.height= altura*0.84+"px";
        CON[0].style.height= altura*0.84+"px";
    }else{
        IND.style.height= altura*0.755+"px";
    CON[0].style.height= altura*0.755+"px";
    }
   
}


