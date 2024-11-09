const App = {
  // les données de l'application
  _state: {
    debug: true, // afficher (ou pas) la bannière dans la console au démarrage
    listA: [], // Stockage des données de l'API
    listB: [], // Stockage des données de l'API
    URLV: "http://localhost:8000/village/villageois", // URL de l'api
    URLD: "http://localhost:8000/village/Descriptions", // URL de l'api
  },

  getInfos: async function (url) {
    try {
      const response = await fetch(`${url}`); // Requête API avec la page
      const data = await response.json(); // Convertir la réponse en JSON
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  },

  // les sélecteurs importants du DOM
  _dom: {
    app: document.querySelector(".presentation"),
  },

  /**
   * Initialisations.
   */
  coreInit() {
    this.HELPERS.log.call(this, "App is starting.");
    this.injectDatas();
  },

  /**
   * Mise en place des gestionnaires d'ev.
   */

  // les méthodes utilitaires regroupées dans la propriété HELPERS
  HELPERS: {
    /**
     * Afficher un message dans la console.
     * @param {string} message
     * @returns
     */
    log(message) {
      if (!this._state.debug) return;
      const CONSOLE_STYLE = "color: blue; font-size: 20px";
      const log_message = `
          ///////////////////////////////////////////
            ${message}
              (c) s5 MMI Angoulême 2024
          ///////////////////////////////////////////
        `;
      console.log(`%c${log_message}`, CONSOLE_STYLE);
    },
  },

  /**
   * Injecter les informations à partir de l'API.
   * Afficher le nom+prénom et l'email de chaque utilisateur.
   */
  async injectDatas() {
    try {
      this._state.listA = await this.getInfos(this._state.URLV);
      this._state.listB = await this.getInfos(this._state.URLD);
      const html = this._state.listA
        .map(
          (villageois) => `
         <div id="card${villageois.id}" class="sectioncont">
                    ${this.cardMaker(villageois)}
                </div>
         `
        )
        .join("");

      this._dom.app.innerHTML = html;
      this.modifBtnForm();
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  },

  modifBtnForm() {
    modifs = document.querySelectorAll(".modif");
    modifs.forEach((element, index) => {
      element.removeEventListener;

      element.addEventListener("click", () => {
        modifier = document.querySelector(`#card${element.id}`);
        var villageoi = this._state.listA.find((item) => item.id == element.id);
        const html = `
        <form id="form${villageoi.id}">
            <section>
              <input class="h2"  id="nom" value="${villageoi.nom}"/>
              <input class="age" id="age" value="${villageoi.age}" />
              <ul>
                ${this.inputMaker(
                  this._state.listB.filter((element) => {
                    return element.villageois_id == villageoi.id;
                  })
                )}
              </ul>
              <input type="text" class="metier" id="metier" value="${
                villageoi.metier
              }"/>
            </section>
            <div>
              <button class="valide" type="submit"> Valider </button>
              <button class="cancel" id="btn${villageoi.id}"> Annuler </button>
            </div>
        </form>
        `;
        modifier.innerHTML = html;

        this.cancel = document.querySelector(`#btn${villageoi.id}`);
        this.cancel.addEventListener("click", (event) => {
          event.preventDefault();
          document.querySelector(`#card${villageoi.id}`).innerHTML =
            this.cardMaker(villageoi);
          this.modifBtnForm();
        });

        this.valid = document.querySelector(`#form${villageoi.id}`);
        this.valid.addEventListener("submit", async (event) => {
          event.preventDefault();

          try {
            const descriptionValue = document.querySelectorAll(
              `#form${villageoi.id} textarea`
            );

            console.log("---DescriptionValue---");
            console.log(descriptionValue);

            const descriptionText = Array.from(descriptionValue)
              .map((textarea) => textarea.value.trim())
              .join(", ");

            console.log("---DescriptionTexte---");
            console.log(descriptionText);

            const updatedData = {
              id: villageoi.id,
              nom: this.valid.nom.value,
              age: this.valid.age.value,
              metier: this.valid.metier.value,
            };

            console.log("---updatedData---");
            console.log(updatedData);

            const response = await fetch(
              `${this._state.URLV}/${villageoi.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json", // Indique que le corps de la requête est du JSON
                },
                body: JSON.stringify(updatedData), // Convertir les données en JSON avant de les envoyer
              }
            );

            if (!response.ok) {
              throw new Error(
                "Erreur lors de la modification de l’utilisateur."
              );
            }

            const updatedUser = await response.json(); // Obtenir la réponse JSON de l'API
          } catch (error) {
            console.error(
              "Erreur lors de la modification de l'utilisateur:",
              error
            );
          }
        });
      });
    });
  },

  cardMaker(Habitant) {
    html = `
    <section>
        <h2> ${Habitant.nom}</h2>
        <p class="age"> ${Habitant.age} ans</p>
        <ul>
           ${this.liMaker(
             this._state.listB.filter((element) => {
               return element.villageois_id == Habitant.id;
             })
           )}
        </ul>
        <p class="metier"> ${Habitant.metier} </p>
    </section>
    <div>
        <button class="modif" id="${Habitant.id}"> Modifier </button>
        <button class="supp" id="${Habitant.id}"> Exclure </button>
    </div>
    `;
    return html;
  },

  inputMaker(list) {
    const html = list
      .map(
        (element, index) =>
          `<li><textarea id="input${element.id}}" class="inputdescription" rows="1">${element.description}</textarea></li>`
      )
      .join("");
    return html;
  },

  liMaker(list) {
    const html = list
      .map((element) => `<li>${element.description}</li>`)
      .join("");
    return html;
  },
};

// initialiser l'application quand le DOM est prêt
window.addEventListener("DOMContentLoaded", App.coreInit());
