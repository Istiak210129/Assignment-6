
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
           <button id="active-btn-${load.id}" onclick="displayCat(${load.id})" class="btn w-full hover:bg-[#15803D] category-btn">${load.category_name}</button>
        `

        categorieContainer.appendChild(catagorieDiv);
    })
}


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
          <img src="${data.image}"  class="w-full h-[15em] border-2 rounded-md bg-contain" alt="">
          <h1 class=" btn border-none font-bold my-2">${data.name}</h1>
          <p class="text-gray-500 h-[10em] overflow-auto my-4">${data.description}</p>
          <div class="flex justify-between items-center my-4" >
            <button class="btn bg-[#CFF0DC] rounded-xl text-[#15803D]">${data.category}</button>
            <p class="font-semibold"> ৳${data.price}</p>
          </div>
          <button class="btn mt-2 w-full bg-[#15803D]">Add to Cart</button>
        </div>
        `
        cardContainer.appendChild(plantMain);
    })

    
 }


// main card category

 let  mainCard = ()=> {
    let url2 = "https://openapi.programming-hero.com/api/plants";

    fetch(url2)
    .then((res) => res.json())
    .then((data2) => displayCard(data2.plants));
 }


 let displayCard = (plantstree) =>{
   
    // console.log(plantstree);
    let cardContainer = document.getElementById("main-card");
    cardContainer.innerHTML = "";

    plantstree.forEach((plant) => {
        let plantDiv = document.createElement("div");

        plantDiv.innerHTML = `
              
        <div class="plants-card shadow-xl rounded-md p-4  h-full  ">
          <img src="${plant.image}"  class="w-full h-[15em] border-2 rounded-md bg-contain" alt="">
          <h1 onclick="loadDetail(${plant.id})"  class=" btn border-none font-bold my-2">${plant.name}</h1>
          <p class="text-gray-500 h-[10em] overflow-auto my-4">${plant.description}</p>
          <div class="flex justify-between items-center my-4" >
            <button class="btn bg-[#CFF0DC] rounded-xl text-[#15803D]">${plant.category}</button>
            <p class="font-semibold"> ৳${plant.price}</p>
          </div>
          <button class="btn mt-2 w-full bg-[#15803D]">Add to Cart</button>
        </div>
        
        `
        cardContainer.appendChild(plantDiv);
    })



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
        <img src="${card.image}" class="w-full h-[15em] mx-auto  my-2 rounded-md bg-contain border-2" alt="">
        <h1 class="font-semibold">${card.category}</h1>
        <p class="my-2">${card.description}</p>
   `

   document.getElementById("my_modal_5").showModal();

 }

loadCategory();

mainCard();





/*category
: 
"Fruit Tree"
description
: 
"A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
id
: 
1
image
: 
"https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
name
: 
"Mango Tree"
price
: 
500 */



/*
message
: 
"successfully fetched plants data filtered by category"
plants
: 
Array(3)
0
: 
{id: 13, image: 'https://i.ibb.co.com/391CtLWD/teak-min.jpg', name: 'Teak', description: 'A high-value hardwood tree known for its durabilit…Widely used in luxury furniture and shipbuilding.', category: 'Timber Tree', …}
1
: 
{id: 14, image: 'https://i.ibb.co.com/QvGgW8Fb/mahogony-min.jpg', name: 'Mahogany', description: 'A premium timber tree producing richly colored, st…Favored for fine furniture and interior paneling.', category: 'Timber Tree', …}
2
: 
{id: 15, image: 'https://i.ibb.co.com/Lz6BSq4Z/sal-min.jpg', name: 'Sal Tree', description: 'A tall hardwood tree producing extremely strong ti…ively in heavy construction and railway sleepers.', category: 'Timber Tree', …}
length
: 
*/