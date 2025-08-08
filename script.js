document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary HTML elements
    const slideshowContainer = document.getElementById('slideshow-container');
    const photoUpload = document.getElementById('photo-upload');
    const music = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');

    // Initialize with the images currently in the HTML
    let images = Array.from(slideshowContainer.getElementsByClassName('slideshow-image'));
    let currentImageIndex = 0;
    let slideshowInterval;

    // Function to stop any currently running slideshow
    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    // Function to start the slideshow loop
    function startSlideshow() {
        stopSlideshow(); // Ensure no multiple intervals are running

        if (images.length > 0) {
            // Set the first image as active immediately
            images.forEach(img => img.classList.remove('active'));
            images[currentImageIndex].classList.add('active');

            slideshowInterval = setInterval(() => {
                // Remove 'active' class from the current image
                images[currentImageIndex].classList.remove('active');
                // Move to the next image, looping back to the start if necessary
                currentImageIndex = (currentImageIndex + 1) % images.length;
                // Add 'active' class to the new current image to trigger the fade-in
                images[currentImageIndex].classList.add('active');
            }, 4000); // Change image every 4 seconds
        }
    }

    // Event listener for the file upload input
    photoUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        // Proceed only if the user has selected files
        if (files.length > 0) {
            stopSlideshow();
            slideshowContainer.innerHTML = ''; // Clear existing/placeholder images
            images = []; // Reset the images array

            // Process up to 6 selected files
            Array.from(files).slice(0, 6).forEach((file, index) => {
                const reader = new FileReader();

                reader.onload = (e) => {
                    // Create a new image element for each uploaded photo
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = `Uploaded photo ${index + 1}`;
                    img.classList.add('slideshow-image');
                    slideshowContainer.appendChild(img);
                    images.push(img);

                    // Once all selected files have been processed, start the new slideshow
                    if (images.length === Math.min(files.length, 6)) {
                        currentImageIndex = 0; // Reset index to the beginning
                        startSlideshow();
                    }
                };

                // Read the file as a Data URL to use as an image source
                reader.readAsDataURL(file);
            });
        }
    });

    // Event listener for the music play/pause button
    musicControl.addEventListener('click', () => {
        if (music.muted) {
            music.muted = false;
            music.play(); // Autoplay is often blocked, so play() on user interaction
            musicControl.textContent = '⏸️'; // Change icon to 'pause'
        } else {
            music.muted = true;
            musicControl.textContent = '▶️'; // Change icon to 'play'
        }
    });

    // Start the initial slideshow with the default images on page load
    startSlideshow();
});