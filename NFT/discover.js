'use strict'

document.addEventListener('DOMContentLoaded', function () {
   setDiscover(cards);
   menuBurger();
   scrollUp();
});

function scrollUp() {

   const scrollUp = document.querySelector('.scroll-up');

   const mainContent = document.querySelector('main');

   const scrollMainContent = mainContent.offsetTop;

   window.addEventListener('scroll', function () {

      if (window.scrollY > scrollMainContent) {
         scrollUp.classList.add('show-scroll-up');
      } else {
         scrollUp.classList.remove('show-scroll-up');
      }


   });
}

function menuActive() {
   const menuItem = document.querySelectorAll('.header__menu_item');

   let elemTarget;
   let newElem;
   let active;
   let activeId;

   function removeActive() {
      if (elemTarget) {
         active.classList.remove('active');
         elemTarget.removeChild(newElem);
      }
   };

   document.addEventListener('DOMContentLoaded', function () {
      if (!elemTarget) {

         elemTarget = menuItem[1];

         active = elemTarget.firstChild.nextSibling;
         activeId = document.getElementById('home');

         active.classList.add('active');

         newElem = document.createElement('div');
         newElem.classList.add('blue-line');

         elemTarget.appendChild(newElem);
         console.log();

      } else {
         removeActive();
      }
   });

   menuItem.forEach(item => {
      item.addEventListener('click', function (e) {
        
         removeActive();

         elemTarget = e.currentTarget;
         active = elemTarget.firstChild.nextSibling;

         const activeHref = active.nextSibling;
         activeId = document.getElementById(activeHref);
         console.log(activeId);

         active.classList.add('active');
         newElem = document.createElement('div');
         newElem.classList.add('blue-line');

         elemTarget.appendChild(newElem);

         const menu = document.querySelector('.header__menu');

         menu.style.height = 0;
      });
   });
};

menuActive();

function menuBurger() {
   const menu = document.querySelector('.header__menu');
   const menuList = document.querySelector('.header__menu_list');
   const menuBurger = document.querySelector('.menu__open');

   menuBurger.addEventListener('click', function () {

      const menuHeight = menu.getBoundingClientRect().height;
      const menuListHeight = menuList.getBoundingClientRect().height;

      if (menuHeight == 0) {
         menu.style.height = `${menuListHeight}px`;
      } else {
         menu.style.height = 0;
      }

   });

}

function like() {
   const likes = document.querySelectorAll('.like');

   likes.forEach(item => {

      item.addEventListener('click', function () {
         item.classList.toggle('active');

      });

   });


};

function showCards(items, cardsContainer) {

   let cardsData = items.map(item => {

      const {
         img,
         name,
         profileImg,
         creator,
         bid
      } = item;

      return `<div class="card action-card content_card hot-nfts-card">
                  <div class="content_card_img">
                     <img src="${img}" alt="">
                     <button type="button" class="like" >
                        <svg class="heart" width="20" height="18" viewBox="0 0 20 18" fill="#E7ECF2"
                           xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M14.44 0.100006C12.63 0.100006 11.01 0.980006 10 2.33001C8.99 0.980006 7.37 0.100006 5.56 0.100006C2.49 0.100006 0 2.60001 0 5.69001C0 6.88001 0.19 7.98001 0.52 9.00001C2.1 14 6.97 16.99 9.38 17.81C9.72 17.93 10.28 17.93 10.62 17.81C13.03 16.99 17.9 14 19.48 9.00001C19.81 7.98001 20 6.88001 20 5.69001C20 2.60001 17.51 0.100006 14.44 0.100006Z" />
                        </svg>
                     </button>
                  </div>
                  <div class="content_card_info">
                     <div class="content_card_info_title">
                        <div class="content_card_name">
                           <p>${name}</p>
                        </div>
                        <div class="content_card_creator">
                           <img src="${profileImg}" alt="">
                           <p>${creator}</p>
                        </div>
                     </div>
                     <div class="content_card_current-bid">
                        <h5>Current Bid</h5>
                        <p>${bid}</p>
                     </div>
                  </div>
                  <div class="content_card_footer">
                     <div class="content_card_highlight">
                        <div>
                           <img src="img/vector.svg" alt="">
                        </div>
                        <p>05 : 12 : 07 : 26</p>
                     </div>
                     <button class="btn content_card_btn blue">
                        <p>Bid</p>
                     </button>
                  </div>
               </div>`

   });

   cardsData = cardsData.join('');

   cardsContainer.innerHTML = cardsData;

   like();

};

