document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const productContainer = document.getElementById("product-list");

    
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "search-bar";
    searchBar.placeholder = "Search...";
    header.appendChild(searchBar);

    let allPhones = []; 

    
    fetch("http://localhost:3000/phones")
        .then(response => response.json())
        .then(data => {
            allPhones = data; 
            displayPhones(data); 
        })
        .catch(error => console.error("Error loading phones:", error));

    
    function displayPhones(phones) {
        productContainer.innerHTML = "";

        phones.forEach(phone => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");

            productCard.innerHTML = `
                <img src="${phone.image}" alt="${phone.name}" style="width:150px">
                <h2>${phone.name}</h2>
                <p><strong>Brand:</strong> ${phone.brand}</p>
                <p><strong>Price:</strong> $${phone.price}</p>
                <p>${phone.description}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productContainer.appendChild(productCard);
        });
    }

    
    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredPhones = allPhones.filter(phone =>
            phone.name.toLowerCase().includes(searchTerm) ||
            phone.brand.toLowerCase().includes(searchTerm)
        );
        displayPhones(filteredPhones); 
    });
});
