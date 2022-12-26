    async function getPhotographers(){
        const res = await fetch('/data/photographers.json')
        const data = await res.json()        
        return data
    }

    async function displayData(photographers){
        const photographersSection = document.querySelector(".photographer_section");
        let template = ""

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            template = template + userCardDOM.outerHTML 
        });
        photographersSection.innerHTML = template;
    };

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
