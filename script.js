var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

function toggleErrorIcons() {
  var inputs = document.querySelectorAll("input, select");
  inputs.forEach(function (input) {
    var errorIcon = input.parentElement.querySelector(".fa-exclamation");
    if (!input.validity.valid) {
      errorIcon.classList.remove("d-none");
    } else {
      errorIcon.classList.add("d-none");
    }
  });
}

var inputs = document.querySelectorAll("input, select");
inputs.forEach(function (input) {
  input.addEventListener("input", toggleErrorIcons);
});

function calculateOverallIncome() {
  var income = parseFloat(document.getElementById("incomeInput").value) || 0;
  var extraIncome =
    parseFloat(document.getElementById("extraIncomeInput").value) || 0;
  var deductions = extraIncome;
  return income + extraIncome - deductions;
}

document.getElementById("taxForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var isValid = true;
  var inputs = document.querySelectorAll("input, select");
  inputs.forEach(function (input) {
    if (!input.validity.valid) {
      isValid = false;
    }
  });

  // If all inputs are valid, calculate overall income after deductions and show in modal
  if (isValid) {
    var overallIncome = calculateOverallIncome();
    var modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <p><strong>Overall Income after Deductions:</strong> ${overallIncome}</p>
      `;
    var myModal = new bootstrap.Modal(document.getElementById("resultModal"), {
      keyboard: false,
    });
    myModal.show();
  } else {
    // If any input is invalid, toggle error icons to show errors
    toggleErrorIcons();
  }
});
