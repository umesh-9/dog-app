let timer;
let firstDealyDelete;
async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (err) {
    console.log("There was a problem in fetching breed list");
  }
}

const data = start();

function createBreedList(breedList) {
  document.getElementById("breed-list").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList)
              .map((ele) => {
                return `<option>${ele}</option>`;
              })
              .join("")}
          </select>
  `;
}

async function loadByBreed(breed) {
  if (breed !== "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(firstDealyDelete);
  document.getElementById("slide-show").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
    `;
  currentPosition += 2;
  timer = setInterval(() => {
    document
      .getElementById("slide-show")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`
      );
    firstDelayDelete = setTimeout(() => {
      document.querySelector(".slide").remove();
    }, 1000);

    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }, 3000);
}
