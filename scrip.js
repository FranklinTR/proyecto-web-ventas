const d = document;
const $imgCarrito = d.getElementById("img-carrito");
// Evento click en la imagen del carrito para ir al carrito
$imgCarrito.addEventListener("click", () => {
    window.location.href = "carrito.html";
});

const productContent = document.querySelectorAll('.product-content'); 
const products = document.querySelectorAll('.product'); 
const productWidth = products[0].offsetWidth + 30; 

productContent.forEach((container) => {
    products.forEach((product) => {
        const clone = product.cloneNode(true);
        container.appendChild(clone);
    });
});

