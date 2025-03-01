// Functionality for "View More" buttons
document.querySelectorAll('.view-more-button').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault(); // Prevent default behavior (linking)

    // Navigate to the new page URL
    const newPageUrl = button.getAttribute('href');
    window.location.href = newPageUrl;
  });
});

// Slideshow Functionality
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls (if applicable)
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Display the appropriate slide and dot
function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");

  // Looping logic
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // Hide all slides
  slides.forEach(slide => {
    slide.style.display = "none";
  });

  // Remove active class from all dots
  dots.forEach(dot => {
    dot.className = dot.className.replace(" active", "");
  });

  // Show the current slide and set the current dot as active
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Slick Carousel Initialization (assuming you have the class 'slider' for the carousel)
$(document).ready(function(){
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 2000, // Set the autoplay speed to 2 seconds
    slidesToShow: 1,
    slidesToScroll: 1
  });
});