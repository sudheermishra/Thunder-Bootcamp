const btn = document.querySelector("div");
const root = document.getElementById("parent");

btn.addEventListener("dblclick", (e) => {
  root.style.backgroundColor = e.target.id;
});
