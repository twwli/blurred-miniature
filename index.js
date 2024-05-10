// Function to convert the image into a blurred thumbnail in base64 while preserving the proportions
function convertToBlurredBase64(img, callback) {
  const imageObj = new Image();
  imageObj.crossOrigin = "Anonymous";
  imageObj.onload = function () {
      // Aspect ratio of the original image
      const originalWidth = imageObj.width;
      const originalHeight = imageObj.height;
      const aspectRatio = originalWidth / originalHeight;

      // Target size for the thumbnail
      const targetWidth = 50; // Adjust target width here
      const targetHeight = Math.round(targetWidth / aspectRatio);

      // Create a canvas with the calculated dimensions
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the resized image on the canvas
      context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);

      // Encode to base64
      const base64String = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality if necessary
      callback(base64String);
  };
  imageObj.src = img.src; // Load source image
}

// Select all images with the `source-image` class
const images = document.querySelectorAll('.source-image');

// Browse each image and add a base64 blurred thumbnail to the corresponding .curtain element
images.forEach(img => {
  convertToBlurredBase64(img, function (result) {
      // Create a new base64-encoded blurred image
      const blurredImg = document.createElement('img');
      blurredImg.src = result;
      blurredImg.alt = "Miniature floue";
      blurredImg.loading = "lazy";
      blurredImg.decoding = "async";

      // Find the .curtain container corresponding to this image
      const curtain = img.closest('li').querySelector('.curtain');
      if (curtain) {
          curtain.appendChild(blurredImg);
      }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const figures = document.querySelectorAll('figure');

  // Function called when the element enters the viewport
  const callback = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a one-second delay before adding the fade-in class
        setTimeout(() => {
          entry.target.classList.add('fade-in');
          // Stop observing this element because the animation has already started
          observer.unobserve(entry.target);
        }, 1000); // One second delay (1000 milliseconds)
      }
    });
  };

  // Create a new observer
  const observer = new IntersectionObserver(callback, {
    threshold: 0.1 // Starts the animation when 70% of the element is visible
  });

  // Begins observation on each <figure>.
  figures.forEach(figure => {
    observer.observe(figure);
  });
});

