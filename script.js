const productBox = document.querySelector(".product-box");
const input = document.querySelector(".input");
const loadingText = document.querySelector(".loadingText");

const apiUrl = "https://dummyjson.com/products";

let loading = false;

async function loadProducts() {
    loading = true;
    let res = await fetch(apiUrl);
    let data = await res.json();
    loading = false;

    const newProducts = data.products.map((item) => {
        const imageUrl = item.images[0] || 'https://via.placeholder.com/150';
        return `<div class="product-item">
                    <img class="product-img" src="${imageUrl}" alt="Product">
                    <div class="product-details">
                        <h3 class="product-name">${item.title}</h3>
                        <p class="product-price">$${item.price}</p>
                    </div>
                </div>`
    }).join('');

    productBox.innerHTML = newProducts;

    if(loading){
        loadingText.style.display = "block";
    }else{
        loadingText.style.display = "none";
    }
}

loadProducts();

input.addEventListener('input', () => {
    const searchValue = input.value.toLowerCase();
    const products = productBox.querySelectorAll('.product-item');

    products.forEach((item) => {
        const title = item.querySelector(".product-name").textContent.toLowerCase();
        if (title.includes(searchValue)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});