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

const openCardBtn = document.getElementById("openCardBtn");
const card = document.getElementById("card");

openCardBtn.addEventListener("click", () => {
    card.style.display = "block";
    document.addEventListener("click", closeCardOutside);
});

function closeCardOutside(event) {
    if (!card.contains(event.target) && event.target !== openCardBtn) {
        card.style.display = "none";
        document.removeEventListener("click", closeCardOutside);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay un correo electrónico en localStorage
    let userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        // Actualizar el texto del span con el correo almacenado
        let spanUsuarioCorreo = document.querySelector("#usuarioCorreo");
        if (spanUsuarioCorreo) {
            spanUsuarioCorreo.textContent = userEmail;
        }
    }
});


