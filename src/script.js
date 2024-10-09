"use strict";

// Elements
const closeMenuBtn = document.querySelector(".close-menu"),
  showMenuBtn = document.querySelector(".menu-btn"),
  menuEl = document.querySelector(".menu"),
  modal = document.querySelector(".modal"),
  overlay = document.querySelector(".overlay"),
  openModalBtns = document.querySelectorAll(".contact-btn"),
  closeModalBtn = document.querySelector(".close-modal"),
  logo = document.querySelector(".logo"),
  sendMsgBtn = document.querySelector(".submit-msg"),
  cardsSection = document.querySelector(".cards"),
  scrollBtn = document.querySelector(".explore");

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
  document.body.classList.add("no-scroll");
};

const handleEscModal = function (e) {
  console.log(e.key);
  if (e.key !== "Escape") return;
  toggleClass([modal, overlay], "hidden");
};

const handleCloseModal = function () {
  toggleClass([modal, overlay], "hidden");
  document.body.classList.remove("no-scroll");
};

const handleClickLogo = function () {
  window.location.href = "#";
};

const handleSubmitMsg = function (e) {
  e.preventDefault();
  toggleClass([modal, overlay], "hidden");
  //clear inputs
  //...
};

// const handleScrollTo = function () {
//   const elToScroll = document.querySelector(".cards");
//   const elToScrollCoords = elToScroll.getBoundingClientRect();
//   window.scrollTo({
//     left: elToScrollCoords.left + window.pageXOffset,
//     top: elToScrollCoords.top + window.pageYOffset,
//     behavior: "smooth",
//   });
// };

const handleScrollTo = () =>
  cardsSection.scrollIntoView({ behavior: "smooth" });

// Listeners
showMenuBtn.addEventListener("click", handleShowMenu);
closeMenuBtn.addEventListener("click", handleCloseMenu);
openModalBtns.forEach((b) => b.addEventListener("click", handleOpanModal));
document.addEventListener("keydown", handleEscModal);
overlay.addEventListener("click", handleCloseModal);
logo.addEventListener("click", handleClickLogo);
closeModalBtn.addEventListener("click", handleCloseModal);
sendMsgBtn.addEventListener("click", handleSubmitMsg);

scrollBtn.addEventListener("click", handleScrollTo);
