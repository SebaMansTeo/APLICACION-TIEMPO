const conteiner = document.querySelector(".conteiner");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    //VALIDAR
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;
    
    if(ciudad === "" || pais === ""){
        mostrarMsj("Ambos campos son obligatorios")
    };
    

    //CONSULTAR LA API
    consultarApi(ciudad, pais);
};

function mostrarMsj(mensaje){
    const alerta = document.querySelector(".alerta");
    if(!alerta){
        const alerta = document.createElement("div");
        alerta.classList.add("alerta");
        alerta.innerHTML = `ERROR <span>${mensaje}</span>`;
        conteiner.appendChild(alerta);
        //ELIMINA EL ALERTA
        setTimeout(() => {
            alerta.remove();
        }, 5000)
    }

    console.log(mensaje)
};

function consultarApi(ciudad, pais){
    const appId = "bf6a95d43eed47bcb4604c85f91d1ed2";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
    spinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHtml();

            if(datos.cod === "404"){
                mostrarMsj("Ciudad no encontrada")
                return;
            }
            mostrarClima(datos);
        })
    
};

function mostrarClima(datos){
    const{name, main: {temp, temp_max, temp_min} } = datos;
    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);
    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;

    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;

    const actualMax = document.createElement("p");
    actualMax.innerHTML = `MAX: ${max} &#8451;`;

    const actualMin = document.createElement("p");
    actualMin.innerHTML = `MIN: ${min} &#8451;`;

    const resultadoDiv = document.createElement("div");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(actualMax);
    resultadoDiv.appendChild(actualMin);
    resultado.appendChild(resultadoDiv);

    
};

function spinner(){
    limpiarHtml();
    const spin = document.createElement("div");
    spin.classList.add("spinner");
    spin.innerHTML = `
    
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  
    `;
    resultado.appendChild(spin);
}


const kelvinCentigrados = grados => parseInt(grados - 273.15);

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}