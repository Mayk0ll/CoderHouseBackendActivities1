const connectSocketServer = async (url, options) => {
    return new Promise((resolve, reject) => {
        const socket = io(url, options = {});

        socket.on('connection', () =>{
            console.log(`Conectado servidor socket.io ${url}`);
            resolve(socket);
        });

        socket.on('connect_error', err => {
            console.error('ERROR al conectar servidor socket.io', err);
            reject(err);
        });

        socket.on('server:refreshProduct', data => {
            renderProducts(data);
        });
    });
}


(async () => {
    const socketClient = await connectSocketServer('');

    // socketClient.emit('init_message', { node: 23, name: 'client_23', location: 'Rafaela, AR' });
})();


const createProduct = async (event) => {
    event.preventDefault();
    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
    }
    
    await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
}

const deleteProduct = async (event, id) => {
    event.preventDefault();
    console.log(id);
    
    await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    });
}

const renderProducts = async (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        const productName = document.createElement('h2');
        const productDescription = document.createElement('p');
        const productCode = document.createElement('p');
        const productPrice = document.createElement('p');
        const productStock = document.createElement('p');
        const productCategory = document.createElement('p');
        const deleteButton = document.createElement('button');

        productName.textContent = product.name;
        productDiv.classList.add('cartProduct', 'm-2'); 
        productDescription.textContent = product.description;
        productCode.textContent = `Código: ${product.code}`;
        productPrice.textContent = `Precio: ${product.price}`;
        productStock.textContent = `Disponible: ${product.stock}`;
        productCategory.textContent = `Categoría: ${product.category}`;

        deleteButton.type = 'button';
        deleteButton.classList.add('btn', 'btn-primary', 'mt-2');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = (event) => deleteProduct(event, product.id); 

        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productCode);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productStock);
        productDiv.appendChild(productCategory);
        productDiv.appendChild(deleteButton);
        productList.appendChild(productDiv);
    });
};