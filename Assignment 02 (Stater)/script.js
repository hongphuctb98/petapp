"use strict";

const deleteBtn = document.querySelector(".btn-danger");
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("calcbmi-btn");

// date

renderTableData(petArr);

// Submit button event
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    petlength: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
  };

  // Xét nếu đủ điều kiện thì thực hiện các thao tác khác
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("stringArr", petArr);
    clearInput();

    renderTableData(petArr);
    if (data.vaccinated && data.sterilized && data.dewormed) {
      healthyPetArr.push(data);
    }
  }
});

// Xóa dữ liệu mới nhập
const clearInput = () => {
  (idInput.value = ""),
    (nameInput.value = ""),
    (ageInput.value = ""),
    (typeInput.value = "Select Type"),
    (weightInput.value = ""),
    (lengthInput.value = ""),
    (colorInput.value = "#000000"),
    (breedInput.value = "Select Breed"),
    (vaccinatedInput.checked = false),
    (dewormedInput.checked = false),
    (sterilizedInput.checked = false);
};

// cảnh báo lỗi input

function validateData(data) {
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      return false;
    }
  }
  // checkId(data.id);
  if (!data.id) {
    alert("Please input for ID ");
    return false;
  } else if (!data.name) {
    alert("Please input for name");
    return false;
  } else if (data.age < 1 || data.age > 15 || !data.age) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15 || !data.weight) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (data.petlength < 1 || data.petlength > 100 || !data.petlength) {
    alert("Age must be between 1 and 100!");
    return false;
  } else if (data.type === "Select Type") {
    alert("Please select Type");
    return false;
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed");
    return false;
  } else {
    return true;
  }
}

// Thêm thông tin pet vào table
function renderTableData(petArr) {
  let tableBodyEl = document.querySelector("#tbody");
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}kg</td>
    <td>${petArr[i].petlength}cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${dateData()}</td>
    <td><button  type="button"
    class="btn btn-danger"
    onclick="deletePet('${petArr[i].id}')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}

// Xóa dữ liệu pet
const deletePet = (petId) => {
  if (confirm("you are sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId == petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("stringArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};
let healthyPetArr = [];
let healthyCheck = true;
//Show healthy pet
healthyBtn.addEventListener("click", function () {
  if (!healthyCheck) {
    renderTableData(petArr);
    healthyCheck = true;
    healthyBtn.textContent = "Show healthy pet";
  } else {
    healthyPetArr = petArr.filter((pet) => {
      return pet.vaccinated && pet.dewormed && pet.sterilized;
    });
    renderTableData(healthyPetArr);
    healthyCheck = false;
    healthyBtn.textContent = "Show all pet";
  }
});
// tính Bmi

function calcBmi(petArr) {
  if (petArr.type == "Dog") {
    return ((petArr.weight * 703) / petArr.petlength ** 2).toFixed(2);
  } else if (petArr.type == "Cat") {
    return ((petArr.weight * 886) / petArr.petlength ** 2).toFixed(2);
  }
}
// let bmiFlag = false;
// bmiBtn.addEventListener("click", function () {
//   if (bmiFlag) {
//     for (let i = 0; i < petArr.length; i++) {
//       petArr[i].bmi = calcBmi(petArr[i]);
//     }
//   }
//   bmiFlag = !bmiFlag;

//   renderTableData(petArr);
// });
