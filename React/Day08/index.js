let count = 5;

function display() {
  console.log(`Hello Display ${count}`);
}

function counter() {
  console.log(`Your count is: ${count}`);
}

function header() {
  console.log("I am header");
  display();
}

function app() {
  console.log("Hello app");
  header();
  counter();
}

function main() {
  console.log("Hello main");
  app();
}

main();
