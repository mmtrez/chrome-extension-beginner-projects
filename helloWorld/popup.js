"use strict";
const inputEl = document.getElementById("name");
const greetEl = document.getElementById("greet");

inputEl.addEventListener("keyup", () => {
  greetEl.textContent = `Hello ${inputEl.value}`;
});
