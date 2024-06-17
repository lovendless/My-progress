import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import Pagination from 'https://cdn.jsdelivr.net/npm/swiper@11/modules/pagination.min.mjs';
import Navigation from 'https://cdn.jsdelivr.net/npm/swiper@11/modules/navigation.min.mjs';
import Thumbs from 'https://cdn.jsdelivr.net/npm/swiper@11/modules/thumbs.min.mjs';

$(document).ready(function () {
   $('.card__gallery').each(function (index, item) {
      $(this).find('.card__img').each(function (index, item) {
         $(this).attr('id', index);
         if ($(item).hasClass('active')) {
            $(".card__dots").append(`<div class="card__dot active" data-id=${index}></div>`);
         } else {
            $(".card__dots").append(`<div class="card__dot" data-id=${index}></div>`);
         }
      });
   });
   $(".card__dot").on("mouseover", function (e) {
      $('.card__img').each(function (index, item) {
         if ($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).addClass('disabled');
         }
      });
      $('.card__dot').each(function (index, item) {
         if ($(this).hasClass('active')){
            $(this).removeClass('active');
         }
      });
      $(e.target).addClass('active');
      let id = e.target.dataset.id;
      let img = $(`.card__img[id="${id}"]`);
      //console.log($(img))
      if ($(img).hasClass('disabled')) {
         $(img).removeClass('disabled');
         $(img).addClass('active');
      }
   });
});

const swiper = new Swiper('.swiper', {
   // configure Swiper to use modules
   modules: [Navigation, Pagination, Thumbs],
   // Optional parameters
   // Optional Parameters
   //direction: 'horizontal',
   noSwiping: true,
   noSwipingClass: 'swiper-no-swiping',
   noSwipingSelector: 'button',
   simulateTouch: false,
   allowTouchMove: false,
   preventClicks: true,
   preventClicksPropagation: true,
   cssMode: true,
   watchSlidesProgress: true,
   // Navigation arrows
   navigation: {
      nextEl: '.next--btn',
      prevEl: '.prev--btn',
   },
   pagination: {
      el: "#numberSlides",
      type: "fraction",
      formatFractionCurrent: function (number) {
         return (number);
      },
      formatFractionTotal: function (number) {
         return (number);
      },
      renderFraction: function (currentClass, totalClass) {
         return '<span class="' + currentClass + '"></span>' +
            '/' +
            '<span class="' + totalClass + '"></span>';
      }
   },


});

ymaps.ready(function () {
   var myMap = new ymaps.Map('map', {
      center: [55.1871157217644, 83.08922610058585],
      zoom: 15
   }, {
      searchControlProvider: 'yandex#search'
   }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
         hintContent: 'Собственный значок метки',
         balloonContent: 'Это красивая метка'
      }, {
         // Опции.
         // Необходимо указать данный тип макета.
         iconLayout: 'default#image',
         // Своё изображение иконки метки.
         iconImageHref: 'img/marker.svg',
         // Размеры метки.
         iconImageSize: [60, 60],
         // Смещение левого верхнего угла иконки относительно
         // её "ножки" (точки привязки).
         iconImageOffset: [-5, -38]
      });
   myMap.geoObjects
      .add(myPlacemark);
});

