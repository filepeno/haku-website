import { HTML } from "../main";

export function initHeader() {
  HTML.toggleNavBtn = document.querySelector(".toggle-nav-btn");
  HTML.toggleNavBtn.addEventListener("click", toggleNav);
}

function toggleNav() {
  console.log("click");
}
