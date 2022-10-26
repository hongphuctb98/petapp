"use strict";

function download() {
  var blob = new Blob([`${JSON.stringify(petArr, "\t", 2)}`], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "ListPet.txt");
}

const importBtn = document.getElementById("import-btn");

importBtn?.addEventListener("click", function () {
  let file = document.getElementById("input-file").files[0];
  console.log("import start");
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    petArr = JSON.parse(this.result);
    console.log(petArr);
    saveToStorage("stringArr", petArr);
    for (let i = 0; i < petArr.length - 1; i++) {
      if (petArr[i].id == petArr[i + 1].id) {
        petArr.splice(i, 1);
        saveToStorage("stringArr", petArr);
      }
    }
  });
  reader.readAsText(file);
});

// window.localStorage.removeItem('key')
