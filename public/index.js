async function getLinks () {
    return await fetch('/links').then(async (res) =>{
        let response = await res.json();
        console.log(response)
        response.prices.forEach((price) => {
        let linkElement = document.createElement('div')
        linkElement.innerHTML = 
        `<div class="flex flex-wrap w-1/3">
            <div class="p-10 flex justify-center content-center">
                <!--Card 1-->
                <div
                class="text-center max-w-sm cursor-pointer rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                            <img class="w-full" src="/sunfireNewLogoSmall.jpg" alt="SunfireOriginalLogo">
    
                    <div class="font-bold text-center text-orange-500 text-xl mb-2">Sunfire Monthly</div>
                </br>
                    <p class="font-bold text-center text-gray-700 text-base">
                    Try Sunfire Monthly - 30 days free!
                    </p>
                    <p class="text-center text-gray-700 text-base">
                    Then just $15.00 per month
                    </p>
                </br>
                    <p class="text-center text-gray-700 text-base">
                    Every month you will be sent a fresh bottle of Sunfire Original hot
                    sauce!
                    </p>
                </div>
                <div class="text-center px-6 pt-4 pb-2">
                    <div
                    name="remove-qty-${price.id}"
                    role="button"
                    class="cursor-pointer remove block bg-orange-500 rounded-full w-auto px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                    Remove from Cart
                    </div>
                    <label for="qty-${price.id}">Quantity:</label>
                    <input name="qty-${price.id}" type="number" id="qty-${price.id}" value="1" class="text-center content-center justify-center w-auto border cursor-pointer quantity block bg-grey-100 rounded-full px-1 py-1 text-sm font-semibold mr-2 mb-2"/>
                    <div
                    name="add-qty-${price.id}"
                    role="button"
                    class="cursor-pointer add block bg-orange-500 rounded-full px-3 py-1 text-sm font-semibold w-auto mr-2 mb-2"
                    >
                    Add to Cart
                    </div>
                </div>
                </div>
            </div>
            </div>`;
        let quantity = linkElement.querySelector('.quantity');
        linkElement.querySelector('.remove').addEventListener('click', function (e) {
            removeFromCart(price.id, quantity.value);
        });
        linkElement.querySelector('.add').addEventListener('click', function (e) {
            addToCart(price.id, quantity.value);
        });
        document.querySelector('.links-container').appendChild(linkElement)
    });
    }).catch( err => console.error(err));
}
// get all on start of index.html
let res = getLinks();

// create cart object, set into local storage
let cart = [];
// on check of items, add to cart
const addToCart  = async (id, value = 1) => {
    const found = cart.find(item => item.price === id);
    if (found) {
        found.quantity = parseInt(found.quantity)+ parseInt(value);
    } else {
        cart.push({price:id, quantity: value})
    }
}
// on uncheck, remove items from cart
const removeFromCart  = async (id, value = 1) => {
    const found = cart.find(item => item.price === id);
    if (found) {
        if (parseInt(found.quantity) > parseInt(value)) {
            found.quantity = parseInt(found.quantity) - parseInt(value);
            console.log(found.quantity, value)
        } else {
            let i = cart.indexOf(found);
            cart.splice(i, 1);
        }
    }
}