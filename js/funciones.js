export function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}
export function cargarLocalStorage(clave) {
    let localStore = JSON.parse(localStorage.getItem(clave))||[]
    return localStore
}

export function capturarBtn(e, clase) {
    return e.target.closest(clase);
}

export function buscarPorId(array, id) {
    return array.find(item => item.id === id);
}

export function capturarId(btn) {
    return parseInt(btn.dataset.id);
}

export function acumuladorArray(array,botonNav) {
    if (botonNav == true) {
        return array.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    } else {
        return array.reduce((acumulador, item) => acumulador +item.precio * item.cantidad, 0);
    }
}
export function capturarIndex(array, elemento) {
    return array.indexOf(elemento);
}
export function eliminarElemento(array, i, cantidad) {
   return array.splice(i, cantidad);
}