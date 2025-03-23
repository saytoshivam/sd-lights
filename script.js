document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(".product-list");
            productList.innerHTML = ""; // Clear existing content

            products.forEach(product => {
                let productHTML = `
                    <div class="product-item">
                        <div class="product-slider">
                            ${product.images.map(img => `<img src="./images/${img}" alt="${product.name} Image">`).join('')}
                        </div>
                        <h3>${product.name}</h3>
                        <p><strong>Wattage:</strong> ${product.wattage}</p>
                        <p><strong>Light Color:</strong> ${product.lightColor}</p>
                        <p><strong>Frequency:</strong> ${product.frequency}</p>
                        <p><strong>Voltage:</strong> ${product.voltage}</p>
                        <p><strong>Lumens:</strong> ${product.lumens}</p>
                        <p><strong>Warranty:</strong> ${product.warranty}</p>
                        <p><strong>Country of Origin:</strong> ${product.origin}</p>
                    </div>
                `;
                productList.innerHTML += productHTML;
            });
        })
        .catch(error => console.error("Error loading products:", error));
});
