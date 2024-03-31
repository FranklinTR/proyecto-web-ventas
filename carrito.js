const totalElement = document.getElementById("total-carrito");

document.addEventListener("DOMContentLoaded", function () {
  const listaCarrito = document.querySelector("#lista-carrito tbody");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
 // const totalElement = document.getElementById("total-carrito");
  

  // Función para cargar los elementos del carrito desde localStorage y calcular el total
  function cargarCarrito() {
    // Verifica si hay elementos guardados en localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Limpia el contenido previo del carrito
    listaCarrito.innerHTML = "";

    let total = 0;

    // Agrega los elementos del carrito al HTML y calcula el total
    carrito.forEach((producto) => {
      total += parseFloat(producto.price.substring(1)) * producto.quantity; // Elimina el signo de dólar y convierte el precio a número
      const row = document.createElement("tr");
      row.classList.add("row-product");
      row.innerHTML = `
                <td class="content-img"><img src="${producto.image}" alt="${producto.title}" style="width: 150px; height: 150px;display:block; margin: 0 auto; "></td>
                <td><span>${producto.title}</span></td>
                <td><span>${producto.price}</span></td>
                <td class="buttons-agr-red"><button class="btn-agr" data-id="${producto.id}">+</button>
                <span>${producto.quantity}</span><button class="btn-red" data-id="${producto.id}">-</button>
                </td>
            `;
      listaCarrito.appendChild(row);
    });

    // Actualiza el total en el HTML
    totalElement.textContent = `${total.toFixed(2)}`;
  }

  // Función para vaciar el carrito
  function vaciarCarrito() {
    localStorage.removeItem("carrito");
    cargarCarrito(); // Actualiza la vista del carrito
  }

  // Evento para vaciar el carrito al hacer clic en el botón correspondiente
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Cargar elementos del carrito al cargar la página
  cargarCarrito();

  // Escuchar eventos de clic en el carrito para eliminar productos
  listaCarrito.addEventListener("click", function (event) {
    if (event.target.classList.contains("borrar")) {
      const id = event.target.getAttribute("data-id");
      // Lógica para eliminar el producto con el ID específico
      // Filtra el carrito para excluir el producto con el ID dado
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
      // Actualiza el carrito en localStorage con el nuevo carrito filtrado
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      // Recarga la vista del carrito
      cargarCarrito();
    }
  });
  // Supongamos que tienes un elemento con el ID "miElemento"
  //var total = document.querySelector("#total-carrito").textContent;
  //var totalNumero = parseInt(total.textContent);

  console.log(totalElement.textContent);
  //var id = elemento.value;
  //console.log(id);
  // Ocultar el elemento cambiando su visibilidad
  //elemento.style.visibility = 'none';

  
});

