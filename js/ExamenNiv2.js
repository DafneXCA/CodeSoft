var examen = document.createElement("div");
examen.id = "Examen";
var Preguntas = [];
var cont = document.getElementById("cont");
//var storageRef = storage.ref();
var BAceptar = document.createElement("button");
BAceptar.innerHTML = "Aceptar";
var Titulo = document.createElement("h2");
Titulo.innerHTML = "EXAMEN";

examen.appendChild(BAceptar);
examen.appendChild(Titulo);
var num = 0;
if (localStorage.getItem("Rol") == "Estudiante") {
    BAceptar.innerHTML = "Enviar";
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
            
        }else{

           alert("No hay preguntas para calificar");
        }
        
    }
}else{
    BAceptar.onclick = function () {
        var PreguntasOb = examen.getElementsByClassName("Pregunta");
        //console.log(PreguntasOb);
        if (PreguntasOb.length > 0) {
    
            if (controlF()) {
                for (var i = 0; i < PreguntasOb.length; i++) {
                    ObtenerPregunta(PreguntasOb[i]);
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
                setTimeout(() => { window.location.reload(); }, 2000);//Necesario para que la base guarde los cambios
    
            } else {
                alert("Revise la última pregunta antes de guardar");
            }
    
            //calificar
        var nota=(100/PregC.length)*calificacion;
        localStorage.setItem("Nota2", nota);
        localStorage.setItem("Nivel2","SI");
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
            Nota1: localStorage.getItem("Nota2"),
            Nota2: nota,
            Nota3: localStorage.getItem("Nota3")
            
            }
        })
        setTimeout(()=>{window.location.reload();},2000); 
        
        } else {
            alert("No hay nada que guardar");
        }
    }
}



//-----------------------Obtener Pregunta-------------------------
function ObtenerPregunta(pregunta) {

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
        parrafoaux = parrafoaux + "<*>";
        GuardarPreguntan(pregunta, parrafoaux);
    } else {
        var storageRef = storage.ref('/ExamenNiv2/' + file.name + Math.random());
        var uploadTask = storageRef.put(file);
        var urlImg;

        uploadTask.on('state_changed', function (snapshot) { }, function (error) {
            console.log(error);
        }, function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                urlImg = url;
                console.log(url);
                parrafoaux = parrafoaux + "<*>" + urlImg;
                GuardarPreguntan(pregunta, parrafoaux);

                console.log(parrafoaux);

            });

        });
    }

    return parrafoaux;
}
function GuardarPreguntan(preguntan, pregCom) {
    let Pregunta = pregCom;
    var res = ObtenerRespuestas(preguntan);
    let Respuestas = res;
    let Tipo = preguntan.childNodes[3].value;
    var resC = ObtenerResC(preguntan);
    let RespuestaC = resC;
    const pregunta = { Pregunta, Respuestas, Tipo, RespuestaC }
    console.log(pregunta);
    GuardarPregunta(pregunta);
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
    db.collection("Examen2").add({
        pregunta
    });
}
/*---------------Leer------------------------------*/
db.collection("Examen2").get().then(function (BaseExamen1) {
    BaseExamen1.forEach(function (doc) {
        Preguntas.push({
            Descripcion: doc.data().pregunta,
            ID: doc.id
        });
    });
    console.log(Preguntas);
    if(localStorage.getItem("Nivel2")=="NO"){
        CargarPreguntas();
    cont.appendChild(examen);
    }else{
        var mensaje= document.createElement("div");
        mensaje.innerHTML="Usted ya rindio el examen del Nivel 2";
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
                imagen.addEventListener('change', mostrar, 'false');
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
                respuestas.setAttribute('placeholder', "Respuestas (Separadar por saltos de línea)");
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
                alert("No puede agregar otra pregunta, porque tiene errores en la última pregunta añadida");
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
                res.name = "rspt";

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
                alert("No hay imagenes que eliminar");
            }
        }
        img.addEventListener('change', mostrar, 'false');

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
        var storageRef = storage.ref('/ExamenNiv2/' + file.name + Math.random());
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
   
    
    
    
    
    db.collection("Examen2").doc(id).update({
        pregunta: { Pregunta: pregCom, Respuestas: res, Tipo: preguntan.childNodes[4].value, RespuestaC : resC }
    })
    setTimeout(() => { window.location.reload(); }, 2000);//Necesario para que la base guarde los cambios
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
        //confirm
        db.collection("Examen2").doc(contPregunta.id).delete();
    }

}
//------------------mostrar imagen--------------------
function mostrar(a) {

    var file = a.target.files[0];
    var reader = new FileReader();
    var imgcont = a.path[1].childNodes[2].firstChild;
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
    conte.appendChild(cancelar);
    cancelar.onclick = function () {
        conte.parentNode.childNodes[1].value = "";
        var nimg = document.createElement("img");
        conte.insertBefore(nimg, conte.firstChild);
        conte.removeChild(conte.childNodes[1]);
        conte.removeChild(cancelar);
    }
}
//-------------------boton Cancelar-----------------------
function btnCancelar(contenedor) {
    var cancelar = document.createElement("icon");

    // cancelar.innerHTML = "Cancelar";
    cancelar.className = "BotonCancelar";
    contenedor.appendChild(cancelar);
    cancelar.onclick = function () {
        (contenedor.parentNode).removeChild(contenedor);
    }
}

