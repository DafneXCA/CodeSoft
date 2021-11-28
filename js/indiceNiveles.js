var contTemas=document.getElementsByClassName("TemaC");
var indtemas=document.getElementsByClassName("Tema");
setTimeout(()=>{añadirSubtemas()},3000);
console.log(":VVVVVVVVV");
function añadirSubtemas(){
    console.log(":VVVVVVVVV");
    for(var i=0; i<contTemas.length;i++){
        var divInd=document.createElement("div");
        var contSubtemas=contTemas[i].getElementsByClassName("Subtitulo");
        console.log(":VVVVVVVVV");
        //console.log(contTemas[i]);
        //console.log(":VVVVVVVVV");
        for(var j=0;j<contSubtemas.length;j++){
           console.log("xxxxxxx");
            var subt= document.createElement("h5");
            subt.innerHTML="<a href='#"+contSubtemas[j].id+"'>"+contSubtemas[j].firstChild.innerHTML+"</a>";
            subt.title=contSubtemas[j].firstChild.innerHTML;
            subt.style.display="block";
            divInd.appendChild(subt);  
        }
        indtemas[i].appendChild(divInd);
    }
}
document.onclick=function(a){
    var f=a.target;
    for(var i=0;i<indtemas.length;i++){
        if(f==indtemas[i].firstChild){
           if(indtemas[i].lastChild.style.display=="block"){
              
                   indtemas[i].lastChild.style.display="none";
               
           }else{
              
            indtemas[i].lastChild.style.display="block";
               
           }
        }
    }
   
   }