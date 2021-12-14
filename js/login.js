if(localStorage.getItem("Sesion")=="Activo"){
    if(localStorage.getItem("Rol")=="Administrador"){
      location.href="../public/IndexAdmonistrador.html";
    }else{
      location.href="../index.html";
    }
  }
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
            vacio("Llene todos los campos");
        }else{
            if(Existe(correo.value,contraseña.value)==1){
                var perfil=Usuario(correo.value,contraseña.value);
                localStorage.setItem("Sesion","Activo");
                localStorage.setItem("Nombre",perfil.Descripcion.Nombre);
                localStorage.setItem("Rol",perfil.Descripcion.Rol);
                localStorage.setItem("Contraseña",contraseña.value);
                localStorage.setItem("Correo", correo.value);
                localStorage.setItem("Id",perfil.ID);
                if(localStorage.getItem("Rol")=="Administrador"){
                    location.href="../public/IndexAdmonistrador.html";
                }else{
                    if(localStorage.getItem("Rol")=="Estudiante"){
                        localStorage.setItem("Nivel1",perfil.Descripcion.Nivel1);
                        localStorage.setItem("Nivel2",perfil.Descripcion.Nivel2);
                        localStorage.setItem("Nivel3",perfil.Descripcion.Nivel3);
                        localStorage.setItem("Nota1",perfil.Descripcion.Nota1);
                        localStorage.setItem("Nota2",perfil.Descripcion.Nota2);
                        localStorage.setItem("Nota3",perfil.Descripcion.Nota3);
                        location.href="../index.html";
                    }
                    if(localStorage.getItem("Rol")=="Docente"){
                        location.href="../index.html";
                    }
                }
                
            }else{
                vacio("Datos incorrectos");
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

    function Usuario(correo,contraseña){
        
        var encontrado;
        for(var i=0;i<Usuarios.length;i++){
           if(correo==Usuarios[i].Descripcion.Correo && contraseña==Usuarios[i].Descripcion.Contraseña ){
               encontrado=Usuarios[i];
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
    
   
    