import HomePage from "./assets/js/homePage.js";
import Photographer from "./assets/js/photographer.js";

class FishEyeApp {
  constructor() {
     this.fetchJSON();
  }

  // Routage selon la page demandée
  initApp() {
    console.log("pathname:", window.location.pathname.split("/").pop());
    switch(window.location.pathname.split("/").pop()) {
      case "index.html":
      case "" :
        const home = new HomePage(this.datas);
        home.renderHomePage();
      break;
      case "profil.html":
        const photographer = new Photographer(this.datas);
        photographer.renderPhotographerPage(this.datas);
      break;
    }
  }

  fetchJSON(){
    fetch("https://guillaumesere.github.io/GuillaumeSere_P6_26102021/assets/js/data/FishEyeData.json").then(response => response.json())
    .then(datas => {
        this.datas = datas;
        this.initApp();
    })
    .catch((error) => console.error("Erreur : " + error));
  }

}
// Initialise l'application
 new FishEyeApp();