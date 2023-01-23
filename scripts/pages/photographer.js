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

function handleLikes() {
    const likeButtons = document.querySelectorAll('.btnlikes')
    const totalLikes = document.querySelector('.overlay__wrapper--like__total')
   
    
    likeButtons.forEach(btn => btn.addEventListener('click', (event) => {
        
        let liked = event.target.dataset.liked 
        const parent = event.target.parentNode
        const likeCounter = parent.querySelector('.photographer-gallery__counter-likes')
        const likeNumber = likeCounter.textContent

        if(liked == 'no') {

            event.target.dataset.liked = 'yes'

            const totalLikesCount = totalLikes.textContent

            totalLikes.textContent = Number(totalLikesCount) + 1

            likeCounter.textContent = Number(likeNumber) +1 
        }
        else {

            event.target.dataset.liked = 'no'

            const totalLikesCount = totalLikes.textContent

            likeCounter.textContent = Number(likeNumber) -1

            totalLikes.textContent = Number(totalLikesCount) - 1
            
        }
    
    }))
    
}

function displayOverlay(dailyPrice, mediaList) {

    const totalLikes = document.querySelector('.overlay__wrapper--like__total')
    const dailyPriceDOM = document.querySelector('.overlay__wrapper--pricing__amount')

    const likeSum = mediaList.reduce((accumulator, currentValue) =>  accumulator + currentValue.likes, 0);
    
    totalLikes.textContent = likeSum
    dailyPriceDOM.textContent = dailyPrice + '€ / jour'
}

// lightbox functions 
function showLightBox(medias, idx){
    const media = medias[idx]
    const  lightbox = document.querySelector('#lightbox')
    const lightBoxContainer = document.querySelector('.lightbox__container')
    const mediaInfo = document.querySelector('.lightbox__media--title')
    let template = ""
    let infoTemplate = ""
    const { title, image, video } = media || {}
    const picture = `assets/photos/${image}`;
    const videos = `assets/photos/${video}`;

    if(image){
        template = `
            <img src="${picture}" alt="${title}" class="photographer-gallery__img" />
         `

        infoTemplate = `
            ${title}
        `
    } else if (video){
        template = `
        <video class="photographer-gallery__media" controls autoplay muted >
            <source src="${videos}" type="video/mp4"  alt="${title}" >
        </video>
        `
        infoTemplate = `
        ${title}
        `
    }

    lightBoxContainer.innerHTML = template
    lightBoxContainer.setAttribute("aria-label", "image closeup view" )
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

    document.onkeydown =  function(e){
        switch (e.keyCode){
            case 39: 
                showLightBox(medias, idx + 1)
                break;
            case 37:
                showLightBox(medias, idx - 1)
                break;
            case 27:
                closeLightbox()
        }
    }
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

// sort media filter

function sortMedia(medias){
    const select = document.getElementById('filter')

    select.addEventListener('change', (e) =>{

        const choice = e.target.value

        if(choice == "Popularite")
            medias.sort((a, b) => b.likes - a.likes)

        if(choice == "Titre"){
            let sortMethod =  function(a, b){
                if(a.title > b.title){
                    return 1
                }
                else if(b.title > a.title){
                    return -1
                } else{
                    return 0
                }
            }
            medias.sort(sortMethod)
        } 
        if(choice == "Date")
             medias.sort((a,b) =>new Date(b.date).valueOf() - new Date(a.date).valueOf())
             
    
    displayMedias(medias)
    handleMediasClick(medias)
    }) 
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
    sortMedia(photographerMedias)
    displayOverlay(photographeprofile.price, photographerMedias)

} 
main();