function controlF() {
    var confirm = true;
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
                alert("Debe añadir una imagen o descripción para la pregunta");
                confirm = false;
            }
        } else {
            var formato = (file.type).split("/");
            if (formato[1] == "jpg" || formato[1] == "png" || formato[1] == "gif" || formato[1] == "jpeg") {

            } else {
                alert("Formato de imagen no aceptado");
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
                        alert("No puede haber 2 respuestas repetidas");
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
            alert("No puede dejar el espacio de respuestas vacío");
        }
        if (contRes < 2 && contRes > 0) {
            alert("Debe tener un mínimo de 2 respuestas");
            confirm = false;
        }
        if (contRes > 12) {
            alert("Debe tener un máximo de 12 respuestas");
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
                    alert("La respuesta correcta \"" + y + "\" no se encuentra dentro del conjunto de respuestas");
                    confirm = false;
                }
            }
        }
        if (preguntConfirm.childNodes[3].value == "Solución única") {
            if (contRC > 1) {
                confirm = false;
                alert("La respuesta es de tipo solución única, no puede agregar mas de una respuesta correcta");
            }
        } else {
            if (contRC <= 1) {
                confirm = false;
                alert("La respuesta es de tipo selección múltiple, debe agregar mas de una respuesta correcta");
            } else {
                //--------------verificar repetidos-----------------------------------
                for (var f = 0; f < resC.length - 1; f++) {
                    for (var g = f + 1; g < resC.length; g++) {
                        //  console.log(respt[a]);
                        //  console.log(respt[j]);
                        if (/\w/.test(respt[f]) && /\w/.test(respt[g])) {
                            if (resC[f] == resC[g]) {
                                alert("No puede haber 2 respuestas correctas repetidas");
                                confirm = false;
                            }
                        }

                    }
                }
            }
        }
        if (vacio2 == "") {
            alert("No puede dejar el espacio de respuesta correcta vacío");
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
        btnCancelarE(conte.parentNode, conte);
    }
}
function btnCancelarE(contExamen, ant) {
    var cancelar = document.createElement("icon");
    cancelar.className = "BotonCancelar";
    console.log("-------------------");

    ant.appendChild(cancelar);
    cancelar.onclick = function () {
        var conf = confirm("¿Está seguro de cancelar la edición?");
        if (conf) {
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
    }
}
function btnHabilitar(contExamen, conte) {
    var btnAceptarE = document.createElement("icon");
    btnAceptarE.className = "BotonAceptar";
    conte.appendChild(btnAceptarE);
    btnAceptarE.onclick = function () {
        if (controlEdicion(conte)) {
            var confirmar = confirm("¿Está seguro de guardar los cambios?");
            if (confirmar) {
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
        }
    }
}

function controlEdicion2(conte) {
    console.log("+++++++++++");
    console.log(conte);
    console.log("++++++++++++++");
    
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
            }

        }
    }
    //-------------------------varificacion pregunta img-----------------------------
    var file = preguntConfirm.childNodes[1].files[0];
    if (!file) {
        
        if (booltxt == false && preguntConfirm.childNodes[1].scr=="") {
            alert("Debe añadir una imagen o descripción para la pregunta");
            confirm = false;
        }
    } else {
        var formato = (file.type).split("/");
        if (formato[1] == "jpg" || formato[1] == "png" || formato[1] == "gif" || formato[1] == "jpeg") {

        } else {
            alert("Formato de imagen no aceptado");
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
                    alert("No puede haber 2 respuestas repetidas");
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
        alert("No puede dejar el espacio de respuestas vacío");
    }
    if (contRes < 2 && contRes > 0) {
        alert("Debe tener un mínimo de 2 respuestas");
        confirm = false;
    }
    if (contRes > 12) {
        alert("Debe tener un máximo de 12 respuestas");
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
                alert("La respuesta correcta \"" + y + "\" no se encuentra dentro del conjunto de respuestas");
                confirm = false;
            }
        }
    }
    if (preguntConfirm.childNodes[4].value == "Solución única") {
        if (contRC > 1) {
            confirm = false;
            alert("La respuesta es de tipo solución única, no puede agregar mas de una respuesta correcta");
        }
    } else {
        if (contRC <= 1) {
            confirm = false;
            alert("La respuesta es de tipo selección múltiple, debe agregar mas de una respuesta correcta");
        } else {
            //--------------verificar repetidos-----------------------------------
            for (var f = 0; f < resC.length - 1; f++) {
                for (var g = f + 1; g < resC.length; g++) {
                    //  console.log(respt[a]);
                    //  console.log(respt[j]);
                    if (/\w/.test(respt[f]) && /\w/.test(respt[g])) {
                        if (resC[f] == resC[g]) {
                            alert("No puede haber 2 respuestas correctas repetidas");
                            confirm = false;
                        }
                    }

                }
            }
        }
    }
    if (vacio2 == "") {
        alert("No puede dejar el espacio de respuesta correcta vacío");
    }



    return confirm;
}

