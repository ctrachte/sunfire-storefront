async function getProducts() {
   let response;
   await fetch("/products")
    .then(async (res) => {
      response = await res.json();
      response.prices.forEach((price) => {
        let currency = price.currency === "usd" ? "$" : price.currency;
        let cost = (parseFloat((price.custom_unit_amount ? 
            price.custom_unit_amount.preset : 
            price.unit_amount)/100)).toFixed(2)
        cost = price.custom_unit_amount ? "Suggested Donation: " + currency.toUpperCase() + cost : 
            currency.toUpperCase() + cost;
        if (price.type === "recurring") {
            cost+= " per " + price.recurring.interval;
        }
        let product = response.products.filter(
          (product) => product.id === price.product
        )[0];
        let image = (typeof product.images !== "undefined" && product.images.length)
          ? product.images[0]
          : "/sunfireNewLogoSmall.jpg";
        let linkElement = document.createElement("div");
        linkElement.innerHTML = `<div class="flex flex-wrap w-1/3">
            <div class="p-10 flex justify-center content-center">
                <div
                class="text-center max-w-sm cursor-pointer rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                            <img class="w-full" src="${image}" alt="SunfireOriginalLogo">
                    <div class="font-bold text-center text-orange-500 text-xl m-2">${product.name}</div>
                </br>
                    <p class="font-bold text-center text-gray-700 text-base">
                    ${product.description || "No description provided."}
                    </p>
                    <p class="text-center text-gray-700 text-base">
                    ${cost}
                    </p>
                </br>
                </div>
                <div class="block text-center px-6 pt-4 pb-2">
                <div class="mb-3 xl:w-96">
                        <label for="Quantity-${price.id}" 
                            class="form-label text-gray-700"
                        >Quantity</label
                        >
                        <input
                        type="number"
                        class="
                            quantity
                            form-control
                            w-auto
                            px-4
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-2
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="Quantity-${price.id}"
                        value="1"
                        />
                    </div>
                    <button 
                    name="add-qty-${price.id}"
                    role="button"
                    class="add text-orange-500 hover:text-red-700 font-bold py-2 px-4 m-2 rounded"
                    >
                    Add to Cart
                    </button >

                    <button 
                    name="remove-qty-${price.id}"
                    role="button"
                    class="remove text-orange-500 hover:text-red-700 font-bold py-2 px-4  m-2 rounded"
                    >
                    Remove from Cart
                    </button >
                </div>
                </div>
            </div>
            </div>`;
        let quantity = linkElement.querySelector(".quantity");
        linkElement
          .querySelector(".remove")
          .addEventListener("click", function (e) {
            removeFromCart(price.id, quantity.value);
          });
        linkElement
          .querySelector(".add")
          .addEventListener("click", function (e) {
            addToCart(price.id, quantity.value);
          });
        document.querySelector(".links-container").appendChild(linkElement);
      });
    })
    .catch((err) => console.error(err));
  return response ? response : [];
}
// get all on start of index.html
const state = getProducts();

// create cart object, set into local storage
let cart = [];
// on check of items, add to cart
const addToCart = async (id, value = 1) => {
  const found = cart.find((item) => item.price === id);
  if (found) {
    found.quantity = parseInt(found.quantity) + parseInt(value);
  } else {
    cart.push({ price: id, quantity: value });
  }
  updateCart();
};
// on uncheck, remove items from cart
const removeFromCart = async (id, value = 1) => {
  const found = cart.find((item) => item.price === id);
  if (found) {
    if (parseInt(found.quantity) > parseInt(value)) {
      found.quantity = parseInt(found.quantity) - parseInt(value);
    } else {
      let i = cart.indexOf(found);
      cart.splice(i, 1);
    }
  }
  updateCart();
};

// onchange of cart:

const updateCart = () => {
  // update cart total qty
  let total = 0;
  cart.map((item) => {
    total += parseInt(item.quantity);
  });
  document.getElementById("myCart_qty").innerHTML = total;
  // create link and associate with cart button
  createLink(cart);
};

async function createLink(cartObj) {
  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(cartObj), // body data type must match "Content-Type" header
  };
  return await fetch("/create-link", options)
    .then(async (res) => {
      let result = await res.json();
      document.getElementById("myCart").addEventListener("click", (e) => {
        window.location.href = result.url;
      });
    })
    .catch((err) => console.error(err));
}
