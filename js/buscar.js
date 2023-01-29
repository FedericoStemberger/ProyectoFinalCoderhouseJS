let buscar = document.querySelector("#buscar");
let tabla = document.querySelector("#tabla");
let contenedorMensaje = document.querySelector("#mensajeBuscar");
let encabezadoCreado = false;
let encabezado;
let comprobantes = JSON.parse(localStorage.getItem("comprobantes"));


buscar.addEventListener("click", () => {
    tabla.innerHTML = ``;
    if(comprobantes==null || comprobantes == ""){
        contenedorMensaje.innerHTML = `
            <p class="mensajeError">No existe ningun comprobante actualmente</p>
        `;
    }else{
        buscarPorComprobante();
    }
    
});

const buscarPorComprobante = () => {
    let comprobanteRequerido = document.querySelector("#NumFacRequerida").value;
    let hayComprobante = false;
    for (const comprobante of comprobantes) {
        contenedorMensaje.innerHTML = ``;
        if(comprobanteRequerido == comprobante.numComprobante){
            
            crearTabla(comprobante);
            hayComprobante = true;
        }else if(((comprobantes.length == comprobantes.indexOf(comprobante) +1) && hayComprobante == false && comprobanteRequerido != "") || comprobantes.length == 0){
            contenedorMensaje.innerHTML = `
            <p class="mensajeError">No se ha encontrado el comprobante ${comprobanteRequerido}</p>
        `;

        }else if(comprobanteRequerido == ""){
            contenedorMensaje.innerHTML = `
            <p class="mensajeError">Debe ingresar un comprobante</p>
        `;
        }
    }

    encabezadoCreado = false;
}

const crearTabla = (comprobante) => {
    let fila = document.createElement("tr");
            if(encabezadoCreado == false){
                encabezado = document.createElement("tr");
                encabezado.innerHTML = `
                <th>Nombre</th>
                <th>Apellido</th>
                <th>N° Comprobante</th>
                <th>Periodo</th>
                <th>Vencimiento</th>
                `;
                tabla.append(encabezado);
                encabezadoCreado = true;
            }
            
            fila.innerHTML = `
            <td>${comprobante.nombre}</td>
            <td>${comprobante.apellido}</td>
            <td>${comprobante.numComprobante}</td>
            <td>${comprobante.periodo}</td>
            <td>${comprobante.vencimiento}</td>
            `;
            tabla.append(fila);
}