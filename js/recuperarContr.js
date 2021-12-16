if(localStorage.getItem("Sesion")=="Activo"){
  if(localStorage.getItem("Rol")=="Administrador"){
    location.href="../public/IndexAdmonistrador.html";
  }else{
    location.href="../index.html";
  }
}
//Este arreglo es para ver si el usuario ya existe
var Usuarios=[];
// @jhon coneccion con la base de datods
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
    
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();
//Cambie el user por Usuario
  const SaveAdmin = (Usuario) =>{
//La base se llama usuarios por que es generica
  db.collection("Usuarios").add({
      Usuario
    })
  .then((docRef) => {
    MJSOK();
    })
  .catch((error) => {
    MJSERROR();
    });
  }
  db.collection("Usuarios").get().then(function(BaseUsuarios){
     
    BaseUsuarios.forEach(function(doc){
      Usuarios.push({
          Descripcion: doc.data().Usuario,
          ID: doc.id
      });  
    });
});
db.collection("Usuarios").get().then(function(BaseUsuarios){
     
  BaseUsuarios.forEach(function(doc){
    Usuarios.push({
        Descripcion: doc.data().Usuario,
        ID: doc.id
    });  
  });
});


  const MJSOK =()=>{
    Swal.fire(
      '¡Buen trabajo!',
      'Datos guardados correctamente!',
      'success'
    )
  }

  const MSJERROR =()=>{
    Swal.fire(
      'ops!',
      'Los Datos no fueron guardados!',
      'error'
    )
  }

let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
let regexNombre=/^[A-Za-z\s]+$/

  $("#btnsave").on('click',()=>{
    let Nombre = $("#nombre").val();
    let Correo = $("#correo").val();
    let Contraseña = $("#contraseña").val();
    //Antes habia la variable de la repeticion de la contraseña 
    //En ves de eso le puse una variable rol para que sepa que es administrador
    let Rol ="Administrador"
    let res = false
    let entrar = false

    const Usuario = {
      Nombre,
      Correo,
      Contraseña,
      Rol
    }

    const name=document.getElementById("nombre")
    const email=document.getElementById("correo")
    const parrafo = document.getElementById("warnings")

    var mensaje= ""  
    if(name.value.length<1 && email.value.length<1){
      parrafo.innerHTML="Ingrese todos los espacios vacíos"
      vacio("Ingrese todos los espacios vacíos");
      entrar=true;
      res=true;
    }
    if(name.value.length<1 || email.value.length<1){
      if(entrar==false){
      mensaje=mensaje+"*Ingrese todos los espacios vacíos <br>"
      
      res=true;
      }
    }
    /*
    if(name.value.length<1 || email.value.length<1){
      parrafo.innerHTML = "Ingrese todos los espacios vacíos <br>"
      window.alert("Ingrese todos los espacios vacíos");
      entrar=true;
      res=true;
      
    }
    */
    if(name.value.length>40 && entrar==false){
      mensaje=mensaje+"*Nombre muy largo <br> "
      
      res=true;
  
    }
    if(!regexNombre.test(name.value) && entrar==false ){
      if(name.value!=""){
        mensaje=mensaje+"*No ingrese Caracteres especiales o numéricos en Nombre <br>"
      
      }
      res=true;
    }
    if(name.value.length <3 && entrar==false){
      if(name.value!=""){
        mensaje=mensaje+"*Nombre muy corto <br> "      
        
      }
        res=true;
    }
    
    if(!regexEmail.test(email.value) && entrar==false){
      if(email.value!=""){
        mensaje=mensaje+"*El email no es valido<br> "    
        
      }
        res=true;
    }
    if(entrar==false){
      parrafo.innerHTML = mensaje
      if(res==true){
        html(mensaje); 
      }
      
      } 
  
    if(res==false) {
    //Aqui comprueba si existe un usuario con ese correo
    if(Existe(email.value,name.value)==0){
      var contra= Existe2(email.value);
      parrafo.innerHTML = "Su contraseña es: "+contra;
      res=true;
      }
      else{
        parrafo.innerHTML = "El Usuario no existe";
        vacio("El Usuario no existe");
      }
    }
  
  })
  //Esta funcion es la que recorre la lista de usuarios para saber si ya existe
  function Existe(a,b){
    var encontrado=1;
    for(var i=0;i<Usuarios.length;i++){
       if(a==Usuarios[i].Descripcion.Correo && b==Usuarios[i].Descripcion.Nombre){
           encontrado=0;
       }
    }
    return encontrado;
}
function Existe2(a){
  var encontrado="";
  for(var i=0;i<Usuarios.length;i++){
     if(a==Usuarios[i].Descripcion.Correo){
         encontrado=Usuarios[i].Descripcion.Contraseña;
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
function html(men){
  Swal.fire({
    title: 'Error',
    icon: 'error',
    html: men
  })
}

