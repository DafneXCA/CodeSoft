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
    var mensajes="";
    var Aceptar=0; 
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(nombre.value==""||correo.value==""||contraseña.value==""||Repetir.value==""){
        mensajes=mensajes+ "Llene todos los campos vacíos<br>";
        Aceptar=1;
    }
        if(/^[A-Za-z\s]+$/.test(nombre.value)){
            errores[5].style.display="none";
        }else{if(nombre.value!=""){errores[5].style.display="block";mensajes=mensajes+errores[5].innerHTML+"<br>"}
        Aceptar=1;}
        if(ContarCar(nombre.value)<3){
            if(nombre.value!=""){errores[6].style.display="block"; mensajes=mensajes+errores[6].innerHTML+"<br>"}
            Aceptar=1;
        }else{errores[6].style.display="none";}
        if(ContarCar(nombre.value)>40){
            errores[7].style.display="block"; mensajes=mensajes+errores[7].innerHTML+"<br>"
            Aceptar=1;
        }else{errores[7].style.display="none";}
        errores[0].style.display="none";
        if(contraseña.value.length<8 ){
            if(contraseña.value!=""){
                errores[1].style.display="block"; mensajes=mensajes+errores[1].innerHTML+"<br>"
            }
            Aceptar=1;
            }else{errores[1].style.display="none";}
        if(contraseña.value.length>20 ){
            errores[4].style.display="block"; mensajes=mensajes+errores[4].innerHTML+"<br>"
            Aceptar=1;
            }else{errores[4].style.display="none";}
        if(contraseña.value!=Repetir.value){
                if(contraseña.value!="" && Repetir.value!=""){
                    errores[2].style.display="block";mensajes=mensajes+errores[2].innerHTML+"<br>"
                }
                Aceptar=1;
            }else{errores[2].style.display="none";}
        if(!emailRegex.test(correo.value)){
                if(correo.value!=""){
                    errores[3].style.display="block"; mensajes=mensajes+errores[3].innerHTML+"<br>"
                }
                Aceptar=1;
            }else{errores[3].style.display="none";}
    
    if(Aceptar==0){
        if(Existe(correo.value)==0 ){
            console.log(Usuarios);
            let Nombre= Comprimir(nombre.value);
            let Correo= correo.value;
            let Contraseña= contraseña.value;
            let Rol="Estudiante";
            let Nivel1= "NO";
            let Nota1=0;
            let Nivel2= "NO";
            let Nota2=0;
            let Nivel3= "NO";
            let Nota3=0;
            const Usuario={Nombre, Correo,Contraseña,Rol,Nivel1,Nota1,Nivel2,Nota2,Nivel3,Nota3};
            GuardarUsuario(Usuario);
            localStorage.setItem("Sesion","Activo");
            localStorage.setItem("Nombre",Nombre)
            localStorage.setItem("Rol","Estudiante")
            localStorage.setItem("Nivel1","NO");
            localStorage.setItem("Nivel2","NO");
            localStorage.setItem("Nivel3","NO");
            localStorage.setItem("Nota1","0");
            localStorage.setItem("Nota2","0");
            localStorage.setItem("Nota3","0");
            localStorage.setItem("Correo", correo.value);
            localStorage.setItem("Contraseña", contraseña.value);
            //location.href="../public/index.html";
            bien();
            setTimeout(()=>{location.href="../index.html";},2000);   
        }else{
            vacio("Ya existe otra cuenta registrada con ese correo electrónico");
        }

    }else{
        html(mensajes);
    }
    

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
 function vacio(texto){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
        
      });
  }
  
  function bien(){
    Swal.fire({
        title: 'Buen trabajo',
        icon: 'success',
        text: "Registro correcto"
      })
  }
  function html(men){
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: men
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
  function Comprimir(Cadena){
    var compreso="";
    for(var i=0; i<Cadena.length;i++){
        if(Cadena[i]!=" "){
            compreso+=Cadena[i];
        }
    }
    return compreso;
  }

 

    
    
