const URI = "http://localhost:1234/api";

const connectSocketServer = async (url, options) => {
  return new Promise((resolve, reject) => {
    const socket = io(url, (options = {}));

    socket.on("connection", () => {
      console.log(`Conectado servidor socket.io ${url}`);
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      console.error("ERROR al conectar servidor socket.io", err);
      reject(err);
    });

    socket.on("server:refreshProduct", (data) => {
      renderProducts(data);
    });
  });
};

(async () => {
  const socketClient = await connectSocketServer("");

  // socketClient.emit('init_message', { node: 23, name: 'client_23', location: 'Rafaela, AR' });
})();

const goToLogin = () => {
  window.location.href = "/views/login";
};

const goToRegister = () => {
  window.location.href = "/views/register";
};

const goToHome = () => {
  console.log("goToHome");
  window.location.href = "/views/home";
};

const goToCart = () => {
  const uid = getInfoUser().id
  window.location.href = "/views/cart/" + uid;
}

const getInfoUser = () => {
  return JSON.parse(localStorage.getItem("data"));
}

const changePage = (page) => {
  window.location.href = `/views/home?page=${page}`;
}

const login = (e) => {
  e.preventDefault();
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Todos los campos son obligatorios",
    });
  }

  fetch(`${URI}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.message) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: resp.message,
        });
      }

      localStorage.setItem("data", JSON.stringify(resp.data));
      goToHome();
    })
    .catch((error) => {
      console.log(error);
    });
}

const register = async (e) => {
  e.preventDefault();
  const user = {
    firstName: document.getElementById("firstName")?.value,
    lastName: document.getElementById("lastName")?.value,
    email: document.getElementById("email")?.value,
    password: document.getElementById("password")?.value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
  }

  if( !user.firstName || !user.lastName || !user.email || !user.password || !user.gender || !user) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Todos los campos son obligatorios",
    });
  }
  
  fetch(`${URI}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.message) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: resp.message,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: resp.message,
      });
      goToLogin();
    })
    .catch((error) => {
      console.log(error);
    });
};

const createProduct = async (event) => {
  event.preventDefault();
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    code: document.getElementById("code").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
  };

  await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};

const addCart = (pid) => {
  const user = getInfoUser();
  if (!user) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "Debes iniciar sesión para agregar productos al carrito",
    });
  }

  fetch(`${URI}/carts/${user.id}/product/${pid}`, {
    method: "POST",
  })
  .then((resp) => resp.json())
  .then((resp) => {
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: resp.message,
    });
  })
  .catch((err) => {
    Swal.fire({ icon: "error", title: "Error", text: err.message });
  });
}

const deleteProduct = async (event, id) => {
  event.preventDefault();
  await fetch(`/api/products/${id}`, { method: "DELETE" })
    .then((resp) => resp.json())
    .then((resp) => {
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: resp.message,
      });
    })
    .catch((err) => {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    });
};

const renderProducts = async (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    const productName = document.createElement("h2");
    const productDescription = document.createElement("p");
    const productCode = document.createElement("p");
    const productPrice = document.createElement("p");
    const productStock = document.createElement("p");
    const productCategory = document.createElement("p");
    const deleteButton = document.createElement("button");

    productName.textContent = product.name;
    productDiv.classList.add("cartProduct", "m-2");
    productDescription.textContent = product.description;
    productCode.textContent = `Código: ${product.code}`;
    productPrice.textContent = `Precio: ${product.price}`;
    productStock.textContent = `Disponible: ${product.stock}`;
    productCategory.textContent = `Categoría: ${product.category}`;

    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-primary", "mt-2");
    deleteButton.textContent = "Eliminar";
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
