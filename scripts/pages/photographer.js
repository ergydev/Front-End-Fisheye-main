//Mettre le code JavaScript lié à la page photographer.html

async function getAllData() {
    const res = await fetch('/data/photographers.json')
    const data = await res.json()        
    return data
}


function getPhotographerID(){
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    return id 
}

function getPhotographerProfile(photographers, id){
    const profile = photographers.find(p => p.id = id)
    return profile
}

function getPhotographerMedias(media, id){
    const medias = media.filter((photographerId)=>{
        // console.log(photographerId)
        return id === media.photographerId
    })
    console.log(medias)
}

function displayProfile(profile){
 console.log(profile)
}

function displayMedias(medias){
console.log(medias)
}

async function main(){
    const id = getPhotographerID()
    console.log(id)
    // const medias = getPhotographerMedias()
    // console.log(medias)
    const {photographers, media} = await getAllData()
    const photographeprofile = getPhotographerProfile(photographers, id)
    const photographerMedias = getPhotographerMedias(media, id)

    displayProfile(photographeprofile)
    displayMedias(photographerMedias)


}

main();