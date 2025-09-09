let total = 0;
  let ammount = document.getElementById("value");
let loadCategory = ()=>{

    let url = "https://openapi.programming-hero.com/api/categories";

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
}

let displayCategory =(loads)=>{

    

    let categorieContainer = document.getElementById("Catagorie");
    categorieContainer.innerHTML = "";

    loads.forEach((load) =>{
        // console.log(load)
        let catagorieDiv = document.createElement("div");

        catagorieDiv.innerHTML = `
           <button id="active-btn-${load.id}"  onclick="displayCat(${load.id}); manageSpin(${true});" class="btn w-full hover:text-white hover:bg-[#15803D] category-btn">${load.category_name}</button>
        `

        categorieContainer.appendChild(catagorieDiv);
    })
}

// remove btn
let removeActive = () =>{
  let cateBtn = document.querySelectorAll(".category-btn");

  cateBtn.forEach((btn) =>{
    btn.classList.remove("active");
  })
}

let displayCat = (id) =>{
    
    // console.log(id);
   let url3 = `https://openapi.programming-hero.com/api/category/${id}`
   fetch(url3)
   .then((res) => res.json())
   .then((cate) =>{

    removeActive();
    let clickBtn = document.getElementById(`active-btn-${id}`);
    // console.log(clickBtn);
    clickBtn.classList.add("active");
     showCate(cate.plants)
   })
   
}

 let showCate = (cates) =>{
    let cardContainer = document.getElementById("main-card");
    cardContainer.innerHTML = "";

    // console.log(cates);
    cates.forEach((data) =>{
        plantMain = document.createElement("div");

        plantMain.innerHTML = `
         <div class="plants-card shadow-xl rounded-md p-4  h-full  ">
          <img src="${data.image}"  class="w-full h-[15em]  rounded-md bg-contain" alt="">
          <h1 class=" btn border-none font-bold my-2">${data.name}</h1>
          <p class="text-gray-500 h-[10em] overflow-auto my-4">${data.description}</p>
          <div class="flex justify-between items-center my-4" >
            <button class="btn bg-[#CFF0DC] rounded-xl text-[#15803D]">${data.category}</button>
            <p class="font-semibold"> ৳${data.price}</p>
          </div>
          <button class="btn mt-2 w-full text-white bg-[#15803D]">Add to Cart</button>
        </div>
        `
        cardContainer.appendChild(plantMain);
    })

    manageSpin(false);

    
 }


// main card category

 let  mainCard = ()=> {

  // manageSpin(true);
    let url2 = "https://openapi.programming-hero.com/api/plants";

    fetch(url2)
    .then((res) => res.json())
    .then((data2) => displayCard(data2.plants));
 }

// manage spinner

  let manageSpin = (status) => {
    if(status == true)
    {
      document.getElementById("spin").classList.remove("hidden");
      document.getElementById("main-card").classList.add("hidden");
    }else{
       document.getElementById("main-card").classList.remove("hidden");
       document.getElementById("spin").classList.add("hidden");
     

    }
  }



 let displayCard = (plantstree) =>{
   
   
    // console.log(plantstree);
    let cardContainer = document.getElementById("main-card");
    cardContainer.innerHTML = "";

    plantstree.forEach((plant) => {
        let plantDiv = document.createElement("div");

        plantDiv.innerHTML = `
              
        <div class="plants-card shadow-xl rounded-md p-4  h-full  ">
          <img src="${plant.image}"  class="w-full h-[15em]  rounded-md bg-contain" alt="">
          <h1 onclick="loadDetail(${plant.id})"  class=" btn border-none font-bold my-2">${plant.name}</h1>
          <p class="text-gray-500 h-[10em] overflow-clip my-4">${plant.description}</p>
          <div class="flex justify-between items-center my-4" >
            <button class="btn bg-[#CFF0DC] rounded-xl text-[#15803D]">${plant.category}</button>
            <p class="font-semibold"> ৳${plant.price}</p>
          </div>
          <button onclick="addCart(${plant.id})" class="btn mt-2 w-full bg-[#15803D] text-white">Add to Cart</button>
        </div>
        
        `
        cardContainer.appendChild(plantDiv);
    });

    // manageSpin(false);

  }
  
  let addCart = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((cart => displayCart(cart.plants)));
   
  }

 let displayCart = (carts) =>{
  // console.log(carts.name);
  let getCart = document.getElementById("add-cart");



  total = Number(carts.price) + total;

  ammount.innerText = `৳ ${total}`;

  let newCart = document.createElement("div");
  newCart.innerHTML = 
  `
     <div id="remove-btn-${carts.id}" class="cart-contain flex items-center justify-between  p-3 my-2 rounded-md bg-[#CFF0DC]">
             <div  class="price">
              <h1 class="font-bold">${carts.name}</h1>
              <p class="font-semibold my-2">৳${carts.price}</p>
            </div>
            <div>
              <button onclick="remove(${carts.id},${carts.price})" class="btn bg-[#CFF0DC]"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>

  `
  
  getCart.appendChild(newCart);
 }

//  remove btn
  let remove = (id,price) =>{
    
    console.log(price,id);
    
    let removeCart = document.getElementById(`remove-btn-${id}`);

    total = total - Number(price);

    ammount.innerText = `৳${total}`;
    
     removeCart.style.display = "none";

  }




 let loadDetail = (id) =>{
  let url4 = `https://openapi.programming-hero.com/api/plant/${id}`

  fetch(url4)
  .then((res) => res.json())
  .then((data) => displayDetail(data.plants))

 }

 let displayDetail = (card) =>{
 console.log(card);
   let detailBox = document.getElementById("modal-container");

   detailBox.innerHTML =
    `
     
        <h1 class="font-bold">${card.name}</h1>
        <img src="${card.image}" class="w-full h-[15em] mx-auto  my-2 rounded-md bg-contain " alt="">
        <h1 class="font-semibold">${card.category}</h1>
        <p class="my-2">${card.description}</p>
   `

   document.getElementById("my_modal_5").showModal();

 }

loadCategory();

mainCard();





