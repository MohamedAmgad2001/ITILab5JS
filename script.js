// 1
// let leftBtn = document.getElementById("leftBtn");
// let rightBtn = document.getElementById("rightBtn");
// let startBtn = document.getElementById("startBtn");
// let stopBtn = document.getElementById("stopBtn");
// let img = document.images[0];
// let count = 1;
// let intervalId;

// rightBtn.onclick = rightSlide;

// leftBtn.onclick = () => {
//   count--;
//   if (count < 1) count = 5;
//   img.src = `images/${count}.png`;
// };
// function rightSlide() {
//   count++;
//   if (count > 5) count = 1;
//   img.src = `images/${count}.png`;
// }
// startBtn.onclick = () => {
//   if (!intervalId) {
//     intervalId = setInterval(rightSlide, 1500);
//     leftBtn.disabled = true;
//     rightBtn.disabled = true;
//   }
// };

// stopBtn.onclick = () => {
//   clearInterval(intervalId);
//   intervalId = null;
//   leftBtn.disabled = false;
//   rightBtn.disabled = false;
// };

// ---------------------------------------------------------------------
// 2
let nameInput = document.getElementById("name");
let gradeInput = document.getElementById("grade");
let nameError = document.getElementById("nameError");
let gradeError = document.getElementById("gradeError");
let departmentError = document.getElementById("departmentError");
let tableBody = document.querySelector("#studentTable tbody");

let addBtn = document.getElementById("addBtn");
let sortSelect = document.getElementById("sort");
let filterSelect = document.getElementById("filter");
addBtn.addEventListener("click", function () {
  nameError.textContent = "";
  gradeError.textContent = "";
  departmentError.textContent = "";

  let fullName = nameInput.value.trim();
  let name = fullName.split(" ")[0];
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  let grade = gradeInput.value.trim();
  let department = document.querySelector(
    'input[name="fav_language"]:checked'
  ).value;

  if (!department) {
    departmentError.textContent = "You should select atleast one department";
    return;
  }

  if (name === "") {
    nameError.textContent = "Name is required";
    return;
  }

  if (grade === "") {
    gradeError.textContent = "Grade is required";
    return;
  }

  const gradeValue = grade;
  if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
    gradeError.textContent = "Grade must be between 0 and 100.";
    return;
  }

  let tr = document.createElement("tr");

  let tdName = document.createElement("td");
  tdName.innerText = name;
  tr.appendChild(tdName);

  let tdGrade = document.createElement("td");
  tdGrade.innerText = gradeValue;
  tr.appendChild(tdGrade);

  let tdDelete = document.createElement("td");
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = () => deleteStudent(tr);
  tdDelete.appendChild(deleteBtn);
  tr.appendChild(tdDelete);

  if (gradeValue < 60) {
    tr.style.backgroundColor = "red";
  } else if (gradeValue <= 75) {
    tr.style.backgroundColor = "blue";
  } else {
    tr.style.backgroundColor = "green";
  }

  tableBody.appendChild(tr);

  nameInput.value = "";
  gradeInput.value = "";
});

function deleteStudent(row) {
  tableBody.removeChild(row);
}

sortSelect.addEventListener("change", function () {
  let rows = Array.from(tableBody.rows);

  if (sortSelect.value === "name") {
    rows.sort((a, b) =>
      a.cells[0].innerText.localeCompare(b.cells[0].innerText)
    );
  } else if (sortSelect.value === "grade") {
    rows.sort(
      (a, b) => Number(a.cells[1].innerText) - Number(b.cells[1].innerText)
    );
  }

  rows.forEach((row) => tableBody.appendChild(row));
});

filterSelect.addEventListener("change", function () {
  let rows = Array.from(tableBody.rows);

  rows.forEach((row) => {
    let grade = Number(row.cells[1].innerText);
    row.style.display = "table-row";

    if (filterSelect.value === "passed" && grade < 60) {
      row.style.display = "none";
    } else if (filterSelect.value === "failed" && grade >= 60) {
      row.style.display = "none";
    }
  });
});
