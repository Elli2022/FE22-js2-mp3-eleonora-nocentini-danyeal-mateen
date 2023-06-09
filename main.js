import anime from "/node_modules/animejs/lib/anime.es.js";
import _ from "/node_modules/underscore/underscore-esm.js";
let chips, cookie, gum, candy, soda,data,dbdata,cartItems;
const url = `https://della-311b1-default-rtdb.europe-west1.firebasedatabase.app/.json`;
init()


cartItems= JSON.parse(localStorage.getItem("cartItems"))
let stock = [0,0,0,0,0]
console.log(cartItems);
  if (cartItems !== null) {
    cartItems.forEach((item) => {
      switch (item.name) {
        case "Candy Skittles":
          stock[0]++
          break;
        case "Chips Estrella":
          stock[1]++
          break;
        case "Gum Stimorol":
          stock[2]++
          break;
        case "Cookies Marabou":
          stock[3]++
          break;
        case "Soda Pepsi":
          stock[4]++
          break;
        default:
          break;
      }
    });
  }
document.getElementById("candyAmount").innerText+="1".repeat(stock[0])
document.getElementById("chipsAmount").innerText+="1".repeat(stock[1])
document.getElementById("cookieAmount").innerText+="1".repeat(stock[2])
document.getElementById("gumAmount").innerText+="1".repeat(stock[3])
document.getElementById("sodaAmount").innerText+="1".repeat(stock[4])

console.log("stock from localstorage:",stock);

 async function init() {
  await getProducts();
  updateGUI();
  checkAndDisableCandyBtn();
  checkAndDisableSodaBtn();
  checkAndDisableCookieBtn();
  checkAndDisableChipsBtn();
  checkAndDisableGumBtn();
 }


// let cartItems = JSON.parse(localStorage.getItem("cartItems"));
let productArray = [];
let itemToCartArray = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [];

const itemCounter = document.getElementById("itemCounter");


let itemsInCart = itemToCartArray? itemToCartArray.length : 0;
itemCounter.innerText = `Items in cart: ${itemsInCart}`;

const errorMessage = document.getElementById("errorMessage");

//How many products of each product the user wants to buy
const amountOfCandy = document.getElementById("candyAmount");
const amountOfChips = document.getElementById("chipsAmount");
const amountOfCookie = document.getElementById("cookieAmount");
const amountOfGum = document.getElementById("gumAmount");
const amountOfSoda = document.getElementById("sodaAmount");


//Cards pushed into the array
productArray.push(candy);
productArray.push(chips);
productArray.push(cookie);
productArray.push(gum);
productArray.push(soda);

//Sort products in alphabeticaly order
productArray = _.sortBy(productArray, "name");

//Cards
const productCard = document.getElementById("productCard");
const candyCard = document.getElementById("candyCard");
const chipsCard = document.getElementById("chipsCard");
const cookieCard = document.getElementById("cookieCard");
const gumCard = document.getElementById("gumCard");
const sodaCard = document.getElementById("sodaCard");

//Buttons
const candyBtn = document.getElementById("candyBtn");
const chipsBtn = document.getElementById("chipsBtn");
const cookieBtn = document.getElementById("cookieBtn");
const gumBtn = document.getElementById("gumBtn");
const sodaBtn = document.getElementById("sodaBtn");

// checkAndDisableCandyBtn();
candyBtn.addEventListener("click", () => {
  itemsInCart++;
  itemCounter.innerHTML = `${itemsInCart}`;
  itemCounter.innerText = `Items in cart: ${itemsInCart}`;
  amountOfCandy.innerText += 1; //Adds how many of the product in the DOm
  itemToCartArray.push(candy);
  localStorage.setItem("cartItems", JSON.stringify(itemToCartArray));
  data[0].stock--
  candyCard.style.textAlign = "center";

  updateGUI();
  checkAndDisableCandyBtn();

});


// checkAndDisableChipsBtn();
chipsBtn.addEventListener("click", () => {
  itemsInCart++;
  itemCounter.innerHTML = `${itemsInCart}`;
  itemCounter.innerText = `Items in cart: ${itemsInCart}`;
  amountOfChips.innerText += 1; //Adds how many of the product in the DOM
  itemToCartArray.push(chips);
  localStorage.setItem("cartItems", JSON.stringify(itemToCartArray));
  data[1].stock--
  chipsCard.style.textAlign = "center";
  updateGUI();
  checkAndDisableChipsBtn();
});


