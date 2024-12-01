const burgerBtn = document.querySelector(".nav-burger-bars");
const navMenu = document.querySelector(".blog-nav");
const navIcons = document.querySelector(".blog-icons-wrap");

function toggleNavBtn() {
  navMenu.classList.toggle('active');
  navIcons.classList.toggle('active');
}

burgerBtn.addEventListener('click', toggleNavBtn);