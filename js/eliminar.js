let eliminar = document.querySelector("#eliminar");
let tabla = document.querySelector("#tablaEliminar");
let contenedorMensaje = document.querySelector("#mensajeEliminar");

let encabezadoCreado = false;
let encabezado;

eliminar.addEventListener("click", () => {
    tabla.innerHTML = ``;
    contenedorMensaje.innerHTML = ``;
    let comprobanteRequerido = document.querySelector("#NumFacAEliminar").value;
    let comprobantes = JSON.parse(localStorage.getItem("comprobantes"));
    for (const comprobante of comprobantes) {
        if(comprobanteRequerido == comprobante.numComprobante){
            crearTabla(comprobante);
            let contenedor = document.querySelector("#contenedorConfirm");
            contenedor.innerHTML = `
            <hr>
            <label>¿Desea eliminar este comprobante?</label><br/><br/>
            <button id="confirma" type="button">Confirmar</button>
            `;
            let confirma = document.querySelector("#confirma");
            confirma.addEventListener("click", () => {
                
            let comprobanteAEliminar = document.querySelector("#NumFacAEliminar").value;
            let comprobantes = JSON.parse(localStorage.getItem("comprobantes"));
        
            for (const comprobante of comprobantes) {
                if(comprobanteAEliminar == comprobante.numComprobante){
                    let indice = comprobantes.indexOf(comprobante);
                    comprobantes.splice(indice ,1);
                    localStorage.setItem("comprobantes", JSON.stringify(comprobantes));
                    contenedor.innerHTML = `<p class="mensajeOkey">Comprobante eliminado</p>`
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Comprobante eliminado',
                        showConfirmButton: false,
                        timer: 1750
                      })
                }
            }

            
            })
        }else if(comprobanteRequerido == ""){
            contenedorMensaje.innerHTML = `<p class="mensajeError">Debe ingresar un comprobante</p>`;
        }
    }

    encabezadoCreado = false;
    
    
});

const buscarPorComprobante = () => {
    let comprobanteRequerido = document.querySelector("#NumFacAEliminar").value;
    let comprobantes = JSON.parse(localStorage.getItem("comprobantes"));
    for (const comprobante of comprobantes) {
        if(comprobanteRequerido == comprobante.numComprobante){
            crearTabla(comprobante);
        }else if(comprobanteRequerido == ""){
            contenedorMensaje.innerHTML = `<p class="mensajeError">Debe ingresar un comprobante</p>`;
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