function controlEdicion(conte) {
    
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
            }

        }
    }
    //-------------------------varificacion pregunta img-----------------------------
    var file = preguntConfirm.childNodes[1].files[0];
    if (!file) {
        
        if (booltxt == false) {
            alert("Debe añadir una imagen o descripción para la pregunta");
            confirm = false;
        }
    } else {
        var formato = (file.type).split("/");
        if (formato[1] == "jpg" || formato[1] == "png" || formato[1] == "gif" || formato[1] == "jpeg") {

        } else {
            alert("Formato de imagen no aceptado");
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
                    alert("No puede haber 2 respuestas repetidas");
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
        alert("No puede dejar el espacio de respuestas vacío");
    }
    if (contRes < 2 && contRes > 0) {
        alert("Debe tener un mínimo de 2 respuestas");
        confirm = false;
    }
    if (contRes > 12) {
        alert("Debe tener un máximo de 12 respuestas");
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
                alert("La respuesta correcta \"" + y + "\" no se encuentra dentro del conjunto de respuestas");
                confirm = false;
            }
        }
    }
    if (preguntConfirm.childNodes[3].value == "Solución única") {
        if (contRC > 1) {
            confirm = false;
            alert("La respuesta es de tipo solución única, no puede agregar mas de una respuesta correcta");
        }
    } else {
        if (contRC <= 1) {
            confirm = false;
            alert("La respuesta es de tipo selección múltiple, debe agregar mas de una respuesta correcta");
        } else {
            //--------------verificar repetidos-----------------------------------
            for (var f = 0; f < resC.length - 1; f++) {
                for (var g = f + 1; g < resC.length; g++) {
                    //  console.log(respt[a]);
                    //  console.log(respt[j]);
                    if (/\w/.test(respt[f]) && /\w/.test(respt[g])) {
                        if (resC[f] == resC[g]) {
                            alert("No puede haber 2 respuestas correctas repetidas");
                            confirm = false;
                        }
                    }

                }
            }
        }
    }
    if (vacio2 == "") {
        alert("No puede dejar el espacio de respuesta correcta vacío");
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
