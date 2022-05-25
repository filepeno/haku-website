let throttled = false;
const delay = 1000;

export function calculateHeroHeight() {
  const hero = document.querySelector(".hero");
  if (throttled === false) {
    throttled = true;
    //get top element
    const header = document.querySelector("header");
    //get it's height
    const elHeight = header.getBoundingClientRect().height;
    //calculate heigth
    hero.style.height = `calc(100vh - ${elHeight}px)`;
    //control the performance
    setTimeout(() => {
      throttled = false;
    }, delay);
  }
}

export function trackScreenResize() {
  window.addEventListener("resize", calculateHeroHeight);
}
