"use strict";
const findBtn = document.getElementById("find-btn");

findBtn.addEventListener("click", function (e) {
  e.preventDefault();

  var petFind = petArr;
  if (idInput.value) {
    petFind = petFind.filter((pet) => pet.id.includes(idInput.value));
  }
  if (nameInput.value) {
    petFind = petFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  if (typeInput.value !== "Select Type") {
    petFind = petFind.filter((pet) => pet.type === typeInput.value);
  }
  if (breedInput.value !== "Select Breed") {
    petFind = petFind.filter((pet) => pet.breed === breedInput.value);
  }
  if (vaccinatedInput.checked === true) {
    petFind = petFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked === true) {
    petFind = petFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.checked === true) {
    petFind = petFind.filter((pet) => pet.sterilized === true);
  }

  renderTableSearch(petFind);
});

function renderTableSearch(petArr) {
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
          <i class="bi bi-squpete-fill" style="color: ${pet.color}"></i>
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
        <td>${dateData()}</td>`;
    tableBodyEl.appendChild(row);
  });
}
