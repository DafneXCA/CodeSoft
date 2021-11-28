var Usuarios=[];
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
var contraseña= document.getElementById("Contraseña");
var Repetir = document.getElementById("Repetir");
var Registrar= document.getElementById("Registrar");
function GuardarUsuario(Usuario){
    db.collection("Usuarios").add({
        Usuario
    });}
/*-----------------------------------*/
db.collection("Usuarios").get().then(function(BaseUsuarios){
     
    BaseUsuarios.forEach(function(doc){
      Usuarios.push({
          Descripcion: doc.data().Usuario,
          ID: doc.id
      });  
    });
});

Registrar.onclick=function(){
    var Aceptar=0; 
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(nombre.value==""||correo.value==""||contraseña.value==""||Repetir.value==""){
        alert("Llene todos los campos vacíos");
        Aceptar=1;
    }
        if(/^[A-Za-z\s]+$/.test(nombre.value)){
            errores[5].style.display="none";
        }else{if(nombre.value!=""){errores[5].style.display="block";}
        Aceptar=1;}
        if(nombre.value.length<6){
            if(nombre.value!=""){errores[6].style.display="block";}
            Aceptar=1;
        }else{errores[6].style.display="none";}
        if(nombre.value.length>40){
            errores[7].style.display="block";
            Aceptar=1;
        }else{errores[7].style.display="none";}
        errores[0].style.display="none";
        if(contraseña.value.length<8 ){
            if(contraseña.value!=""){
                errores[1].style.display="block";
            }
            Aceptar=1;
            }else{errores[1].style.display="none";}
        if(contraseña.value.length>20 ){
            errores[4].style.display="block";
            Aceptar=1;
            }else{errores[4].style.display="none";}
        if(contraseña.value!=Repetir.value){
                if(contraseña.value!="" && Repetir.value!=""){
                    errores[2].style.display="block";
                }
                Aceptar=1;
            }else{errores[2].style.display="none";}
        if(!emailRegex.test(correo.value)){
                if(correo.value!=""){
                    errores[3].style.display="block";
                }
                Aceptar=1;
            }else{errores[3].style.display="none";}
    
    if(Aceptar==0){
        if(Existe(correo.value)==0 ){
            console.log(Usuarios);
            let Nombre= nombre.value;
            let Correo= correo.value;
            let Contraseña= contraseña.value;
            let Rol="Estudiante";
            const Usuario={Nombre, Correo,Contraseña,Rol};
            GuardarUsuario(Usuario);
            localStorage.setItem("Sesion","Activo");
            localStorage.setItem("Nombre",Nombre)
            localStorage.setItem("Rol","Estudiante")
            //location.href="../public/index.html";
            alert("Registrado correctamente");
            setTimeout(()=>{location.href="../index.html";},2000);   
        }else{
            alert("Ya existe otra cuenta registrada con ese correo electrónico");
        }

    }//else{alert("Aprende a rellenar un formulario");}
    

 }
 function Existe(a){
     var encontrado=0;
     for(var i=0;i<Usuarios.length;i++){
        if(a==Usuarios[i].Descripcion.Correo){
            encontrado=1;
        }
     }
     return encontrado;
 }

    
    
