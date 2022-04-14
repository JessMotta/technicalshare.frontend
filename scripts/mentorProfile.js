// inicializa os cards assim que o HTML é carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeInfo();
});

// ler o id do usuário escolhido na url da página
const urlParams = new URLSearchParams(window.location.search);
const getId = urlParams.get("id");

// id do mentor
const idMentor = parseInt(getId);

// inicializar as informações do mentor de acordo com o id
async function initializeInfo() {
  return await findUserById(idMentor)
    .then((dataMentors) => {
      showInfo(dataMentors);
      console.log(dataMentors);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}

function showInfo(dataMentors) {
  // armazena as áreas de nome e categoria da tela
  let mentorName = document.getElementById("mentor-name-profile");
  let category_1 = document.getElementById("category-1");
  let category_2 = document.getElementById("category-2");

  // vai receber o id do mentor
  mentorName.textContent = dataMentors.name;
  category_1.textContent = dataMentors.Categories[0].name;

  // caso o mentor tenha uma segunda categoria ela será exibida
  if (dataMentors.Categories.length > 1) {
    category_2.style.display = "block";
    category_2.textContent = dataMentors.Categories[1].name;
  } else {
    // caso o mentor não tenha segunda categoria
    category_2.style.display = "none";
  }

  // skill.textContent = dataMentors.skills.skill

  // // mostrar a avaliação da habilidade
  // let rating = parseFloat(dataMentors.skills.rating);

  // // todas as estrelas do HTML
  // const stars = document.querySelectorAll(".star-icon");
  // console.log(stars);

  // // para receber a posição correta no array stars
  // let i = rating - 1;

  // // pega o valor do data-avaliacao
  // let av = stars[i].attributes[1].value;
  // // console.log(av);

  // // adiciona a classe ativo se o rating(avaliação) for igual a posição do data-avaliacao
  // if (rating == av) {
  //   stars[i].classList.add("ativo");
  // }
}
