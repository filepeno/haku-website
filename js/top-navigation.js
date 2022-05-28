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
    HTML.expandableNav.classList.remove("active");
  } else {
    HTML.expandableNav.classList.add("active");
  }
}
