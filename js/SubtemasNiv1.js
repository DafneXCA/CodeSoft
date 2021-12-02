var L_subtemas = [];
var cont = document.getElementById("cont");
var storageRef = storage.ref();


/*--------------------Guardar Subtemas--------------------------- */
function GuardarSubtema(subtema) {
    db.collection("Subtemas1").add({
        subtema
    });
}
/*---------------Leer------------------------------*/
db.collection("Subtemas1").get().then(function (BaseSubtemas) {
    BaseSubtemas.forEach(function (doc) {
        L_subtemas.push({
            Descripcion: doc.data().subtema,
            ID: doc.id
        });
    });
    //Ordenar
    for (var i = 1; i < L_subtemas.length; i++) {
        for (var j = 0; j < L_subtemas.length - i; j++) {
            if (Number(L_subtemas[j].Descripcion.ID) > Number(L_subtemas[j + 1].Descripcion.ID)) {
                var aux = L_subtemas[j];
                L_subtemas[j] = L_subtemas[j + 1]
                L_subtemas[j + 1] = aux;
            }
        }
    } CargarSubtemas();
}
);
/*-------------------------------Cargar Subtemas------------------------------*/
function CargarSubtemas() {
    if (L_subtemas.length == 0) {
       setTimeout(() => { }, 2000);
        //crearSubtema();

    } else {

        setTimeout(() => { }, 1);
        var divTemas = cont.getElementsByClassName("TemaC");
        for(var q=0;q<L_subtemas.length;q++){
            var valido=0;
            for(var x=0;x<divTemas.length;x++){
                if(L_subtemas[q].Descripcion.Tema==divTemas[x].id){
                    valido=1;
                }
            }
            if(valido==0){
              //  console.log(L_subtemas[q]);
               db.collection("Subtemas1").doc(L_subtemas[q].ID).delete();
            }
        }
        for (var i = 0; i < L_subtemas.length; i++) {
            //setTimeout(() => { }, 3000);
            // console.log(L_subtemas.length);
            // console.log(L_subtemas);
            var ID = document.createElement("label");
            ID.innerHTML = L_subtemas[i].Descripcion.ID;
            ID.style.display="none";
            
            var ContTemas;
            /*----------------------------SUBTITULO---------------------*/
            if (L_subtemas[i].Descripcion.Tipo == "Subtitulo") {
                //console.log("Subtemas");


                for (var t = 0; t < divTemas.length; t++) {
                    
                    if (divTemas[t].id == L_subtemas[i].Descripcion.Tema) {
                        ContTemas = divTemas[t];
                        
                         var divSubtitulo = document.createElement("div");

                        ContTemas.appendChild(divSubtitulo);

                         var divContSub = document.createElement("div");
                         divContSub.className = "Subtitulo";
                        divContSub.id = L_subtemas[i].ID;
                        var subtitulo = document.createElement("h3");

                         subtitulo.innerHTML = L_subtemas[i].Descripcion.Contenido;
                         divContSub.appendChild(subtitulo);
                        divSubtitulo.appendChild(divContSub);
                         //Recuperar ID

                         divContSub.appendChild(ID);
                         // cont.appendChild(divContSub);
                         if(localStorage.getItem("Rol")!="Estudiante"){
                            Editar(divContSub);
                            Borrar(divContSub);
                            Añadir(divContSub);
                         }
                       
                    }
                }

            }
            /*----------------------------LISTA-----------------------------*/
            if (L_subtemas[i].Descripcion.Tipo == "Lista") {
                //console.log("Listas");
                var lista = document.createElement("div");
                lista.id = L_subtemas[i].ID;

                var divTemas = cont.getElementsByClassName("TemaC");
                //console.log("-------DIVTEMAS--------");
                //console.log(L_subtemas[i].Descripcion.Tema);
                // console.log("---------------");
                var contTemas;

                for (var f = 0; f < divTemas.length; f++) {
                    if (divTemas[f].id == L_subtemas[i].Descripcion.Tema) {
                        contTemas = divTemas[f];
                        //console.log("---------------");
                        //  console.log(contTemas);
                        // console.log("---------------");
                    }
                }

                var aux = L_subtemas[i].Descripcion.Contenido.split('<br>');
                var ul = document.createElement('ul');
                ul.id = "lista";
                lista.appendChild(ul);
                for (var l = 0; l < aux.length; l++) {
                    var li = document.createElement('li');
                    li.innerText = aux[l];
                    ul.appendChild(li);
                }

                lista.appendChild(ID);
                var auxP = contTemas.getElementsByTagName("div");
                var pos = 0;
                var ultimoSubtema = [];
                for (var k = 0; k < auxP.length; k++) {
                    if (auxP[k].id == 0) {
                        ultimoSubtema[pos] = auxP[k];
                        pos++;
                    }
                }
                if (pos == 0) {

                    contTemas.appendChild(lista);

                } else {

                    var ultimo = ultimoSubtema[ultimoSubtema.length - 1];
                    ultimo.appendChild(lista);

                }

                // var ultimoSubtema = cont.lastChild;
                // ultimoSubtema.appendChild(lista);
                if(localStorage.getItem("Rol")!="Estudiante"){
                Editar(lista);
                Borrar(lista);
                Añadir(lista);
                }

            }
            /*----------------------------PARRAFO---------------------------*/
            if (L_subtemas[i].Descripcion.Tipo == "Parrafo") {
                // console.log("parrafos");
                var parrafo = document.createElement("div");
                parrafo.id = L_subtemas[i].ID;
                var parrafoText = document.createElement("p");

                var divTemas = cont.getElementsByClassName("TemaC");
                //console.log("-------DIVTEMAS--------");
                //console.log(L_subtemas[i].Descripcion.Tema);
                // console.log("---------------");
                var contTemasP;

                for (var g = 0; g < divTemas.length; g++) {
                    if (divTemas[g].id == L_subtemas[i].Descripcion.Tema) {
                        contTemasP = divTemas[g];
                        //console.log("---------------");
                        //  console.log(contTemas);
                        // console.log("---------------");
                    }
                }


                parrafoText.innerHTML = L_subtemas[i].Descripcion.Contenido;
                parrafo.appendChild(parrafoText);
                var auxP = contTemasP.getElementsByTagName("div");
                var pos2 = 0;
                var ultimoSubtema = [];
                for (var j = 0; j < auxP.length; j++) {
                    if (auxP[j].id == 0) {
                        ultimoSubtema[pos2] = auxP[j];
                        pos2++;
                    }
                }
                //console.log(ultimoSubtema);
                //--------antes---------------
                //var ultimo=ultimoSubtema[ultimoSubtema.length-1];
                //ultimo.appendChild(parrafo);
                //---------------despues..................
                if (pos2 == 0) {

                    contTemasP.appendChild(parrafo);

                } else {

                    var ultimo = ultimoSubtema[ultimoSubtema.length - 1];
                    ultimo.appendChild(parrafo);

                }

                parrafo.appendChild(ID);
                if(localStorage.getItem("Rol")!="Estudiante"){
                Editar(parrafo);
                Borrar(parrafo);
                Añadir(parrafo);
                }
                // setTimeout(() => { }, 500000);
            }

            /*----------------------------IMAGEN----------------------------*/

            if (L_subtemas[i].Descripcion.Tipo == "Imagen") {
                // console.log("parrafos");
                var divImagen = document.createElement("div");
                divImagen.id = L_subtemas[i].ID;
                var imgn = document.createElement('img');
                imgn.src = L_subtemas[i].Descripcion.Contenido;

                var divTemas = cont.getElementsByClassName("TemaC");

                divImagen.appendChild(imgn);

                var contTemasP;

                for (var g = 0; g < divTemas.length; g++) {
                    if (divTemas[g].id == L_subtemas[i].Descripcion.Tema) {
                        contTemasP = divTemas[g];
                        //console.log("---------------");
                        //  console.log(contTemas);
                        // console.log("---------------");
                    }
                }

                var auxP = contTemasP.getElementsByTagName("div");
                var pos2 = 0;
                var ultimoSubtema = [];
                for (var j = 0; j < auxP.length; j++) {
                    if (auxP[j].id == 0) {
                        ultimoSubtema[pos2] = auxP[j];
                        pos2++;
                    }
                }
                //console.log(ultimoSubtema);
                //--------antes---------------
                //var ultimo=ultimoSubtema[ultimoSubtema.length-1];
                //ultimo.appendChild(parrafo);
                //---------------despues..................
                if (pos2 == 0) {

                    contTemasP.appendChild(divImagen);

                } else {

                    var ultimo = ultimoSubtema[ultimoSubtema.length - 1];
                    ultimo.appendChild(divImagen);

                }

                divImagen.appendChild(ID);
                if(localStorage.getItem("Rol")!="Estudiante"){
                EditarI(divImagen);
                Borrar(divImagen);
                Añadir(divImagen);
                }
                // setTimeout(() => { }, 500000);
            }


        }
        //  setTimeout(() => { }, 500000);
    }

}
/*---------------EDITAR IMAGEN---------------------*/
function EditarI(contenedor) {

    var btnEImg = document.createElement("icon");
    // btnEImg.innerHTML = "Editar";
    btnEImg.className="BotonEditar";
    contenedor.appendChild(btnEImg);
    btnEImg.onclick = function () {
        var divEdicion = document.createElement("div");
        var imgEd = document.createElement('input');
        imgEd.id = "imagen";
        imgEd.setAttribute('accept', 'image/*');
        imgEd.type = "file";
        var nimg = document.createElement("img");
        nimg.id = "PrevImg";
        contenedor.childNodes[2].style.display = "none";
        contenedor.childNodes[3].style.display = "none";
        contenedor.childNodes[4].style.display = "none";
        imgEd.addEventListener('change', mostrar, 'false');
        divEdicion.appendChild(imgEd);
        divEdicion.appendChild(nimg);
        contenedor.appendChild(divEdicion);

        AceptarEI(divEdicion);
        CancelarEI(divEdicion);
    }
}
//----------------------------------Boton cancelar edicion de imagen-------------------------------
function CancelarEI(contenedor) {
    var btnCEI = document.createElement('icon');
    // btnCEI.innerHTML = "Cancelar";
    btnCEI.className="BotonCancelar";
    contenedor.appendChild(btnCEI);
    btnCEI.onclick = function () {
        contenedor.parentNode.childNodes[2].style.display = "inline";
        contenedor.parentNode.childNodes[3].style.display = "inline";
        contenedor.parentNode.childNodes[4].style.display = "inline";
        contenedor.parentNode.removeChild(contenedor);

    }

}
//----------------------------------Boton aceptar edicion de imagen-------------------------------
function AceptarEI(contenedor) {
    var btnAEI = document.createElement("icon");
    // btnAEI.innerHTML = "Aceptar";
    btnAEI.className="BotonAceptar";
    contenedor.appendChild(btnAEI);
    //console.log(contenedor);
    btnAEI.onclick = function () {
        var file = contenedor.childNodes[0].files[0];
        if (!file) {
            
            vacio("No se seleccionó ninguna imagen");
        } else {
            console.log(file);
            var formato=(file.type).split("/");

            if(formato[1]=="jpg" ||formato[1]=="png" || formato[1]=="gif" || formato[1]=="jpeg"){

                contenedor.parentNode.childNodes[2].style.display = "inline";
                contenedor.parentNode.childNodes[3].style.display = "inline";
                contenedor.parentNode.childNodes[4].style.display = "inline";
                var storageRef = storage.ref('/Nivel1/' + file.name + Math.random());
                var uploadTask = storageRef.put(file);
                var urlImg;
    
                uploadTask.on('state_changed', function (snapshot) { }, function (error) {
                    console.log(error);
                }, function () {
    
                    uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                        urlImg = url;
                        console.log(urlImg);
                        contenedor.parentNode.childNodes[0].src = urlImg;
                        contenedor.parentNode.removeChild(contenedor);
                    });
    
                });
             }else{
                 vacio("Formato de imagen no aceptado");
             }
            
        }


    }

}





