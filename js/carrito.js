//CARRIOOOO

const printCarrito = () => {

    modalConteiner.innerHTML = "";
    modalConteiner.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modalTitulo">Tu Compra</h1>
    `
    modalConteiner.append(modalHeader);

    const modalButton = document.createElement("h2");
    modalButton.innerText = "❌";
    modalButton.className = "modal-button";

    modalButton.addEventListener("click", () => {
        modalConteiner.style.display = "none";

    });

    modalHeader.append(modalButton);

//AGREGAR PRODUCTOS AL CARRITO

    carrito.forEach((cardJuegos, index) => {

        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
    <img src="${cardJuegos.img}"></img>
    <h3 class= "tituloClass2">${cardJuegos.titulo}</h>
    <p class= "precioClass2">${cardJuegos.precio}$</p>
    `;
        modalConteiner.append(carritoContent);
        guardarCarrito()

//ELIMINAR DEL CARRITO 

        let eliminar = document.createElement("h3");
        eliminar.innerText = "🗑";
        eliminar.className = "eliminarCarrito";
        eliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            modalConteiner.innerHTML = "";
            printCarrito();
        });
        carritoContent.append(eliminar);


    })
    guardarCarrito()

//Suma de las cards ingresadas al carrito

                        //AGREGADO DE "API"

    const suma = carrito.reduce((acc, el) => acc + el.precio, 0);

    fetch(`tasadecambio.json`)
        .then(response => response.json())
        .then(data => {
            const usd = data.usd;
            const totalEnPesos = usd * suma
            const totalCompra = document.createElement('div');
            totalCompra.className = "total-content";
            totalCompra.innerHTML = `
        <h1>Total a pagar USD$ ${suma}</h1>
        <h2>Total a pagar Pesos$ ${totalEnPesos}</h2>
        `
            modalConteiner.append(totalCompra);
        })
        .catch(error => console.error('Error', error));









}

verCarrito.addEventListener('click', printCarrito)







//guardar carrito en localStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

