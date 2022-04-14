// inicializa os cards assim que o HTML é carregado
// document.addEventListener("DOMContentLoaded", () => {
//   searchCategories();
// });

// armazena o banco de dados
// let database = "../database.json";

// let identity;

let searchCategory = document.getElementById("search-category");

// chamar a função que filtra os mentores conforme categoria quando der enter
searchCategory.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // console.log(searchCategory.value);
    cards.innerHTML = "";
    // transforma o valor colocado no input em maiúsculo
    let categoriaProcurada = searchCategory.value;

    searchCategories(categoriaProcurada);

    // SUBSTITUIR POR FUNÇÃO QUE ESTÁ LINKADA A CATEGORIA AO MENTOR
    // inicializar os cards
    async function searchCategories(categoriaProcurada) {
      return await getCategories(categoriaProcurada)
        .then((data) => {
          foundedCategoryID(data[0].id);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  }
});



async function foundedCategoryID(categoryID){
  // let idCategoria = categoryID[0].id;
  return await findUsersByCategory(categoryID).then((usersCategory) =>{
    foundedUsers(usersCategory)
    console.log(usersCategory)
  }).catch((error) =>{
    console.log(`Error: ${error}`);
  })
}




function foundedUsers(usersCategory){

  // console.log(usersCategory)
  if(usersCategory.length == 0){
    cards.innerHTML = `<div class="search__notFound">
        <h2>Nenhum mentor dessa categoria foi encontrado. Digite novamente</h2>
      </div>`;
  }else{
    for (let i = 0; i < usersCategory.Users.length; i++) {
      createCardFiltered(usersCategory, i);
      console.log(usersCategory.Users);
    }
  }
  searchCategory.value = "";
  }

// cria os cards e adiciona a info de cada usuário dentro deles
function createCardFiltered(usersCategory, id) {
  // cria a estrutura do card e adiciona a área de conteúdo (cards)
  card = document.createElement("div");
  card.setAttribute("class", "card");
  cards.appendChild(card);

  // adiciona a imagem do mentor dentro do card
  image = document.createElement("img");
  image.setAttribute("class", "card__image");
  image.setAttribute("src", "./assets/images/user.png");
  card.appendChild(image);

  // adiciona a estrutura do card body (onde ficarão as demais infos)
  cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card__info");
  card.appendChild(cardBody);

  // adiciona o nome do mentor
  mentorName = document.createElement("h2");
  mentorName.setAttribute("class", "card__title");
  mentorName.textContent = usersCategory.Users[id].name;
  cardBody.appendChild(mentorName);


  // adiciona a category (área de interesse)
  category = document.createElement("p");
  category.setAttribute("class", "card__category");
  category.textContent = usersCategory.name;
  cardBody.appendChild(category);

  // adiciona o botão para ver o perfil do mentor em uma segunda tela, ao clicar no botão é identificado o id do mentor
  buttonProfile = document.createElement("button");
  buttonProfile.setAttribute("class", "card__button");
  buttonProfile.setAttribute("id", usersCategory.Users[id].id);
  buttonProfile.innerHTML = "Saiba +";
  buttonProfile.addEventListener("click", function (e) {
    identity = e.target.id;
    openProfile(identity);
  });
  cardBody.appendChild(buttonProfile);
}


