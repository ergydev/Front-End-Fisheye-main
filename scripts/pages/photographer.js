async function getAllData(){
    const res = await fetch('/data/photographers.json')
    const data = await res.json()        
    return data
}

function getPhotographerID(){
    const params = new URLSearchParams(location.search)
    const identifier = params.get('id')
    return identifier 
}

function getPhotographerProfile(photographers, identifier){
    const profile = photographers.find((photographer) => photographer.id == identifier)
    document.title = "Fisheye - " + profile.name;
    const modalName = document.querySelector('.modal--name')
    modalName.textContent = profile.name
    return profile
}

function getPhotographerMedias(media, identifier){
    const medias = media.filter((media)=> media.photographerId == identifier)
    return medias
}

async function displayProfile(profile){
    const photographerHeader = document.querySelector('.photograph-header')

    const template = `
        <div>
            <h1 class="photographer-name">${profile.name}</h1>
            <h2 class="photographer-adress">${profile.city}, ${profile.country}</h2>
            <p class="photographer-tagline">${profile.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()" title="Contact Me">Contactez-moi</button>
        <div>
            <img class="photographer-portrait" src="assets/photographers/portraits/${profile.portrait}" alt="${profile.name}" />
        </div>
    `
    photographerHeader.innerHTML = template
}

function displayMedias(medias){
    const gallerySection = document.querySelector('.photographer-gallery')

    let template = ""
    medias.forEach((media, idx) => template += mediaFactory(media).getMediaCardDOM(idx))
    gallerySection.innerHTML = template
}

function handleLikes(){
    const likeButtons = document.querySelectorAll('.btnlikes')
    
    likeButtons.forEach(btn => btn.addEventListener('click', (event) => {
        const parent = event.target.parentNode
        const likeCounter = parent.querySelector('.photographer-gallery__counter-likes')
        const likeNumber = likeCounter.textContent

        likeCounter.textContent = Number(likeNumber) +1 
    }))
}

// lightbox functions 
function showLightBox(medias, idx){
    const media = medias[idx]
    const  lightbox = document.querySelector('#lightbox')
    const lightBoxContainer = document.querySelector('.lightbox__container')
    const mediaInfo = document.querySelector('.lightbox__media--title')
    let template = ""
    let infoTemplate = ""
    const { title, image, video } = media
    const picture = `assets/photos/${image}`;
    const videos = `assets/photos/${video}`;

    if(image){
        template = `
            <img src="${picture}" alt="${title}" />
         `

        infoTemplate = `
            ${title}
        `
    }
    if(video){
        template = `
        <video class="photographer-gallery__media" controls>
            <source src="${videos}" type="video/mp4"  alt="${title}">
        </video>
        `
        infoTemplate = `
        ${title}
        `
    }

    lightBoxContainer.innerHTML = template
    mediaInfo.innerHTML = infoTemplate
    lightbox.classList.add('active')
    changeLightbox(medias, Number(idx))
}

function changeLightbox(medias, idx){
    document.querySelector('.lightbox__prev').addEventListener('click', function(){
        if(idx === 0){
            showLightBox(medias, medias.length - 1)
        } else{

            showLightBox(medias, idx - 1)
        }
    })
    document.querySelector('.lightbox__next').addEventListener('click', function(){
        if(idx === medias.length - 1){
            showLightBox(medias, idx = 0)
        } else{
            showLightBox(medias, idx + 1)
        }
    })
}

function handleMediasClick(mediaList){
    const allMediasCards = document.querySelectorAll('.photographer-gallery__media')

    allMediasCards.forEach(media => media.addEventListener('click', function(event){
        const currentMedia = event.target

        // get data atribute with dataset 
        const currentMediaIdx = currentMedia.dataset.idx 
        showLightBox(mediaList, currentMediaIdx)
    }))
}

function closeLightbox(){
    const close = document.querySelector('.lightbox__close')
    const lightbox = document.getElementById('lightbox')
    lightbox.classList.remove('active')
    close.focus()
}

async function main(){
    const id = getPhotographerID()
    const {photographers, media} = await getAllData()
    const photographeprofile = getPhotographerProfile(photographers, id)
    const photographerMedias = getPhotographerMedias(media, id)

    displayProfile(photographeprofile)
    displayMedias(photographerMedias)
    handleMediasClick(photographerMedias)
    handleLikes()

} 
main();
