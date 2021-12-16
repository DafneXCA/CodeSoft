var errores=document.getElementsByClassName("alerta");
for(var i=0;i<errores.length;i++){
    errores[i].style.display="none";
    errores[i].style.color="yellow";
}
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

var nombre= document.getElementById("Nombre");
var correo= document.getElementById("Correo");
var categoria= document.getElementById("ComboBox");
var descripcion = document.getElementById("Descripcion");
var Registrar= document.getElementById("Enviar");
function GuardarSolicitud(Solicitud){
    db.collection("Solicitudes").add({
        Solicitud
    });}
/*-----------------------------------*/

Enviar.onclick=function(){
    var mensajes="";
    var Aceptar=0; 
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(nombre.value==""||correo.value==""||descripcion.value==""){
        mensajes=mensajes+ "Llene todos los campos vacíos<br>";

        Aceptar=1;
    }
        if(/^[A-Za-z\s]+$/.test(nombre.value)){
            errores[4].style.display="none";
        }else{if(nombre.value!=""){errores[3].style.display="block"; mensajes=mensajes+errores[3].innerHTML+"<br>"}
        Aceptar=1;}
        if(ContarCar(nombre.value)<3){
            if(nombre.value!=""){errores[4].style.display="block"; mensajes=mensajes+errores[4].innerHTML+"<br>"}
            Aceptar=1;
        }else{errores[4].style.display="none";}
        if(ContarCar(nombre.value)>40){
            errores[5].style.display="block"; mensajes=mensajes+errores[5].innerHTML+"<br>"
            Aceptar=1;
        }else{errores[5].style.display="none";}
        errores[0].style.display="none";
        if(descripcion.value.length>150 ){
            errores[2].style.display="block";mensajes=mensajes+errores[2].innerHTML+"<br>"
            Aceptar=1;
            }else{errores[2].style.display="none";}
        if(!emailRegex.test(correo.value)){
                if(correo.value!=""){
                    errores[1].style.display="block"; mensajes=mensajes+errores[1].innerHTML+"<br>"
                }
                Aceptar=1;
            }else{errores[1].style.display="none";}
    
    if(Aceptar==0){
        let Nombre= nombre.value;
        let Correo= correo.value;
        let Categoria= categoria.value;
        let Descripcion= descripcion.value;
        const Peticion={Nombre,Correo,Categoria,Descripcion};
        console.log(Peticion);
        GuardarSolicitud(Peticion);
        bien("La petición se registró correctamente");  
    }else{
        html(mensajes);
    }

 }    
 function vacio(texto){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
        
      });
  }
  function bien(texto){
    Swal.fire({
        title: '¡Buen trabajo!',
        icon: 'success',
        text: texto
      })
  }
  function ContarCar(Cadena){
    var con=0;
    for(var i=0; i<Cadena.length;i++){
        if(Cadena[i]!=" "){
            con++;
        }
        console.log(Cadena[i]);
    }
    return con;
  }
  function html(men){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: men
    })
  }
