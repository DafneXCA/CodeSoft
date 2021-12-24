var examen = document.createElement("div");
examen.id = "Examen";
var Preguntas = [];
var cont = document.getElementById("cont");
var storageRef = storage.ref();
var BAceptar = document.createElement("button");
BAceptar.className="BAceptar";
var Titulo = document.createElement("h2");
Titulo.innerHTML = "EXAMEN";


examen.appendChild(BAceptar);
examen.appendChild(Titulo);
var num = 0;
if (localStorage.getItem("Rol") == "Estudiante") {
    BAceptar.innerHTML = "Calificar";
    BAceptar.onclick=function(){
        var calificacion=0;
       // console.log("aghhhhhh");
        var PregC = examen.getElementsByClassName("contestar");
        if (PregC.length >0) {
            for(var i=0;i<PregC.length;i++){
                var contestado=PregC[i].childNodes[3];

                var resp=[];
                var pos=0;
                
                for(var l=0;l<contestado.childNodes.length;l++){
                    console.log(contestado.childNodes[l].childNodes[0].checked);
                    if(contestado.childNodes[l].childNodes[0].checked){
                        resp[pos]=contestado.childNodes[l].innerText;
                        //console.log("--------------------");
                       // console.log(resp[pos]);
                        pos++;
                    }
                    //console.log(resp);
                }
               // console.log(contestado.childNodes[0].childNodes[0].checked);
                for(var j=0;j<Preguntas.length;j++){
                    console.log("AAAAA");
                    console.log(PregC[i].id);
                    console.log(Preguntas[j].ID);
                    if(PregC[i].id==Preguntas[j].ID){
                        console.log("AAAAA");
                        var correcto=false;
                        var respC=Preguntas[j].Descripcion.RespuestaC;
                        respC=respC.split("<*>");
                        if(respC.length<resp.length){
                            PregC[i].style.borderColor="#ff0000";
                        }else{
                            for(var k=0;k<respC.length;k++){
                                correcto=false;
                                for(var m=0;m<resp.length;m++){
                                    
                                    if(resp[m]==respC[k]){
                                        console.log(respC[k]);
                                        console.log(resp[m]);
                                        correcto=true;
                                    }
                                }
                                if(!correcto){
                                    PregC[i].style.borderColor="#ff0000";
                                    break;
                                }
                            }
                            if(correcto){
                                //console.log("FF");
                                PregC[i].style.borderColor="#008000";
                                calificacion++;
                                break;
                            }
                        }
                        
                        
                    }
                }
            }
            //calificar
            
            var nota=Math.round((100/PregC.length)*calificacion);
            if(nota>50){
                calificar(nota+"/"+100,"success");
                setTimeout(()=>{},500); 
            }else{
                calificar(nota+"/"+100,"error");
                setTimeout(()=>{},500); 
            }
            
            localStorage.setItem("Nota1", nota);
            localStorage.setItem("Nivel1","SI");
            //guardar nota en perfil
            db.collection("Usuarios").doc(localStorage.getItem("Id")).update({
            Usuario: 
            {Nombre: localStorage.getItem("Nombre"),
            Correo: localStorage.getItem("Correo"),
            Contraseña: localStorage.getItem("Contraseña"),
            Rol: "Estudiante",
            Nivel1: "SI",
            Nivel2: localStorage.getItem("Nivel2"),
            Nivel3: localStorage.getItem("Nivel3"),
            Nota1: nota,
            Nota2: localStorage.getItem("Nota2"),
            Nota3: localStorage.getItem("Nota3")
            
            }

        })
        BAceptar.style.display="none";
         
        }else{

           vacio1("No hay preguntas para calificar") ;
        }
        
    }
}else{
    BAceptar.innerHTML = "Guardar";
    BAceptar.onclick = function () {
        var PreguntasOb = examen.getElementsByClassName("Pregunta");
        //console.log(PreguntasOb);
        if (PreguntasOb.length > 0) {
    
            if (controlF()) {
                var contenedor4 =document.getElementById("contenedor_carga");
                contenedor4.style.display="block";
                contenedor4.style.visibility="visible";
                contenedor4.style.opacity="2";
                for (var i = 0; i < PreguntasOb.length; i++) {

                    if(i==PreguntasOb.length-1){
                        ObtenerPregunta(PreguntasOb[i],true);  
                    }else{
                        ObtenerPregunta(PreguntasOb[i],false);
                    }
                    
                    console.log(i);
                    /* var preg = ObtenerPregunta(PreguntasOb[i]);
                     let Pregunta = preg;
                     var res = ObtenerRespuestas(PreguntasOb[i]);
                     let Respuestas = res;
                     let Tipo = PreguntasOb[i].childNodes[3].value;
                     var resC = ObtenerResC(PreguntasOb[i]);
                     let RespuestaC = resC;
                     const pregunta = { Pregunta, Respuestas, Tipo, RespuestaC }
                     console.log(pregunta);*/
                    // GuardarPregunta(Subtema);
                }
                console.log("????");
                //setTimeout(() => { window.location.reload(); }, 2000);//Necesario para que la base guarde los cambios
    
            } else {
                vacio1("Revise la última pregunta antes de guardar");
            }
    
    
        } else {
            vacio1("No hay nada que guardar");
        }
    }
}



