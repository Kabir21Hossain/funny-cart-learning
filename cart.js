const addToCartBtn = document.querySelectorAll('.add-to-cart');

let cart = [];

addToCartBtn.forEach(btn => {
    btn.addEventListener('click', function (event) {
        // Use event.currentTarget instead of event.target to always refer to the button,
        // so that inside clicking the span/icon doesn't break parentNode
        const card = event.currentTarget.parentNode;
        const title = card.querySelector('.title').innerText;
        const price = card.querySelector('.price').innerText;
        const priceNumber = parseFloat(price.replace('$', ''));

        const product = {
            name: title,
            price: priceNumber,
            quantity: 1
        };

        let quantityNumber = document.getElementById('quantityNumber').innerText;
        quantityNumber = parseInt(quantityNumber);
        quantityNumber = quantityNumber + 1;
        document.getElementById('quantityNumber').innerText = quantityNumber;

        addToCart(product);


    });
});



const cartLogo = document.getElementById('cartLogo');
cartLogo.addEventListener('click', function () {
    displayCart();

});

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }


}

function displayCart(){
    // Check if cart container already exists to avoid duplicates
    let cartView = document.getElementById('cart-view-container');

    let cancelBtn=document.createElement('span');
    cancelBtn.innerText='x';
    cancelBtn.className='absolute top-2 right-2 hover:bg-red-600 hover:text-white rounded-lg w-6 h-6 flex items-center justify-center cursor-pointer';
    

    if (!cartView) {
        cartView = document.createElement('div');
        cartView.id = 'cart-view-container';
        cartView.className = 'relative mt-10  p-6 bg-white/10 rounded-xl border border-white/20';
        document.querySelector('main').appendChild(cartView);
    }
    
    // Reset display to block in case it was previously set to 'none' by the cancel button!
    cartView.style.display = 'block';

    cartView.innerHTML = `<h2 class="text-2xl font-bold mb-4 text-fuchsia-300">Cart Results:</h2>`;
    
    let totalPrice = 0;

    cart.forEach(item => {
        const p = document.createElement('p');
        p.innerText = `${item.name} - $${item.price} - Quantity: ${item.quantity}`;
        p.className = 'mb-2 text-slate-200';
        cartView.appendChild(p);
        totalPrice = totalPrice + (item.price * item.quantity); // Multiply by quantity for correct total
    });

    const p2 = document.createElement('p');
    p2.innerText = `Total Price: $${totalPrice}`;
    p2.className = 'text-xl font-bold mt-4 text-fuchsia-400';
    cartView.appendChild(p2);

    cartView.appendChild(cancelBtn);
    cancelBtn.addEventListener('click',function(){
        cartView.style.display='none';
    });
}


