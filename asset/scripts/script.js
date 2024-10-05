const API_URL = "https://myautobill-production-e577.up.railway.app/product";

const loadProducts = async () => {
    // Display loading message
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<p>Loading products...</p>';

    try {
        const response = await axios.get(API_URL);
        const products = response.data;

        // Clear the current product list
        productList.innerHTML = ''; // Clear existing products

        // Check if products are returned
        if (!products || products.length === 0) {
            productList.innerHTML = '<p>No products available</p>';
            return;
        }

        // Display products
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Units Available: ${product.taken} ${product.unit}</p>
                <p>Total Payable: $${product.payable.toFixed(2)}</p>
            `;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
};

const checkout = () => {
    // Handle checkout process here
    alert("Checkout initiated!"); // Replace this with your actual checkout logic
    // Example: Redirect to checkout page
    // window.location.href = 'checkout.html';
};

// Load products on page load
window.onload = () => {
    loadProducts(); // Load products on page load
    setInterval(loadProducts, 10000); // Reload products every 10 seconds
};
