

function photographerFactory(data) {

    const { id, name, portrait, city, country, tagline, price } = data;
    
    const picture = `assets/photographers/portraits/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute('href', 'photographer.html?id='+id)

        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('alt', name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        

        const location = document.createElement('p');
        location.textContent = [city +', ' + country]
        location.classList.add('location');

        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.classList.add('tag');
        
        const pricing = document.createElement('p');
        pricing.textContent = price + "€";
        pricing.classList.add('price');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(pricing);
        link.appendChild(article)
        return (link);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}