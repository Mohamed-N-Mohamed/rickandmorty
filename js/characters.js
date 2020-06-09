//DOM
const display = document.querySelector(".row");
const next = document.getElementById("next");
const loader = document.querySelector('.loading');


//genrate  id
let id = 1;
//look for characters
const characters = "https://rickandmortyapi.com/api/character";

//get characters
async function getcharacters() {
  try {
    display.style.display = 'block'
    next.style.display = 'inline-block'
    const response = await fetch(characters);
    const data = await response.json();
    const info = await data.info;
    
    if (info.next !== null) {
      id++;
      fetchNext(info.next, id);
    } else {
      alert('There is no next page')
    }
    return data;
  } catch (error) {
    console.log(error + "There has been a error");
  }

}

//still working on this. Right now its not wroking
async function fetchNext(url, id) {
  //make the id to string
  const str = id.toString();

  const string = url;
  //remove the last part and insert genereated id.
  const newURL = string.slice(0, 48) + str;

  const response = await fetch(newURL);
  const data = await response.json();
  //send the data to ui
 UI(data);
}

//UI to display characters - episodes - locatioon
async function UI(characters) {
  clearUI()
  console.log(characters)
  const results = await characters.results;
  
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

//delay
function delay(e){
  display.style.display = 'none'
  next.style.display = 'none'
  loader.style.display = 'block'

  //rmeove the class after 2 secs
  setTimeout(() => {
    loader.style.display = 'none'
    getcharacters()
  }, 3000)


}
//call get character
function cb(){
  delay();
}

//clear row
function clearUI(){
  display.innerHTML = ''
}



window.addEventListener('DOMContentLoaded', () => {
  getcharacters().then((data) => {
    UI(data);
  });
  next.addEventListener("click", cb);
})
