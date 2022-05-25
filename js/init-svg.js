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
  const path = document.querySelector("#track-1");
  const atom1 = document.querySelector("#atom-1");

  // Create an object that gsap can animate
  const val = { distance: 0 };
  // Create a tween
  gsap.to(val, {
    // Animate from distance 0 to the total distance
    distance: path.getTotalLength(),
    // Loop the animation
    repeat: -1,
    // Make the animation lasts 5 seconds
    duration: 8,
    ease: "none",
    // Function call on each frame of the animation
    onUpdate: () => {
      // Query a point at the new distance value
      const point = path.getPointAtLength(val.distance);
      // Update the atom coordinates
      atom1.setAttribute("cx", point.x);
      atom1.setAttribute("cy", point.y);
    },
  });
}
