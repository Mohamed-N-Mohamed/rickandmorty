//DOM
const episodeEL = document.querySelector('#episode-data');

//look for episodes
const episodes = "https://rickandmortyapi.com/api/episode";


//fetch the data
async function fetchEpisode(){
  const response = await fetch(episodes);
  const data = await response.json();
  //send data to create ui
  UI(data)

}

function UI(episodes){
  //store the results
  const results = episodes.results;
   //for testing 
   console.log(episodes)
  //create empty html
  let html = ''
  //loop i results and create a element;
  results.map((element) => {
    html += `
    <tr>
      <td>${element.name}</td>
      <td>${element.episode}</td>
      <td>${element.air_date}</td>
    </tr>
  `
  })
  //insert to dom
  episodeEL.innerHTML = html;

}

fetchEpisode();