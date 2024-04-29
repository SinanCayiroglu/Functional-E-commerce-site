const queryParams = new URLSearchParams(window.location.search)
const id = queryParams.get("id")
// Fetch product data by ID from JSON file
async function fetchProductById(id) {
    try {
        const response = await fetch(`sproduct${id}.json`);
        const product = await response.json();
        return product;
    } catch (error) {
        throw new Error("Error fetching product data");
    }
}

fetchProductById(id)
    .then(product => {
        // Render the product details
        // renderProductDetails(product);
        renderProductDetails(product)
    })
    .catch(error => {
        console.error("Error fetching product:", error);
    });

// Function to render the product details
async function renderProductDetails(data) {
    const prodetails = document.querySelector("#prodetails")
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    const randomNumber2 = Math.floor(Math.random() * 8) + 1;
    const randomNumber3 = Math.floor(Math.random() * 8) + 1;
    let src = data.prodetails.content["single-pro-image"].content["small-img-group"].content[0]["small-img-col"].content.src
    const regex = /\/([fn])(\d+)/;
    src = src.replace(regex,(_,letter,digits)=>`/${letter}${randomNumber}`)
    let src2 = src.replace(regex,(_,letter,digits)=>`/${letter}${randomNumber2}`)
    let src3 = src.replace(regex,(_,letter,digits)=>`/${letter}${randomNumber3}`)

    prodetails.innerHTML=`
    <div class="single-pro-image">
            <img src="${data.prodetails.content['single-pro-image'].content.MainImg.src}" width="100%" id="MainImg" alt="">
            <div class="small-img-group">
            <div class="small-img-col">
                <img src="${data.prodetails.content['single-pro-image'].content['small-img-group'].content[0]['small-img-col'].content.src}" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
            <img src="${data.prodetails.content['single-pro-image'].content['small-img-group'].content[1]['small-img-col'].content.src}" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
            <img src="${data.prodetails.content['single-pro-image'].content['small-img-group'].content[2]['small-img-col'].content.src}" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
            <img src="${data.prodetails.content['single-pro-image'].content['small-img-group'].content[3]['small-img-col'].content.src}" width="100%" class="small-img" alt="">
            </div>
        </div>
    </div>
    <div class="single-pro-details">
        <h6>${data.prodetails.content['single-pro-details'].content[0].content}</h6>
        <h4>${data.prodetails.content['single-pro-details'].content[1].content}</h4>
        <h2>${data.prodetails.content['single-pro-details'].content[2].content}</h2>
        <select>
            ${data.prodetails.content['single-pro-details'].content[3].content.map(option => `<option>${option.content}</option>`).join('')}
        </select>
        <input type="number" value="${data.prodetails.content['single-pro-details'].content[4].value}">
        <button class="${data.prodetails.content['single-pro-details'].content[5].class}">${data.prodetails.content['single-pro-details'].content[5].content}</button>
        <h4>${data.prodetails.content['single-pro-details'].content[6].content}</h4>
        <span>${data.prodetails.content['single-pro-details'].content[7].content}</span>
    </div>
`;
}

async function fetchProducts() {
    try {
        const response = await fetch("shop.json");
        const result = await response.json(); 
        return result;
    } catch (err) {
        console.log(err, "error fetching products");
    }
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

renderProductsRandomly()

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


document.addEventListener("click",function(event){
    if(event.target.classList.contains("small-img")){
        const MainImg = document.getElementById("MainImg")
        MainImg.src = event.target.src
    }
})

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("normal")) {
        const productId = queryParams.get("id");
        alert("Added to cart:"+productId)
        addToCart(productId);
    }
});

function addToCart(productId) {
    const product = getProductDetails(productId);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the same product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
        // If the product exists, update its quantity
        cart[existingProductIndex].quantity+= parseFloat(product.quantity);
    } else {
        // Otherwise, add the product to the cart
        product.quantity = parseFloat(product.quantity);
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function getProductDetails(productId) {
    const productElement = document.querySelector(".single-pro-details");
    const productImage = document.querySelector(".single-pro-image img").getAttribute("src");
    const productName = productElement.querySelector("h4").textContent;
    const productPrice = productElement.querySelector("h2").textContent;
    const productQuantity = productElement.querySelector("input").value
    console.log(productQuantity)
    return {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: productQuantity 
    };
}


function addToLocalStorage(product){
    let cart = JSON.parse(localStorage.getItem("cart")||[])
    
        cart.push(product)
    
    localStorage.setItem("cart",JSON.stringify(cart))
}

// Retrieve cart items from local storage
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Calculate the total quantity of items in the cart
const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
const lgBagSpan = document.querySelector("#lg-bag span");
lgBagSpan.textContent = totalQuantity.toString();
