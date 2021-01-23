let timer;
let deleteFirstPhotoDelay;

async function fetchApi(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    breeds(data.message);
  } catch (e) {
    console.log('Fetch error', e);
  }
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
    let data = await response.json();
    slideShow(data.message);
  }
}

function slideShow(images) {
  let curPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);
  document.querySelector('.slideshow').innerHTML = `
    <div class='slide' style="background-image: url(${images[0]})"></div>
    <div class='slide' style='background-image: url(${images[1]})'></div>
  `;
  curPosition += 2;

  timer = setInterval(() => {
    document
      .querySelector('.slideshow')
      .insertAdjacentHTML(
        'beforeend',
        `<div class='slide' style='background-image: url(${images[curPosition]})'></div>`,
      );
    deleteFirstPhotoDelay = setTimeout(() => {
      document.querySelector('.slide').remove();
    }, 1000);

    if (curPosition + 1 >= images.length) {
      curPosition = 0;
    } else {
      curPosition++;
    }
  }, 3000);
}
