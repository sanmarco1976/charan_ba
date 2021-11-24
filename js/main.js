//todo esto es para electronica.html

for (const productos of nombreProductosElectronica) {
    $('#principio').append(
        `
        <section id="secCate">
            <div class="divCate1--divCate${productos.id} item">
                <img src="${productos.img}" class="divCate1__imgCate">
                <p class="divCate1__pCate">${productos.nombre}</p>
                <ul>
                    <li class="descripcion">$${productos.precio}</li>
                    <li class="descripcion--mayor">consultar precio por mayor.</li>
                    <button type="button" class="btn btn-outline-warning add">Agregar Al Carrito</button>
                </ul>
            </div>
        </section>
        `
    );
}
const APIURL = 'https://jsonplaceholder.typicode.com/users';
$.get(APIURL, function(respuesta, estado) {
    console.log(respuesta);
    console.log(estado);
    respuesta.forEach((el) => {
        $('.usuarios').append(`<li class ="usuariosLi "> Nombre: ${el.name} // Email: ${el.email} </li>`);
    });
});

let botonCarrito = document.getElementsByClassName("add");


//para recorrer todos los botones de 'agregar al carrito', ya que son un array
for (const boton of botonCarrito) {
    boton.addEventListener("click", agregarCarrito);
    const botonComprar = document.querySelector('.comprar');
    botonComprar.addEventListener('click', comprarClick);
    //agrega los items al carrito
    function agregarCarrito(e) {
        const botonCadaUno = e.target;
        const divCompleto = botonCadaUno.closest('.item');

        const divTitulo = divCompleto.querySelector('.divCate1__pCate').textContent;
        const divPrecio = divCompleto.querySelector('.descripcion').textContent;
        const divImg = divCompleto.querySelector('.divCate1__imgCate').src;
        divEnCarrito(divTitulo, divPrecio, divImg);


    }
    $(".add").on('click', function() {
        Swal.fire(
            'Listo!',
            'El Producto Se Añadio Correctamente!',
            'success'
        )
    });

    // crea la tabla  y agrega al carrito los elementos recibiendo como parametro las constantes de arriba (tirulo y precio)
    function divEnCarrito(divTitulo, divPrecio, divImg) {
        //antes de crear la tabla revisamos si ya esta el producto
        const titulosElementos = tablaJs.getElementsByClassName('tdTitulo');
        //este for recorre toda la tabla y se fija si esta
        for (let i = 0; i < titulosElementos.length; i++) {
            //si esta sumamos el valor del input
            if (titulosElementos[i].innerText === divTitulo) {
                let valorInput = titulosElementos[i].parentElement.querySelector('.tdCant-input');
                valorInput.value++;
                //el return es para que corte la funcion y no se agregue el producto
                mostrarPrecioTotal();
                return;
            }
        }
        //creamos la tabla
        let tablaBody = document.createElement("tbody");

        //crea la tabla con los elementos
        let fila = document.createElement("tr");
        fila.innerHTML = `
        <td class="tdImg"><img class="tImg" src=${divImg}></td>
        <td class="tdTitulo">${divTitulo}</td>
        <td class="tdPrecio">${divPrecio}</td>
        <td class="tCant"><input class="tdCant-input" type="number" value="1"></td>
        <td class="tdBorrar"><button type="button" class="btn-close" aria-label="Close"></button></td>`;
        tablaBody.appendChild(fila);
        document.getElementById("tablaJs").appendChild(tablaBody);
        tablaBody.querySelector('.btn-close').addEventListener('click', eliminarElementos);
        //otra forma de eliminar los productos
        // $(".btn-close").click((e) => {
        //     const botonCerrado = e.target;
        //     botonCerrado.closest('table').remove();
        //     mostrarPrecioTotal();
        // });
        //llamamos a la funcion para mostrar el precio
        mostrarPrecioTotal();
        tablaBody.querySelector('.tdCant-input').addEventListener('change', cambiarvalor);


    }

    //funcion   para mostrar el precio TOTAL
    function mostrarPrecioTotal() {
        //arranca en 0
        let total = 0;
        let totalCarrito = document.querySelector('.totalCarrito');

        const tablasCompleta = document.querySelectorAll('tbody');
        //esto hace que por cada tabla, agarre al precio, modifique el signo y lo sume
        tablasCompleta.forEach(tablaCompleta => {
            const precioTablaCompleta = tablaCompleta.querySelector('.tdPrecio');
            //modifica el $ por un string vacio
            const precioTabla = Number(precioTablaCompleta.textContent.replace('$', ''));
            const cantTabla = tablaCompleta.querySelector('.tdCant-input');
            //pide el valor del input (la cantidad)
            const valorCantTabla = Number(cantTabla.value);
            //sume el precio que ya teniamos con el precio del producto por la cantidad
            total = total + precioTabla * valorCantTabla;
        });
        totalCarrito.innerHTML = `$${total.toFixed(2)}`
    }
    //eliminar del carrito
    function eliminarElementos(e) {
        const botonCerrado = e.target;
        botonCerrado.closest('tbody').remove();
        mostrarPrecioTotal();
    }
    //esta funcion hace que cambie el valor del input, pero que no sea ni 0 ni menor a 0
    function cambiarvalor(e) {
        const input = e.target;
        if (input.value <= 0) {
            input.value = 1;
        }
        mostrarPrecioTotal();
    }
    //esta funcion hace que cuando clickeamos en comprar, se borre todo el carrito y sal
    function comprarClick() {
        tablaJs.innerHTML = '';
        mostrarPrecioTotal();
        Swal.fire(
            'Listo!',
            'Ya Se Registro Su Compra!',
            'success'
        );

    }
}

//si apretamos en ver carrito se cambia a ocultar carrito
$("#botonCarritoo").click(function() {

    if ($("#botonCarritoo").html() == "Ocultar Carrito") {
        $("#botonCarritoo").html("Ver Carrito");
    } else {
        $("#botonCarritoo").html("Ocultar Carrito");
    }

});
//animacion de scroll para 'ir arriba' del footer
$("#arriba").click(function() {
    $('html').animate({
        scrollDown: $("#principio").offset().down
    }, 2000);
});