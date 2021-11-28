var nuevoTema= document.getElementById("Nuevo tema");
var indice = document.getElementById("IND");
//Crear un nuevo tema
nuevoTema.onclick=function(){
nuevoTema.style.display="none";
var Titulo = document.createElement("input");
Titulo.id= "temaN"
var separador1 = document.createElement("br");
var aceptar= document.createElement("icon");
// aceptar.innerHTML="Aceptar";
aceptar.id="btn-aceptar";
var cancelar= document.createElement("icon");
// cancelar.innerHTML="cancelar";
cancelar.id="btn-cancelar";
Titulo.type= "text";
indice.insertBefore(Titulo,nuevoTema);
indice.insertBefore(aceptar,nuevoTema);
indice.insertBefore(cancelar,nuevoTema);
indice.insertBefore(separador1,nuevoTema);


//funcion aceptar
var btn_aceptar= document.getElementById("btn-aceptar");
btn_aceptar.onclick=function(){
var contTema= document.createElement("div");
contTema.className="Temass";
var tema= document.createElement("label");
tema.innerHTML=Titulo.value;
indice.insertBefore(contTema,Titulo);//se cambiara por recargar pagina y por envio a la base de datos
contTema.appendChild(tema);
botonesTemas(contTema);
indice.removeChild(Titulo);
indice.removeChild(cancelar);
indice.removeChild(aceptar);
indice.removeChild(separador1);
nuevoTema.style.display="block";
//Probando base
let ID= 0;
let Nivel = 2;
let titulo= Titulo.value;
const temaB={ID, Nivel,titulo}
GuardarTema(temaB);
//funcion borrar


}
//funcion cancelar
var btn_cancelar= document.getElementById("btn-cancelar");
btn_cancelar.onclick=function(){
    indice.removeChild(Titulo);
    indice.removeChild(cancelar);
    indice.removeChild(aceptar);
    indice.removeChild(separador1); 
    nuevoTema.style.display="block";
}
};
//botones borrar y editar de cada tema
function botonesTemas(Tema){
    var borrarT = document.createElement("icon");
    // borrarT.innerHTML="Borrar";
    borrarT.className="BorrarT";
    var editarT= document.createElement("icon");
    // editarT.innerHTML="Editar";
    editarT.className="EditarT";
    var añadirT=document.createElement("icon");
    // añadirT.innerHTML="Añadir";
    añadirT.className="AñadirT";
    Tema.appendChild(editarT);
    Tema.appendChild(borrarT);
    Tema.appendChild(añadirT);
}

document.onclick=function(a){
    var boton=a.target;
    // funcion de los botones borrar de cada tema
    var Btns_borrar= document.getElementsByClassName("BorrarT");
    for(var i = 0; i<Btns_borrar.length;i++){
        if(boton==Btns_borrar[i]){
            indice.removeChild(Btns_borrar[i].parentNode);
        }
    }
    //funcion del boton editar de cada tema
    var Btns_editar=document.getElementsByClassName("EditarT");
    for(var i=0 ;i<Btns_editar.length;i++){
        if(boton== Btns_editar[i]){
            var TituloEdit= document.createElement("input");
            TituloEdit.type="text";
            TituloEdit.value=Btns_editar[i].parentNode.firstChild.innerHTML;
            TituloEdit.className="Edit_Tit_tem";
            Btns_editar[i].parentNode.appendChild(TituloEdit);
            var aceptar = document.createElement("icon");
            // aceptar.innerHTML="Aceptar";
            aceptar.className="Tem_edit_acep";
            var cancelar = document.createElement("icon");
            // cancelar.innerHTML="Cancelar";
            cancelar.className="Tem_edit_can";
            Btns_editar[i].parentNode.appendChild(aceptar);
            Btns_editar[i].parentNode.appendChild(cancelar);
            var contenido=Btns_editar[i].parentNode;
            contenido.childNodes[0].style.display="none";
            contenido.childNodes[1].style.display="none";
            contenido.childNodes[2].style.display="none";
            contenido.childNodes[3].style.display="none";
            
            
        }
    }
    var B_tem_edit_acep =document.getElementsByClassName("Tem_edit_acep");
    for(var i =0;i<B_tem_edit_acep.length;i++){
        if(boton== B_tem_edit_acep[i]){
            var contenido= B_tem_edit_acep[i].parentNode;
            contenido.childNodes[0].innerHTML=contenido.childNodes[4].value;
            contenido.removeChild(contenido.childNodes[4]);
            contenido.removeChild(contenido.childNodes[4]);
            contenido.removeChild(contenido.childNodes[4]);
            contenido.childNodes[0].style.display="inline";
            contenido.childNodes[1].style.display="inline";
            contenido.childNodes[2].style.display="inline";
            contenido.childNodes[3].style.display="inline";
        }
    }
    var B_tem_edit_can=document.getElementsByClassName("Tem_edit_can");
    for(var i=0;i<B_tem_edit_can.length;i++){
        if(boton==B_tem_edit_can[i]){
            var contenido= B_tem_edit_can[i].parentNode;
            contenido.removeChild(contenido.childNodes[4]);
            contenido.removeChild(contenido.childNodes[4]);
            contenido.removeChild(contenido.childNodes[4]);
            contenido.childNodes[0].style.display="inline";
            contenido.childNodes[1].style.display="inline";
            contenido.childNodes[2].style.display="inline";
            contenido.childNodes[3].style.display="inline";
        }
    }
    var B_añadir= document.getElementsByClassName("AñadirT");
    for(var i=0; i<B_añadir.length;i++){
        if(boton==B_añadir[i]){
            var contenido=B_añadir[i].parentNode;
            var EntreTema= document.createElement("div");
            indice.insertBefore(EntreTema,contenido);
            var TituloTema= document.createElement("input");
            TituloTema.type="text";
            EntreTema.appendChild(TituloTema);
            var aceptar= document.createElement("icon");
            // aceptar.innerHTML="Aceptar";
            aceptar.className="Ent_acep";
            var cancelar= document.createElement("icon");
            // cancelar.innerHTML="Cancelar";
            cancelar.className="Ent_can";
            EntreTema.appendChild(aceptar);
            EntreTema.appendChild(cancelar);
        }
    }
    var Ent_acep = document.getElementsByClassName("Ent_acep");
    for(var i=0;i<Ent_acep.length;i++){
        if(boton==Ent_acep[i]){
           var tema= document.createElement("div"); 
           tema.className="Temass";
           var ConEdit=Ent_acep[i].parentElement;
           var titulo= document.createElement("label");
           titulo.innerHTML=ConEdit.childNodes[0].value;
           indice.insertBefore(tema,ConEdit);
           tema.appendChild(titulo);
           botonesTemas(tema);
           indice.removeChild(ConEdit); 
         }
    }
    var Ent_can=document.getElementsByClassName("Ent_can");
    for(var i=0; i<Ent_can.length;i++){
        if(boton== Ent_can[i]){
            var ConEdit=Ent_can[i].parentElement;
            indice.removeChild(ConEdit);
        }
    }
}



