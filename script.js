
const nav = document.getElementById("navbar")
const bar = document.getElementById("bar")
const close = document.getElementById("close")


if(bar){
    bar.addEventListener("click",()=>{
        nav.classList.add("active")})
}
if(close){
    close.addEventListener("click",()=>{
        nav.classList.remove("active")})
}


/*  fetch and render products in shop page*/
async function fetchProducts() {
    try {
        const response = await fetch("shop.json");
        const result = await response.json(); 
        return result.pros.slice(0, 8);

    } catch (err) {
        console.log(err, "error fetching products");
    }
}

async function renderProducts() {
    const productContainer = document.getElementById("product1");
    const productsData = await fetchProducts();
    if (!productsData) {
        console.log("error: no products data available");
        return; 
    }
    const proContainer = document.createElement("div")
    proContainer.classList.add("pro-container") 
    productsData.forEach(product => {
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

renderProducts()

async function fetchAndRenderFeaturedProducts() {
    try {
        // Fetch featured products data
        const result = await fetchFeaturedProducts();
        // Render the fetched products
        renderFeaturedProducts(result); // Access the 'products' array from the result
    } catch (err) {
        console.log(err, "error fetching and rendering products");
    }
}

async function fetchFeaturedProducts() {
    try {
        const response = await fetch("shop.json");
        const result = await response.json(); 
        return result.pros.slice(8, 16);

    } catch (err) {
        console.log(err, "error fetching products");
    }
}

// Call the function to fetch and render products
fetchAndRenderFeaturedProducts();

function renderFeaturedProducts(products) {
    const proContainer = document.querySelector('.pro-container2');

    // Clear previous content

    // Loop through each product
    products.forEach(product => {
        // Create product element
        const proElement = document.createElement('div');
        proElement.classList.add('pro');

        proElement.onclick = function() {
            window.location.href = `sproduct.html?id=${product.id}`;
        };
        // Create image element
        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = '';

        // Create description element
        const desElement = document.createElement('div');
        desElement.classList.add('des');

        // Brand
        const brandElement = document.createElement('span');
        brandElement.textContent = product.brand;

        // Title
        const titleElement = document.createElement('h5');
        titleElement.textContent = product.name;

        // Rating
        const starElement = document.createElement('div');
        starElement.classList.add('star');
        for (let i = 0; i < product.stars; i++) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star');
            starElement.appendChild(starIcon);
        }

        // Price
        const priceElement = document.createElement('h4');
        priceElement.textContent = `$${product.price}`;

        // Add elements to description
        desElement.appendChild(brandElement);
        desElement.appendChild(titleElement);
        desElement.appendChild(starElement);
        desElement.appendChild(priceElement);

        // Add image and description to product element
        proElement.appendChild(imgElement);
        proElement.appendChild(desElement);

        // Add product element to container
        proContainer.appendChild(proElement);
    });
} 

const queryParams = new URLSearchParams(window.location.search)
const id = queryParams.get("id")

// Retrieve cart items from local storage
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Calculate the total quantity of items in the cart
const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
const lgBagSpan = document.querySelector("#lg-bag span");
lgBagSpan.textContent = totalQuantity.toString();

