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
    console.log(searchCategory.value);
    cards.innerHTML = "";
    // transforma o valor colocado no input em maiúsculo
    let categoriaProcurada = searchCategory.value;

    searchCategories(categoriaProcurada);

    // SUBSTITUIR POR FUNÇÃO QUE ESTÁ LINKADA A CATEGORIA AO MENTOR
    // inicializar os cards
    async function searchCategories(categoriaProcurada) {
      return await getCategories(categoriaProcurada)
        .then((data) => {
          foundedCategory(data);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  }
});

function foundedCategory(data){
  if(data.length == 0){
    cards.innerHTML = `<div class="search__notFound">
        <h2>Nenhum mentor dessa categoria foi encontrado. Digite novamente</h2>
      </div>`;
  }else{
    for (let i = 0; i < data.length; i++) {
      createCardFiltered(data, i);
      console.log(data);
    }
  }
  searchCategory.value = "";
  }

// cria os cards e adiciona a info de cada usuário dentro deles
function createCardFiltered(dataMentors, id) {
  // cria a estrutura do card e adiciona a área de conteúdo (cards)
  card = document.createElement("div");
  card.setAttribute("class", "card");
  cards.appendChild(card);

  // adiciona a imagem do mentor dentro do card
  image = document.createElement("img");
  image.setAttribute("class", "card__image");
  image.setAttribute("src", "../assets/images/user.png");
  card.appendChild(image);

  // adiciona a estrutura do card body (onde ficarão as demais infos)
  cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card__info");
  card.appendChild(cardBody);

  // adiciona o nome do mentor
  mentorName = document.createElement("h2");
  mentorName.setAttribute("class", "card__title");
  mentorName.textContent = dataMentors[id].name;
  cardBody.appendChild(mentorName);

  // let categoryBody = document.createElement("div")
  // categoryBody.setAttribute("class", "card__category")
  // cardBody.appendChild(categoryBody)

  // adiciona a category (área de interesse)
  category = document.createElement("p");
  category.setAttribute("class", "card__category");
  category.textContent = dataMentors[id].email;
  cardBody.appendChild(category);

  // adiciona o botão para ver o perfil do mentor em uma segunda tela, ao clicar no botão é identificado o id do mentor
  buttonProfile = document.createElement("button");
  buttonProfile.setAttribute("class", "card__button");
  buttonProfile.setAttribute("id", dataMentors[id].id);
  buttonProfile.innerHTML = "Saiba +";
  buttonProfile.addEventListener("click", function (e) {
    identity = e.target.id;
    openProfile(identity);
  });
  cardBody.appendChild(buttonProfile);
}


