function mediaFactory(data){
    const { id, photographerId , title, image, likes, date, price, video } = data ;


    const picture = `assets/photos/${image}`;
    const videos = `assets/photos/${video}`;
    
    function getMediaCardDOM(idx){
        if(image){
            return`
            <div class="photographer-gallery__card" aria-label="${title} thumbnail">
                <img class="photographer-gallery__media" src="${picture}" alt="${title}, closeup" data-idx="${idx}" />
                <div class="photographer-gallery__info">
                    <h3 class="photographer-gallery__info-title">${title}</h3>
                    <div class="photographer-gallery__like__section">
                    <span class="photographer-gallery__counter-likes">${likes}</span>
                    <i class="fa-solid fa-heart btnlikes"  aria-label="likes"></i>
                    </div>
                </div>
            </div>
            `
    } else if (videos){
        return`
        <div class="photographer-gallery__card" aria-label="${title} thumbnail">
            <video class="photographer-gallery__media" controls>
                <source src="${videos}" type="video/mp4" alt="${title}, closeup" data-idx="${idx}">
            </video>
            <div class="photographer-gallery__info">
                <h3 class="photographer-gallery__info-title">${title}</h3>
                <div class="photographer-gallery__like__section">
                <span class="photographer-gallery__counter-likes">${likes}</span>
                <i class="fa-solid fa-heart btnlikes" aria-label="likes"></i>
                </div>
            </div>
        </div>
        `
    } 
            
    }
    return { id, photographerId , title, image, likes, date, price, video, getMediaCardDOM}
}

    


