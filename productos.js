const d = document;
const $imgCarrito = d.getElementById("img-carrito");
// Evento click en la imagen del carrito para ir al carrito
$imgCarrito.addEventListener("click", () => {
    window.location.href = "carrito.html";
});


// Ejemplo de cómo guardar un producto en localStorage al hacer clic en "Agregar al carrito"
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