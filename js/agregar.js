// localStorage.clear()
let cargar = document.querySelector("#cargar");
let contenedorMensaje = document.querySelector("#mensajeAgregar");
let comprobantes = [];
comprobantes = JSON.parse(localStorage.getItem("comprobantes"));

class Comprobante{
    constructor(nombre,apellido,numComprobante, periodo, vencimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.numComprobante = numComprobante;
        this.periodo = periodo;
        this.vencimiento = vencimiento;
    }
}

async function FetchAPI(comprobante, numComprobante){
    const response = await fetch("../data/data.json");
    const data = await response.json();
    console.log(data);
    if(JSON.parse(localStorage.getItem("comprobantes")) == null){
        comprobantes = data;
        localStorage.setItem("comprobantes", JSON.stringify(comprobantes));
    }else{
        comprobantes = JSON.parse(localStorage.getItem("comprobantes"));
        
    }

    if(comprobantes.some((el)=>el.numComprobante == numComprobante)){
        Swal.fire(
            'Error',
            'El número de comprobante ya se encuentra cargado',
            'error'
          )
    }else{
        comprobantes.push(comprobante);
        localStorage.setItem("comprobantes", JSON.stringify(comprobantes));
        contenedorMensaje.innerHTML = `
                <p class="mensajeOkey">Comprobante agregado</p>
            `;
        
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Comprobante agregado',
                showConfirmButton: false,
                timer: 1750
              })
    }

}

cargar.addEventListener("click", () => {
    
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let numComprobante = document.querySelector("#numFactura").value;
    let periodo = document.querySelector("#periodo").value;
    let vencimiento = document.querySelector("#vencimiento").value;

    
    if(nombre == "" || apellido == "" || numComprobante == "" || vencimiento == ""){
        contenedorMensaje.innerHTML = `
        <p class="mensajeError">Debe llenar todos los campos</p>
        `;
    }else{
        const comprobante = new Comprobante(nombre, apellido, numComprobante, periodo, vencimiento);
        FetchAPI(comprobante, numComprobante);
    }
    
    
})