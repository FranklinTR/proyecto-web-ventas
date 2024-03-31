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

document.addEventListener("click", (e) => {
    console.log(e.target);

    if(e.target.matches(".product .detalle-producto")){
        const enlacesCarrito = document.querySelectorAll('.detalle-producto');
        const $modal = document.querySelector(".modal");
        const template = document.querySelector("#template-modal").content;
        const $fragmente = document.createDocumentFragment();
        $modal.classList.toggle("is-active");
        $modal.innerHTML = null;
        let id = e.target.getAttribute("data-id");
        console.log(id);

        let productos = JSON.parse(localStorage.getItem("carrito"));
        console.log(productos);

        const producto = productos.filter((el) => el.id == parseInt(id));

        template.querySelector("img").src = producto[0].image;
        template.querySelector(".modal-txt h3").textContent = producto[0].title;
        template.querySelector(".modal-txt #modal-descripcion").textContent = producto[0].description || "No hay descripción";
        template.querySelector(".modal-txt #modal-precio").textContent = producto[0].price;

       
    //Verificando para saber si el producto ya está en el carrito
            const productoId = producto[0].id;
            console.log(productoId);
            if (verificarProductoEnCarrito(id)) {
                console.log("El producto ya está en el carrito");
                template.querySelector(".link-carrito").classList.toggle("none");

                template.querySelector(".link-carrito").classList.toggle("is-active-btn");

            }
            else{
                console.log("El producto no está en el carrito");
                template.querySelector(".agregar-barrito").classList.toggle("none");
                template.querySelector(".agregar-barrito").classList.toggle("is-active-btn");
            }

            const $clone = d.importNode(template, true);

            $fragmente.appendChild($clone);
            $modal.appendChild($fragmente);
    
        /*
        let producto = JSON.parse(localStorage.getItem("productos"));
        console.log(producto);
        producto = producto.filter((el) => el.id == id);
        console.log(producto);
        const $modalContent = document.querySelector(".modal-content");
        $modalContent.querySelector("img").src = producto[0].image;
        $modalContent.querySelector(".modal-txt h3").textContent = producto[0].title;
        $modalContent.querySelector(".modal-txt #modal-descripcion").textContent = producto[0].description;
        $modalContent.querySelector(".modal-txt #modal-precio").textContent = producto[0].price;
        */
        /*
        let $div = d.createElement("div");
        $div.classList.add("info-producto");
        $div.innerHTML = `
        <h3>${producto[0].title}</h3>
        <p>${producto[0].description}</p>
        <p class="precio">${producto[0].price}</p>
        <button class="agregar-barrito" data-id="${producto[0].id}">Agregar al carrito</button>
        `;
        e.target.parentElement.appendChild($div);
    */
    }
    if(e.target.matches(".modal") || e.target.matches(".modal .cerrar-modal")) {
        const $modal = document.querySelector(".modal");
        $modal.classList.toggle("is-active");
    }
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