//-----------------------Obtener Pregunta-------------------------
function ObtenerPregunta(pregunta,ultimo) {
    console.log("!!!!");
    var texto = pregunta.firstChild.value;
    var parrafoaux = "";
    if (texto != "") {
        var separado = texto.split('\n');

        for (var i = 0; i < separado.length; i++) {


            if (/\w/.test(separado[i])) {
                if (i != separado.length - 1) {
                    parrafoaux = parrafoaux + separado[i] + "<br>";
                } else {
                    parrafoaux = parrafoaux + separado[i]
                }
            }

        }
    }
    console.log("!!!!------");
    var file = pregunta.childNodes[1].files[0];

    if (!file) {
      
        
        parrafoaux = parrafoaux + "<*>";
        GuardarPreguntan(pregunta, parrafoaux,ultimo);
    } else {
        
        var storageRef = storage.ref('/ExamenNiv1/' + file.name + Math.random());
        var uploadTask = storageRef.put(file);
        var urlImg;
        console.log("!!!!????");
        
        uploadTask.on('state_changed', function (snapshot) { }, function (error) {
            console.log(error);
            
        }, function () {
           console.log("!!!!+++++++++++");
           console.log(uploadTask.snapshot.ref.getDownloadURL());
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                urlImg = url;
                console.log(urlImg);
                console.log("!!!!");
                parrafoaux = parrafoaux + "<*>" + urlImg;
               
                GuardarPreguntan(pregunta, parrafoaux,ultimo);

                //console.log(parrafoaux);

            });
            
        });
        
        setTimeout(() => {  },5000);

    }

   
}
function GuardarPreguntan(preguntan, pregCom,ultimo) {
    console.log("FFF");
    let Pregunta = pregCom;
    var res = ObtenerRespuestas(preguntan);
    let Respuestas = res;
    let Tipo = preguntan.childNodes[3].value;
    var resC = ObtenerResC(preguntan);
    let RespuestaC = resC;
    const pregunta = { Pregunta, Respuestas, Tipo, RespuestaC }
    console.log(pregunta);
    GuardarPregunta(pregunta);
    if(ultimo){
       
        setTimeout(() => { window.location.reload(); }, 2000);
        
    }
    
}
//.........................Obtener Respuestas.....................
function ObtenerRespuestas(pregunta) {
    var respuestas = pregunta.childNodes[4].value;
    var cadRes = "";
    if (respuestas != "") {
        respuestas = respuestas.split("\n");
        var res=[];
        var pos=0;
        for (var m = 0; m < respuestas.length; m++) {
            var x = respuestas[m];
            //console.log(x);
            if (/\w/.test(x)) {
                res[pos]=x;
                pos++;
                

            }
        }
        for(var j=0;j<res.length;j++){
            if (j != res.length - 1) {
                cadRes = cadRes + res[j] + "<*>";
            } else {
                cadRes = cadRes + res[j];
            }
        }
    }
    return cadRes;

}
//--------------------------Obtener Respuestas Correctas------------------
function ObtenerResC(pregunta) {
    var respuestas = pregunta.childNodes[5].value;
    var cadRes = "";
    if (respuestas != "") {
        respuestas = respuestas.split("\n");
        console.log(respuestas);
        var res=[];
        var pos=0;
        for (var m = 0; m < respuestas.length; m++) {
            var x = respuestas[m];
            //console.log(x);
            if (/\w/.test(x)) {
                res[pos]=x;
                pos++;
            }
        }
        console.log("#############");
                console.log(res);
            for(var n=0;n<res.length;n++){
                if (n != res.length - 1) {
                    cadRes = cadRes + res[n] + "<*>";
                } else {
                    cadRes = cadRes + res[n];
                }
            }
            
    }else{

    }
    return cadRes;


    }
    

