let textarea = document.getElementById('mensaje');

const fragmento = document.createDocumentFragment();
let carrito = {};
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('miCarrito')) {
        carrito = JSON.parse(localStorage.getItem('miCarrito'));
        agregarAlCarrito();
    }
});

const agregarAlCarrito = () => {
    Object.values(carrito).forEach(producto => {
        document.querySelector('textarea').textContent = `${producto.nombre} -- ${producto.cant} -- ${producto.precio}`;
        const copiar = document.querySelector('textarea').cloneNode(true);
        fragmento.appendChild(copiar);

    });
    textarea.appendChild(fragmento);
    console.log(Object.values(carrito))
}