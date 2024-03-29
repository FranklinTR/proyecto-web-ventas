const d = document;
const $imgCarrito = d.getElementById("img-carrito");
// Evento click en la imagen del carrito para ir al carrito
$imgCarrito.addEventListener("click", () => {
    window.location.href = "carrito.html";
});


// Función para verificar si un producto ya está en el carrito
function verificarProductoEnCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.some(item => item.id === id);
}

// Función para mostrar el enlace "Ir al carrito" y ocultar el botón "Agregar al carrito"
function mostrarEnlaceCarrito(btn, productoId) {
    const linkToCart = document.createElement('a');
    linkToCart.href = 'carrito.html';
    linkToCart.textContent = 'Ir al carrito';
    linkToCart.classList.add('link-carrito')
    linkToCart.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'carrito.html';
    });
    btn.style.display = 'none'; // Ocultar el botón "Agregar al carrito"
    btn.parentNode.appendChild(linkToCart);
}

document.querySelectorAll('.agregar-barrito').forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();

        const productoId = this.getAttribute('data-id');

        if (!verificarProductoEnCarrito(productoId)) {
            const producto = {
                id: productoId,
                title: this.parentNode.querySelector('h3').textContent,
                price: this.parentNode.querySelector('.precio').textContent,
                image: this.parentNode.parentNode.querySelector('img').src,
                quantity: 1
            };

            // Obtener el carrito del localStorage o inicializarlo como un array vacío
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            // Agregar el producto al carrito
            carrito.push(producto);
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Mostrar el enlace "Ir al carrito" y ocultar el botón "Agregar al carrito"
            mostrarEnlaceCarrito(this, productoId);
        }
    });
});

// Verificar al cargar la página si un producto está en el carrito y actualizar la interfaz correspondiente
document.addEventListener('DOMContentLoaded', () => {
    const enlacesCarrito = document.querySelectorAll('.agregar-barrito');
    enlacesCarrito.forEach(enlace => {
        const productoId = enlace.getAttribute('data-id');
        if (verificarProductoEnCarrito(productoId)) {
            mostrarEnlaceCarrito(enlace, productoId);
        }
    });
});



/*
// Ejemplo de cómo guardar un producto en localStorage al hacer clic en "Agregar al carrito"
// cambio del boton a ir al carrito
document.querySelectorAll('.agregar-barrito').forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        const producto = {
            id: this.getAttribute('data-id'),
            title: this.parentNode.querySelector('h3').textContent,
            price: this.parentNode.querySelector('.precio').textContent,
            image: this.parentNode.parentNode.querySelector('img').src
        };
  
        // Obtener el carrito del localStorage o inicializarlo como un array vacío
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // Agregar el producto al carrito
        carrito.push(producto);
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });
});
*/