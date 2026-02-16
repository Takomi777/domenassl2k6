// --- FUNKCJA DLA STRZAŁEK (MUSI BYĆ GLOBALNA) ---
function manualScroll(id, distance) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollBy({ left: distance, behavior: 'smooth' });
    if (typeof pauseTrack === 'function') pauseTrack(id);
  }
}

const trackStates = {};

function pauseTrack(trackId) {
  if (!trackStates[trackId]) return;
  trackStates[trackId].isPaused = true;
  clearTimeout(trackStates[trackId].resumeTimeout);
  // Wznowienie po 3 sekundach bezczynności
  trackStates[trackId].resumeTimeout = setTimeout(() => {
    trackStates[trackId].isPaused = false;
  }, 3000);
}

// Główna logika po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. LOGIKA KARUZELI LOGOTYPÓW (PRZESUWANIE + DOTYK) ---
  const setups = [
    { id: 'track-1', speed: 0.5 }, // Górny (wolniejszy)
    { id: 'track-2', speed: 1.2 }  // Dolny (szybszy)
  ];

  setups.forEach(setup => {
    const slider = document.getElementById(setup.id);
    if (!slider) return;
    const container = slider.querySelector('.logo-scroll-container');
    if (!container) return;

    // Potrójne klonowanie dla płynnej pętli
    container.innerHTML += container.innerHTML + container.innerHTML;

    trackStates[setup.id] = {
      isPaused: false,
      resumeTimeout: null,
      isDown: false,
      startX: 0,
      scrollLeft: 0
    };

    const state = trackStates[setup.id];

    // Obsługa startu (Myszka / Dotyk)
    const startAction = (e) => {
      state.isDown = true;
      state.isPaused = true;
      clearTimeout(state.resumeTimeout);
      state.startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
      state.scrollLeft = slider.scrollLeft;
    };

    // Obsługa końca
    const endAction = () => {
      if (state.isDown) {
        state.isDown = false;
        pauseTrack(setup.id);
      }
    };

    // Obsługa ruchu
    const moveAction = (e) => {
      if (!state.isDown) return;
      // Zapobiegaj przewijaniu strony podczas przesuwania karuzeli na telefonie
      if (e.type === 'touchmove') {
        // e.preventDefault(); // Opcjonalne: odkomentuj, jeśli chcesz zablokować pionowy scroll podczas dotykania loga
      }
      const x = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - slider.offsetLeft;
      const walk = (x - state.startX) * 1.5; // Czułość przesuwania
      slider.scrollLeft = state.scrollLeft - walk;
    };

    slider.addEventListener('mousedown', startAction);
    slider.addEventListener('touchstart', startAction, {passive: true});
    
    window.addEventListener('mouseup', endAction);
    slider.addEventListener('touchend', endAction);
    
    slider.addEventListener('mousemove', moveAction);
    slider.addEventListener('touchmove', moveAction, {passive: true});

    // Pętla animacji
    function step() {
      if (!state.isPaused && !state.isDown) {
        slider.scrollLeft += setup.speed;
        // Resetowanie pętli (gdy dojdzie do 2/3 szerokości)
        if (slider.scrollLeft >= (slider.scrollWidth / 3) * 2) {
          slider.scrollLeft = slider.scrollWidth / 3;
        }
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
});

// Akcje po pełnym załadowaniu strony (w tym

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