//var spaceRefFull = storage.GetReferenceFromUrl(contenedor.childNodes[0].src);
// var desertRef = storageRef.child('images/desert.jpg');

// Delete the file
//desertRef.delete().then(function() {
// File deleted successfully
//}).catch(function(error) {
// Uh-oh, an error occurred!
//});


/*---------------------------------Boton Editar----------------------------*/
function Editar(subtema) {
    var Editar = document.createElement("icon");
    // Editar.innerHTML = "Editar";
    Editar.className="BotonEditar";
    subtema.appendChild(Editar);
    Editar.onclick = function () {
        var divEdicion = document.createElement("div");
        //Editar subtitulo
        if (subtema.childNodes[0].tagName == "H3") {

            divEdicion.id = "Subtitulo";
            var aux = document.createElement("input");
            aux.setAttribute("placeholder", "Subtítulo");
            aux.value = subtema.childNodes[0].innerText;
            divEdicion.appendChild(aux);

            for (var i = 0; i < subtema.childNodes.length; i++) {
                subtema.childNodes[i].style.display = 'none';
            }

            subtema.appendChild(divEdicion);
            AceptarE(divEdicion);
            CancelarE(divEdicion);

        }
        //Editar Parrafo
        if (subtema.childNodes[0].tagName == "P") {

            divEdicion.id = "Parrafo";

            var camp = document.createElement("textarea");
            camp.setAttribute('placeholder', 'Añadir contenido');
            var contaux = subtema.childNodes[0].innerHTML;
            contaux = contaux.split('<br>');
            var aux = "";

            for (var i = 0; i < contaux.length; i++) {
                aux = aux + contaux[i] + '\n';
            }

            camp.innerHTML = aux;
            divEdicion.appendChild(camp);

            for (var k = 0; k < subtema.childNodes.length; k++) {
                subtema.childNodes[k].style.display = 'none';
            }

            subtema.appendChild(divEdicion);
            AceptarE(divEdicion);
            CancelarE(divEdicion);

        }
        if (subtema.childNodes[0].tagName == "UL") {

            divEdicion.id = "Lista";

            var lis = subtema.childNodes[0].childNodes;
            var campo = document.createElement("textarea");
            campo.setAttribute('placeholder', 'Añadir contenido');

            var cadena = "";
            for (var j = 0; j < lis.length; j++) {

                cadena = cadena + lis[j].innerHTML + '\n';

            }
            campo.innerHTML = cadena;

            divEdicion.appendChild(campo);

            for (var a = 0; a < subtema.childNodes.length; a++) {
                subtema.childNodes[a].style.display = 'none';
            }

            subtema.appendChild(divEdicion);
            AceptarE(divEdicion);
            CancelarE(divEdicion);

        }
    }
}