/*--------------------Guardar Subtemas--------------------------- */
function GuardarPregunta(pregunta) {
    db.collection("Examen1").add({
        pregunta
    });
}
/*---------------Leer------------------------------*/
db.collection("Examen1").get().then(function (BaseExamen1) {
    BaseExamen1.forEach(function (doc) {
        Preguntas.push({
            Descripcion: doc.data().pregunta,
            ID: doc.id
        });
    });
    console.log(Preguntas);
    if(localStorage.getItem("Nivel1")=="NO" || localStorage.getItem("Rol") != "Estudiante" ){
        CargarPreguntas();
    cont.appendChild(examen);
    }else{
        var mensaje= document.createElement("div");
        mensaje.style.color="#ffffff";
        mensaje.className="pm";
        mensaje.innerHTML="Usted ya rindió el examen del Nivel 1";
        mensaje.id="mensaje";
        cont.appendChild(mensaje);
    }
    


}
);
function CargarPreguntas() {
    console.log(":V");
    if (examen.childNodes.length == 2) {
        console.log(":V");
        var btnAñadir = document.createElement("icon");

        btnAñadir.className = "BotonAñadir";
        examen.appendChild(btnAñadir);
        if (localStorage.getItem("Rol") == "Estudiante") {
            btnAñadir.style.display = "none";
        }
        btnAñadir.onclick = function () {
            if (controlF()) {
                var divPreg = document.createElement("div");
                divPreg.className = "Pregunta";
                var preg = document.createElement("textarea");
                preg.setAttribute('placeholder', "Pregunta");
                var imagen = document.createElement("input");
                imagen.type = "file";
                imagen.setAttribute('accept', 'image/*');
                imagen.addEventListener('change', mostrar3, 'false');
                var contNimg = document.createElement("div");

                var nimg = document.createElement("img");
                contNimg.appendChild(nimg);
                var mod = document.createElement("select");
                mod.name = "Modo";
                var op1 = document.createElement("option");;
                op1.innerHTML = "Solución única";
                var op2 = document.createElement("option");;
                op2.innerHTML = "Selección múltiple";
                mod.appendChild(op1);
                mod.appendChild(op2);
                mod.style.display = "block";
                var respuestas = document.createElement("textarea");
                respuestas.setAttribute('placeholder', "Respuestas (Separar por saltos de línea)");
                var resC = document.createElement("textarea");
                resC.setAttribute('placeholder', "Respuesta correcta (Separar por saltos de línea en caso de haber más de una)");
                divPreg.appendChild(preg);
                divPreg.appendChild(imagen);
                divPreg.appendChild(contNimg);
                divPreg.appendChild(mod);
                divPreg.appendChild(respuestas);
                divPreg.appendChild(resC);
                btnCancelar(divPreg);

                examen.insertBefore(divPreg, btnAñadir);

            } else {
                
            }

        }
    }
    for (var i = 0; i < Preguntas.length; i++) {
        //console.log(":Vxx");
        console.log(Preguntas[i]);
        var contPreg = document.createElement("div");
        contPreg.id = Preguntas[i].ID;
        contPreg.className = "contestar";
        var num = document.createElement("label");
        num.innerHTML = i + 1;

        var preg = document.createElement("h4");
        var aux = Preguntas[i].Descripcion.Pregunta;
        aux = aux.split("<*>");
        preg.innerHTML = aux[0];


        var img = document.createElement("img");
        img.className="ImgPreg";
        if (aux[1] != "") {
            img.src = aux[1];
        }


        var contres = document.createElement("div");
        contres.className = "Respuestas";
        contres.className = "pmRes";
        var respuestas = Preguntas[i].Descripcion.Respuestas;
        respuestas = respuestas.split("<*>");
        if (Preguntas[i].Descripcion.Tipo == "Solución única") {

            for (var j = 0; j < respuestas.length; j++) {
                var res = document.createElement("input");
                res.type = "Radio";
                res.name = "rspt"+i;

                var lab = document.createElement("label");
                lab.className="labRes";
                lab.innerHTML = respuestas[j];
                lab.style.display = "block";
                lab.insertAdjacentElement("afterbegin", res);
                contres.appendChild(lab);
            }
        } else {
            for (var j = 0; j < respuestas.length; j++) {
                var res = document.createElement("input");
                res.type = "checkbox";

                var lab = document.createElement("label");
                lab.className="labRes";
                lab.innerHTML = respuestas[j];
                
                lab.style.display = "block";
                lab.insertAdjacentElement("afterbegin", res);
                
                contres.appendChild(lab);
            }
        }

        contPreg.appendChild(num);
        contPreg.appendChild(preg);
        contPreg.appendChild(img);
        contPreg.appendChild(contres);
        if (localStorage.getItem("Rol") != "Estudiante") {
            BEliminar(contPreg);
            BEditar(contPreg);
        }
       

        examen.insertBefore(contPreg, examen.lastChild);

    }


}
//----------------------Boton Editar------------------
function BEditar(contPregunta) {
    var editar = document.createElement("icon");
    editar.className = "BotonEditar";
    contPregunta.appendChild(editar);
    editar.onclick = function () {
        var divEd = document.createElement("div");
        var elementos = contPregunta.childNodes;

        var e1 = document.createElement("textarea");
        e1.value = elementos[1].innerText;

        var img = document.createElement("input");
        img.type = "file";
        img.setAttribute('accept', 'image/*');
        var nimg = document.createElement("img");
        var copysrc = "";
        if (elementos[2].src != "") {
            nimg.src = elementos[2].src;
            copysrc = elementos[2].src;
        }
        var cancelar = document.createElement("icon");
        cancelar.className = "BotonBorrar";
        cancelar.style.display = "block";
        cancelar.onclick = function () {
            if (nimg.src != "") {
                nimg.removeAttribute("src");
            } else {
                vacio1("No hay imagenes que eliminar");
            }
        }
        img.addEventListener('change', mostrar3, 'false');

        var e3 = document.createElement("textarea");
        var auxRes = "";
        for (var i = 0; i < elementos[3].childNodes.length; i++) {
            auxRes = auxRes + elementos[3].childNodes[i].innerText + "\n";
        }
        e3.value = auxRes;

        for (var j = 0; j < Preguntas.length; j++) {
            if (contPregunta.id == Preguntas[j].ID) {
                var copy = Preguntas[j].Descripcion;
            }
        }

        var e4 = document.createElement("textarea");
        var auxResC = copy.RespuestaC;
        auxResC = auxResC.split("<*>");
        var resaux = "";
        for (var k = 0; k < auxResC.length; k++) {
            resaux = resaux + auxResC[k] + "\n";
        }
        e4.value = resaux;

        var mod = document.createElement("select");
        mod.name = "Modo";
        var op1 = document.createElement("option");;
        op1.innerHTML = "Solución única";
        var op2 = document.createElement("option");;
        op2.innerHTML = "Selección múltiple";
        console.log(copy.Tipo);
        if(copy.Tipo=="Solución única"){
            mod.appendChild(op1);
            mod.appendChild(op2);
        }else{
            mod.appendChild(op2);
            mod.appendChild(op1);
        }
        
        mod.style.display = "block";

        //----------------------------------------------------------
        for (var m = 1; m < contPregunta.childNodes.length; m++) {

            if (m == 2) {
                contPregunta.childNodes[m].src = "";
            } else {
                contPregunta.childNodes[m].style.display = "none";
            }
        }

        //----------------------------------------------------------
        divEd.appendChild(e1);
        divEd.appendChild(img);
        divEd.appendChild(nimg);
        divEd.appendChild(cancelar);
        divEd.appendChild(mod);
        divEd.appendChild(e3);
        divEd.appendChild(e4);
        contPregunta.appendChild(divEd);
        btnAE(divEd);
        btnCE(divEd, copysrc);
        

    }
}
//---------------------Aceptar Edicion-------------------
function btnAE(contEd) {
    var aceptar=document.createElement("icon");
    aceptar.className="BotonAceptar";
    contEd.appendChild(aceptar);
    
    aceptar.onclick=function(){
       
        
        if(controlEdicion2(contEd)){
            var contenedor4 =document.getElementById("contenedor_carga");
                contenedor4.style.display="block";
                contenedor4.style.visibility="visible";
                contenedor4.style.opacity="2";
           ObtenerPregunta2(contEd,contEd.parentNode.id);
           //console.log(contEd.parentNode.id);
           
           
        }
        
    }
}
//------------------------------------------------------
function ObtenerPregunta2(pregunta,id) {

    var texto = pregunta.firstChild.value;
    var parrafoaux = "";
    if (texto != "") {
        var separado = texto.split('\n');

        for (var i = 0; i < separado.length; i++) {


            if (/\w/.test(separado[i])) {
                if (i != separado.length - 1) {
                    parrafoaux = parrafoaux + separado[i] + "<br>";
                } else {
                    parrafoaux = parrafoaux + separado[i]
                }
            }

        }
    }

    var file = pregunta.childNodes[1].files[0];

    if (!file) {
        console.log("-.................");
        console.log(pregunta.childNodes[2].src);
        parrafoaux = parrafoaux + "<*>"+pregunta.childNodes[2].src;
        GuardarPregunta2(pregunta, parrafoaux,id);
    } else {
        var storageRef = storage.ref('/ExamenNiv1/' + file.name + Math.random());
        var uploadTask = storageRef.put(file);
        var urlImg;

        uploadTask.on('state_changed', function (snapshot) { }, function (error) {
            console.log(error);
        }, function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                urlImg = url;
              //  console.log(url);
                parrafoaux = parrafoaux + "<*>" + urlImg;
                GuardarPregunta2(pregunta, parrafoaux,id);

               // console.log(parrafoaux);

            });

        });
    }
}
//--------------------------------------------------------------------
function clonar(contEd){
var newDiv=document.createElement("div");
        
      //  console.log(contEd.childNodes.length);
        for(var i=0;i<contEd.childNodes.length;i++){
            if(i!=3){
                var copy=contEd.childNodes[i].cloneNode(true);
               // console.log("+----------------------");
               // console.log(contEd.childNodes[i].cloneNode(true));
                newDiv.appendChild(copy);
            }
           
        }
        return newDiv;
}
//---------------------------------------------------------------------------------
function GuardarPregunta2(preguntan, pregCom, id) {
    var clon=clonar(preguntan);
    
    var res = ObtenerRespuestas(clon);
    
    //sel.options[sel.selectedIndex].text
   // console.log("..................................................");
   
    
    
    var resC = ObtenerResC(clon);
   
    
    
    
    
    db.collection("Examen1").doc(id).update({
        pregunta: { Pregunta: pregCom, Respuestas: res, Tipo: preguntan.childNodes[4].value, RespuestaC : resC }
    })
    setTimeout(() => { window.location.reload(); }, 3000);//Necesario para que la base guarde los cambios
}
//----------------------Cancelar Edicion----------------
function btnCE(contEd, copysrc) {
 var cancelar=document.createElement("icon");
 cancelar.className="BotonCancelar";
 contEd.appendChild(cancelar);
 cancelar.onclick=function(){
    
   
    for (var m = 1; m < contEd.parentNode.childNodes.length; m++) {

        if (m == 2) {
            if(copysrc!=""){
                (contEd.parentNode).childNodes[m].src = copysrc;
            }else{
                (contEd.parentNode).childNodes[m].removeAttribute("src");
            }
        } else {
            if(m > contEd.parentNode.childNodes.length-4){
               
                (contEd.parentNode).childNodes[m].style.display  = "inline";
            }else{
                (contEd.parentNode).childNodes[m].style.display  = "block";
            }
            
        }
    }
    contEd.parentNode.removeChild(contEd);
 }
}
//---------------------Boton Eliminar------------------
function BEliminar(contPregunta) {
    var eliminar=document.createElement("icon");
    eliminar.className="BotonBorrar";
    contPregunta.appendChild(eliminar);
    eliminar.onclick=function(){
        Swal.fire({
            title: '¿Seguro que quiere eliminar la pregunta?',
            text: "No podrá recuperar la pregunta",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                db.collection("Examen1").doc(contPregunta.id).delete();
                setTimeout(() => { window.location.reload(); }, 2000);
            }
          })
        
    }

}
//------------------mostrar imagen--------------------
function mostrar3(a) {
    
    var file = a.target.files[0];
    var reader = new FileReader();
    var imgcont = a.path[1].childNodes[2].firstChild;
    if(imgcont==null){
        imgcont =a.path[1].childNodes[2];
    }
    
    var contImg = a.path[1].childNodes[2];
    //console.log(imgcont);
    reader.onload = function (a) {
        var aux = imgcont;
        
        aux.setAttribute('src', a.target.result);
        aux.setAttribute('width', '85%');
        aux.setAttribute('heigth', 'auto');
        btnCancelarImg(contImg);
    }
    reader.readAsDataURL(file);
}
//-------------boton cancelar imagen----------------------
function btnCancelarImg(conte) {
    var cancelar = document.createElement("icon");
    // cancelar.innerHTML = "Cancelar";
    cancelar.className = "BotonCancelar";
    if(conte.childNodes.length==1){
        conte.appendChild(cancelar);
    }
    cancelar.onclick = function () {
        Swal.fire({
            title: '¿Seguro que quiere borrar la imagen?',
            text: "No se podrá recuperar la imagen",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                conte.parentNode.childNodes[1].value = "";
                var nimg = document.createElement("img");
                conte.insertBefore(nimg, conte.firstChild);
                conte.removeChild(conte.childNodes[1]);
                conte.removeChild(cancelar);
            }
          });
        
    }
}
//-------------------boton Cancelar-----------------------
function btnCancelar(contenedor) {
    var cancelar = document.createElement("icon");

    // cancelar.innerHTML = "Cancelar";
    cancelar.className = "BotonCancelar";
    contenedor.appendChild(cancelar);
    cancelar.onclick = function () {
        Swal.fire({
            title: '¿Seguro que quiere cancelar la pregunta?',
            text: "No podrá recuperar la pregunta",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                (contenedor.parentNode).removeChild(contenedor);
            }
          })
        
    }
}

