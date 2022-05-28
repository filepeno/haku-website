import { HTML } from "../main";

let navExpanded = false;

export function initHeader() {
  HTML.expandableNav = document.querySelector(".expandable-nav");
  HTML.toggleNavBtn = document.querySelector(".toggle-nav-btn");
  HTML.toggleNavBtn.addEventListener("click", toggleBtn);
}

function toggleBtn() {
  console.log("click");
  if (!navExpanded) {
    navExpanded = true;
    HTML.toggleNavBtn.classList.add("expandable-active");
  } else {
    navExpanded = false;
    HTML.toggleNavBtn.classList.remove("expandable-active");
  }
  toggleExpandableNav();
}

function toggleExpandableNav() {
  if (!navExpanded) {
    closeExpandable();

    /*  HTML.expandableNav.classList.remove("active"); */
  } else {
    HTML.expandableNav.offsetHeight;
    HTML.expandableNav.classList.add("active");
    document.querySelector("body").classList.add("scroll-disabled");
  }
}

function hideExpandable(listener) {
  HTML.expandableNav.addEventListener("transitionend", listener);
  HTML.expandableNav.classList.remove("active");
}

function closeExpandable() {
  const listener = () => {
    HTML.expandableNav.removeEventListener("transitionend", listener);
  };
  hideExpandable(listener);
  document.querySelector("body").classList.remove("scroll-disabled");
}
