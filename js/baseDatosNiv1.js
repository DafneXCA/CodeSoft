var LisTemas= [];
var indice = document.getElementById("IND");
var nuevoTema= document.getElementById("Nuevo tema");
var Nivel= document.getElementById("cont");
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
  //Storage
  
 // var storageRef=storage.ref();
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db =firebase.firestore();
  var storage=firebase.storage();

  //Guardar el tema
  function GuardarTema(tema){
      db.collection("Temas1").add({
          tema
      });
      
  }
  //leer Firebase
    db.collection("Temas1").get().then(function(BaseTemas){
     
        BaseTemas.forEach(function(doc){
          LisTemas.push({
              Descripcion: doc.data().tema,
              ID: doc.id
          });  
        });
        //Ordenar lista de temas
        for(var i=1;i<LisTemas.length;i++){
            for(var j=0; j<LisTemas.length-i;j++){
                if(Number(LisTemas[j].Descripcion.ID)>Number(LisTemas[j+1].Descripcion.ID)){
                    var aux=LisTemas[j];
                    LisTemas[j]=LisTemas[j+1]
                    LisTemas[j+1]=aux;
                }
            }
        }
        PonerTemas();
    });
 function PonerTemas(){
     //Para todos los temas
     for(var i=0; i<LisTemas.length;i++){
        var Tema=document.createElement("div");
        Tema.className="Tema";
        Tema.id=LisTemas[i].ID;
        var Titulo= document.createElement("label");
        Titulo.innerHTML=LisTemas[i].Descripcion.Titulo
        Tema.appendChild(Titulo);
        indice.insertBefore(Tema,nuevoTema);
        //Botones
        if(localStorage.getItem("Rol")!="Estudiante"){
        botonEditar(Tema);
        botonBorrar(Tema);
        botonAñadir(Tema);
        }
        var tituloAux=document.createElement("input");
        tituloAux.type="text";
        tituloAux.value=Titulo.innerHTML;
        Tema.appendChild(tituloAux);
        if(localStorage.getItem("Rol")!="Estudiante"){
        botonAceptarEdicion(Tema);
        botonCancelarEdicion(Tema);
        }
        tituloAux.style.display="none"
        var ID= document.createElement("label");
        ID.innerHTML=LisTemas[i].Descripcion.ID;
        ID.style.display="none";
        Tema.appendChild(ID);
        /*------------Añadir titulos-----------------------*/
        var ConTema=document.createElement("div");
        ConTema.className="TemaC";
        var Titulo_tema= document.createElement("h2");
        Titulo_tema.innerHTML=LisTemas[i].Descripcion.Titulo;
        ConTema.id=LisTemas[i].Descripcion.ID;
        Nivel.appendChild(ConTema);
        ConTema.appendChild(Titulo_tema);
     }
 }
 /*-------------------------Boton editar-------------------------------------------*/
 function botonEditar(tema){
    var Editar=document.createElement("icon");
        // Editar.innerHTML="Editar";
        Editar.className="BotonEditar";
        tema.appendChild(Editar);
        Editar.onclick=function(){
            tema.childNodes[0].style.display="none";  
            tema.childNodes[1].style.display="none";
            tema.childNodes[2].style.display="none";
            tema.childNodes[3].style.display="none";
            tema.childNodes[4].style.display="inline";
            tema.childNodes[5].style.display="inline";
            tema.childNodes[6].style.display="inline";
        }     
 }
 /*--------------------------Boton Borrar---------------------------------------*/
 function botonBorrar(tema){
    var Borrar=document.createElement("icon");
    // Borrar.innerHTML="Borrar";
    Borrar.className="BotonBorrar";
    tema.appendChild(Borrar);
    Borrar.onclick=function(){
        var confirmacion=confirm("¿Estas seguro de borrar este Tema?\nUna vez borrado no podrá recuperar el contenido");
        if(confirmacion){
            db.collection("Temas1").doc(tema.id).delete(); 
        setTimeout(()=>{window.location.reload();},2000); 
        }
        
    }
 }
 /*---------------------------Boton Añadir-------------------------------------------------------*/
 function botonAñadir(tema){
    var Añadir=document.createElement("icon");
    // Añadir.innerHTML="Añadir";
    Añadir.className="BotonAñadir";
    tema.appendChild(Añadir);
    Añadir.onclick=function(){
        EntreTemas(tema);
    }
 }
 /*-------------------------------Boton Aceptar edicion------------------------------------*/
