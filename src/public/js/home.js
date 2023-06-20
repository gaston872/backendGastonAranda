const socket = io();
const productos = document.getElementById("productos")

console.log("Conectado");


function convertirAHTML(productos) {
    let html = '';

    productos.forEach((producto) => {
        html += '<div class="producto">';
        html += '<h2>' + producto.title + '</h2>';
        html += '<p>' + producto.description + '</p>';
        html += '<p>Precio: ' + producto.price + '</p>';
        html += '<p>Categoría: ' + producto.category + '</p>';
        html += '<img src="' + producto.thumbnail + '" alt="Imagen del producto">';
        html += '<p>Stock disponible: ' + producto.stock + '</p>';
        html += '</div>';
    });

    return html;
}

/* 
// Escucha el evento 'initProduct' para mostrar los productos iniciales
socket.on('initProduct', (products) => {
    const productContainer = document.getElementById('productos');
    productContainer.innerHTML = '';
    products.forEach((product) => {
      addProduct(product);
    });
  });
  
  // Escucha el evento 'addProduct' para agregar un producto nuevo
  socket.on('addProduct', (product) => {
    addProduct(product);
  });
  
  // Escucha el evento 'removeProduct' para eliminar un producto
  socket.on('removeProduct', (productId) => {
    const product = document.getElementById(productId);
    if (product) {
      product.remove();
    }
  });
  
  // Agrega un producto al contenedor de productos
  function addProduct(product) {
    const productContainer = document.getElementById('productos');
    const newProduct = document.createElement('div');
    newProduct.id = product.id;
    newProduct.classList.add('product');
    newProduct.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <p>Categoría: ${product.category}</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="deleteProduct('${product.id}')">Eliminar</button>
    `;
    productContainer.appendChild(newProduct);
  }
  
  // Envia el formulario al servidor para agregar un nuevo producto
  function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('productForm');
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;
    const category = form.category.value;
    const thumbnail = form.thumbnail.value;
    const stock = form.stock.value;
    const formData = {
      title,
      description,
      price,
      category,
      thumbnail,
      stock,
    };
    socket.emit('newProduct', formData);
    form.reset();
  }
  
  // Envia el ID del producto al servidor para eliminarlo
  function deleteProduct(productId) {
    socket.emit('deleteProduct', productId);
  }
 */


socket.on('products', (products) => {
    //convertirAHTML(products)
    productos.innerHTML = convertirAHTML(products);
})
