import { HTML } from "../main";
import { moveNavIn, moveNavOut } from "./animations";

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
  } else {
    navExpanded = false;
  }
  toggleExpandableNav();
}

function toggleExpandableNav() {
  if (!navExpanded) {
    moveNavOut(HTML.expandableNav);
  } else {
    HTML.expandableNav.classList.add("active");
    HTML.toggleNavBtn.classList.add("expandable-active");
    moveNavIn(HTML.expandableNav);
    document.querySelector("body").classList.add("scroll-disabled");
  }
}

export function closeExpandable() {
  if (HTML.expandableNav.classList.contains("active")) {
    console.log("close");
    navExpanded = false;
    HTML.expandableNav.classList.remove("active");
    HTML.toggleNavBtn.classList.remove("expandable-active");
    HTML.expandableNav.style.transform = "none";
    document.querySelector("body").classList.remove("scroll-disabled");
  }
}
