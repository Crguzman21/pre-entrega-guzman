const socket = io();
document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        thumbnail: document.getElementById("thumbnail").value,
    };

    if (product.price < 0 || product.stock < 0) {
        alert("❌ El precio y el stock deben ser números positivos.");
        return;
    }

    socket.emit("new-product", product);

    e.target.reset();
});

socket.on("update-products", (products) => {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

products.forEach((prod) => {
    const card = `
    <div class="col-md-4">
        <div class="card mb-3">
            <img src="${prod.thumbnail}" class="card-img-top" alt="${prod.title}">
            <div class="card-body">
                <h5 class="card-title">${prod.title}</h5>
                <p class="card-text">Precio: $${prod.price}</p>
                <p class="card-text">Stock: ${prod.stock}</p>
                <p class="card-text">Categoría: ${prod.category}</p>
            </div>
        </div>
    </div>
    `;
    container.innerHTML += card;
});
});
