import vueTag from './vueTag.js'
function createListTemplate(photographers) {
    let template = "";
    photographers.forEach(photographer => {
        template +=
            `<article class="photographer-thumbnail">
            <a href="/profil.html?id=${photographer.id}" class="photographer__profil">
                <img class="photographer__profil__img" src="assets/images/photos/Photographers ID Photos/${photographer.portrait}">
                <h2 class="photographer__profil__name">${photographer.name}</h2>
            </a>
            <div class="photographer__infos">
                <p class="photographer__infos__city">${photographer.city}, ${photographer.country}</p>
                <p class="photographer__infos__tagline">${photographer.tagline}</p>
                <p class="photographer__infos__price">${photographer.price}€/jour</p>
            </div>
            <ul class="tag-list photographer__tags">
                ${vueTag.createListTemplate(photographer.tags)}
            </ul>
         </article>`;
    });
    return template;
}

export default {
    createListTemplate
}