function controlF() {
    var confirm = true;
    var mensaje="";
    if (examen.childNodes.length > 3 && examen.childNodes[examen.childNodes.length - 2].className == "Pregunta") {
        var preguntConfirm = examen.childNodes[examen.childNodes.length - 2];
        //-------------------------verificacion pregunta------------------------------
        var booltxt = false;
        var texto = preguntConfirm.firstChild.value;
        if (texto != "") {
            var separado = texto.split('\n');
            var parrafoaux = "";
            for (var i = 0; i < separado.length; i++) {
                var y = separado[i];
                // console.log(y);
                if (/\w/.test(y)) {
                    booltxt = true;
                }

            }
        }
        //-------------------------varificacion pregunta img-----------------------------
        var file = preguntConfirm.childNodes[1].files[0];
        if (!file) {
            if (booltxt == false) {
                mensaje+="* Debe añadir una imagen o descripción para la pregunta<br>";
                confirm = false;
            }
        } else {
            var formato = (file.type).split("/");
            if (formato[1] == "jpg" || formato[1] == "png" || formato[1] == "gif" || formato[1] == "jpeg") {

            } else {
                mensaje+="* Formato de imagen no aceptado<br>";
                confirm = false;
            }
        }
        //----------------verificar respuestas----------------------------
        var respt = preguntConfirm.childNodes[4].value;
        console.log("********************");
        console.log( preguntConfirm.childNodes[4].value);
        
    console.log(".-. a ver que paso entra a verificar respuestas");
        respt = respt.split("\n");
        var contRes = 0;
        for (var a = 0; a < respt.length - 1; a++) {
            for (var j = a + 1; j < respt.length; j++) {
                //  console.log(respt[a]);
                //  console.log(respt[j]);
                if (/\w/.test(respt[a]) && /\w/.test(respt[j])) {
                    if (respt[a] == respt[j]) {
                        mensaje+="* No puede haber 2 respuestas repetidas<br>";
                        confirm = false;
                    }
                }

            }
        }
        var vacio = "";
        for (var m = 0; m < respt.length; m++) {
            var x = respt[m];
            //console.log(x);
            if (/\w/.test(x)) {
                console.log(".-. a ver que paso aqui no debe estar aqui si esta vacio");
                contRes++;
                vacio = vacio + y;
            }
        }
        if (vacio == "") {
            mensaje+="* No puede dejar el espacio de respuestas vacío<br>";
            confirm = false;
        }
        if (contRes < 2 && contRes > 0) {
            mensaje+="* Debe tener un mínimo de 2 respuestas<br>";
            confirm = false;
        }
        if (contRes > 12) {
            mensaje+="* Debe tener un máximo de 12 respuestas<br>";
            confirm = false;
        }
        //----------------------verificar respuesta correcta------------------
        var resC = preguntConfirm.childNodes[5].value;
        resC = resC.split("\n");
        var vacio2 = "";
        var contRC = 0;

        //----------------------verificar que este dentro de las respuestas-------------------
        for (var k = 0; k < resC.length; k++) {
            var y = resC[k];
            // console.log(y);

            if (/\w/.test(y)) {
                contRC++;
                vacio2 = vacio2 + y;
                var conf = false;
                for (var l = 0; l < respt.length; l++) {
                    if (y == respt[l]) {
                        conf = true;
                    }
                }
                if (!conf) {
                    mensaje+="* La respuesta correcta \"" + y + "\" no se encuentra dentro del conjunto de respuestas<br>";
                    confirm = false;
                }
            }
        }
        if (preguntConfirm.childNodes[3].value == "Solución única") {
            if (contRC > 1) {
                confirm = false;
                mensaje+="* La respuesta es de tipo solución única, no puede agregar más de una respuesta correcta<br>";
            }
        } else {
            if (contRC <= 1) {
                confirm = false;
                mensaje+="* La respuesta es de tipo selección múltiple, debe agregar más de una respuesta correcta<br>";
            } else {
                //--------------verificar repetidos-----------------------------------
                for (var f = 0; f < resC.length - 1; f++) {
                    for (var g = f + 1; g < resC.length; g++) {
                        //  console.log(respt[a]);
                        //  console.log(respt[j]);
                        if (/\w/.test(respt[f]) && /\w/.test(respt[g])) {
                            if (resC[f] == resC[g]) {
                                mensaje+="* No puede haber 2 respuestas correctas repetidas<br>";
                                confirm = false;
                            }
                        }

                    }
                }
            }
        }
        if (vacio2 == "") {
            mensaje+="* No puede dejar el espacio de respuesta correcta vacío<br>";
            confirm = false;
        }
        if (confirm) {
            preguntConfirm.childNodes[0].disabled = true;
            preguntConfirm.childNodes[1].disabled = true;

            preguntConfirm.childNodes[3].disabled = true;
            preguntConfirm.childNodes[4].disabled = true;
            preguntConfirm.childNodes[5].disabled = true;
            btnEditarCont(preguntConfirm);
        }
    }
    if(!confirm){
        mensaje+="¡No puede agregar otra pregunta, porque tiene errores en la última pregunta añadida!";
        MostrarMensaje(mensaje);
    }
    return confirm;
}
function btnEditarCont(conte) {
    var editar = document.createElement("icon");
    editar.className = "BotonEditar";
    conte.appendChild(editar);

    editar.onclick = function () {
        conte.childNodes[0].disabled = false;
        conte.childNodes[1].disabled = false;
        conte.childNodes[3].disabled = false;
        conte.childNodes[4].disabled = false;
        conte.childNodes[5].disabled = false;
        conte.childNodes[6].style.display = "none";
        conte.childNodes[7].style.display = "none";
        desHabilitarResto(conte.parentNode, conte);
        btnHabilitar(conte.parentNode, conte);
        var conteClon=conte.cloneNode(true);
        console.log("++++++++++++");
        console.log(conteClon.firstChild.value);
        console.log(conte.firstChild.value);
        btnCancelarE(conte.parentNode, conte,conteClon);
    }
}
function btnCancelarE(contExamen, ant,antclon) {
    var cancelar = document.createElement("icon");
    cancelar.className = "BotonCancelar";
    console.log("-------------------");

    ant.appendChild(cancelar);
    cancelar.onclick = function () {
        Swal.fire({
            title: '¿Está seguro de cancelar la edición?',
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                contExamen.firstChild.disabled = false;
            var contExP = contExamen.getElementsByClassName("Pregunta");
            console.log(contExP);
            for (var i = 0; i < contExP.length; i++) {
                var pregExamen = contExP[i];
                console.log(pregExamen);
                if (i < contExP.length - 1) {
                    pregExamen.childNodes[0].disabled = true;
                    pregExamen.childNodes[1].disabled = true;
                    pregExamen.childNodes[3].disabled = true;
                    pregExamen.childNodes[4].disabled = true;
                    pregExamen.childNodes[5].disabled = true;
                    pregExamen.childNodes[6].style.display = "inline";
                    pregExamen.childNodes[7].style.display = "inline";
                    if (ant == pregExamen) {

                        ant.removeChild(ant.childNodes[ant.childNodes.length - 2]);
                        ant.removeChild(ant.lastChild);
                        ant.firstChild.value=antclon.firstChild.value;
                        ant.childNodes[3].value=antclon.childNodes[3].value;
                        ant.childNodes[4].value=antclon.childNodes[4].value;
                        ant.childNodes[5].value=antclon.childNodes[5].value;
                    }

                } else {

                    pregExamen.childNodes[0].disabled = false;
                    pregExamen.childNodes[1].disabled = false;
                    pregExamen.childNodes[3].disabled = false;
                    pregExamen.childNodes[4].disabled = false;
                    pregExamen.childNodes[5].disabled = false;
                    pregExamen.childNodes[6].style.display = "inline";
                }

            }
            }
          })
        
    }
}
function btnHabilitar(contExamen, conte) {
    var btnAceptarE = document.createElement("icon");
    btnAceptarE.className = "BotonAceptar";
    conte.appendChild(btnAceptarE);
    btnAceptarE.onclick = function () {
        if (controlEdicion(conte)) {
            Swal.fire({
                title: '¿Está seguro de guardar los cambios?',
                
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    contExamen.firstChild.disabled = false;
                    var contExP = contExamen.getElementsByClassName("Pregunta");
                    console.log(contExP);
                    for (var i = 0; i < contExP.length; i++) {
                        var pregExamen = contExP[i];
                        console.log(pregExamen);
                        if (i < contExP.length - 1) {
                            pregExamen.childNodes[0].disabled = true;
                            pregExamen.childNodes[1].disabled = true;
                            pregExamen.childNodes[3].disabled = true;
                            pregExamen.childNodes[4].disabled = true;
                            pregExamen.childNodes[5].disabled = true;
                            pregExamen.childNodes[6].style.display = "inline";
                            pregExamen.childNodes[7].style.display = "inline";
                            if (conte == pregExamen) {
                                conte.removeChild(btnAceptarE);
                                conte.removeChild(conte.lastChild);
                            }
    
                        } else {
    
                            pregExamen.childNodes[0].disabled = false;
                            pregExamen.childNodes[1].disabled = false;
                            pregExamen.childNodes[3].disabled = false;
                            pregExamen.childNodes[4].disabled = false;
                            pregExamen.childNodes[5].disabled = false;
                            pregExamen.childNodes[6].style.display = "inline";
                        }
    
                    }
                }
              })
            
        }
    }
}

