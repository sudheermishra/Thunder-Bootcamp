const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const p = document.getElementById("counter");

let counter = 0;

btn1.addEventListener("click", () => {
  counter++;
  p.textContent = counter;
});

btn2.addEventListener("click", () => {
  if (counter == 0) {
    return;
  }
  counter--;
  p.textContent = counter;
});
