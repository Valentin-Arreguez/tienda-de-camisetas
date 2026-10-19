import { productos, proximamente } from "./datos.js";

/* Modo oscuro */
  const btnOscuro = document.getElementById("modoOscuro");
  const body = document.body;
  btnOscuro.addEventListener("click", () => {
    body.classList.toggle("oscuro");
    if (body.classList.contains("oscuro")) {
      btnOscuro.textContent = "☀️";
      btnOscuro.style.backgroundColor = "#fbfbfb";
      guardarLocalStorage("modo", "oscuro");
    } else {
      btnOscuro.textContent = "🌙";
      btnOscuro.style.backgroundColor = "#403e3e";
      guardarLocalStorage("modo", "");
    }
  });
  if(cargarLocalStorage("modo") == "oscuro"){
  body.classList.add("oscuro")
  btnOscuro.textContent = "☀️";
  btnOscuro.style.backgroundColor = "#fbfbfb";
  }

 const grillaProducto = document.getElementById("grilla-camisetas");

 grillaProducto.innerHTML = productos.map(producto => 
                `<article class="card-camiseta">
                    <div class="imagen-camiseta">
                        <img src="${producto.imagenFrente}" 
                        onmouseover="this.src='${producto.imagenEspalda}'"
                        onmouseout="this.src='${producto.imagenFrente}'" 
                        alt="${producto.nombre}">
                    </div>
                    <div class="info-camiseta">
                        <span class="categoria">${producto.etiqueta}</span>
                        <h3>${producto.nombre}</h3>
                        <p class="descripcion">${producto.descripcion}</p>
                        <div class="precio-boton">
                            <span class="precio">$${producto.precio.toLocaleString("es-AR")}</span>
                            <button class="btn-agregar" data-id="${producto.id}">+ Agregar</button>
                        </div>
                    </div>
                </article>`).join("");
const carrito = [];
const btnVaciar = document.querySelector(".btn-vaciar")
const carritosProductos= document.querySelector("#table-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const numeroBotonCarro = document.querySelector("#numeroBotonCarro");
function actualizarNumeroBotonCarro() {
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  numeroBotonCarro.textContent = cantidadTotal;
}

function mostrarCarrito() {
    if (carrito.length === 0) {
      carritosProductos.innerHTML = `<tr>
                                <td colspan="4">Tu carrito está vacío</td>
                            </tr>`;
    } else {
      carritosProductos.innerHTML = carrito.map((item) =>
          ` <tr>
              <td>${item.nombre}</td>
              <td>$ ${item.precio.toLocaleString("es-AR")}</td>
              <td>
              <button class="btn-restar" data-id="${item.id}">-</button> 
              ${item.cantidad} 
              <button class="btn-sumar" data-id="${item.id}">+</button>
              <button class="btn-eliminar" data-id="${item.id}">🗑️</button></td>
              <td>$ ${(item.precio * item.cantidad).toLocaleString("es-AR")}</td>
            </tr>
            `).join("");
    }
}
function actualizarTotal() {
  const total = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  totalCarrito.textContent = "$ "+ total.toLocaleString("es-AR");
}
body.addEventListener("click", (e) => {
   const btnAgregar = e.target.closest(".btn-agregar");
   if (btnAgregar) {
      const id = parseInt(btnAgregar.dataset.id);
      const itemExistente = carrito.find((item) => item.id === id);
      if (itemExistente) {
        itemExistente.cantidad++;
        mostrarCarrito();
        actualizarNumeroBotonCarro();
        actualizarTotal();
      } else {
        const producto = productos.find((p) => p.id === id);
        carrito.push({ ...producto, cantidad: 1 });
        mostrarCarrito();
        actualizarNumeroBotonCarro();
        actualizarTotal();
      }
      guardarLocalStorage("carrito", carrito); 
   } else{
     return;
   }
})

carritosProductos.addEventListener("click", (e) => {
  const btnRestar = e.target.closest(".btn-restar");
  const btnSumar = e.target.closest(".btn-sumar");
  const btnEliminar = e.target.closest(".btn-eliminar");
  if (btnRestar) {
    const id = parseInt(btnRestar.dataset.id);
    const itemExistente = carrito.find((item) => item.id === id);
    if (itemExistente) {
      itemExistente.cantidad--;
      if (itemExistente.cantidad === 0) {
        const index = carrito.indexOf(itemExistente);
        carrito.splice(index, 1);
      }
      mostrarCarrito();
      actualizarNumeroBotonCarro();
      actualizarTotal();
    }
    guardarLocalStorage("carrito", carrito);
  } else if (btnSumar) {
    const id = parseInt(btnSumar.dataset.id);
    const itemExistente = carrito.find((item) => item.id === id);
    if (itemExistente) {
      itemExistente.cantidad++;
      mostrarCarrito();
      actualizarNumeroBotonCarro();
      actualizarTotal();
    }
    guardarLocalStorage("carrito", carrito);
  } else if (btnEliminar) {
    const id = parseInt(btnEliminar.dataset.id);
    const index = carrito.findIndex((item) => item.id === id);
    if (index !== -1) {
      carrito.splice(index, 1);
      mostrarCarrito();
      actualizarNumeroBotonCarro();
      actualizarTotal();
    }
    guardarLocalStorage("carrito", carrito);
  }else{
    return ;
  }
});

btnVaciar.addEventListener("click", () => {
    carrito.length = 0;
    mostrarCarrito();
    actualizarNumeroBotonCarro();
    actualizarTotal();
    guardarLocalStorage("carrito", carrito); 
})

// Modal
const nuevoProductos = document.querySelector("#proximamente");
const modal = document.querySelector("#modal");
const cerrarModal = document.querySelector("#cerrar-modal");
const lista = document.querySelector("#lista-nuevos-productos");

function mostrarOfertas() {
    lista.innerHTML = proximamente.map(producto => `
        <article class="card-camiseta">
                    <div class="imagen-camiseta">
                        <img src="${producto.imagenFrente}" 
                        onmouseover="this.src='${producto.imagenEspalda}'"
                        onmouseout="this.src='${producto.imagenFrente}'" 
                        alt="${producto.nombre}">
                    </div>
                    <div class="info-camiseta">
                        <span class="categoria">${producto.etiqueta}</span>
                        <h3>${producto.nombre}</h3>
                        <p class="descripcion">${producto.descripcion}</p>
                    </div>
                </article>`).join("");
}

nuevoProductos.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarOfertas();
    modal.classList.add("abierto");
});

cerrarModal.addEventListener("click", () => {
    modal.classList.remove("abierto");
});


function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}
function cargarLocalStorage(clave) {
    let localStore = JSON.parse(localStorage.getItem(clave))||[]
    return localStore
}
carrito.push(...cargarLocalStorage("carrito"));
cargarLocalStorage("carrito");
mostrarCarrito();
actualizarNumeroBotonCarro();
actualizarTotal();