/*---------------------------Botones Editar--------------------*/
/*---------------------------Boton Aceptar (Editar)--------------------*/
function AceptarE(contenedor) {
    var btnAE = document.createElement("icon");
    // btnAE.innerHTML = "Aceptar";
    btnAE.className="BotonAceptar";
    contenedor.appendChild(btnAE);
    btnAE.onclick = function () {
        if (/\w/.test(contenedor.childNodes[0].value)) {
            if (contenedor.id == "Subtitulo") {
                db.collection("Subtemas1").doc(contenedor.parentNode.id).update({
                    subtema: { Contenido: contenedor.childNodes[0].value, Tema: contenedor.parentNode.parentNode.parentNode.id, ID: Number(contenedor.parentNode.childNodes[1].innerHTML), Tipo: contenedor.id }
                })
            } else {

                var ctn = contenedor.childNodes[0].value;
                ctn = ctn.split('\n');
                var cadena = [];
                var pos = 0;
                for (var i = 0; i < ctn.length; i++) {
                    
                        if (/\w/.test(ctn[i])){
                            cadena[pos] = ctn[i];
                            pos++;
                        }
                    
                }

                var cadof = "";

                for (var j = 0; j < cadena.length; j++) {
                    if (j == cadena.length - 1) {
                        cadof = cadof + cadena[j];
                    } else {
                        cadof = cadof + cadena[j] + "<br>";
                    }
                }
                console.log(cadof);
                if (cadof!= "") {
                db.collection("Subtemas1").doc(contenedor.parentNode.id).update({
                    subtema: { Contenido: cadof, Tema: contenedor.parentNode.parentNode.parentNode.id, ID: Number(contenedor.parentNode.childNodes[1].innerHTML), Tipo: contenedor.id }
                })
                }else{
                    vacio("No se puede actualizar, solo contiene espacios en blanco");
                   
                }
            }

            setTimeout(() => { window.location.reload(); }, 2000);
           
        } else {
            vacio("No se puede actualizar, solo contiene espacios en blanco");
        }
    }
}

