function mediaFactory(data){
    const { id, photographerId , title, image, likes, date, price, video } = data ;


    // const picture = `assets/photos/${image}`;
    // const videos = `assets/photos/${video}`;
    

    class MediaData{       
        // filter media type 
        constructor(data){
            if(data.type === "image"){
                return new Photography(data)
            } else if(data.type === 'video'){
                return new VideoClass(data)
            } else{
                throw "Unknow Media Type"
            }
        }
    }

    class Photography{        
        constructor(data){
            this._imgSrc = data.image
            this._imgAlt = data.title
            this._imgTitle = data.title
            this._imgPhotographerId = data.photographerId
            this._imgLikes = data.likes
        }

        createHtml(){
            return`
            <div class="photographer-gallery__thumbnail" aria-label="${this._imgTitle} thumbnail">
                <img class="photographer-gallery__media" src="assets/photos/${this._imgSrc}" />
                <div class="photographer-gallery__info">
                    <h3 class="photographer-gallery__info-title">${this._imgTitle}</h3>
                    <span class="photographer-gallery__info-likes">${this._imgLikes}<i class="fa-solid fa-heart" aria-label="likes"></i></span>
                </div>
            </div>
            `
        }
    }

    class VideoClass{
        constructor(data){
            this._videoSrc = data.video
            this._videoTitle = data.title
            this._videoPhotographerId = data.photographerId
            this._videoLikes = data.likes
        }

        createHtml(){
            return`
            <div class="photographer-gallery__thumbnail" aria-label="${this._videoTitle} thumbnail">
                <img class="photographer-gallery__media" src="assets/photos/${this._videoSrc}" />
                <div class="photographer-gallery__info">
                    <h3 class="photographer-gallery__info-title">${this._videoTitle}</h3>
                    <span class="photographer-gallery__info-likes">${this._videoLikes}<i class="fa-solid fa-heart" aria-label="likes"></i></span>
                </div>
            </div>
            `
        }
    }
}


