var Usuarios=[];
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
    /************---------------------------------------- */
    db.collection("Usuarios").get().then(function(BaseUsuarios){
     
        BaseUsuarios.forEach(function(doc){
          Usuarios.push({
              Descripcion: doc.data().Usuario,
              ID: doc.id
          });  
        });
    });
    var correo= document.getElementById("Correo");
    var contraseña= document.getElementById("Contraseña");
    var sesion=document.getElementById("Sesion");
    sesion.onclick=function(){
        if(correo.value==""||contraseña.value==""){
            alert("Llene todos los campos");
        }else{
            if(Existe(correo.value,contraseña.value)==1){
                localStorage.setItem("Sesion","Activo");
                localStorage.setItem("Nombre",NUser(correo.value,contraseña.value));
                localStorage.setItem("Rol",RUser(correo.value,contraseña.value))
                if(localStorage.getItem("Rol")=="Administrador"){
                    location.href="../public/IndexAdmonistrador.html";
                }else{
                    location.href="../index.html";
                }
                
            }else{
                alert("Datos incorrectos");
            }
        }

    }
    function Existe(correo,contraseña){
        var encontrado=0;
        for(var i=0;i<Usuarios.length;i++){
           if(correo==Usuarios[i].Descripcion.Correo && contraseña==Usuarios[i].Descripcion.Contraseña ){
               encontrado=1;
           }
        }
        return encontrado;
    }
    function NUser(correo,contraseña){
        var encontrado=0;
        for(var i=0;i<Usuarios.length;i++){
           if(correo==Usuarios[i].Descripcion.Correo && contraseña==Usuarios[i].Descripcion.Contraseña ){
               encontrado=Usuarios[i].Descripcion.Nombre;
           }
        }
        return encontrado;
    }
    function RUser(correo,contraseña){
        var encontrado=0;
        for(var i=0;i<Usuarios.length;i++){
           if(correo==Usuarios[i].Descripcion.Correo && contraseña==Usuarios[i].Descripcion.Contraseña ){
               encontrado=Usuarios[i].Descripcion.Rol;
           }
        }
        return encontrado;
    }