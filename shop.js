

/*  fetch and render products in shop page*/
async function fetchProducts() {
    try {
        const response = await fetch("shop.json");
        const result = await response.json(); 
        return result;
    } catch (err) {
        console.log(err, "error fetching products");
    }
}

async function renderProducts() {
    const productContainer = document.getElementById("product1");
    const productsData = await fetchProducts();
    if (!productsData || !productsData.pros) {
        console.log("error: no products data available");
        return; 
    }
    const proContainer = document.createElement("div")
    proContainer.classList.add("pro-container") 
    productsData.pros.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("pro");

         productElement.onclick = function() {
            window.location.href = `sproduct.html?id=${product.id}`;
        };

        const imgElement = document.createElement("img");
        imgElement.src = product.image;
        imgElement.alt = product.name;
        productElement.appendChild(imgElement);

        const desElement = document.createElement("div");
        desElement.classList.add("des");

        const brandElement = document.createElement("span");
        brandElement.textContent = product.brand;
        desElement.appendChild(brandElement);

        const nameElement = document.createElement("h5");
        nameElement.textContent = product.name;
        desElement.appendChild(nameElement);

        const starElement = document.createElement("div");
        starElement.classList.add("star");
        for (let i = 0; i < product.stars; i++) {
            const starIcon = document.createElement("i");
            starIcon.classList.add("fas", "fa-star");
            starElement.appendChild(starIcon);
        }
        desElement.appendChild(starElement);

        const priceElement = document.createElement("h4");
        priceElement.textContent = "$" + product.price;
        desElement.appendChild(priceElement);

        productElement.appendChild(desElement);

        const cartIcon = document.createElement("a");
        cartIcon.href = "#";
        const cartIconImage = document.createElement("i");
        cartIconImage.classList.add("fa-solid", "fa-cart-shopping", "cart");
        cartIcon.appendChild(cartIconImage);
        productElement.appendChild(cartIcon);

        proContainer.appendChild(productElement); 
    });
productContainer.appendChild(proContainer)
}

async function renderProductsReverse() {
    const productContainer = document.getElementById("product1");
    const productsData = await fetchProducts();
    
    if (!productsData || !productsData.pros) {
        console.log("Error: No product data available");
        return;
    }
    const proContainer = document.createElement("div")
    proContainer.classList.add("pro-container")
    for (let i = productsData.pros.length - 1; i >= 0; i--) {
        
        const product = productsData.pros[i];

        const productElement = document.createElement("div");
        productElement.classList.add("pro");
        productElement.onclick = function() {
            window.location.href = `sproduct.html?id=${product.id}`;
        };

        const imgElement = document.createElement("img");
        imgElement.src = product.image;
        imgElement.alt = product.name;
        productElement.appendChild(imgElement);

        const desElement = document.createElement("div");
        desElement.classList.add("des");

        const brandElement = document.createElement("span");
        brandElement.textContent = product.brand;
        desElement.appendChild(brandElement);

        const nameElement = document.createElement("h5");
        nameElement.textContent = product.name;
        desElement.appendChild(nameElement);

        const starElement = document.createElement("div");
        starElement.classList.add("star");
        for (let j = 0; j < product.stars; j++) {
            const starIcon = document.createElement("i");
            starIcon.classList.add("fas", "fa-star");
            starElement.appendChild(starIcon);
        }
        desElement.appendChild(starElement);

        const priceElement = document.createElement("h4");
        priceElement.textContent = "$" + product.price;
        desElement.appendChild(priceElement);

        productElement.appendChild(desElement);

        const cartIcon = document.createElement("a");
        cartIcon.href = "#";
        const cartIconImage = document.createElement("i");
        cartIconImage.classList.add("fa-solid", "fa-cart-shopping", "cart");
        cartIcon.appendChild(cartIconImage);
        productElement.appendChild(cartIcon);

        proContainer.appendChild(productElement); 
    };
productContainer.appendChild(proContainer)
}

async function renderProductsRandomly(){
    const productContainer = document.getElementById("product1")
    const productsData = await fetchProducts()
    if (!productsData || !productsData.pros) {
        console.log("Error: No product data available");
        return;
    }
    let productList = productsData.pros
    
    
        productList = shuffleArray(productList);
    

    const proContainer = document.createElement("div")
    proContainer.classList.add("pro-container") 
    productsData.pros.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("pro");

        productElement.onclick = function() {
            window.location.href = `sproduct.html?id=${product.id}`;
        };

        const imgElement = document.createElement("img");
        imgElement.src = product.image;
        imgElement.alt = product.name;
        productElement.appendChild(imgElement);

        const desElement = document.createElement("div");
        desElement.classList.add("des");

        const brandElement = document.createElement("span");
        brandElement.textContent = product.brand;
        desElement.appendChild(brandElement);

        const nameElement = document.createElement("h5");
        nameElement.textContent = product.name;
        desElement.appendChild(nameElement);

        const starElement = document.createElement("div");
        starElement.classList.add("star");
        for (let i = 0; i < product.stars; i++) {
            const starIcon = document.createElement("i");
            starIcon.classList.add("fas", "fa-star");
            starElement.appendChild(starIcon);
        }
        desElement.appendChild(starElement);

        const priceElement = document.createElement("h4");
        priceElement.textContent = "$" + product.price;
        desElement.appendChild(priceElement);

        productElement.appendChild(desElement);

        const cartIcon = document.createElement("a");
        cartIcon.href = "#";
        const cartIconImage = document.createElement("i");
        cartIconImage.classList.add("fa-solid", "fa-cart-shopping", "cart");
        cartIcon.appendChild(cartIconImage);
        productElement.appendChild(cartIcon);

        proContainer.appendChild(productElement); 
    });
productContainer.appendChild(proContainer)
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function() {
    const paginationLinks = document.querySelectorAll("#pagination a");
    paginationLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault(); 
            const pageNumber = this.textContent; 
            window.location.href = "shop.html?id=" + pageNumber; 
        });
    });
});

const queryParams = new URLSearchParams(window.location.search)
const id = queryParams.get("id")

if (!queryParams.has("id")) {
    // Append id=1 to the URL
    window.location.href = "shop.html?id=1";
} else {
    // If id query parameter is present, render products based on its value
    const id = queryParams.get("id");
    if (id == 1) {
        renderProducts();
    } else if (id == 2) {
        renderProductsReverse();
    } else {
        renderProductsRandomly();
    }
}