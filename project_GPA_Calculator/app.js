let hero = document.querySelector("div.hero");
let slider = document.querySelector("div.slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// //parameter1: target
// //parameter2: duration (sec)
// //parameter3: initial status
// //parameter4: status after animation
// //parameter5: sec in advance
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// //enable elements behind
// //animation-wrapper to be clicked
setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

//prevent Enter key default event
addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//prevent button in form from submitting
let trashButton = document.querySelectorAll("button.trash-button");
//trashButton: NodeList
trashButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//change color according to option in select
//recalculate GPA if select changed
let allSelects = document.querySelectorAll("select"); //static NodeList
allSelects.forEach((select) => {
  changecolor(select);
  select.addEventListener("change", (e) => {
    setGPA();
    changecolor(e.target);
  }); //e.target: <select>
});

//recalculate GPA if credits changed
let allCredits = document.querySelectorAll(".class-credit"); //static NodeList
allCredits.forEach((credit) => {
  credit.addEventListener("change", () => setGPA());
});

function changecolor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditSum = 0;

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result = (sum / creditSum).toFixed(2);
  //sum / 0 -> NaN
  if (creditSum == 0) {
    result = "0.00";
  }
  document.querySelector("h2#result-gpa").innerText = result;
}

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  //create 5 subelements
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class name");
  newInput1.classList.add("class-name");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");
  //new element -> addEventListener
  newInput3.addEventListener("change", () => setGPA());

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  let opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  let opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  let opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  let opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  let opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  let opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  let opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  let opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  let opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  let opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  let opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  let opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  let opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changecolor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newI = document.createElement("i");
  //2 classes for i to add
  newI.classList.add("fas");
  newI.classList.add("fa-trash");
  newButton.appendChild(newI);

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  //animation
  newForm.style.animation = "scaleUp 0.5s ease forwards";

  //put preventDefault() and other methods back
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });
});

let allTrash = document.querySelectorAll(".trash-button"); //static
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    // not enough time for animation to play
    // e.target.parentElement.parentElement.remove();
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        //remember to recalculate
        setGPA();
      }
    );
  });
});

//Merge sort
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending");
});
btn2.addEventListener("click", () => {
  handleSorting("ascending");
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value;
    let class_number = graders[i].children[1].value;
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    let class_grade_number = convertor(graders[i].children[3].value);
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        //front: attribute, rear: the class_name variable
        // class_name: class_name,
        // class_number: class_number,
        // ......
        //Can be simplified into：
        class_name,
        class_number,
        class_credit,
        class_grade,
        class_grade_number,
      };
      objectArray.push(class_object);
    }
  }

  if (objectArray.length != 0) {
    objectArray = mergeSort(objectArray);
    if (direction == "descending") {
      objectArray = objectArray.reverse();
    }

    //renew website according to objectArray
    let allInputs = document.querySelector(".all-inputs");
    allInputs.innerHTML = ""; //empty
    for (let i = 0; i < objectArray.length; i++) {
      //backtick(${enter value})
      allInputs.innerHTML += `<form>
    <div class="grader">
        <input
        type="text"
        placeholder="class name"
        class="class-name"
        value=${objectArray[i].class_name}
        /><!--
        --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
        /><!--
        --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
        /><!--
        --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
        ><!--
        --><button class="trash-button">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    </form>`;
    }

    //select cannot be renewed by string
    //use JS directly
    graders = document.querySelectorAll("div.grader");
    for (let i = 0; i < graders.length; i++) {
      graders[i].children[3].value = objectArray[i].class_grade;
    }

    //add back all the methods:
    //trashButton, select, credits
    let trashButton = document.querySelectorAll("button.trash-button");
    trashButton.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.parentElement.parentElement.style.animation =
          "scaleDown 0.5s ease forwards";
        e.target.parentElement.parentElement.addEventListener(
          "animationend",
          (e) => {
            e.target.remove();
            setGPA();
          }
        );
      });
    });

    let allSelects = document.querySelectorAll("select");
    allSelects.forEach((select) => {
      changecolor(select);
      select.addEventListener("change", (e) => {
        setGPA();
        changecolor(e.target);
      });
    });

    let allCredits = document.querySelectorAll(".class-credit");
    allCredits.forEach((credit) => {
      credit.addEventListener("change", () => setGPA());
    });
  }
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }

  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
