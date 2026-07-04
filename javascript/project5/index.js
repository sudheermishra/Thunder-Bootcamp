const form = document.querySelector("form");
const first = document.getElementById("first");
const second = document.getElementById("second");
const result = document.querySelector("p");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const number1 = Number(first.value); // Number isliye q ki input se jo bhi aata h woh string ki form me aata h
  const number2 = Number(second.value);

  result.textContent = number1 + number2;
});
