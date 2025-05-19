// Luxury dress data for Muna Designs
const dresses = [
    {
        id: 1,
        title: "Enchanted Rose Gown",
        price: 599.99,
        image: "https://source.unsplash.com/random/600x600?evening-gown",
        colors: ["#e83e8c", "#212121", "#FFD700"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "A breathtaking evening gown with delicate rose gold embroidery. The fitted bodice flows into a dramatic skirt that moves beautifully.",
        badge: "Exclusive"
    },
    {
        id: 2,
        title: "Golden Hour Maxi",
        price: 459.99,
        image: "https://source.unsplash.com/random/600x600?maxi-dress",
        colors: ["#FFD700", "#e83e8c", "#ffffff"],
        sizes: ["S", "M", "L"],
        description: "This flowing maxi dress shimmers like the golden hour. The lightweight fabric drapes elegantly with a flattering silhouette.",
        badge: "Bestseller"
    },
    {
        id: 3,
        title: "Black Velvet Couture",
        price: 699.99,
        image: "https://source.unsplash.com/random/600x600?velvet-dress",
        colors: ["#212121", "#424242"],
        sizes: ["XS", "S", "M", "L"],
        description: "Luxurious black velvet with gold thread detailing. This couture piece features a plunging neckline and dramatic sleeves.",
        badge: "Luxury"
    },
    {
        id: 4,
        title: "Blush Pink Tulle",
        price: 549.99,
        image: "https://source.unsplash.com/random/600x600?tulle-dress",
        colors: ["#e83e8c", "#f8bbd0", "#ffffff"],
        sizes: ["S", "M", "L", "XL"],
        description: "Romantic tulle ballgown with delicate floral appliqués. The sweetheart neckline and fitted bodice create a fairytale silhouette.",
        badge: "Bridal"
    },
    {
        id: 5,
        title: "Gold Sequin Midi",
        price: 389.99,
        image: "https://source.unsplash.com/random/600x600?sequin-dress",
        colors: ["#FFD700", "#c2185b", "#212121"],
        sizes: ["XS", "S", "M"],
        description: "Party-ready sequin dress that catches every light. The wrap design flatters all figures while allowing freedom to dance.",
        badge: "New"
    },
    {
        id: 6,
        title: "Pink Satin Slip",
        price: 349.99,
        image: "https://source.unsplash.com/random/600x600?satin-dress",
        colors: ["#e83e8c", "#f8bbd0"],
        sizes: ["S", "M", "L"],
        description: "Luxurious satin slip dress with delicate gold chain straps. The bias cut creates beautiful movement and a timeless silhouette.",
        badge: "Popular"
    }
];

// Shopping cart
let cart = [];

// Load dresses
function loadDresses() {
    const dressGrid = document.querySelector('.dress-grid');
    
    dresses.forEach(dress => {
        const dressElement = document.createElement('div');
        dressElement.className = 'dress-card';
        dressElement.innerHTML = `
            ${dress.badge ? `<div class="dress-badge">${dress.badge}</div>` : ''}
            <img src="${dress.image}" alt="${dress.title}" class="dress-image">
            <div class="dress-info">
                <h3 class="dress-title">${dress.title}</h3>
                <div class="dress-price">$${dress.price.toFixed(2)}</div>
                <div class="dress-colors">
                    ${dress.colors.map(color => `<div class="color-option" style="background-color: ${color};"></div>`).join('')}
                </div>
                <div class="dress-actions">
                    <button class="view-details" data-id="${dress.id}">Details</button>
                    <button class="add-to-cart" data-id="${dress.id}">Add to Bag</button>
                </div>
            </div>
        `;
        dressGrid.appendChild(dressElement);
    });
}

// Update cart display
function updateCartDisplay() {
    const orderItems = document.querySelector('.order-items');
    const cartCount = document.querySelector('.cart-count');
    const subtotal = document.querySelector('.subtotal');
    const total = document.querySelector('.total-amount');
    
    // Clear current items
    orderItems.innerHTML = '';
    
    // Add each item to the order panel
    cart.forEach(item => {
        const dress = dresses.find(d => d.id === item.id);
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <img src="${dress.image}" alt="${dress.title}">
            <div class="order-item-details">
                <h4 class="order-item-title">${dress.title}</h4>
                <div class="order-item-price">$${dress.price.toFixed(2)}</div>
                <div class="order-item-color">Color: <span style="background-color: ${item.color}; width: 15px; height: 15px; border-radius: 50%; display: inline-block; border: 1px solid #eee;"></span></div>
                <div class="order-item-size">Size: ${item.size}</div>
                <span class="order-item-remove" data-id="${item.id}">Remove</span>
                <div class="order-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        orderItems.appendChild(orderItem);
    });
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Calculate subtotal and total
    const cartSubtotal = cart.reduce((sum, item) => {
        const dress = dresses.find(d => d.id === item.id);
        return sum + (dress.price * item.quantity);
    }, 0);
    
    subtotal.textContent = `$${cartSubtotal.toFixed(2)}`;
    total.textContent = `$${cartSubtotal.toFixed(2)}`;
}

// Show quick view modal
function showQuickView(dressId) {
    const dress = dresses.find(d => d.id === dressId);
    const modal = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="modal-image" style="background-image: url('${dress.image}')"></div>
        <div class="modal-details">
            <h2 class="modal-title">${dress.title}</h2>
            <div class="modal-price">$${dress.price.toFixed(2)}</div>
            <p class="modal-description">${dress.description}</p>
            
            <div class="size-selector">
                <label>Select Size</label>
                <div class="size-options">
                    ${dress.sizes.map(size => `<div class="size-option">${size}</div>`).join('')}
                </div>
            </div>
            
            <div class="color-selector">
                <label>Select Color</label>
                <div class="color-options">
                    ${dress.colors.map(color => `
                        <div class="color-option-modal" style="background-color: ${color};" data-color="${color}"></div>
                    `).join('')}
                </div>
            </div>
            
            <div class="quantity-selector">
                <label>Quantity</label>
                <div class="quantity-selector-input">
                    <button class="quantity-btn-modal minus">-</button>
                    <span class="quantity-value-modal">1</span>
                    <button class="quantity-btn-modal plus">+</button>
                </div>
            </div>
            
            <button class="modal-add-to-cart" data-id="${dress.id}">
                <i class="fas fa-shopping-bag"></i> Add to Collection
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Set up modal interactions
    const sizeOptions = modalContent.querySelectorAll('.size-option');
    const colorOptions = modalContent.querySelectorAll('.color-option-modal');
    const minusBtn = modalContent.querySelector('.quantity-btn-modal.minus');
    const plusBtn = modalContent.querySelector('.quantity-btn-modal.plus');
    const quantityValue = modalContent.querySelector('.quantity-value-modal');
    const addToCartBtn = modalContent.querySelector('.modal-add-to-cart');
    const closeModalBtn = document.querySelector('.close-modal');
    
    let selectedSize = dress.sizes[0];
    let selectedColor = dress.colors[0];
    let quantity = 1;
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedSize = option.textContent;
        });
    });
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.dataset.color;
        });
    });
    
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityValue.textContent = quantity;
    });
    
    addToCartBtn.addEventListener('click', () => {
        addToCart(dress.id, selectedSize, selectedColor, quantity);
        modal.style.display = 'none';
    });
    
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Select first size and color by default
    sizeOptions[0].classList.add('selected');
    colorOptions[0].classList.add('selected');
}

// Add item to cart
function addToCart(id, size, color, quantity) {
    const existingItem = cart.find(item => item.id === id && item.size === size && item.color === color);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id,
            size,
            color,
            quantity
        });
    }
    
    updateCartDisplay();
    
    // Show confirmation
    const dress = dresses.find(d => d.id === id);
    alert(`${quantity} ${dress.title} (Size: ${size}) added to your collection!`);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
}

// Update item quantity in