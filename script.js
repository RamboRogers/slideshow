let currentIndex = 0;

function changeImage(images) {
    const slideshowimg = document.getElementById('slideshowimg');
    slideshowimg.src = `${images[currentIndex]}`;
    console.log("IMG:" + `${images[currentIndex]}`);
    currentIndex = (currentIndex + 1) % images.length;
    setTimeout(() => changeImage(images), 3000);
}

fetch('/images')
    .then(response => response.json())
    .then(images => {
        if (images.length > 0) {
            changeImage(images);
        }
    })
    .catch(error => console.error('Error fetching images:', error));