/*---------------------------Botone Cancelar (Editar)--------------------*/

function CancelarE(contenedor) {
    var btnCE = document.createElement("icon");
    // btnCE.innerHTML = "Cancelar";
    btnCE.className="BotonCancelar";
    contenedor.appendChild(btnCE);
    btnCE.onclick = function () {

        for (var i = 0; i < (contenedor.parentNode).childNodes.length; i++) {
            if (i == 0) {
                (contenedor.parentNode).childNodes[i].style.display = 'block';
            } else {
                if(i == 1){
                    (contenedor.parentNode).childNodes[i].style.display = 'none';
                }else{
                    (contenedor.parentNode).childNodes[i].style.display = 'inline';
                }
            }

        }
        contenedor.parentNode.removeChild(contenedor);
    }
}

/*--------------------------------------------------------------*/

//Variable de control
var control = 0;
/*---------------------------------Boton Añadir------------------------------*/
function Añadir(subtema) {
    var añadir = document.createElement('icon');
    // añadir.innerHTML = "Añadir";
    añadir.className="BotonAñadir";
    subtema.appendChild(añadir);
    añadir.onclick = function () {

        //LISTA

        var lista = document.createElement("button");
        lista.innerHTML = "Lista";
        lista.className="BotonLista";
        lista.onclick = function () {
            subtema.lastChild.style.display = "none";
            var divAux = document.createElement('div');
            divAux.id = "Lista";
            var textAr = document.createElement("textarea");
            textAr.id = "lista";
            textAr.style.display = 'block';
            textAr.setAttribute('placeholder', 'Añadir lista');
            divAux.appendChild(textAr);
            subtema.appendChild(divAux);
            aceptar(divAux);
            cancelar(divAux);
        }

        //PARRAFO

        var parrafo = document.createElement("button");
        parrafo.innerHTML = "Párrafo";
        parrafo.className="BotonParrafo";
        parrafo.onclick = function () {
            subtema.lastChild.style.display = "none";
            var divAux = document.createElement('div');
            divAux.id = "Parrafo";
            var textAr = document.createElement("textarea");
            //textAr.id = "parrafo";
            textAr.style.display = 'block';
            divAux.appendChild(textAr);
            textAr.setAttribute('placeholder', 'Añadir Contenido');
            subtema.appendChild(divAux);
            aceptar(divAux);
            cancelar(divAux);
        }

        //IMAGEN

        var imagen = document.createElement("button");
        imagen.innerHTML = "Imagen";
        imagen.className="BotonImagen";
        imagen.onclick = function () {
            subtema.lastChild.style.display = "none";
            var img = document.createElement("input");
            img.type = "file";
            img.setAttribute('accept', 'image/*');
            var divAux = document.createElement('div');
            divAux.id = "Imagen";
            var nimg = document.createElement("img");
            nimg.id = "PrevImg";

            divAux.appendChild(img);
            divAux.appendChild(nimg);
            subtema.appendChild(divAux);

            img.addEventListener('change', mostrar, 'false');

            aceptarI(divAux);
            cancelar(divAux);

        }

        //SUBTITULO

        var Subtitulo = document.createElement("button");
        Subtitulo.type = "text";
        Subtitulo.innerHTML = "Subtítulo";
        Subtitulo.className="BotonSubtitulo";
        Subtitulo.onclick = function () {
            subtema.lastChild.style.display = "none";
            crearSub(subtema);
        }

        //DESPLEGAR 

        añadir.onclick = function () {

            if (control == 0) {
                añadir.appendChild(lista);
                añadir.appendChild(imagen);
                añadir.appendChild(parrafo);
                añadir.appendChild(Subtitulo);
                control = 1;
            } else {
                añadir.removeChild(lista);
                añadir.removeChild(imagen);
                añadir.removeChild(parrafo);
                añadir.removeChild(Subtitulo);
                control = 0;
            }

        }
    }
}
//--------------------------------boton aceptar de imagen---------------------
function aceptarI(contenedor) {
    var acptImg = document.createElement("icon");
    // acptImg.innerHTML = "Aceptar";
    acptImg.className="BotonAceptar";
    contenedor.appendChild(acptImg);
    acptImg.onclick = function () {
        var file = contenedor.childNodes[0].files[0];
        
        if (!file) {
            vacio("No se seleccionó ninguna imagen");
        } else {
            var formato=(file.type).split("/");
            if(formato[1]=="jpg" ||formato[1]=="png" || formato[1]=="gif" || formato[1]=="jpeg"){

                var storageRef = storage.ref('/Nivel1/' + file.name + Math.random());
                var uploadTask = storageRef.put(file);
                var urlImg;

                uploadTask.on('state_changed', function (snapshot) { }, function (error) {
                console.log(error);
                }, function () {

                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                    urlImg = url;
                    console.log(urlImg);
                    cargarDatos(urlImg, contenedor);
                });

                });
            }else{
                vacio("Formato de imagen no aceptado");
            }
            
        }
    }

}
//-----------------------------------cargar imagen al firebase storage------------------------------
function cargarDatos(urlImg, contenedor) {
    console.log(urlImg);
    let ID = saberPosicion(contenedor);
    console.log(ID);
    let Tipo = "Imagen";
    let Contenido = urlImg;
    let Tema = contenedor.parentNode.parentNode.parentNode.id;
    const Subtema = { ID, Tipo, Contenido, Tema }
    GuardarSubtema(Subtema);

    contenedor.parentNode.removeChild(contenedor);

    setTimeout(() => { window.location.reload(); }, 2000);
}

