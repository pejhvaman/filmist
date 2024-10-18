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
  scrollBtn = document.querySelector(".explore"),
  tabsContainer = document.querySelector(".tabs"),
  tabs = document.querySelectorAll(".tab"),
  tabContents = document.querySelectorAll(".tab-content"),
  siteHeader = document.querySelector(".site-header"),
  siteLogo = document.querySelector(".logo"),
  menuItems = document.querySelectorAll(".menu-item");

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

const handleActiveTab = function (e) {
  const curTab = e.target.closest(".tab");
  if (!curTab) return;
  const tabNum = Number(curTab.dataset.tab);
  // console.log(curTab, tabNum);
  const curContent = document.querySelector(`.tab-content-${tabNum}`);
  // console.log(curContent);
  tabs.forEach((t) => t.classList.remove("tab-active"));
  curTab.classList.add("tab-active");

  tabContents.forEach((tc) => tc.classList.remove("tab-content-active"));
  curContent.classList.add("tab-content-active");
};

const handleFadeMenuItems = function (e) {
  const curItem = e.target.closest(".menu-item");
  if (!curItem) return;
  menuItems.forEach((mi) => (mi.style.opacity = this));
  siteLogo.style.opacity = this;
  curItem.style.opacity = 1;
};

const handleClickMenu = function (e) {
  e.preventDefault();
  const curItem = e.target.closest(".menu-item");
  if (!curItem) return;
  const id = curItem.getAttribute("href").slice(1);
  menuItems.forEach((mi) => mi.classList.remove("menu-active"));

  if (!curItem.classList.contains("contact-btn"))
    curItem.classList.add("menu-active");

  if (id)
    document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" });
};

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
tabsContainer.addEventListener("click", handleActiveTab);
siteHeader.addEventListener("mouseover", handleFadeMenuItems.bind(0.5));
siteHeader.addEventListener("mouseout", handleFadeMenuItems.bind(1));
siteHeader.addEventListener("click", handleClickMenu);
