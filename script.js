const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArr = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;
const apiKey = 'YTlI7P5H7t74w19V3nx-ZtOT8oQTaIixtPaB7-6xzlU';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function that help create attributes 

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArr.length;
    //run function for each obj in photosArr
    photosArr.forEach((photo) => {
        //create <a> to link unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        //create a <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put <img> inside <a> then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

//get photo from unsplash api
async function getPhoto() {
    try {
        const respone = await fetch(apiUrl);
        photosArr = await respone.json();
        displayPhotos();
    } catch (e) {
        console.log(e)
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhoto();
    }
})

// onload 
getPhoto();