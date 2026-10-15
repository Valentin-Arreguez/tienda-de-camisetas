import { productos } from "./datos.js";

/* Modo oscuro */
  const btnOscuro = document.getElementById("modoOscuro");
  const body = document.body;
  btnOscuro.addEventListener("click", () => {
    body.classList.toggle("oscuro");
    if (body.classList.contains("oscuro")) {
      btnOscuro.textContent = "☀️";
      btnOscuro.style.backgroundColor = "#fbfbfb";
      guardarEnLocalStorage("modo", "oscuro")
    } else {
      btnOscuro.textContent = "🌙";
      btnOscuro.style.backgroundColor = "#403e3e";
      guardarEnLocalStorage("modo","");
    }
  });

 const grillaProducto = document.getElementById("grilla-camisetas");

 grillaProducto.innerHTML = productos.map(producto => 
                `<article class="card-camiseta">
                    <div class="imagen-camiseta">
                        <button class="btn-favorito" aria-label="Agregar a favoritos" aria-pressed="false" data-id="${producto.id}">♡</button>
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
                            <span class="precio">$${producto.precio.toLocaleString()}</span>
                            <button class="btn-agregar" data-id="${producto.id}">+ Agregar</button>
                        </div>
                    </div>
                </article>`).join("");