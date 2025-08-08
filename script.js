document.addEventListener('DOMContentLoaded', (event) => {
    const music = document.getElementById('background-music');
    // Attempt to play the music
    music.play().catch(error => {
        // Log an error if autoplay is prevented by the browser
        console.log("Autoplay was prevented. User interaction may be required to play the music.");
        // You can add a fallback here, like showing a play button for the user to click.
    });
});
