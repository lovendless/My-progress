'use strict'

$(function () {
   $('.slider-tickets__content').slick({

      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 600,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [{
            breakpoint: 1280,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               speed: 600,
               autoplay: true,
               autoplaySpeed: 2000,
               

            }
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               speed: 600,
               autoplay: true,
               autoplaySpeed: 2000,
               arrows: false,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               speed: 600,
               autoplay: true,
               autoplaySpeed: 2000,
               arrows: false,
            }
         },
         {
            breakpoint: 575,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               speed: 600,
               autoplay: true,
               autoplaySpeed: 4000,
               arrows: false,
            }
         },
        

      ]
   })

});

const menuNav = document.getElementById("menu-nav");
const links = document.querySelector(".menu__list");
const menuContainer = document.querySelector(".header__menu");
const nav = document.querySelector('#nav');
const menuLinks = document.querySelectorAll(".menu__link");
const scrollLink = document.querySelector(".scroll-up");

menuNav.addEventListener('click', function () {

const menuContainerHeight = menuContainer.getBoundingClientRect().height;
const linkHeight = links.getBoundingClientRect().height;


if (menuContainerHeight === 0){
   menuContainer.style.height = `${linkHeight}px`;
} else {
   menuContainer.style.height = 0;
}

menuContainer.classList.toggle('header__menu__auto');
});

window.addEventListener('scroll', function () {
   const navHeight = nav.getBoundingClientRect().height;
   const scrollY = window.scrollY;
   if (navHeight < scrollY) {
      nav.classList.add('fixed-header');
   } else {
   nav.classList.remove('fixed-header');

   }

   if (scrollY > 500){
      scrollLink.classList.add('show-scroll-up');
   } else {
      scrollLink.classList.remove('show-scroll-up');
   }

});

menuLinks.forEach(function (link) {

   link.addEventListener('click', function (e) {
      e.preventDefault();

      const id = e.currentTarget.getAttribute('href').slice(1);
      const element = document.getElementById(id);
      console.log(id);

      const nav = document.querySelector('#nav');
      const navHeight = nav.getBoundingClientRect().height;
      const fixedNav = document.querySelector(".fixed-header");
      const menuContainerHeight = menuContainer.getBoundingClientRect().height;
      let position = element.offsetTop - navHeight - navHeight;

      // if(!fixedNav){
      //    position = position - navHeight;
      // }
      if (id == "about" ) {
         position = position + navHeight * 3.4 - menuContainerHeight;
      }
      if (id == "news" ) {
         position = position - navHeight;
      }
      
      if(menuContainerHeight > 90) {
         position = position + menuContainerHeight + menuContainerHeight;
      }

      window.scrollTo({
         left: 0,
         top: position,
      })

      menuContainer.style.height = 0;


   });
   
});

