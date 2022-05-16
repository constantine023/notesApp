// console.log("My notes app");
showNotes();
let heading = document.getElementById("heading");
let headingInput = document.getElementById("headInput");
heading.addEventListener("click", () => {
  // console.log("clicked");
  if (headingInput.style.display == "block") {
    headingInput.style.display = "none";
  } else headingInput.style.display = "block";
});

addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", () => {
  text = document.getElementById("addTxt");
  if (text.value == "") {
    text.focus();
  } else {
    notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push([headingInput.value, text.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    text.value = "";
    headingInput.value = "";
    showNotes();
  }
});

function showNotes() {
  let note = localStorage.getItem("notes");
  if (note == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(note);
  }
  let html = "";
  noteObj.forEach(function (element, index) {
    if (element[0] == "") {
      html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
          <h5 class="card-title" id="this.id">Note ${index + 1}</h5>
          <p class="card-text"> ${element[1]}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-dark">Delete Note</button>
          </div>
          </div>`;
    } else {
      html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
          <h5 class="card-title">${element[0]}</h5>
          <p class="card-text"> ${element[1]}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-dark">Delete Note</button>
          </div>
          </div>`;
    }
  });
  let notee = document.getElementById("notes");
  notee.innerHTML = html;
}

// Delete function
function deleteNote(index) {
  let note = localStorage.getItem("notes");
  noteObj = JSON.parse(note);
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
}

//search functionality
let search = document.getElementById("SearchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    if (element.getElementsByTagName("p")[0].innerText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// clear all notes
let clear = document.getElementById("clearBtn");
clear.addEventListener("click", () => {
  // console.log("clicked");
  // alert("Are you sure?");
  localStorage.clear();
  // location.reload();
  showNotes();
});

// Dark mode
let moon = document.getElementById("moon");
moon.addEventListener("click", () => {
  if ((document.body.style.background = "white")) {
    // console.log("haan hai");
    document.body.style.background = "#212529";
    document.getElementById("card-body").style.background = "#212529";
    let i = 0;
    while (i <= 1) {
      document.getElementsByClassName("heading")[i].style.color = "white";
      i++;
    }
    document.getElementById("clearBtn").style.color = "white";
    document.getElementById("clearBtn").style.border = "2px solid grey";
  }
});
