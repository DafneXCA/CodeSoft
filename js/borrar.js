if(localStorage.getItem("Rol")!="Administrador"){
    location.href="../index.html";
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
      firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
  //Cambie el user por Usuario

//leer documentos
var tabla=document.getElementById('tabla');
db.collection("Usuarios").get().then((querySnapshot)=>{
    tabla.innerHTML="";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Nombre}`);
        let rol=doc.data().Usuario.Rol;
        if(rol=="Estudiante"){
        tabla.innerHTML += `
        <tr>
                  <th scope="row">${doc.id}</th>
                  <td>${doc.data().Usuario.Nombre}</td>
                  <td>${doc.data().Usuario.Correo}</td>
                  <td>${doc.data().Usuario.Contraseña}</td>
                  <td class="eliminar"><button class= "btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                </tr>
        `
        }
    });
});
//borrar datos
function eliminar(id){
db.collection("Usuarios").doc(id).delete().then(function(){
    console.log("Se pudo borrar correctamente");
    location.href="../public/reportesEst.html";
}).catch(function(error){
    console.error("Error removing document:",error);
});
}