function botonAceptarEdicion(tema){
    var aceptarAux=document.createElement("icon");
    // aceptarAux.innerHTML="Aceptar";
    aceptarAux.className="BotonAceptar";
    tema.appendChild(aceptarAux);
    aceptarAux.style.display="none";
    aceptarAux.onclick=function(){
        if(/\w/.test(tema.childNodes[4].value)){
            db.collection("Temas1").doc(tema.id).update({
                tema:{Titulo: tema.childNodes[4].value,Nivel:1,ID: Number(tema.childNodes[7].innerHTML)}
            })
            setTimeout(()=>{window.location.reload();},2000); 
        }else{
            
            alert("No se puede actualizar el tema");
        }

    }
}
/*---------------------------------------Boton Cancelar edicion------------------------------- */
function botonCancelarEdicion(tema){
    var cancelarAux=document.createElement("icon");
    // cancelarAux.innerHTML="Cancelar";
    cancelarAux.className="BotonCancelar";
    tema.appendChild(cancelarAux);
    cancelarAux.style.display="none";
    cancelarAux.onclick=function(){
        tema.childNodes[0].style.display="inline";  
        tema.childNodes[1].style.display="inline";
        tema.childNodes[2].style.display="inline";
        tema.childNodes[3].style.display="inline";
        tema.childNodes[4].style.display="none";
        tema.childNodes[5].style.display="none";
        tema.childNodes[6].style.display="none";  
    }
}
 nuevoTema.onclick=function(){
     /*------------Nuevo tema-------------------------*/
     var auxiliar=document.createElement("div");
     indice.appendChild(auxiliar);
     var tituloA=document.createElement("input");
     tituloA.type="text";
     var aceptar= document.createElement("icon");
    //  aceptar.innerHTML="Aceptar";
     aceptar.className="BotonAceptar";
    var cancelar= document.createElement("icon");
    cancelar.className="BotonCancelar";
    // cancelar.innerHTML="Cancelar";
    auxiliar.appendChild(tituloA);
    auxiliar.appendChild(aceptar);
    auxiliar.appendChild(cancelar);
    nuevoTema.style.display="none";
    /*--------------Boton Aceptar----------------*/
    aceptar.onclick=function(){
        if(/\w/.test(tituloA.value)){
            let ID= LisTemas.length;
            let Nivel = 1;
            let Titulo= tituloA.value;
            const temaB={ID, Nivel,Titulo}
            GuardarTema(temaB);
            indice.removeChild(auxiliar);
            nuevoTema.style.display="block";
            setTimeout(()=>{window.location.reload();},2000);//Necesario para que la base guarde los cambios   
        }else{
            alert("No es posible añadir el tema");
        }
    }
    /*-------------------Boton cancelar-------------------------*/
    cancelar.onclick=function(){
        indice.removeChild(auxiliar);
        nuevoTema.style.display="block";

    }
 }
 function EntreTemas(tema){
        /*------------Nuevo tema-------------------------*/
        tema.childNodes[1].style="none";
        var auxiliar=document.createElement("div");
        indice.insertBefore(auxiliar,tema);
        var tituloA=document.createElement("input");
        tituloA.type="text";
        var aceptar= document.createElement("icon");
        // aceptar.innerHTML="Aceptar";
        aceptar.className="BotonAceptar";
       var cancelar= document.createElement("icon");
    //    cancelar.innerHTML="Cancelar";
       cancelar.className="BotonCancelar";
       auxiliar.appendChild(tituloA);
       auxiliar.appendChild(aceptar);
       auxiliar.appendChild(cancelar);
       /*--------------Boton Aceptar----------------*/
       aceptar.onclick=function(){
          if(/\w/.test(tituloA.value)){
            let ID= entreTemas(tema);
           let Nivel = 1;
           let Titulo= tituloA.value;
           const temaB={ID, Nivel,Titulo}
           GuardarTema(temaB);
           indice.removeChild(auxiliar);
           nuevoTema.style.display="block";
           setTimeout(()=>{window.location.reload();},2000);//Necesario para que la base guarde los cambios
           tema.childNodes[1].style="inline";
          }else{
            
           alert("No es posible añadir tema");
          }

       }
       /*-------------------Boton cancelar-------------------------*/
       cancelar.onclick=function(){
           indice.removeChild(auxiliar);
           nuevoTema.style.display="block";
           tema.childNodes[1].style="inline";
       }
 }
 function entreTemas(tema){
     var contador =0;
     var listar= indice.getElementsByTagName("div");
     if(listar[1]==tema){
         contador= Number(tema.childNodes[7].innerHTML)-0.1;
     }else{
        for(var i = 2 ;i<listar.length;i++){
            if(listar[i]==tema){
                contador = (Number(tema.childNodes[7].innerHTML)+Number(listar[i-3].childNodes[7].innerHTML))/2;
           }
         }
     }
     return contador;

 }
 
 /*--------------------------------------------------------*/













