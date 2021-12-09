var Subtemas=[];
var contenedor=document.getElementById("cont");
/*----------------Base de datos------------------------------------*/


  function GuardarSubTema(subtema){
      db.collection("Subtemas").add({
          subtema
      });
      
  }
/*-------------------------------------------cuando los temas esten vacios--------------------------------- */
var Temas=[];
 setTimeout(()=>{Temas= document.getElementsByClassName("TemaC");
 if(localStorage.getItem("Rol")!="Estudiante"){
    for(var i=0 ;i<Temas.length;i++){
        if(Temas[i].childNodes.length==1){
            var PrimerSub= document.createElement("input");
            PrimerSub.type= "text";
            PrimerSub.className="SubAux";
            Temas[i].appendChild(PrimerSub);
            PrimerAceptar(Temas[i]);
        }
    }
    }
},2000);
/*-------------------------------------------Primer aceptar-------------------------------- */
function PrimerAceptar(subtitulo){
var aceptar= document.createElement("icon");
// aceptar.innerHTML="Aceptar";
aceptar.className="BotonAceptar";
subtitulo.appendChild(aceptar);
aceptar.onclick=function(){
    if(subtitulo.childNodes[1].value==""){
        vacio("No es posible guardar el subtitulo");
    }else{
        let ID= 0;
        let Tipo= "Subtitulo";
        let Contenido=subtitulo.childNodes[1].value;
        let Tema= Number(subtitulo.id);
        const subtema={ID,Tipo,Contenido,Tema};
        GuardarSubTema(subtema);
        setTimeout(()=>{window.location.reload();},2000);
    }

}
}
function vacio(){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Llene todos los campos',
        
      });
  }