function cardsOnPageDefault(itemsPerPart, currentCards) {
   for (var i = 0; i < itemsPerPart * currentCards; i++) {
      document.querySelectorAll('.collectibles-cards .card')[i].classList.remove('hidden-on');
   }
};

function cardsOnPageViewMore(cardsBox, itemsPerPart, currentCards) {
   for (var i = 0; i < itemsPerPart * currentCards; i++) {
      if (cardsBox[i] == undefined) {
         break;
      }
      cardsBox[i].classList.remove('hidden-on');
   }

};

function hideAllCards() {
   const card = document.querySelectorAll('.collectibles-cards .card');
   card.forEach(item => {
      if (!item.classList.contains('hidden-on'))
         item.classList.add('hidden-on');
   });
};

function createViewMoreDefaultBtn(items, discoveryBox, currentCards, itemsPerPart) {
   if (items.length > itemsPerPart && !document.getElementById('viewmore')) {

      const btn = document.createElement('button');
      btn.innerHTML = '<p>View more</p>';
      btn.classList.add('btn');
      btn.classList.add('view-more');

      btn.setAttribute('id', 'viewmore');

      discoveryBox.appendChild(btn);

      btn.addEventListener('click', function () {

         currentCards += 1;

         cardsOnPageDefault(itemsPerPart, currentCards);

         if (currentCards == Math.floor(items.length / itemsPerPart)) {
            btn.remove();
         }

      });


   }
};

function createViewMoreFilterBtn(cardsBox, discoveryBox, currentCards, itemsPerPart, checkCards) {
   if (cardsBox.length > 0 && !document.getElementById('viewmore')) {

      const btn = document.createElement('button');
      btn.innerHTML = '<p>View more</p>';
      btn.classList.add('btn');
      btn.classList.add('view-more');

      btn.setAttribute('id', 'viewmore');

      discoveryBox.appendChild(btn);

      currentCards = 0;

      btn.addEventListener('click', function () {

         currentCards += 1;

         cardsOnPageViewMore(cardsBox, itemsPerPart, currentCards);

         if (currentCards == Math.floor(checkCards / itemsPerPart)) {
            btn.remove();
         }

      });


   }
};

function showDiscoveryCards(items, cardsContainer, discoveryBox, itemsPerPart, currentCards) {

   showCards(items, cardsContainer);

   hideAllCards();

   cardsOnPageDefault(itemsPerPart, currentCards);

   const alert = document.createElement('div');
   alert.innerHTML = '<p>Cards not found</p>';
   alert.classList.add('not-found');

   discoveryBox.appendChild(alert);

   createViewMoreDefaultBtn(items, discoveryBox, currentCards, itemsPerPart);

   like();

};


