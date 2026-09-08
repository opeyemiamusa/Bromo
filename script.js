 const navLinks = document.querySelector('.nav-links');
        const menuBtn = document.querySelector('#menuBtn');
        const closeBtn = document.querySelector('#closeBtn');

        closeBtn.addEventListener('click',()=>{
             navLinks.classList.toggle('show');
        });
        menuBtn.addEventListener('click',()=>{
             navLinks.classList.toggle('show');
        });
      
const mainImg = document.getElementById('mainImg');
const smallImg = document.querySelectorAll('.small-Img');

smallImg.forEach(img => {
    img.addEventListener('click', function () {
        mainImg.src = this.src;
    });
});

const shopBtns = document.querySelectorAll('.add-cart');

shopBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        const product = button.parentElement;
        const productName = product.querySelector('h4').textContent;
        const productPrice = product.querySelector('.price').textContent;
        const productImage = product.querySelector('img').src;

        const productInfo = {
            name: productName,
            price: productPrice,
            image: productImage,
            quality: 1
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quality++;
        } else {
            cart.push(productInfo);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

  const addToCartBtns = document.querySelectorAll('#addToCartBtn');
if (addToCartBtns) {
    addToCartBtns.forEach(button => {
        button.addEventListener('click', () => {

            const productName = document.querySelector('h4').textContent;
            const productPrice = document.querySelector('h3').textContent;
            const productImage = document.querySelector('#mainImg').src;
            const productSize = document.querySelector('#dropdown').value;
            const productQuality = Number(
                document.querySelector('#product-indication input').value
            );

            const productInfo = {
                name: productName,
                price: productPrice,
                image: productImage,
                size: productSize,
                quality: productQuality
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProduct = cart.find(
                item => item.name === productName && item.size === productSize
            );

            if (existingProduct) {
                existingProduct.quality += productQuality;
            } else {
                cart.push(productInfo);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
}

const cartItems = document.getElementById('cart-items');
if (cartItems) {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutLink = checkoutBtn.parentElement;

    if (savedCart.length === 0) {
        checkoutLink.removeAttribute('href');
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
        checkoutBtn.textContent = 'Cart is Empty';
    } else {
        checkoutLink.setAttribute('href', 'checkout.html');
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
        checkoutBtn.textContent = 'Proceed to Checkout';
    }

    savedCart.forEach((product, index) => {
        const price = parseFloat(product.price.replace(/[^0-9]/g, '')) || 0;
        const quality = Number(product.quality) || 1;
        const total = price * quality;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.size || 'N/A'}</td>
            <td>$${price.toLocaleString()}</td>
            <td>
                <button class="minus-btn" data-index="${index}">-</button>
                <span>${quality}</span>
                <button class="plus-btn" data-index="${index}">+</button>
            </td>
            <td>$${total.toLocaleString()}</td>
            <td>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </td>
        `;

        cartItems.appendChild(row);
    });

   let subtotal = 0;
   savedCart.forEach(product =>{
     const price = parseFloat(product.price.replace(/[^0-9]/g, '')) || 0;
     const quantity = Number(product.quality)||1;
     subtotal += price*quantity;

     const cartSubtotal = document.getElementById('cart-subtotal');
     cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;
   });

   const plusBtns = document.querySelectorAll('.plus-btn');
   plusBtns.forEach(button => {
     button.addEventListener('click', ()=>{
       const index = button.dataset.index;
       savedCart[index].quality++;
       localStorage.setItem('cart', JSON.stringify(savedCart));
       location.reload();
     });
   });
     const minusBtns = document.querySelectorAll('.minus-btn');
   minusBtns.forEach(button => {
     button.addEventListener('click', ()=>{
       const index = button.dataset.index;
       if (savedCart[index].quality > 1) {
      savedCart[index].quality--;
       }
      localStorage.setItem('cart', JSON.stringify(savedCart));
       location.reload();
     });
   });

   const removeBtns = document.querySelectorAll('.remove-btn');
     removeBtns.forEach(button => {
       button.addEventListener('click', () => {

        const index = button.dataset.index;
        savedCart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(savedCart));
        button.closest('tr').remove();


    
        let subtotal = 0;

        savedCart.forEach(product => {
            const price = parseFloat(
                product.price.replace(/[^0-9]/g, '')
            ) || 0;

            const quantity = Number(product.quality) || 1;

            subtotal += price * quantity;
        });
        document.getElementById('cart-subtotal').textContent =
            `$${subtotal.toLocaleString()}`;


        if (savedCart.length === 0) {
            const checkoutBtn = document.getElementById('checkout-btn');
            const checkoutLink = checkoutBtn.parentElement;

            checkoutLink.removeAttribute('href');
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.cursor = 'not-allowed';
            checkoutBtn.textContent = 'Cart is Empty';
        }
    });
});
}

const submitBtn = document.getElementById('submit-btn');

if (submitBtn) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    submitBtn.addEventListener('click', () => {

        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameInput.style.border = '1px solid red';
            isValid = false;
        } else {
            nameInput.style.border = '';
        }

        // Phone validation
        if (phoneInput.value.trim() === '') {
            phoneInput.style.border = '1px solid red';
            isValid = false;
        } else {
            phoneInput.style.border = '';
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            emailInput.style.border = '1px solid red';
            isValid = false;
        } else {
            emailInput.style.border = '';
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageInput.style.border = '1px solid red';
            isValid = false;
        } else {
            messageInput.style.border = '';
        }

        // Show success message
        if (isValid) {
            const oldMessage = document.querySelector('.success-message');

            if (oldMessage) {
                oldMessage.remove();
            }

            const successMessage = document.createElement('p');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message submitted successfully!';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '10px';

            document.querySelector('.form').appendChild(successMessage);

            // Clear the form
            nameInput.value = '';
            phoneInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
        }
    });
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();

        if (!name || !email || !phone || !address || !city) {
            const errorMessage = document.createElement('p');

            errorMessage.textContent = 'Please fill in all your details.';
            errorMessage.style.color = 'red';

            checkoutForm.appendChild(errorMessage);
            return;
        }
    });
}
const payBtn = document.getElementById('pay-btn');
const paymentSuccess = document.getElementById('payment-success');

if (payBtn) {
    payBtn.addEventListener('click', () => {

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();

        if (!name || !email || !phone || !address || !city) {
            alert('Please fill in your details first.');
            return;
        }

        const selectedPayment = document.querySelector(
            'input[name="payment"]:checked'
        );

        if (!selectedPayment) {
            alert('Please select a payment method.');
            return;
        }

        paymentSuccess.style.display = 'block';
    });
}


const banner = document.querySelector('.banner');

if (banner) {
    const bannerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                banner.classList.add('animate');
            } else {
                banner.classList.remove('animate');
            }

        });
    });

    bannerObserver.observe(banner);
}

const hero = document.querySelector('.hero-section');
if (hero) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                hero.classList.add('animate');
            } else {
                hero.classList.remove('animate');
            }

        });
    });

    heroObserver.observe(hero);
}


const smBanner = document.querySelector('.sm-banner');

if (smBanner) {
    const smBannerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                smBanner.classList.add('animate');
            } else {
                smBanner.classList.remove('animate');
            }

        });
    });

    smBannerObserver.observe(smBanner);
}

const aboutDetails = document.querySelector('.about-details');

if (aboutDetails) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                aboutDetails.classList.add('animate');
            } else {
                aboutDetails.classList.remove('animate');
            }

        });
    });

    aboutObserver.observe(aboutDetails);
}

