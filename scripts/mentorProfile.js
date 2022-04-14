// import {calendarControl} from "./calendar"

// inicializa os cards assim que o HTML é carregado
document.addEventListener("DOMContentLoaded", () => {
  initializeInfo();
});

// ler o id do usuário escolhido na url da página
const urlParams = new URLSearchParams(window.location.search);
const getId = urlParams.get("id");

// id do mentor
const idMentor = parseInt(getId);

// variaveis para utilizar na tela de confirmação de mentoria
let mentorTitle;
let mentorCategory;
let mentorCategory2;
let mentorPlatform;
let mentorDate;
let mentorTime;

let platforms= document.querySelector(".platforms")
let schedules = document.querySelector(".schedules__options")

let appointmentButton = document.getElementById("appointment")

// console.log(calendarControl.selectDate())

// inicializar as informações do mentor de acordo com o id
async function initializeInfo() {
  return await findUserById(idMentor)
    .then((dataMentors) => {
      showInfo(dataMentors);
      appointmentButton.addEventListener("click", function(){
        showConfirmation(dataMentors)
      })
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
  let category_1Rating = document.getElementById("category1-rating");
  let category_2Rating = document.getElementById("category2-rating");

  // // todas as estrelas do HTML
  const stars_1 = document.querySelectorAll(".stars_1");
  const stars_2 = document.querySelectorAll(".stars_2");

  let classStars_2 = document.getElementById("classStar_2");
  let rating_2;
  let evaluation_2;
  let dataValue_2;

  // vai receber o id do mentor
  mentorName.textContent = dataMentors.name;
  category_1.textContent = dataMentors.Categories[0].name;
  category_1Rating.textContent = dataMentors.Categories[0].name;

  // PARA CATEGORIA 1
  // mostrar a avaliação da habilidade
  let rating_1 = dataMentors.Categories[0].UserCategories.rating;

  // para receber a posição correta no array stars
  let evaluation_1 = rating_1 - 1;

  // recebe o valor do data-avaliacao (parâmetro do elemento estrela no HTML)
  let dataValue_1 = stars_1[evaluation_1].attributes[1].value;

  // adiciona a classe ativo se o rating(avaliação) for igual a posição do data-avaliacao
  if (rating_1 == dataValue_1) {
    stars_1[evaluation_1].classList.add("ativo");
  }

  // PARA CATEGORIA 2
  // caso o mentor tenha uma segunda categoria ela será exibida
  if (dataMentors.Categories.length > 1) {
    category_2.style.display = "block";
    category_2.textContent = dataMentors.Categories[1].name;
    category_2Rating.style.display = "block";
    category_2Rating.textContent = dataMentors.Categories[1].name;
    classStars_2.style.display = "flex";

    rating_2 = dataMentors.Categories[1].UserCategories.rating;
    evaluation_2 = rating_2 - 1;
    dataValue_2 = stars_2[evaluation_2].attributes[1].value;

    if (rating_2 == dataValue_2) {
      stars_2[evaluation_2].classList.add("ativo");
    }
  } else {
    // caso o mentor não tenha segunda categoria
    category_2.style.display = "none";
    category_2Rating.style.display = "none";
    classStars_2.style.display = "none";
  }
}



function showConfirmation(dataMentors){
  let mentor_content = document.querySelector(".mentor__content");
  // let conf_mentorName = document.getElementById("conf-mentorName");
  // let conf_category = document.getElementById("conf-category");
  // let conf__plataform = document.getElementById("conf-plataform");
  // let conf_time = document.getElementById("conf-time");
  // let conf__date = document.getElementById("conf-date");

  mentor_content.innerHTML = "";

  content = document.createElement("div");
  content.setAttribute("class", "card confirmation__card");
  mentor_content.appendChild(content);

  mentorTitle = document.createElement("h2");
  mentorTitle.setAttribute("class", "confirmation__subtitle");
  mentorTitle.textContent = dataMentors.name;
  content.appendChild(mentorTitle);

  mentorCategory = document.createElement("h3");
  mentorCategory.textContent = dataMentors.Categories[0].name;
  content.appendChild(mentorCategory);

  if (dataMentors.Categories.length > 1) {
    mentorCategory2 = document.createElement("h3");
    mentorCategory2.textContent = dataMentors.Categories[1].name;
    content.appendChild(mentorCategory2);
  }

  
  mentorPlatform = document.createElement("h3");
  mentorPlatform.textContent = platforms.platform-Option.value
  content.appendChild(mentorPlatform);

  mentorDate = document.createElement("h3");
  content.appendChild(mentorDate);

  mentorTime = document.createElement("h3");
  mentorTime.textContent = schedules.schedule-Option.value
  content.appendChild(mentorTime);
}