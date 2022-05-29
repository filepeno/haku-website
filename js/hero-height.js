export default function calculateHeroHeight() {
  const hero = document.querySelector(".hero");
  //get top element
  const header = document.querySelector("header");
  //get it's height
  const elHeight = header.getBoundingClientRect().height;
  //calculate heigth
  hero.style.height = `calc(100vh - ${elHeight}px)`;
}
