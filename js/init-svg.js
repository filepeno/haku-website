import { animateAtom } from "./animations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { checkIfInViewport } from "./scroll";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", initSvg);

async function initSvg() {
  const molekyl = await fetch("assets/graphics/molekyl.svg");
  const molekylSvg = await molekyl.text();
  document.querySelector(".molekyl").innerHTML = molekylSvg;
  //rotateMolekyl();
  animateAtoms();

  const arrow = await fetch("assets/graphics/arrow.svg");
  const arrowSvg = await arrow.text();
  const arrowTargetPath = await fetch("assets/graphics/arrow-target-path.svg");
  const arrowTargetPathSvg = await arrowTargetPath.text();

  const targetWrapper = document.querySelector("#target-wrapper");
  const arrowWrapper = document.querySelector("#arrow-wrapper");
  targetWrapper.innerHTML = arrowTargetPathSvg;
  arrowWrapper.innerHTML = arrowSvg;
  /*   animateArrow(targetWrapper, arrowWrapper); */
  if (!checkIfInViewport()) {
    console.log("track");
    ScrollTrigger.addEventListener("scrollStart", checkIfInViewport);
  }
}

function animateAtoms() {
  // Query DOM Elements
  const path1 = document.querySelector("#track-1");
  const path2 = document.querySelector("#track-2");
  const atom1 = document.querySelector("#atom-1");
  const atom2 = document.querySelector("#atom-2");
  const atom3 = document.querySelector("#atom-3");
  const atom4 = document.querySelector("#atom-4");

  animateAtom(path1, atom1, 10, false);
  animateAtom(path1, atom2, 8, true);
  animateAtom(path2, atom3, 12, false);
  animateAtom(path2, atom4, 7, true);
}