//Actualizar precio carrito
const actualizarPrecioCarrito = (id, opcion) => {
  // Verifica si hay elementos guardados en localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  console.log(id);
  let total = 0;

  if (opcion === "restar") {
    carrito.forEach((producto) => {
      if (producto.id === id) {
        producto.quantity -= 1;
      }
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  if (opcion === "delete") {
   const carritoActu =  carrito.filter((producto) => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carritoActu));
  }
  if (opcion === "sumar") {
    carrito.forEach((producto) => {
      if (producto.id === id) {
        producto.quantity += 1;
      }
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  carrito.forEach((producto) => {
    total += parseFloat(producto.price.substring(1)) * producto.quantity; // Elimina el signo de dólar y convierte el precio a número
    console.log(producto);
  });
  // Agrega los elementos del carrito al HTML y calcula el total

  // Actualiza el total en el HTML
  console.log(total);
  totalElement.textContent = `${total.toFixed(2)}`;
};
const actualizarPrecioSpan = () => {};

document.addEventListener("click", (e) => {
  const $buttonAgr = document.querySelector(".btn-agr");
  const $buttonRed = document.querySelector(".btn-red");
  if (e.target.matches("button.btn-red")) {
    console.log(e.target);
    let cantidad = e.target.parentElement.querySelector("span");
    console.log(cantidad);
    let cantidadNum = parseInt(cantidad.textContent);
    cantidad.textContent = cantidadNum - 1;
    //está mal la línea 149?
    console.log(cantidadNum);
    actualizarPrecioCarrito($buttonRed.dataset.id, "restar");

    if (parseInt(cantidad.textContent) == 0) {
      //está mal la línea 149?
      console.log("entrando al if de cantidad 0");
      console.log(e.target.parentElement.parentElement.remove());
      actualizarPrecioCarrito($buttonRed.dataset.id, "delete");

      const $row_productos = document.querySelectorAll(".row-product");
      
      console.log($row_productos);
      if($row_productos.length === 1){
        console.log("entrando al if de last-td")
        console.log(e.target.parentElement);
        const $buttonagrred = document.querySelector(".buttons-agr-red");
        console.log($buttonagrred);
        $buttonagrred.classList.toggle("last-td");
        //   e.target.parentElement.style("class","last-td");
      }
    }
  }
  if (e.target.matches("button.btn-agr")) {
    console.log(e.target);

    console.log("click en btn-agr");
    let cantidad = e.target.parentElement.querySelector("span");
    let cantidadNum = parseInt(cantidad.textContent);
    cantidad.textContent = cantidadNum + 1;
    actualizarPrecioCarrito($buttonAgr.dataset.id, "sumar");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Selecciona la imagen de la flecha por su ID
  var flechaAtras = document.getElementById("flechaAtras");

  // Agrega un evento de clic a la imagen de la flecha
  flechaAtras.addEventListener("click", function () {
    // Utiliza la función window.history.back() para regresar a la página anterior
    window.history.back();
  });
});

//Botón de paypal
paypal
    .Buttons({
      style: {
        color: "blue",
        shape: "pill",
        lable: "pay",
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: parseInt(totalElement.textContent),
                
              },
            },
          ],
        });
      },
      //Cuando se realiza el pago
      onApprove: function (data, actions) {
        //Que es data? Es el parámetro que recibe toda la información que
        //se está realizando.
        actions.order.capture().then(function (detalles) {
          //Que representa "detalles"
          //toda la información de nuestro pago
          console.log(detalles);
          guardarVenta();
        //  window.location.href = "/proyecto-web-ventas/index.html";
        });
      },
      //Se dispara cuando el usuario cancela el pago
      onCancel: function (data) {
        alert("Pago cancelado");
        console.log(totalElement.textContent);

      },
    })
    .render("#paypal-button-container");

/*
const guardarVenta = () => {

  const formData = new FormData();
  //const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = parseFloat(totalElement.textContent);
  const fechaActual = new Date();
  const fechaVenta = `${fechaActual.getFullYear()}-${fechaActual.getMonth() +1  < 10 ? "0":""}${(fechaActual.getMonth() + 1)}-${fechaActual.getDay() < 10 ? "0":""}${fechaActual.getDay()} `;
  const venta = {
    id:0,
    fechaVenta,
    totalVenta:total,
    usuario:{
      id: 1
    }
  };
  formData.append("venta", JSON.stringify(venta));
  //localStorage.setItem("venta", JSON.stringify(venta));
  //window.location.href = "/index.html";
  const url = "http://localhost:8000/ventas/save";
  fetch(url, {
    method: "POST",
    body: formData,

  }).then((res) => {
    if (res.ok) {
      console.log("Venta guardada");
      guardarDetalleVenta();
    }
  });
}

const obtenerUltimaVenta = ()=>{
  const url = "http://localhost:8000/ventas/obtenerUltimoId";
  let idObtenido = null;
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
      //console.log(res.json());
    }
  }).then((data) => {
    idObtenido = data;
    console.log(data);
  });
  return idObtenido;
}
const guardarDetalleVenta = ()=>{
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let idObtenido = obtenerUltimaVenta();
  const productos = carrito.map((product) => {
    return {
      id: 0,
      venta: {
        id: parseInt(idObtenido),
      },
      producto: {
        id: product.id,
      },
      cantidad: product.quantity,
      precioUnitario: parseFloat(product.price.substring(1)),
    };
  });
 
  const formData = new FormData();
  formData.append("detalleventa", JSON.stringify(productos));

  const url = "http://localhost:8000/detalle-ventas/save";
  fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok) {
      console.log("Detalle de venta guardado");
    }
  });
}
*/
async function guardarVenta () {
  const formData = new FormData();
  const total = parseFloat(totalElement.textContent);
  const fechaActual = new Date();
  const fechaVenta = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1) < 10 ? "0" : ""}${fechaActual.getMonth() + 1}-${fechaActual.getDate() < 10 ? "0" : ""}${fechaActual.getDate()}`;
  const venta = {
    id: 0,
    fechaVenta,
    totalVenta: total,
    usuario: {
      id: 1
    }
  };
  formData.append("venta", JSON.stringify(venta));

  const url = "http://localhost:8000/ventas/save";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Venta guardada");
      const idObtenido = await obtenerUltimaVenta();
      await guardarDetalleVenta(idObtenido);
    }
  } catch (error) {
    console.error("Error al guardar la venta:", error);
  }
};

async function obtenerUltimaVenta()  {
  const url = "http://localhost:8000/ventas/obtenerUltimoId";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Error al obtener el último ID de venta");
    }
  } catch (error) {
    console.error("Error al obtener el último ID de venta:", error);
    return null;
  }
};

async function guardarDetalleVenta (idVenta)  {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productos = carrito.map((product) => {
    return {
      id: 0,
      venta: {
        id: parseInt(idVenta),
      },
      producto: {
        id: product.id,
      },
      cantidad: product.quantity,
      precioUnitario: parseFloat(product.price.substring(1)),
    };
  });

  const formData = new FormData();
  formData.append("detalleventa", JSON.stringify(productos));

  const url = "http://localhost:8000/detalle-ventas/save";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Detalle de venta guardado");
    } else {
      throw new Error("Error al guardar el detalle de la venta");
    }
  } catch (error) {
    console.error("Error al guardar el detalle de la venta:", error);
  }
};



//obtenerUltimaVenta();
const cerrarSesion = () => {  
  localStorage.removeItem("carrito");
  localStorage.removeItem("usuario");
  window.location.href = "/proyecto-web-ventas/index.html";
}