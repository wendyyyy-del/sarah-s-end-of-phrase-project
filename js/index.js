document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");


    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "search-bar";
    searchBar.placeholder = "Search...";
    header.appendChild(searchBar);

    document.querySelectorAll("li").forEach(li => {
        li.style.color = "white";
    });

   
    fetch("http://localhost:3000/phones") 
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const productContainer = document.getElementById("product-list");

            data.forEach(phone => {
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
        })
        .catch(error => console.error("Error loading phones:", error));
});


function addNewPhone() {
    fetch("http://localhost:3000/phones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "iPhone 15 Pro",
            brand: "Apple",
            price: 1299,
            image: "images/iphone15pro.jpg",
            description: "Titanium design, A17 Pro chip, and 48MP camera system."
        })
    })
    .then(response => response.json())
    .then(data => console.log("Added Phone:", data))
    .catch(error => console.error("Error:", error));
}


document.addEventListener("click", event => {
    if (event.target.id === "add-phone-btn") {
        addNewPhone();
    }
});