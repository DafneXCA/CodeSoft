if(localStorage.getItem("Rol")!="Administrador"){
  location.href="../index.html";
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


  const MJSOK =()=>{
    Swal.fire(
      'Buen trabajo!',
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
    const pasword=document.getElementById("contraseña")
    const pasword2=document.getElementById("repcontraseña")
    const parrafo = document.getElementById("warnings")
    let warnings = "";
  
    var mensaje= ""  
    if(name.value.length<1 && email.value.length<1 && pasword.value.length<1 && pasword2.value.length<1){
      parrafo.innerHTML="Ingrese todos los espacios vacíos"
      window.alert("Ingrese todos los espacios vacíos");
      entrar=true;
      res=true;
    }
    if(name.value.length<1 || email.value.length<1 || pasword.value.length<1 || pasword2.value.length<1){
      if(entrar==false){
      mensaje=mensaje+"*Ingrese todos los espacios vacíos <br>"
      window.alert("Ingrese todos los espacios vacíos");
      res=true;
      }
    }
    if(!regexNombre.test(name.value) && entrar==false ){
      if(name.value!=""){
      mensaje=mensaje+"*No ingrese Caracteres especiales o números en Nombre <br>"
      window.alert("No ingrese Caracteres especiales o numéricos en Nombre");
      }
      res=true;
    }
    if(name.value.length>40 && entrar==false){
      mensaje=mensaje+"*Nombre muy largo <br> "
      window.alert("Nombre muy largo");
      res=true;
  
    }
    if(name.value.length <6 && entrar==false){
      if(name.value!=""){
        mensaje=mensaje+"*Nombre muy corto <br> "      
        window.alert("Nombre muy corto");
      }
        res=true;
    }
    
    if(!regexEmail.test(email.value) && entrar==false){
      if(email.value!=""){
        mensaje=mensaje+"*El email no es valido<br> "    
        window.alert("El email no es valido");
      }
        res=true;
    }
    
    if(pasword.value.length < 8  && entrar==false){
      if(pasword.value!=""){
        mensaje=mensaje+"*La contraseña es muy corta <br> " 
        window.alert("La contraseña es muy corta");
      }
        res=true;
    }
    if(pasword.value.length>20 && entrar==false){
      mensaje=mensaje+"*La contraseña es muy larga <br> "
      window.alert("La contraseña es muy larga");
      res=true;
  }
  
    if(pasword2.value.length < 8 && pasword2.value.length<20 && entrar==false){
      if(pasword2.value!=""){
        mensaje=mensaje+"*La Confirmación de la contraseña es muy corta <br> "
        window.alert("La Confirmación de la contraseña es muy corta");
      }
        res=true;
    }
    if(pasword2.value.length>20 && entrar==false){
      mensaje=mensaje+"*La Confirmación de la contraseña es muy larga <br> "
      window.alert("La Confirmación de la contraseña es muy larga");
      res=true;
  }
  
    if(pasword2.value != pasword.value && entrar==false){
      if(pasword.value!="" && pasword2.value!=""){
        mensaje=mensaje+"*Las contraseñas no son iguales <br> "
        window.alert("Las contraseñas no son iguales");
      }
        res=true;
    }
    if(entrar==false){
    parrafo.innerHTML = mensaje 
    }  
    if(res==false) {
    //Aqui comprueba si existe un usuario con ese correo
    if(Existe(email.value)==0){
      parrafo.innerHTML = ""
      window.alert("Registrado Correctamente");
      res=true;
      name.value=""
      email.value=""
      pasword.value=""
      pasword2.value=""
      SaveAdmin(Usuario);
      }else{
        alert("Ya existe ese usuario");
        parrafo.innerHTML = "El usuario ya existe"
      }
    }
  
  })
  //Esta funcion es la que recorre la lista de usuarios para saber si ya existe
  function Existe(a){
    var encontrado=0;
    for(var i=0;i<Usuarios.length;i++){
       if(a==Usuarios[i].Descripcion.Correo){
           encontrado=1;
       }
    }
    return encontrado;
}