import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anime from "animejs/lib/anime.es.js";

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

function rotateMolekyl() {
  const molekyl = document.querySelector("#molekyl");
  gsap.to(molekyl, {
    rotation: 360,
    transformOrigin: "center center",
    duration: 60,
    repeat: -1,
  });
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

function animateAtom(path, atom, secs, bool) {
  // Create an object that gsap can animate
  const val = { distance: 0 };
  // Create a tween
  gsap.to(val, {
    // Animate from distance 0 to the total distance
    distance: path.getTotalLength(),
    // Loop the animation
    repeat: -1,
    // Make the animation lasts 5 seconds
    duration: secs,
    runBackwards: bool,
    ease: "none",
    // Function call on each frame of the animation
    onUpdate: () => {
      // Query a point at the new distance value
      const point = path.getPointAtLength(val.distance);
      // Update the atom coordinates
      atom.setAttribute("cx", point.x);
      atom.setAttribute("cy", point.y);
    },
  });
}

function animateArrow() {
  const arrow = document.querySelector("#arrow-wrapper");
  const path = document.querySelector("#arrow-path");
  console.log(arrow, path);
  var myPath = anime.path(path);
  arrow.classList.remove("hidden");
  anime({
    targets: arrow,
    translateX: myPath("x"),
    translateY: myPath("y"),
    /* rotate: myPath("angle"), */
    duration: 1000,
    direction: "reverse",
    complete: function (anim) {
      arrow.querySelector("#spids").classList.add("hidden");
      skewArrowYoYo(arrow.querySelector("#arrow"));
    },
  });
}

function skewArrowYoYo(arrow) {
  gsap.to(arrow, {
    skewY: "9deg",
    yoyo: true,
    yoyoEase: "power1",
    duration: 0.03,
    repeat: 9,
    /* onComplete: skewArrowStop,
    onCompleteParams: [arrow, 7], */
  });
}

function skewArrowStop(arrow, i) {
  if (i > 1) {
    gsap.to(arrow, {
      skewY: `${i}deg`,
      direction: "alternate",
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: reduce,
    });
    function reduce() {
      skewArrowStop(arrow, i--);
    }
  }
}

function checkIfInViewport() {
  const el = document.querySelector("#target-and-arrow");
  const position = getPosition(el);
  console.log("position", position);
  if (position > 0.15 && position < 0.85) {
    animateArrow();
    console.log("untrack");
    ScrollTrigger.removeEventListener("scrollStart", checkIfInViewport);
    return true;
  }
}

function getPosition(el) {
  return ScrollTrigger.positionInViewport(el);
}
