import vueTag from "./components/vueTag.js";
import vuePhotographersList from "./components/vuePhotographersList.js";

export default class HomePage {
  constructor(datas) {
    this.datas = datas;
  }
  renderHomePage() {
      // Création NavBar tags
      const tags = vueTag.getTags(this.datas);
      this.navTagsElement = document.getElementById("tags");

      this.navTagsElement.innerHTML = vueTag.createListTemplate(tags);

      // Liste des profils
      const photographersListElement = document.getElementById("photographers-list");
      photographersListElement.innerHTML = vuePhotographersList.createListTemplate(this.datas.photographers);

      // Evenement selection Tag
      this.navTagsElement.querySelectorAll("li").forEach(tag => {
        tag.addEventListener("click", () => {
   
        tag.classList.toggle('active');
        // Filtre les photographes qui contiennent le tag selectionné
        this.selPhotographe();  

        });
      });
  }
  selPhotographe() {
    let photographSel = this.datas.photographers;
    const photographersListElement = document.getElementById("photographers-list");
    this.navTagsElement.querySelectorAll("li.active").forEach(tag => {
      photographSel =  [... this.datas.photographers.filter(photographer => photographer.tags.indexOf(tag.dataset.value) !== -1)];
    });
    photographersListElement.innerHTML = vuePhotographersList.createListTemplate(photographSel);
  }

}  