// checkAndDisableCookieBtn();
cookieBtn.addEventListener("click", async () => {
  itemsInCart++;
  itemCounter.innerText = `Items in cart: ${itemsInCart}`;
  amountOfCookie.innerText += 1; //Adds how many of the product in the DOm
  itemToCartArray.push(cookie);
  cookieCard.style.textAlign = "center";
  localStorage.setItem("cartItems", JSON.stringify(itemToCartArray));
  data[2].stock--
  updateGUI();
  checkAndDisableCookieBtn();
});


// checkAndDisableGumBtn();
gumBtn.addEventListener("click", async () => {
  itemsInCart++;
  itemCounter.innerText = `Items in cart: ${itemsInCart}`;
  amountOfGum.innerText += 1; //Adds how many of the product in the DOm
  itemToCartArray.push(gum);
  gumCard.style.textAlign = "center";
  localStorage.setItem("cartItems", JSON.stringify(itemToCartArray));
  data[3].stock--
  updateGUI();
  checkAndDisableGumBtn();
});

// checkAndDisableSodaBtn();
sodaBtn.addEventListener("click", () => {
  itemsInCart++;
  itemCounter.innerText = `Items in cart: ${itemsInCart}`;
  amountOfSoda.innerText += 1;
  itemToCartArray.push(soda);
  localStorage.setItem("cartItems", JSON.stringify(itemToCartArray));
  data[4].stock--
  sodaCard.style.textAlign = "center";
  updateGUI();
  checkAndDisableSodaBtn();
});


//Get products
async function getProducts() {

  try {
    const response = await fetch(url);
    const _data = await response.json();
    console.log(_data)
    data=_data
    candy = _data[0];
    chips = _data[1];
    cookie = _data[2];
    gum = _data[3];
    soda = _data[4];

   // console.log(candy)

  } catch (error) {
    console.log("Connection problem");
    errorMessage.innerText = `CONNECTION PROBLEMS`;
  }
}

function updateGUI
(){
  console.log(data);
  candyCard.innerHTML = `
  ${data[0].name}
  Price: ${data[0].price}

  <img id="url" src="${data[0].url}" />`;

    chipsCard.innerHTML = `
  ${data[1].name} 
  Price: ${data[1].price} 
  
  <img id="url" src="${data[1].url}" />`;

    cookieCard.innerHTML = `
   ${data[2].name} <br>
  Price: ${data[2].price} 
 
  <img id="url" src="${data[2].url}" />`;

    gumCard.innerHTML = `
   ${data[3].name} 
  Price: ${data[3].price} 
   
  <img id="url" src="${data[3].url}" />`;

    sodaCard.innerHTML = `
  ${data[4].name} 
  Price: ${data[4].price} 
 
  <img id="url" src="${data[4].url}" />`;
}


function checkAndDisableCandyBtn() {
  console.log(candy)
  if (candy.stock -stock[0] <= 0) {
    candyBtn.disabled = true;
  } else {
    candyBtn.disabled = false;
  }
}

function checkAndDisableChipsBtn() {
  if (chips.stock-stock[1]  <= 0) {
    chipsBtn.disabled = true;
  } else {
    chipsBtn.disabled = false;
  }
}

function checkAndDisableCookieBtn() {
  if (cookie.stock-stock[2]  <= 0) {
    cookieBtn.disabled = true;
  } else {
    cookieBtn.disabled = false;
  }
}

function checkAndDisableGumBtn() {
  if (gum.stock -stock[3] <= 0) {
    gumBtn.disabled = true;
  } else {
    gumBtn.disabled = false;
  }
}

function checkAndDisableSodaBtn() {
  if (soda.stock-stock[4] <= 0) {
    sodaBtn.disabled = true;
  } else {
    sodaBtn.disabled = false;
  }
}

setTimeout(function () {
  getProducts();
}, 100);

anime({
  targets: "div",
  duration: 1000,
  rotate: 360,
});
