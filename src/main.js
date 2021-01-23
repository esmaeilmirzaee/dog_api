async function fetchApi(url) {
  let response = await fetch(url);
  let data = await response.json();
  breeds(data.message);
}

fetchApi('https://dog.ceo/api/breeds/list/all');

function breeds(breedList) {
  document.getElementById('breeds').innerHTML = `
  <select onchange='loadByBreed(this.value)'>
  <option id='0'>Choose a breed</option>
  ${Object.keys(breedList)
    .map(function (breed) {
      return `<option id=${breed}>${breed}</option>`;
    })
    .join('')};
    </select>
  `;
}

async function loadByBreed(breed) {
  if (breed != 'Choose a breed') {
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    let images = await response.json();
    console.log(images);
  }
}
