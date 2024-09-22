"use strict";

// Elements
const closeMenuBtn = document.querySelector(".close-menu"),
  showMenuBtn = document.querySelector(".menu-btn"),
  menuEl = document.querySelector(".menu"),
  modal = document.querySelector(".modal"),
  overlay = document.querySelector(".overlay"),
  openModalBtns = document.querySelectorAll(".contact-btn"),
  closeModalBtn = document.querySelector(".close-modal"),
  logo = document.querySelector(".logo");

// Helper functions

const toggleClass = function (elements, className) {
  elements.forEach((el) => el.classList.toggle(className));
};

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

const handleOpanModal = function (e) {
  e.preventDefault();
  toggleClass([modal, overlay], "hidden");
};

const handleEscModal = function (e) {
  console.log(e.key);
  if (e.key !== "Escape") return;
  toggleClass([modal, overlay], "hidden");
};

const handleCloseModal = function () {
  toggleClass([modal, overlay], "hidden");
};

const handleClickLogo = function () {
  window.location.href = "http://127.0.0.1:8080/";
};

// Listeners
showMenuBtn.addEventListener("click", handleShowMenu);
closeMenuBtn.addEventListener("click", handleCloseMenu);
openModalBtns.forEach((b) => b.addEventListener("click", handleOpanModal));
document.addEventListener("keydown", handleEscModal);
overlay.addEventListener("click", handleCloseModal);
logo.addEventListener("click", handleClickLogo);
closeModalBtn.addEventListener("click", handleCloseModal);
