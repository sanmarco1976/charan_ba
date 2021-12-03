const card = document.getElementById('principio');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragmento = document.createDocumentFragment();
let carrito = {};

//estos if hacen que al estar en la ventana de cada categoria APIURL tenga la direecion de los productos de esa categoria
let APIURL;
if (window.location.pathname == '/html/electronica.html') {
    APIURL = '../js/productosElectro.json';
}
if (window.location.pathname == '/html/iluminacion.html') {
    APIURL = '../js/productosILU.json';
}
if (window.location.pathname == '/html/hogarydeco.html') {
    APIURL = '../js/productosHYD.json';
}
if (window.location.pathname == '/html/seguridad.html') {
    APIURL = '../js/productosSEG.json';
}
if (window.location.pathname == '/html/belleza.html') {
    APIURL = '../js/productosBelle.json';
}
if (window.location.pathname == '/html/accesorios.html') {
    APIURL = '../js/productosAcc.json';
}
if (window.location.pathname == '/html/audio.html') {
    APIURL = '../js/productosAU.json';
}
//tomamos los datos de nuestra URL
$.get(APIURL, function(respuesta, estado) {
    // console.log(respuesta);
    // console.log(estado);
    //creamos en todos los html las cards coon los productos
    respuesta.forEach((productos) => {
        $('#principio').append(
            `
            <section id="secCate">
                <div class="divCate1 item">
                    <img src="${productos.img}" class="divCate1__imgCate">
                    <p class="divCate1__pCate">${productos.nombre}</p>
                    <ul>
                        <li class="descripcion">$${productos.precio}</li>
                        <li class="descripcion--mayor">consultar precio por mayor.</li>
                        <button type="button" class="btn btn-outline-warning add" data-id ="${productos.id}">Agregar Al Carrito</button>
                    </ul>
                </div>
            </section>
            `
        );
    });
});
// esta funcion revisa el localStorage y si el array carrito tiene algo lo agrega
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('miCarrito')) {
        carrito = JSON.parse(localStorage.getItem('miCarrito'));
        sumarAlCarrito();
    }
});


card.addEventListener('click', e => {
    agregarAlCarrito(e);
});
items.addEventListener('click', e => {
    accionBotones(e);
});
// agrega los datos que obtenemos en la funcion infoCarrito al carrito
const agregarAlCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('add'))
    if (e.target.classList.contains('add')) {
        infoCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
    $(".add").on('click', function() {
        Swal.fire(
            'Listo!',
            'El Producto Se Añadio Correctamente!',
            'success'
        )
    });
}

// creamos una const de productos para llenar el id, nombre, precio, la imagen y la cantidad
const infoCarrito = objecto => {
    const producto = {
        id: objecto.querySelector('.add').dataset.id,
        nombre: objecto.querySelector('.divCate1__pCate').textContent,
        precio: Number(objecto.querySelector('.descripcion').textContent.replace('$', '')),
        img: objecto.querySelector('.divCate1__imgCate').src,
        cant: 1,
    }

    //sumamos cantidad si agrega el mismo producto 
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cant = carrito[producto.id].cant + 1;
    }
    carrito[producto.id] = {...producto }
    sumarAlCarrito();
}

// crea la tabla del carrito y pinta los datos
const sumarAlCarrito = () => {
    items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cant;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cant * producto.precio;
        const copiar = templateCarrito.cloneNode(true);
        fragmento.appendChild(copiar);
    })
    items.appendChild(fragmento);
    precioTotal();
    localStorage.setItem('miCarrito', JSON.stringify(carrito));
}

//calcula el precio total 
const precioTotal = () => {
    footer.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío </th>
        `;
        return
    }

    //creamos un acumulador y a este le sumamos la cantidad para que nos de la cantidad de productos que selecciona
    const cantidadTotal = Object.values(carrito).reduce((acumulador, { cant }) => acumulador + cant, 0);
    //creamos un acumulador y a este le sumamos la cantidad multiplicado al precio  para que nos de el precio total de los productos que selecciona
    const precioTotal = Object.values(carrito).reduce((acumulador, { cant, precio }) => acumulador + (cant * precio), 0);
    templateFooter.querySelectorAll('td')[0].textContent = cantidadTotal;
    templateFooter.querySelector('span').textContent = precioTotal;
    //creamos una copia 
    const copiar = templateFooter.cloneNode(true);
    fragmento.appendChild(copiar);
    footer.appendChild(fragmento);
    const vaciarCarrito = document.getElementById('vaciar-carrito');
    //funcion para vaciar el carrito, si hace click se eliminan todos los datos del array
    vaciarCarrito.addEventListener('click', () => {
        carrito = {};
        sumarAlCarrito();
    })
}
const accionBotones = e => {
    //si pulsa el boton + se suma uno a la cantidad
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id];
        producto.cant = carrito[e.target.dataset.id].cant + 1;
        carrito[e.target.dataset.id] = {...producto };
        sumarAlCarrito();
    }
    //si pulsa el boton - se resta uno a la cantidad
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id];
        producto.cant = carrito[e.target.dataset.id].cant - 1;
        if (producto.cant === 0) {
            delete carrito[e.target.dataset.id];
        }
        sumarAlCarrito();
    }
    e.stopPropagation();
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