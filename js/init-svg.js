import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", initSvg);

async function initSvg() {
  const molekyl = await fetch("assets/graphics/molekyl.svg");
  const molekylSvg = await molekyl.text();
  document.querySelector(".molekyl").innerHTML = molekylSvg;
  animateAtoms();
}

function animateAtoms() {
  console.log;
  // Query DOM Elements
  const path1 = document.querySelector("#track-1");
  const path2 = document.querySelector("#track-2");
  const atom1 = document.querySelector("#atom-1");
  const atom2 = document.querySelector("#atom-2");
  const atom3 = document.querySelector("#atom-3");
  const atom4 = document.querySelector("#atom-4");
  console.log(path1.getPointAtLength(-100));
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
