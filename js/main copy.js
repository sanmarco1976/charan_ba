let textarea = document.getElementById('mensaje');
let carrito = {};
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('miCarrito')) {
        carrito = JSON.parse(localStorage.getItem('miCarrito'));
        agregarAlCarrito();
    }
});

const agregarAlCarrito = () => {
    let texto = [];
    Object.values(carrito).forEach((producto) => {
        texto.push(`${producto.nombre} -- ${producto.cant} -- ${producto.precio}`);
        textarea.innerHTML = texto.join('\n');

    });
};