"use strict";
const containerForm = document.getElementById("container-form");

// Thêm thông tin pet vào bảng
function renderTableEdit(petArr) {
  let tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight}kg</td>
    <td>${pet.petlength}cm</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
    </td>
    <td><i class="bi ${
      pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${dateData()}</td>
    <td><button  type="button"
    class="btn btn-warning"
    onclick="startEditPet('${pet.id}')">Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  });
}

renderTableEdit(petArr);

//khi nhấn nút edit
const startEditPet = (petId) => {
  containerForm.classList.remove("hide");
  // show dao diện input
  petArr.filter((pet) => {
    if (pet.id === petId) {
      idInput.value = pet.id;
      nameInput.value = pet.name;
      ageInput.value = pet.age;
      typeInput.value = pet.type;
      weightInput.value = pet.weight;
      lengthInput.value = pet.petlength;
      colorInput.value = pet.color;
      renderBreed(breedArr);
      breedInput.value = pet.breed;
      vaccinatedInput.checked = pet.vaccinated;
      dewormedInput.checked = pet.dewormed;
      sterilizedInput.checked = pet.sterilized;
    }
  });
};

// sửa thông tin pet
function editPetArr() {
  let i = petArr.findIndex((petArrEdit) => petArrEdit.id === idInput.value);
  petArr[i] = {
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
  };
  return validateEdit(petArr[i]);
}

// khi ấn submit
submitBtn.addEventListener("click", function () {
  if (editPetArr()) {
    containerForm.classList.add("hide");
    saveToStorage("stringArr", petArr);
    renderTableEdit(petArr);
  }
});

// điều kiện để edit
function validateEdit(data) {
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
