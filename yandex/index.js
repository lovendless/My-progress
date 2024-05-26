document.addEventListener('DOMContentLoaded', () => {
   membersSlider();
   stagesSlider();
   intersectionObserver();
});

//=========================Members slider===============================

function membersSlider() {
   let currentSlide = 1;
   const sliderNavigation = document.querySelector('.slider__navigation');
   let totalSlides = document.querySelectorAll('.slider__item');
   let currentSlideElement = document.getElementById('current-slide');
   const totalSlidesElement = document.getElementById('total-slides');
   const prevBtn = sliderNavigation.querySelector('.left');
   const nextBtn = sliderNavigation.querySelector('.right');
   const member = document.getElementById('slide');
   const memberwidth = member.offsetWidth;


   const checkwidth = () => {
      if (document.documentElement.clientWidth >= 769) {
         totalSlides = document.querySelectorAll('.slider__item').length - 2;
         totalSlidesElement.textContent = '/' + (totalSlides + 2);
      } else {
         totalSlides = document.querySelectorAll('.slider__item').length;
         totalSlidesElement.textContent = '/' + (totalSlides);
      }
   };
   checkwidth();

   function showSlide(index) {
      const slidesContainer = document.querySelector('.slider__list');
      const translateValue = -(index - 1) * memberwidth + 'px';
      slidesContainer.style.transform = 'translateX(' + translateValue + ')';

      if (document.documentElement.clientWidth >= 769) {
         currentSlideElement.textContent = index + 2;
      } else {
         currentSlideElement.textContent = index;
      }

      nextBtn.style.backgroundColor = index === totalSlides ? '#ccc' : '';
      nextBtn.disabled = index === totalSlides;

      prevBtn.style.backgroundColor = index === 1 ? '#ccc' : '';
      prevBtn.disabled = index === 1;
   }

   function prevSlide() {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
      showSlide(currentSlide);
   }

   function nextSlide() {
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
      showSlide(currentSlide);
   }

   prevBtn.addEventListener('click', prevSlide);
   nextBtn.addEventListener('click', nextSlide);

   setInterval(nextSlide, 4000);

   showSlide(1);

};

//=========================IntersectionObserver===============================

function intersectionObserver() {
   const container = document.querySelector('.stages__container');

   let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
   };

   const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            let elem = entry.target;

            elem.classList.add('active');
         }
      });
   };

   let observer = new IntersectionObserver(intersectionCallback, options);

   observer.observe(container);
};

//=========================Stages slider===============================

function stagesSlider() {
   const stagesWrapper = document.querySelector('.stages__wrapper');
   const stagesItems = stagesWrapper.querySelector('.stages__list');
   const stages = Array.from(stagesWrapper.querySelectorAll('.stages__item')).slice(0, 5);
   const prevBtn = stagesWrapper.querySelector('.left');
   const nextBtn = stagesWrapper.querySelector('.right');
   const dotsContainer = stagesWrapper.querySelector('.stages__dots');

  
   const updateArrows = () => {
     
      if (currentSlide === 0) {
         prevBtn.style.backgroundColor = '#ссс';
         prevBtn.disabled = true;
      } else {
         prevBtn.style.backgroundColor = '';
         prevBtn.disabled = false;
      }

      if (currentSlide === stages.length) {
         nextBtn.style.backgroundColor = '#ccc';
         nextBtn.disabled = true;
      } else {
         nextBtn.style.backgroundColor = '';
         nextBtn.disabled = false;
      }
   };

   let currentSlide = 0;

   stages.forEach((_, index) => {
      updateArrows(); 
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
   });

   const updateSlidePosition = () => {
      const additionalOffset = 20;
      const slideWidth = stagesWrapper.offsetWidth + additionalOffset;
      stagesItems.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      updateDots();
   };

   const updateDots = () => {
      dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
         dot.classList.toggle('active', index === currentSlide);
      });
   };

   const goToSlide = (index) => {
      currentSlide = index;
      updateSlidePosition();
      updateArrows(); 
   }

   prevBtn.addEventListener('click', () => {
      currentSlide = Math.max(currentSlide - 1, 0);
      updateSlidePosition();
      updateArrows(); 
   });

   nextBtn.addEventListener('click', () => {
      currentSlide = Math.min(currentSlide + 1, stages.length - 1);
      updateSlidePosition();
      updateArrows(); 
   });

   updateSlidePosition();
}