function controlEdicion2(conte) {
   // console.log("+++++++++++");
   // console.log(conte);
   // console.log("++++++++++++++");
    var mensaje="";
    var confirm = true;

    var preguntConfirm = conte;
    //-------------------------verificacion pregunta------------------------------
    var booltxt = false;
    var texto = preguntConfirm.firstChild.value;
    if (texto != "") {
        var separado = texto.split('\n');
        var parrafoaux = "";
        for (var i = 0; i < separado.length; i++) {
            var y = separado[i];
            // console.log(y);
            if (/\w/.test(y)) {
                booltxt = true;
                console.log("palabras");
            }

        }
    }
    //-------------------------varificacion pregunta img-----------------------------
    var file = preguntConfirm.childNodes[1].files[0];
    if (!file) {
        console.log("Editar-sin archivo!!!!!!!!!!!!");
        console.log(preguntConfirm.childNodes[2].src);
        if (booltxt == false && preguntConfirm.childNodes[2].src=="") {
            console.log("Editar-sin archivo-entra al error---------------");
            mensaje+="* Debe añadir una imagen o descripción para la pregunta<br>";
            confirm = false;
        }
    } else {
        var formato = (file.type).split("/");
        if (formato[1] == "jpg" || formato[1] == "png" || formato[1] == "gif" || formato[1] == "jpeg") {

        } else {
            mensaje+="* Formato de imagen no aceptado<br>";
            confirm = false;
        }
    }
    //----------------verificar respuestas----------------------------
    var respt = preguntConfirm.childNodes[5].value;

    respt = respt.split("\n");
    var contRes = 0;
    for (var a = 0; a < respt.length - 1; a++) {
        for (var j = a + 1; j < respt.length; j++) {
            //  console.log(respt[a]);
            //  console.log(respt[j]);
            if (/\w/.test(respt[a]) && /\w/.test(respt[j])) {
                if (respt[a] == respt[j]) {
                    mensaje+="* No puede haber 2 respuestas repetidas<br>";
                    confirm = false;
                }
            }

        }
    }
    var vacio = "";
    for (var m = 0; m < respt.length; m++) {
        var x = respt[m];
        //console.log(x);
        if (/\w/.test(x)) {
            contRes++;
            vacio = vacio + y;
        }
    }
    if (vacio == "") {
        mensaje+="* No puede dejar el espacio de respuestas vacío<br>";
        confirm = false;
    }
    if (contRes < 2 && contRes > 0) {
        mensaje+="* Debe tener un mínimo de 2 respuestas<br>";
        confirm = false;
    }
    if (contRes > 12) {
        mensaje+="* Debe tener un máximo de 12 respuestas<br>";
        confirm = false;
    }
    //----------------------verificar respuesta correcta------------------
    var resC = preguntConfirm.childNodes[6].value;
    resC = resC.split("\n");
    var vacio2 = "";
    var contRC = 0;

    //----------------------verificar que este dentro de las respuestas-------------------
    for (var k = 0; k < resC.length; k++) {
        var y = resC[k];
        // console.log(y);

        if (/\w/.test(y)) {
            contRC++;
            vacio2 = vacio2 + y;
            var conf = false;
            for (var l = 0; l < respt.length; l++) {
                if (y == respt[l]) {
                    conf = true;
                }
            }
            if (!conf) {
                mensaje+="* La respuesta correcta \"" + y + "\" no se encuentra dentro del conjunto de respuestas<br>";
                confirm = false;
            }
        }
    }
    if (preguntConfirm.childNodes[4].value == "Solución única") {
        if (contRC > 1) {
            confirm = false;
            mensaje+="* La respuesta es de tipo solución única, no puede agregar más de una respuesta correcta<br>";
        }
    } else {
        if (contRC <= 1) {
            confirm = false;
            mensaje+="* La respuesta es de tipo selección múltiple, debe agregar más de una respuesta correcta<br>";
        } else {
            //--------------verificar repetidos-----------------------------------
            for (var f = 0; f < resC.length - 1; f++) {
                for (var g = f + 1; g < resC.length; g++) {
                    //  console.log(respt[a]);
                    //  console.log(respt[j]);
                    if (/\w/.test(respt[f]) && /\w/.test(respt[g])) {
                        if (resC[f] == resC[g]) {
                            mensaje+="* No puede haber 2 respuestas correctas repetidas<br>";
                            confirm = false;
                        }
                    }

                }
            }
        }
    }
    if (vacio2 == "") {
        mensaje+="* No puede dejar el espacio de respuesta correcta vacío<br>";
        confirm = false;
    }
    if(!confirm){
        mensaje+="No se puede aceptar la edición";
        MostrarMensaje(mensaje);
    }



    return confirm;
}

