import vuePhotographerPage from "./components/vuePhotographerPage.js";
import contactForm from "./components/contactForm.js";


export default class Photographer {
  constructor(datas) {

    this.photographerId = new URLSearchParams(window.location.search).get("id");
    this.photographer = datas.photographers.filter(photographer => photographer.id == this.photographerId)[0];
    
    if (this.photographer === undefined) window.location = "index.html";

    this.photographer.medias = datas.media.filter(media => media.photographerId == this.photographerId);

    this.photographer.likes = 0;
    this.photographer.medias.map(m => this.photographer.likes += m.likes);

  }

  renderPhotographerPage() {

     // Photographe Infos
    const photographersPageElement = document.getElementById("photographer-profil");
    photographersPageElement.innerHTML = vuePhotographerPage.createInfoTemplate(this.photographer);

    // Photographe medias
    const photographersMediasElement = document.getElementById("gallery");
    photographersMediasElement.innerHTML = vuePhotographerPage.createListMediaTemplate(this.photographer);

    // Photographe Price
    document.getElementById("photographerPrice").innerHTML = this.photographer.price;

    // Photographe Likes
    const photographerLike = document.querySelectorAll(".media__infos__likes_icon");
    const likes = document.getElementById("counter-likes");

    likes.innerHTML = this.photographer.likes;

    // Incrémentation des likes
    const checks = [];
    for (let i = 0; i < photographerLike.length; i++){
        photographerLike[i].addEventListener("click", () => {
           if (photographerLike[i].classList.toggle("check")){
               const check = {...photographerLike[i], likes: photographerLike[i] +1}
               checks.push(check)
               this.photographer.likes ++;
               likes.innerHTML = this.photographer.likes;
               photographerLike[i].parentElement.querySelector(".media__infos__like-nb").innerHTML ++;
           }else {
            this.photographer.likes --;
            likes.innerHTML = this.photographer.likes;
            photographerLike[i].parentElement.querySelector(".media__infos__like-nb").innerHTML --;
           }
          })

          photographerLike[i].addEventListener("keypress", () => {
            if (photographerLike[i].classList.toggle("check")){
                const check = {...photographerLike[i], likes: photographerLike[i] +1}
                checks.push(check)
                this.photographer.likes ++;
                likes.innerHTML = this.photographer.likes;
                photographerLike[i].parentElement.querySelector(".media__infos__like-nb").innerHTML ++;
            }else {
             this.photographer.likes --;
             likes.innerHTML = this.photographer.likes;
             photographerLike[i].parentElement.querySelector(".media__infos__like-nb").innerHTML --;
            }
           })
      }  

    // gestion des filtres de trie par catégorie
    const filter = document.getElementById("filter-btn");
    const filterList = document.getElementById('filter-list');
    const popularity = document.getElementById('Popularite');
    const day = document.getElementById('Date');
    const titles = document.getElementById('Titre');
      
    // Ouverture du bouton de trie
        filter.addEventListener("click", () => {
            filterList.classList.toggle("open");
            });
        
    // Fermeture du bouton de trie
        filterList.addEventListener("click", () => {
            filterList.classList.remove("open");
            });  

    // Affichage par popularité
        popularity.addEventListener("click", () => {
            filter.textContent = "Popularité";
            this.photographer.medias.sort((a, b) => (b.likes || Number.MAX_VALUE) - (a.likes || Number.MAX_VALUE));
            photographersMediasElement.innerHTML = vuePhotographerPage.createListMediaTemplate(this.photographer);
            filter.addEventListener("click", () => {
            filterList.classList.toggle("open");
            });
            this.renderPhotographerPage();
        });

    // Affichage par date de publication
        day.addEventListener("click", () => {
            filter.textContent = " Date";
            this.photographer.medias.sort((a,b) => {
                return new Date(b.date) - new Date(a.date)
              });
            photographersMediasElement.innerHTML = vuePhotographerPage.createListMediaTemplate(this.photographer);
            filter.addEventListener("click", () => {
            filterList.classList.toggle("open");
            });
            this.renderPhotographerPage();
        });

    // Affichage par titre    
        titles.addEventListener("click", () => {
            filter.textContent = "Titre";
            this.photographer.medias.sort(function compare (a, b) {
                if (a.title < b.title)
                return -1;
                if (a.title > b.title)
                return 1;
                return 0;
            });
            photographersMediasElement.innerHTML = vuePhotographerPage.createListMediaTemplate(this.photographer);
            filter.addEventListener("click", () => {
            filterList.classList.toggle("open");
            });
            this.renderPhotographerPage();
        });

    // Photographe Lightbox
    const mediaLinks = photographersMediasElement.querySelectorAll(".media__link");
    mediaLinks.forEach(link => {
      link.addEventListener("click", () => {
        // lightbox
        const lightbox = document.getElementById("modal-lightbox");

        // Récupère le média à afficher
        const media = this.photographer.medias.filter(media => media.id == link.dataset.mediaid)[0];
        const mediaContainer = lightbox.getElementsByClassName("lightbox__container");
        mediaContainer[0].innerHTML = vuePhotographerPage.createMediaLightboxTemplate(media, this.photographer);
        
        // ouverture de la lightbox
        lightbox.classList.add("open");
        document.getElementById("modal-lightbox").focus();

        // fermeture de la lightbox
        lightbox.querySelector(".close").addEventListener("click", () => {
        lightbox.classList.remove("open");
        });
        
         //  pagination de la lightbox
         document.querySelector(".arrow-left").addEventListener('click', () => {
            if (link.dataset.index == 0) {
              link.dataset.index = this.photographer.medias.length;
            }
            link.dataset.index --;
            mediaContainer[0].innerHTML = vuePhotographerPage.createMediaLightboxTemplate(this.photographer.medias[link.dataset.index], this.photographer);
        });

        document.querySelector(".arrow-right").addEventListener('click', () => {
            link.dataset.index ++;
            if (link.dataset.index == this.photographer.medias.length) {
              link.dataset.index = 0;
            }
            mediaContainer[0].innerHTML = vuePhotographerPage.createMediaLightboxTemplate(this.photographer.medias[link.dataset.index], this.photographer);
        });

      });
      
    });

    // Initialisation de la modal de contact
    contactForm.modal.init();
    document.getElementById("name").innerHTML = this.photographer.name;
    document.getElementById("contact-form").addEventListener("submit", contactForm.form_inscription.onSubmit);
  }

}