function setDiscover(items) {
   const search = document.getElementById('search');
   const searchBtn = document.querySelector('.search-btn');
   const discoveryBox = document.querySelector(".explore-collectibles__block_cards");
   const cardsContainer = document.querySelector(".collectibles-cards");
   const filtersContainer = document.querySelector('.explore-collectibles__block_filters_btns');

   let itemsPerPart = 12;
   let currentCards = 1;

   showDiscoveryCards(items, cardsContainer, discoveryBox, itemsPerPart, currentCards);

   like();

   const filters = cards.reduce((values, item) => {

      if (!values.includes(item.category)) {
         values.push(item.category);
      }

      return values;
   }, []);

   let filtersBtn = filters.map(item => {

      return `<button type="button" class="filter-item" data-id='${item}'>
                  <p>${item}</p>
               </button>`

   });

   filtersBtn = filtersBtn.join('');

   filtersContainer.innerHTML = `${filtersBtn}
   <button type="button" class="filter-item" data-id='more'>
                  <img src="" alt="">
                  <p>more</p>
               </button> `;


   const filterItems = document.querySelectorAll('.filter-item');
   const card = document.querySelectorAll('.collectibles-cards .card');
   const alert = document.querySelector('.not-found');

   filterItems.forEach(item => {
      item.addEventListener('click', function () {

         hideAllCards();

         let cardsOnPage = 0;
         let checkCards = 0;
         let cardsBox = [];

         if (document.getElementById('viewmore')) {
            document.getElementById('viewmore').remove();
         }

         if (item.dataset.id == 'more'){

         cardsOnPageDefault(itemsPerPart, currentCards);

         if (!document.getElementById('viewmore')) {
            createViewMoreDefaultBtn(items, discoveryBox, currentCards, itemsPerPart);
         }

         } else {

         for (let i = 0; i < items.length; i++) {

            if (item.dataset.id == items[i].category) {
               checkCards += 1;
            }

            if (item.dataset.id == items[i].category && checkCards > itemsPerPart) {
               cardsBox.push(card[i]);
            }

            if (i == items.length - 1 && checkCards > itemsPerPart && !document.getElementById('viewmore')) {
               createViewMoreFilterBtn(cardsBox, discoveryBox, currentCards, itemsPerPart, checkCards);
            }

             if (cardsOnPage == itemsPerPart || item.dataset.id !== items[i].category) {
               if (!card[i].classList.contains('hidden-on')){
                  card[i].classList.add('hidden-on');
               }
               }

            if (cardsOnPage < itemsPerPart && item.dataset.id == items[i].category) {
               if (card[i].classList.contains('hidden-on')) {
                  card[i].classList.remove('hidden-on');
                  cardsOnPage += 1;
               }
            } 
               
            


         };

         console.log(cardsBox);
         console.log(checkCards);
      };
      });
   
   });

   // searchBtn.addEventListener('submit', function (e) {
   //    e.preventDefault();
   // });

   searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
   });

   search.addEventListener('input', setSearch);

   function setSearch() {

      let value = this.value.toLowerCase().trim();

      if (value.length > 1) {

         hideAllCards();

         let cardsOnPage = 0;
         let checkCards = 0;
         let cardsBox = [];

         if (document.getElementById('viewmore')) {
            document.getElementById('viewmore').remove();
         }

         for (let i = 0; i < items.length; i++) {

            let cardsData = items[i];
            let cardsKeys = Object.values(cardsData);
            cardsKeys.splice(1, 1);
            cardsKeys.splice(2, 1);
            cardsKeys = cardsKeys.join(' ').toLowerCase();

            if (cardsKeys.includes(value)) {
               checkCards += 1;
            }

            if (cardsKeys.includes(value) && checkCards > itemsPerPart) {
               cardsBox.push(card[i]);

            }

            if (i == items.length - 1 && checkCards > itemsPerPart && !document.getElementById('viewmore')) {
               createViewMoreFilterBtn(cardsBox, discoveryBox, currentCards, itemsPerPart, checkCards);
            }

            if (cardsOnPage == itemsPerPart || !cardsKeys.includes(value)) {
               if (!card[i].classList.contains('hidden-on')) {
                  card[i].classList.add('hidden-on');
               }
            }

            if (cardsOnPage < itemsPerPart && cardsKeys.includes(value)) {
               if (card[i].classList.contains('hidden-on')) {
                  card[i].classList.remove('hidden-on');
                  cardsOnPage += 1;
               }
            }

            if (i == items.length - 1 && !cardsKeys.includes(value) && cardsOnPage == 0) {
               cardsContainer.style.display = 'none';
               alert.classList.add('active');
               if (document.getElementById('viewmore')) {
                  document.getElementById('viewmore').remove();
               }
            } else if (alert.classList.contains('active')) {
               alert.classList.remove('active');
               cardsContainer.style.display = 'grid';
               if (!document.getElementById('viewmore')) {
                  createViewMoreFilterBtn(cardsBox, discoveryBox, currentCards, itemsPerPart, checkCards);
               }
            }


         }

      }

      if (value.length < 2) {

         if (alert.classList.contains('active')) {
            cardsContainer.style.display = 'grid';
            alert.classList.remove('active');
         }
         hideAllCards();
         cardsOnPageDefault(itemsPerPart, currentCards);
         if (!document.getElementById('viewmore')) {
            createViewMoreDefaultBtn(items, discoveryBox, currentCards, itemsPerPart);
         }
      }



   };



};