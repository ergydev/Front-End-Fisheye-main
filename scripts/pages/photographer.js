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

function getPhotographerMedias(id){

}

function displayProfile(profile){
 console.log(profile)
}

function displayMedias(medias){

}

async function main(){
    const id = getPhotographerID()
    console.log(id)
    const {photographers, medias} = await getAllData()
    const photographeprofile = getPhotographerProfile(photographers, id)
    const photographerMedias = getPhotographerMedias(medias, id)

    displayProfile(photographeprofile)
    displayMedias(photographerMedias)


}

main();