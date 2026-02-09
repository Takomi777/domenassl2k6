// Carousel Auto Scroll
const carouselTrack = document.querySelector('.client-carousel-track');
let scrollAmount = 0;

function autoScroll() {
  scrollAmount += 2; // Increased scroll speed by adjusting increment
  carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;

  if (scrollAmount >= carouselTrack.scrollWidth / 1.2) {
    scrollAmount = 0; // Reset scrolling when reaching the end of the track
  }

  requestAnimationFrame(autoScroll); // Use requestAnimationFrame for smoother scrolling
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

requestAnimationFrame(autoScroll); // Start auto scrolling


// Smooth Scroll without jQuery
document.querySelectorAll("a[data-role='smoothscroll']").forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const position = document.querySelector(this.getAttribute('href')).offsetTop - 70;
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});

// Back to Top Button with Throttling
const backTop = document.querySelector(".back-to-top");

window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    backTop.style.visibility = window.scrollY > 400 ? 'visible' : 'hidden';
  });
});

Fancybox.bind('[data-fancybox="gallery"]', {
  //
});    

backTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Page Load Actions without jQuery
window.addEventListener('load', () => {
  new       AOS.init();  // Assuming tooltips and popovers require bootstrap.js
  new WOW().init(); // Initialize WOW.js
  setTimeout(() => {
    $('.loader-container').fadeOut();
  }, 200);
});

// Owl Carousel Initialization using Vanilla JS (if you keep jQuery, no changes needed)
$(function() {
  $(".hero-carousel").owlCarousel({
    items: 1,
    nav: true,
    navText: ["<span class='mai-chevron-back'></span>", "<span class='mai-chevron-forward'></span>"],
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
  });

  $(".team-carousel").owlCarousel({
    margin: 16,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      800: { items: 3 }
    }
  });

  $(".testimonial-carousel").owlCarousel({
    responsive: {
      0: { items: 1, margin: 16 },
      768: { items: 2, margin: 24 },
      992: { items: 3, margin: 24 }
    }
  });
});

// Isotope Filtering (No need for change if Isotope.js is kept)
$(function() {
  var $grid = $('.grid');
  $grid.isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

  $('.filterable-btn').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $(this).toggleClass('active').siblings().removeClass('active');
    $grid.isotope({ filter: filterValue });
  });

  // Trigger a click on the 'Domki Jednorodzinne' button after the page loads
  $('.filterable-btn button[data-filter=".1"]').trigger('click');
});
