const DOM = {
  // FOR THE INFORMATION DISPLAYED
  personalInfo: document.querySelector(".info-1"),
  planInfo: document.querySelector(".info-2"),
  addOnsInfo: document.querySelector(".info-3"),
  finishInfo: document.querySelector(".info-4"),
  thankYouInfo: document.querySelector(".info-5"),
  monthlyInfo: document.querySelectorAll(".monthly"),
  yearlyInfo: document.querySelectorAll(".yearly"),

  // errorContent: document.querySelectorAll(".error-content"),

  // FOR THE BUTTONS
  nextBtn: document.querySelectorAll(".btn a"),
  goBackBtn: document.querySelectorAll(".btn-2 p"),
  numbers: document.querySelectorAll(".num"),
  toggleSwitch: document.querySelector(".toggle-switch"),
  ball: document.querySelector(".ball-yearly"),
  changePlan: document.querySelector(".change"),
};

let currentInfo = 0;

const steps = [
  DOM.personalInfo,
  DOM.planInfo,
  DOM.addOnsInfo,
  DOM.finishInfo,
  DOM.thankYouInfo,
];

// 2. VALIDATION LOGIC
function validateInput(input) {
  const parent = input.closest(".label-content") || input.parentElement;
  const errorContent = parent.querySelector(".error-content");
  const value = input.value.trim();
  let message = "";

  // Validation Rules
  if (!value) {
    message = "This field is required";
  } else {
    if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Invalid email format";
    } else if (
      input.type === "tel" &&
      !/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/.test(value)
    ) {
      message = "Invalid phone number";
    } else if (input.type === "text" && value.length < 2) {
      message = "Name is too short";
    }
  }

  // UI Updates
  if (message) {
    parent.classList.add("error");
    if (errorContent) {
      errorContent.innerText = message;
      errorContent.style.display = "block";
    }
    input.style.border = "1px solid hsl(354, 84%, 57%)";
    return false;
  } else {
    parent.classList.remove("error");
    if (errorContent) errorContent.style.display = "none";
    input.style.border = "";
    return true;
  }
}

// Remove error styling as the user types
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    const parent = input.closest(".label-content") || input.parentElement;
    const errorContent = parent.querySelector(".error-content");

    if (input.value.trim()) {
      parent.classList.remove("error");
      if (errorContent) errorContent.style.display = "none";
      input.style.border = "";
    }
  });
});

DOM.nextBtn.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Get only the inputs visible in the current step
    const inputs = steps[currentInfo].querySelectorAll("input");
    let stepIsValid = true;

    inputs.forEach((input) => {
      // Validate each and update stepIsValid
      if (!validateInput(input)) {
        stepIsValid = false;
      }
    });

    // If any input failed, stop right here
    if (!stepIsValid) return;

    steps[currentInfo].style.display = "none";
    if (currentInfo < steps.length - 1) {
      currentInfo = currentInfo + 1;
    }

    steps[currentInfo].style.display = "flex";

    updateNumbers(currentInfo);
  });
});

DOM.goBackBtn.forEach((button) => {
  button.addEventListener("click", () => {
    steps[currentInfo].style.display = "none";
    if (currentInfo > 0) {
      currentInfo = currentInfo - 1;
    }

    steps[currentInfo].style.display = "flex";

    updateNumbers(currentInfo);
  });
});

DOM.numbers.forEach((number, index) => {
  number.addEventListener("click", () => {
    steps[currentInfo].style.display = "none";
    currentInfo = index;
    steps[currentInfo].style.display = "flex";
    updateNumbers(currentInfo);
  });
});

function updateNumbers(index) {
  DOM.numbers.forEach((number, i) => {
    if (i === index) {
      number.classList.add("active");
    } else {
      number.classList.remove("active");
    }
  });
}

DOM.toggleSwitch.addEventListener("click", (event) => {
  const rect = DOM.toggleSwitch.getBoundingClientRect();

  const btnWidth = rect.width;
  const clickX = event.clientX - rect.left;

  if (clickX < btnWidth / 2) {
    DOM.ball.classList.remove("show");

    DOM.monthlyInfo.forEach((element) => {
      element.style.display = "block";
    });

    DOM.yearlyInfo.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    DOM.ball.classList.add("show");
    DOM.monthlyInfo.forEach((element) => {
      element.style.display = "none";
    });

    DOM.yearlyInfo.forEach((element) => {
      element.style.display = "block";
    });
  }
});

DOM.changePlan.addEventListener("click", () => {
  DOM.planInfo.style.display = "flex";
  DOM.finishInfo.style.display = "none";
  currentInfo = 1;
  updateNumbers(currentInfo);
});
