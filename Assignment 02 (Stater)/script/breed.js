"use strict";

const breedControl = document.getElementById("input-breed");
const typeControl = document.getElementById("input-type");
const breedSubmitBtn = document.getElementById("submit-btn");

// const breedArr = JSON.parse(getFromStorage("stringArrBreed"));

renderTableBreed(breedArr);
// Submit event
breedSubmitBtn.addEventListener("click", function () {
  const breedData = {
    breed: breedControl.value,
    type: typeControl.value,
  };
  if (validateBreed(breedData)) {
    breedArr.push(breedData);
    saveToStorage("stringArrBreed", breedArr);
    renderTableBreed(breedArr);
    clearInputBreed();
  }
});

//Xử lý đầu vào
function validateBreed(breedData) {
  for (let i = 0; i < breedArr.length; i++) {
    if (breedData.breed === breedArr[i].breed) {
      alert("Giống này đã tốn tại!!!");
      return false;
    }
  }

  if (
    breedData.breed === "" ||
    breedData.type === "Select Type" ||
    (breedData.breed === "" && breedData.type === "Select Type")
  ) {
    alert("Xin nhập dữ liệu còn thiếu");
    return false;
  } else {
    return true;
  }
}

// Thêm breed vào table
function renderTableBreed(breedArr) {
  let tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  breedArr.forEach((bA, i) => {
    const row = document.createElement("tr");
    row.innerHTML = ` 
    <th scope="row">${i + 1}</th>
    <td>${bA.breed}</td>
    <td>${bA.type}</td>
    <td><button  type="button"
    class="btn btn-danger"
    onclick="deleteBreed('${i + 1}')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  });
}

// Xóa dữ liệu breed

const deleteBreed = (petId) => {
  if (confirm("You are sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (petId == i + 1) {
        breedArr.splice(i, 1);
        renderTableBreed(breedArr);
        saveToStorage("stringArrBreed", breedArr);
      }
    }
  }
};

//Xóa thông tin vừa nhập
const clearInputBreed = () => {
  (breedControl.value = ""), (typeControl.value = "Select Type");
};
