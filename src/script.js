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
  menuItems = document.querySelectorAll(".menu-item"),
  sections = document.querySelectorAll(".section"),
  headerEl = document.querySelector(".header"),
  lazyImgs = document.querySelectorAll("img[data-original]"),
  leftArrow = document.querySelector(".slider-btn-left"),
  rightArrow = document.querySelector(".slider-btn-right"),
  slides = document.querySelectorAll(".slide"),
  sliderDotsContainer = document.querySelector(".slider-dots"),
  usefulLinksContainer = document.querySelector(".useful-links"),
  usefulLinks = document.querySelectorAll(".useful-link");

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

const handleFadeLinks = function (e) {
  const curLink = e.target.closest(".useful-link");
  if (!curLink) return;
  usefulLinks.forEach((link) => (link.style.opacity = this));
  curLink.style.opacity = 1;
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
usefulLinksContainer.addEventListener("mouseover", handleFadeLinks.bind(0.5));
usefulLinksContainer.addEventListener("mouseout", handleFadeLinks.bind(1));

// Observers
// 1. Section revealer
function contentRevealer() {
  const sectionRevealer = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const target = entry.target;

    target.classList.remove("section-hidden");

    observer.unobserve(target);
  };

  sections.forEach((s) => {
    s.classList.add("section-hidden");

    const sectionObserver = new IntersectionObserver(sectionRevealer, {
      root: null,
      threshold: 0,
      rootMargin: "-200px",
    });

    sectionObserver.observe(s);
  });
}

contentRevealer();

// 2. Sticky Nav.

function stickyMenu() {
  const navHeight = siteHeader.getBoundingClientRect().height;

  const stickyNav = function (entries) {
    const [entry] = entries;

    if (entry.isIntersecting) siteHeader.classList.remove("sticky");
    else siteHeader.classList.add("sticky");
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    rootMargin: `-${navHeight}px`,
    threshold: 0,
  });

  headerObserver.observe(headerEl);
}

stickyMenu();

// 3. lazy loading

function lazyLoading() {
  const lazyLoader = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    const target = entry.target;
    const originalSrc = target.dataset.original;

    target.src = originalSrc;

    target.addEventListener("load", () =>
      target.classList.remove("lazy-effect")
    );

    observer.unobserve(target);
  };

  lazyImgs.forEach((lazy) => {
    lazy.classList.add("lazy-effect");

    const lazyObserver = new IntersectionObserver(lazyLoader, {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    });

    lazyObserver.observe(lazy);
  });
}

lazyLoading();

// Slider

function slider() {
  let currentSlide = 0;
  const maxSlidesNum = slides.length;

  const goToSlide = function (slideNum) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - slideNum) * 100}%)`;
    });
    // activateDot(slideNum);
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      const dot = `
          <li class="dot" data-slide="${i}"></li>
        `;
      sliderDotsContainer.insertAdjacentHTML("beforeend", dot);
    });
  };

  function activateDot(dotNum) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("dot-active"));
    document
      .querySelector(`.dot[data-slide='${dotNum}']`)
      .classList.add("dot-active");
  }

  goToSlide(0);
  createDots();
  activateDot(0);

  const handleGoPrevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlidesNum - 1;
    else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const handleGoNextSlide = function () {
    if (currentSlide === maxSlidesNum - 1) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const handleKeyboardSlider = function (e) {
    if (e.key === "ArrowLeft") handleGoPrevSlide();
    if (e.key === "ArrowRight") handleGoNextSlide();
  };

  const handleClickDot = function (e) {
    const dot = e.target;
    if (!dot.classList.contains("dot")) return;
    const slideNum = dot.dataset.slide;
    goToSlide(slideNum);
    activateDot(slideNum);
  };

  leftArrow.addEventListener("click", handleGoPrevSlide);
  rightArrow.addEventListener("click", handleGoNextSlide);
  document.addEventListener("keydown", handleKeyboardSlider);
  sliderDotsContainer.addEventListener("click", handleClickDot);
}
slider();
