const URLBASE = `http://localhost:8000/village/villageois`;
const PANC = document.querySelector('.pancarte');

document.addEventListener('DOMContentLoaded', function() {
    loadpage();
    const nouw = document.querySelector('.new');
    const cancel = document.querySelector('.cancel');
    const PANK = document.querySelector('.pancarte');
    nouw.addEventListener('click',function(){
            PANK.style.display = "flex";
    })
    cancel.addEventListener('click',function(){
            PANK.style.display = "none";
    })

});
async function loadpage(){
    const response = await fetch(URLBASE);
    const datas = await response.json();
    const compta = document.querySelector('.compta');
    const main = document.querySelector('main');
    let text = "";
    let compt = 0;

    datas.forEach((data,index)=>{
        compt++;

        text += 
        `<section >
            <h2> ${data.nom} </h2>
            <div class="content">
                <p> ${data.age} </p>
                <div> 
                    <button class="editer"> Editer </button>
                    <a onclick='deletepost(${data.id})'> supprimé </a>
                </div>
                <h6> écrit par ${data.metier}</h6>
            </div>
        </section>`;
    });

    const textv2 = `<p> il y a ${compt} posts </p>`
    compta.innerHTML = textv2;
    main.innerHTML = text;
    const nouwV2 = document.querySelectorAll('.editer');
    const cancelV2 = document.querySelector('.cancelV2');
    const PANKV2 = document.querySelector('.pancarteV2');
    nouwV2.forEach((edit)=>{
        edit.addEventListener('click',function(){
            PANKV2.style.display = "flex";
        })
    })
    cancelV2.addEventListener('click',function(){
            PANKV2.style.display = "none";
    })
}

function deletepost($id){
    if(confirm('Veux-tu vraiment supprimer ?')){
        fetch( URLBASE + `/${$id}` ,{
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
        })
        .then(response => {
            if(response.ok){
                alert(`Article avec l'id : ${$id} a été supprimé`);
                loadpage();
            } else {
                throw new Error(`Erreur lors de la suppression de l'article`);
            }
        })
        .catch(error => console.log(error));
    }
}
function updatepost($id){
    if(confirm('Veux-tu vraiment modifier ?')){
        fetch( URLBASE + `/${$id}` ,{
            method: 'PATCH',
            headers: {'Content-Type':'application/json'}
        })
        .then(response => {
            if(response.ok){
                alert(`Article avec l'id : ${$id} a été modifier`);
                loadpage();
            } else {
                throw new Error(`Erreur lors de la modification de l'article`);
            }
        })
        .catch(error => console.log(error));
    }
}
document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const datatas = new FormData(this); // Récupère les données du formulaire
    console.log(datatas.get('nom'));

    let datas = new FormData();
    datas.append("nom", datatas.get('nom'));
    datas.append("age", datatas.get('age'));
    datas.append("metier", datatas.get('metier'));
    let options = {
      method: "POST",
      body: datas,
    };
    const url = URLBASE + `/ajouter`;
    if(confirm('Veux-tu vraiment ajouter ?')){
        fetch(url, options);
        loadpage();
    }

});


// POUR EDITER IDEE 
// le but serait d'aller chercher avec l'id dans la BD le post
// mettre les infos dans le formulaire 
// afficher le formulaire après