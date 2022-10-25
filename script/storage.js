"use strict";
const sidebarNav = document.getElementById("sidebar");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const breedArr = getFromStorage("stringArrBreed");

window.localStorage.removeItem("stringArrPet");

let petArr = getFromStorage("stringArr");

function dateData() {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// đóng mở nav
sidebarNav.addEventListener("click", function () {
  sidebarNav.classList.toggle("active");
});

//sau khi nhận giữ liệu thì được lưu vào storage(js->json)
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//lấy giữ liệu ra (json->js)
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function renderBreed(breedArr) {
  console.log("render breed Start");
  breedInput.innerHTML = "";
  breedInput.innerHTML = "<option>Select breed</option>";
  breedArr
    .filter((types) => types.type == typeInput.value)
    .forEach((el) => {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      breedInput.appendChild(option);
    });
}
