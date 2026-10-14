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
