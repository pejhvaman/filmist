"use strict";

// Elements
const closeMenuBtn = document.querySelector(".close-menu");
const showMenuBtn = document.querySelector(".menu-btn");
const menuEl = document.querySelector(".menu");

// Handlers
const handleShowMenu = function (e) {
  showMenuBtn.style.visibility = "hidden";
  menuEl.classList.add("active-menu");
  closeMenuBtn.classList.remove("hidden");
};

const handleCloseMenu = function (e) {
  console.log(e);
  showMenuBtn.classList.add("hidden");
  showMenuBtn.style.visibility = "visible";
  menuEl.classList.remove("active-menu");
  closeMenuBtn.classList.add("hidden");
};

// Listeners
showMenuBtn.addEventListener("click", handleShowMenu);
closeMenuBtn.addEventListener("click", handleCloseMenu);
