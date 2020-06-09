//DOM
const display = document.querySelector(".row");
const next = document.getElementById("next");

//genrate  id
let id = 1;
//look for characters
const characters = "https://rickandmortyapi.com/api/character";

//get characters
async function getcharacters() {
  try {
    const response = await fetch(characters);
    const data = await response.json();
    const info = await data.info;
    if (info.next !== null) {
      id++;
      fetchNext(info.next, id);
    }
    return data;
  } catch (error) {
    console.log(error + "There has been a error");
  }
  //send to UI
  // UI(data);
  // //this will get the other characters
  // fetchNext(data);
}

//still working on this. Right now its not wroking
async function fetchNext(url, id) {
  const str = id.toString();
  
  const string = url;
  string.slice(0, -1);

  // const response = await fetch(url);
  // const data = await response.json();
}

//UI to display characters - episodes - locatioon
function UI(characters) {
  const results = characters.results;
  //loop characters
  results.forEach((element) => {
    //create a element
    const div = document.createElement("div");
    div.classList.add("col", "s12", "m4", "card");
    div.innerHTML = `
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${element.image}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${element.name}<i class="material-icons right"></i></span>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Character Details <i class="material-icons right">close</i></span>
      <li>${element.gender}</li>
      <li>${element.species}</li>
      <li>${element.status}</li>
    </div>
    
    `;
    //add created element to the DOM
    display.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getcharacters().then((data) => {
    UI(data);
    next.addEventListener("click", getcharacters);
  });
});