//-----------------muestra la imagen (previsualizacion)-------------------------------
function mostrar(a) {

    var file = a.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function (a) {
        var aux = document.getElementById("PrevImg");
        aux.setAttribute('src', a.target.result);
        aux.setAttribute('width', '85%');
        aux.setAttribute('heigth', 'auto');

    }
    reader.readAsDataURL(file);
}

/*--------------------------------Boton borrar------------------------------*/
function Borrar(subtema) {
    var borrar = document.createElement('icon');
    // borrar.innerHTML = "Borrar";
    borrar.className="BotonBorrar";
    subtema.appendChild(borrar);
    borrar.onclick = function () {
        Swal.fire({
            title: '¿Seguro que quiere eliminar?',
            text: "No podrá recuperar el contenido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si,quiero eliminarlo',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                if (subtema.className == "Subtitulo") {
                    var contSubtema = subtema.parentNode.childNodes;
                    for (var i = 0; i < contSubtema.length; i++) {
                        db.collection("Subtemas1").doc(contSubtema[i].id).delete();
                    }
                } else {
                    db.collection("Subtemas1").doc(subtema.id).delete();
                }
                setTimeout(() => { window.location.reload(); }, 2000);
            }
          })
       
        
    }
}
/*-------------------------------Boton Cancelar---------------------------*/
function cancelar(subtema) {
    var cancelar = document.createElement("icon");
    // cancelar.innerHTML = "Cancelar";
    cancelar.className="BotonCancelar";
    subtema.appendChild(cancelar);
    cancelar.onclick = function () {
        (subtema.parentNode).childNodes[4].style.display = "inline";
        (subtema.parentNode).removeChild(subtema);
    }

}
/*-------------------------------Boton Aceptar----------------------------*/
function aceptar(subtema) {
    var aceptar = document.createElement("icon");
    // aceptar.innerHTML = "Aceptar";
    aceptar.className="BotonAceptar";
    subtema.appendChild(aceptar);
    aceptar.onclick = function () {
        console.log(y);


        if (subtema.id == "Subtitulo") {
            var x = subtema.firstChild.value;
            if (/\w/.test(x)) {
                let ID = saberPosicion(subtema);
                let Tipo = "Subtitulo";
                let Contenido = subtema.firstChild.value;
                let Tema = subtema.parentNode.parentNode.parentNode.id;
                const Subtema = { ID, Tipo, Contenido, Tema }
                GuardarSubtema(Subtema);

                subtema.parentNode.removeChild(subtema);

                setTimeout(() => { window.location.reload(); }, 2000);//Necesario para que la base guarde los cambios
            } else {
                vacio("No puede dejar este espacion en blanco");
            }
            //console.log(subtema.parentNode.parentNode.parentNode);
        }

            if (subtema.id == "Parrafo") {


                let ID = saberPosicion(subtema);
                let Tipo = "Parrafo";

                var texto = subtema.firstChild.value;
                
                if (texto != "") {
                   
                    var separado = texto.split('\n');
                    var parrafoaux = "";
                    for (var i = 0; i < separado.length; i++) {
                        var y=separado[i];
                        console.log(y);
                        if (/\w/.test(y)) {
                            if (i != separado.length - 1) {
                                parrafoaux = parrafoaux + separado[i] + "<br>";
                            } else {
                                parrafoaux = parrafoaux + separado[i];
                            }
                        }

                    }
                
                if(parrafoaux!=""){
                    let Contenido = parrafoaux;
                    console.log(subtema.parentNode.parentNode);
                    let Tema = subtema.parentNode.parentNode.parentNode.id;
                    const Subtema = { ID, Tipo, Contenido, Tema }
                   
    
                   GuardarSubtema(Subtema);
                    subtema.parentNode.removeChild(subtema);
                   setTimeout(() => { window.location.reload(); }, 2000);//Necesario para que la base guarde los cambios
                }else{
                    vacio("No puede dejar este espacion en blanco");
                }
            }else{
                vacio("No puede dejar este espacion en blanco");
            }
               
            }
            if (subtema.id == "Lista") {
                let ID = saberPosicion(subtema);
                let Tipo = "Lista";

                var texto = subtema.firstChild.value;
                if (texto != "") {
                    var separado = texto.split('\n');
                    var control = [];
                    var pos = 0;
                    for (var c = 0; c < separado.length; c++) {

                        if (/\w/.test(separado[c])) {
                            control[pos] = separado[c];
                            pos++;
                        }
                    }

                    var listaAux = "";



                    for (var i = 0; i < control.length; i++) {
                        if (i != control.length - 1) {
                            listaAux = listaAux + control[i] + "<br>";
                        } else {
                            listaAux = listaAux + control[i];
                        }
                    }
                
                if(listaAux!=""){
                    let Contenido = listaAux;
                let Tema = subtema.parentNode.parentNode.parentNode.id;
                //console.log("++++++++++++++++");
                // console.log(subtema.parentNode.parentNode.parentNode);
                // console.log("++++++++++++++++");
                const Subtema = { ID, Tipo, Contenido, Tema }

               GuardarSubtema(Subtema);
                subtema.parentNode.removeChild(subtema);
                setTimeout(() => { window.location.reload(); }, 2000);//Necesario para que la base guarde los cambios
                }else{
                    vacio("No puede dejar este espacion en blanco");
                }
            }else{
                vacio("No puede dejar este espacion en blanco");
            }
                
            }


     }
}

    function saberPosicion(subtema) {
        setTimeout(() => { }, 1);
        //console.log("xxxxxxxxxxxxxxxxxxxxx");
        //console.log(subtema.parentNode.parentNode.parentNode);
        //console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
        //console.log(subtema);
        var aux = 0;
        if (L_subtemas.length == 0) {
            console.log("primero");
            aux = 0;
        } else {
            var posTema = subtema.parentNode.parentNode.parentNode;
            var list = [];
            var pos = 0;
            var elm = posTema.getElementsByTagName("div");
            for (var i = 0; i < elm.length; i++) {
                if (elm[i].id != 0) {
                    list[pos] = elm[i];
                    pos++;
                }
            }
            //console.log(list);
            var aux = 0;
            for (var i = 0; i < list.length; i++) {
                if (subtema == list[i]) {
                    if (i == (list.length - 1)) {
                        aux = Number(list[i - 1].childNodes[1].innerHTML) + 1;
                        //console.log("ultimo");
                    } else {

                        // console.log("medio");
                        console.log("medio---------------------");
                        console.log(list[i + 1]);
                        console.log(list[i - 1]);
                        console.log("medio------------------");
                        aux = Number((Number(list[i - 1].childNodes[1].innerHTML) + Number(list[i + 1].childNodes[1].innerHTML)) / 2);
                        //console.log(aux);
                        console.log(Number(list[i - 1].childNodes[1].innerHTML) + Number(list[i + 1].childNodes[1].innerHTML));

                    }
                }
            }
        }
        return aux
    }
    /*------------------------------Crear Subtitulo--------------------------------*/
    function crearSub(divST) {

        var auxiliar = document.createElement("div");
        var titulo = document.createElement("input");
        auxiliar.id = "Subtitulo";
        titulo.setAttribute("placeholder", "Añadir subtitulo");
        auxiliar.appendChild(titulo);
        //cont.appendChild(auxiliar);
        divST.appendChild(auxiliar);
        aceptar(auxiliar);
        cancelar(auxiliar);
    }
    function vacio(texto){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: texto,
            
          });
    }
/*
function crearSubtema() {

    var auxiliar = document.createElement("div");

    var titulo = document.createElement("input");
    auxiliar.id = "Subtitulo";
    titulo.setAttribute("placeholder", "Añadir subtitulo");
    auxiliar.appendChild(titulo);
    cont.appendChild(auxiliar);
    // divST.insertAdjacentElement('afterend',auxiliar);
    aceptar(auxiliar);
}*/




