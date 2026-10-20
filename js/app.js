import { productos, proximamente } from "./datos.js";
import * as fnt from "./funciones.js";
  
/* Modo oscuro */
  const btnOscuro = document.getElementById("modoOscuro");
  const body = document.body;
  btnOscuro.addEventListener("click", () => {
    body.classList.toggle("oscuro");
    if (body.classList.contains("oscuro")) {
      btnOscuro.textContent = "☀️";
      btnOscuro.style.backgroundColor = "#fbfbfb";
      fnt.guardarLocalStorage("modo", "oscuro");
    } else {
      btnOscuro.textContent = "🌙";
      btnOscuro.style.backgroundColor = "#403e3e";
      fnt.guardarLocalStorage("modo", "");
    }
  });
  if(fnt.cargarLocalStorage("modo") == "oscuro"){
  body.classList.add("oscuro")
  btnOscuro.textContent = "☀️";
  btnOscuro.style.backgroundColor = "#fbfbfb";
  }

 const grillaProducto = document.getElementById("grilla-camisetas");

 grillaProducto.innerHTML = productos.map((producto) => 
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
let carrito = [];
const btnVaciar = document.querySelector(".btn-vaciar")
const carritosProductos= document.querySelector("#table-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const numeroBotonCarro = document.querySelector("#numeroBotonCarro");
let id, itemExistente, index;
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
function actualizarNumeroBotonCarro() {
  const cantidadTotal = fnt.acumuladorArray(carrito, true);
  numeroBotonCarro.textContent = cantidadTotal;
}

function actualizarPrecio() {
  const total = fnt.acumuladorArray(carrito, false);
  totalCarrito.textContent = "$ "+ total.toLocaleString("es-AR");
}

body.addEventListener("click", (e) => {
   const btnAgregar = fnt.capturarBtn(e, ".btn-agregar");
   if (btnAgregar) {
      id = fnt.capturarId(btnAgregar);
      itemExistente = fnt.buscarPorId(carrito, id);
      if (itemExistente) {
        itemExistente.cantidad++;
        mostrarCarrito();
        actualizarNumeroBotonCarro();
        actualizarPrecio();
      } else {
        const producto = fnt.buscarPorId(productos, id);
        carrito.push({ ...producto, cantidad: 1 });
        mostrarCarrito();
        actualizarNumeroBotonCarro();
        actualizarPrecio();
      }
      fnt.guardarLocalStorage("carrito", carrito); 
   } else{
     return;
   }
})

carritosProductos.addEventListener("click", (e) => {
  const btnRestar = fnt.capturarBtn(e, ".btn-restar");
  const btnSumar = fnt.capturarBtn(e, ".btn-sumar");
  const btnEliminar = fnt.capturarBtn(e, ".btn-eliminar");
  if (btnRestar) {
    id = fnt.capturarId(btnRestar);
    itemExistente = fnt.buscarPorId(carrito, id);
    if (itemExistente) {
      itemExistente.cantidad--;
      if (itemExistente.cantidad === 0) {
        index = fnt.capturarIndex(carrito, itemExistente);
        fnt.eliminarElemento(carrito, index, 1);
      }
      mostrarCarrito();
      actualizarNumeroBotonCarro();
      actualizarPrecio();
    }
    fnt.guardarLocalStorage("carrito", carrito);
  } else if (btnSumar) {
    id = fnt.capturarId(btnSumar);
    itemExistente = fnt.buscarPorId(carrito, id);
    if (itemExistente) {
      itemExistente.cantidad++;
      mostrarCarrito();
      actualizarNumeroBotonCarro();
      actualizarPrecio();
    }
    fnt.guardarLocalStorage("carrito", carrito);
  } else if (btnEliminar) {
    id = fnt.capturarId(btnEliminar);
    itemExistente = fnt.buscarPorId(carrito, id);
    if (itemExistente ) {
      index = fnt.capturarIndex(carrito, itemExistente);
      fnt.eliminarElemento(carrito, index, 1);
      mostrarCarrito();
      actualizarNumeroBotonCarro();
      actualizarPrecio();
    }
    fnt.guardarLocalStorage("carrito", carrito);
  }else{
    return ;
  }
});

btnVaciar.addEventListener("click", () => {
    carrito.length = 0;
    mostrarCarrito();
    actualizarNumeroBotonCarro();
    actualizarPrecio();
    fnt.guardarLocalStorage("carrito", carrito); 
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



carrito.push(...fnt.cargarLocalStorage("carrito"));
mostrarCarrito();
actualizarNumeroBotonCarro();
actualizarPrecio();

