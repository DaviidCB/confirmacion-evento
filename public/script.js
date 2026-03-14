window.onload = function(){

/* =========================
FORMULARIO
========================= */

const form = document.getElementById("form");

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const data = {
nombre: document.getElementById("nombre").value,
telefono: document.getElementById("telefono").value,
correo: document.getElementById("correo").value,
asistencia: document.getElementById("asistencia").value
};

try{

const respuesta = await fetch("/confirmar",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

if(respuesta.ok){

alert("✅ Confirmación enviada correctamente");

form.reset();

}else{

alert("⚠️ Error al enviar la confirmación");

}

}catch(error){

console.error(error);

alert("❌ No se pudo conectar con el servidor");

}

});

}


const grupo1 = [
"images/foto1.png",
"images/foto2.png",
"images/foto3.png",
"images/foto4.png",
"images/foto5.png",
"images/foto6.png",
"images/foto7.png"
];

const grupo2 = [
"images/foto4.png",
"images/foto7.png",
"images/foto1.png",
"images/foto6.png",
"images/foto2.png",
"images/foto5.png",
"images/foto3.png"
];

let indice = 0;

function rotarImagenes(){

indice = (indice + 1) % grupo1.length;

const imgIzq = document.getElementById("imgIzquierda");
const imgDer = document.getElementById("imgDerecha");

if(imgIzq && imgDer){

imgIzq.src = grupo1[indice];
imgDer.src = grupo2[indice];

}

}

setInterval(rotarImagenes,4000);

};