function controlEdicion(conte) {
    
    var confirm = true;
    var mensaje="";
    var preguntConfirm = conte;
    //-------------------------verificacion pregunta------------------------------
    var booltxt = false;
    var texto = preguntConfirm.firstChild.value;
    if (texto != "") {
        var separado = texto.split('\n');
        var parrafoaux = "";
        for (var i = 0; i < separado.length; i++) {
            var y = separado[i];
            // console.log(y);
            if (/\w/.test(y)) {
                booltxt = true;
            }

        }
    }
    //-------------------------varificacion pregunta img-----------------------------
    var file = preguntConfirm.childNodes[1].files[0];
    if (!file) {
        
        if (booltxt == false) {
            mensaje+="* Debe añadir una imagen o descripción para la pregunta<br>";
            confirm = false;
        }
    } else {
        var formato = (file.type).split("/");
        if (formato[1] == "jpg" || formato[1] == "png" || formato[1] == "gif" || formato[1] == "jpeg") {

        } else {
            mensaje+="* Formato de imagen no aceptado<br>";
            confirm = false;
        }
    }
    //----------------verificar respuestas----------------------------
    var respt = preguntConfirm.childNodes[4].value;

    respt = respt.split("\n");
    var contRes = 0;
    for (var a = 0; a < respt.length - 1; a++) {
        for (var j = a + 1; j < respt.length; j++) {
            //  console.log(respt[a]);
            //  console.log(respt[j]);
            if (/\w/.test(respt[a]) && /\w/.test(respt[j])) {
                if (respt[a] == respt[j]) {
                    mensaje+="* No puede haber 2 respuestas repetidas<br>";
                    confirm = false;
                }
            }

        }
    }
    var vacio = "";
    for (var m = 0; m < respt.length; m++) {
        var x = respt[m];
        //console.log(x);
        if (/\w/.test(x)) {
            contRes++;
            vacio = vacio + y;
        }
    }
    if (vacio == "") {
        mensaje+="* No puede dejar el espacio de respuestas vacío<br>";
        confirm = false;
    }
    if (contRes < 2 && contRes > 0) {
        mensaje+="* Debe tener un mínimo de 2 respuestas<br>";
        confirm = false;
    }
    if (contRes > 12) {
        mensaje+="* Debe tener un máximo de 12 respuestas<br>";
        confirm = false;
    }
    //----------------------verificar respuesta correcta------------------
    var resC = preguntConfirm.childNodes[5].value;
    resC = resC.split("\n");
    var vacio2 = "";
    var contRC = 0;

    //----------------------verificar que este dentro de las respuestas-------------------
    for (var k = 0; k < resC.length; k++) {
        var y = resC[k];
        // console.log(y);

        if (/\w/.test(y)) {
            contRC++;
            vacio2 = vacio2 + y;
            var conf = false;
            for (var l = 0; l < respt.length; l++) {
                if (y == respt[l]) {
                    conf = true;
                }
            }
            if (!conf) {
                mensaje+="* La respuesta correcta \"" + y + "\" no se encuentra dentro del conjunto de respuestas<br>";
                confirm = false;
            }
        }
    }
    if (preguntConfirm.childNodes[3].value == "Solución única") {
        if (contRC > 1) {
            confirm = false;
            mensaje+="* La respuesta es de tipo solución única, no puede agregar más de una respuesta correcta<br>";
        }
    } else {
        if (contRC <= 1) {
            confirm = false;
            mensaje+="* La respuesta es de tipo selección múltiple, debe agregar más de una respuesta correcta<br>";
        } else {
            //--------------verificar repetidos-----------------------------------
            for (var f = 0; f < resC.length - 1; f++) {
                for (var g = f + 1; g < resC.length; g++) {
                    //  console.log(respt[a]);
                    //  console.log(respt[j]);
                    if (/\w/.test(respt[f]) && /\w/.test(respt[g])) {
                        if (resC[f] == resC[g]) {
                            mensaje+="* No puede haber 2 respuestas correctas repetidas<br>";
                            confirm = false;
                        }
                    }

                }
            }
        }
    }
    if (vacio2 == "") {
        mensaje+="* No puede dejar el espacio de respuesta correcta vacío<br>";
        confirm = false;
    }

    if(!confirm){
        mensaje+="No se puede guardar la edición";
        MostrarMensaje(mensaje);
    }

    return confirm;
}
function desHabilitarResto(contExamen, conte) {
    contExamen.firstChild.disabled = true;
    var contExP = contExamen.getElementsByClassName("Pregunta");
    console.log(contExP);
    for (var i = 0; i < contExP.length; i++) {
        var pregExamen = contExP[i];
        console.log(pregExamen);
        if (pregExamen != conte && i < contExP.length - 1) {
            pregExamen.childNodes[0].disabled = true;
            pregExamen.childNodes[1].disabled = true;
            pregExamen.childNodes[3].disabled = true;
            pregExamen.childNodes[4].disabled = true;
            pregExamen.childNodes[5].disabled = true;
            pregExamen.childNodes[6].style.display = "none";
            pregExamen.childNodes[7].style.display = "none";
        }
        if (i == contExP.length - 1) {
            pregExamen.childNodes[0].disabled = true;
            pregExamen.childNodes[1].disabled = true;
            pregExamen.childNodes[3].disabled = true;
            pregExamen.childNodes[4].disabled = true;
            pregExamen.childNodes[5].disabled = true;
            pregExamen.childNodes[6].style.display = "none";
        }

    }
}
function vacio1(texto){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
        
      });
}
function MostrarMensaje(texto){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        html: texto,
        
      });
}
function calificar(calif,icono){
    Swal.fire({
        icon: icono,
        
        html: "Su calificación es:<br>"+calif+"<br>Actualice la pagina cuando termine de revisar sus resultados",
        
      });
}
