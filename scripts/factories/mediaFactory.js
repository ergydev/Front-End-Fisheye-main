function mediaFactory(data){
    const { id, photographerId , title, image, likes, date, price, video } = data ;


    const picture = `assets/photos/${image}`;
    const videos = `assets/photos/${video}`;
    
    function getMediaCardDOM(){
        if(image){
            return`
            <div class="photographer-gallery__card" aria-label="${title} thumbnail">
                <img class="photographer-gallery__media" src="${picture}" />
                <div class="photographer-gallery__info">
                    <h3 class="photographer-gallery__info-title">${title}</h3>
                    <span class="photographer-gallery__info-likes">
                        ${likes}
                        <i class="fa-solid fa-heart" aria-label="likes"></i>
                    </span>
                </div>
            </div>
            `
    } else if (videos){
        return`
        <div class="photographer-gallery__card" aria-label="${title} thumbnail">
            <video class="photographer-gallery__media">
                <source src="${videos}" type="video/mp4">
            </video>
            <div class="photographer-gallery__info">
                <h3 class="photographer-gallery__info-title">${title}</h3>
                <span class="photographer-gallery__info-likes">
                    ${likes}
                    <i class="fa-solid fa-heart" aria-label="likes"></i>
                </span>
            </div>
        </div>
        `
    } 
            
    }
    return { id, photographerId , title, image, likes, date, price, video, getMediaCardDOM}
}



    // }



        // createHtml(){
        //     return`
        //     <div class="photographer-gallery__thumbnail" aria-label="${this._videoTitle} thumbnail">
        //         <img class="photographer-gallery__media" src="assets/photos/${this._videoSrc}" />
        //         <div class="photographer-gallery__info">
        //             <h3 class="photographer-gallery__info-title">${this._videoTitle}</h3>
        //             <span class="photographer-gallery__info-likes">${this._videoLikes}<i class="fa-solid fa-heart" aria-label="likes"></i></span>
        //         </div>
        //     </div>
        //     `
        // }
        
    // }
    


