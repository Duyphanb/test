// Function to update the main display when hovering or focusing on images
function upDate(previewPic) {
  console.log('upDate function called');
  const imageDiv = document.getElementById("image");
  imageDiv.style.backgroundImage = "url('" + previewPic.src + "')";
  imageDiv.innerText = previewPic.alt;
}

// Function to reset the main display
function unDo() {
  console.log('unDo function called');
  const imageDiv = document.getElementById("image");
  imageDiv.style.backgroundImage = "url('')";
  imageDiv.innerText = "Hover over an image below to display here.";
}

// Function to add tabindex to images when page loads
function addTabIndex() {
  console.log('addTabIndex function called - page loaded');
  const images = document.querySelectorAll('.preview');

  // Loop through each image and add tabindex
  for (let i = 0; i < images.length; i++) {
    images[i].setAttribute('tabindex', '0');
    console.log('Added tabindex to image ' + (i + 1));
  }
}

// Function to add all event listeners
function addEventListeners() {
  const images = document.querySelectorAll('.preview');

  for (let i = 0; i < images.length; i++) {
    // Mouse events
    images[i].addEventListener('mouseover', function() {
      upDate(this);
    });

    images[i].addEventListener('mouseout', function() {
      unDo();
    });

    // Keyboard focus events
    images[i].addEventListener('focus', function() {
      upDate(this);
    });

    images[i].addEventListener('blur', function() {
      unDo();
    });
  }
}

// Initialize everything when page loads
window.addEventListener('load', function() {
  console.log('Page loaded - initializing gallery');
  addTabIndex();
  addEventListeners();
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(event) {
  const focusedElement = document.activeElement;

  if (focusedElement.classList.contains('preview')) {
    // Allow Enter key to trigger the same effect as hover
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      upDate(focusedElement);
    }

    // Arrow key navigation
    const images = Array.from(document.querySelectorAll('.preview'));
    const currentIndex = images.indexOf(focusedElement);

    if (event.key === 'ArrowRight' && currentIndex < images.length - 1) {
      images[currentIndex + 1].focus();
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
      images[currentIndex - 1].focus();
    }
  }
});
