

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

    console.log(profile)
}

function displayMedias(medias){
    const gallerySection = document.querySelector('.photographer-gallery')

    let template = ""
    medias.forEach(media => template += mediaFactory(media).getMediaCardDOM())
    gallerySection.innerHTML = template
    console.log(medias)

}

async function main(){
    const id = getPhotographerID()
    const {photographers, media} = await getAllData()
    const photographeprofile = getPhotographerProfile(photographers, id)
    const photographerMedias = getPhotographerMedias(media, id)

    displayProfile(photographeprofile)
    displayMedias(photographerMedias)


}

main();