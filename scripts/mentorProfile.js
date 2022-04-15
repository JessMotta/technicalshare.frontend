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

let appointmentButton = document.getElementById("appointment");


let platforms = document.querySelectorAll("input[name='platform-option']");
let schedules = document.querySelectorAll("input[name='schedule-option']");


// inicializar as informações do mentor de acordo com o id
async function initializeInfo() {
  return await findUserById(idMentor)
    .then((dataMentors) => {
      showInfo(dataMentors);
      appointmentButton.addEventListener("click", function () {
        showConfirmation(dataMentors);
      });
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

// mostrar o card confirmando a mentoria com todas as informações
function showConfirmation(dataMentors) {
  let mentor_content = document.querySelector(".mentor__content");

  mentor_content.innerHTML = "";

  content = document.createElement("div");
  content.setAttribute("class", "card confirmation__card");
  mentor_content.appendChild(content);

  confirmationTitle = document.createElement("h1")
  confirmationTitle.setAttribute("class", "confirmation__title")
  confirmationTitle.textContent = "Agendamento cadastrado com sucesso! Tira um print, para não esquecer!"
  content.appendChild(confirmationTitle)

  mentorTitle = document.createElement("h2");
  mentorTitle.setAttribute("class", "confirmation__subtitle");
  mentorTitle.textContent = `Mentor: ${dataMentors.name}`;
  content.appendChild(mentorTitle);

  mentorCategory = document.createElement("h3");
  mentorCategory.setAttribute("class", "confirmation__info")
  mentorCategory.textContent = `Categoria(s): ${dataMentors.Categories[0].name}`;
  content.appendChild(mentorCategory);

  if (dataMentors.Categories.length > 1) {
    mentorCategory2 = document.createElement("h3");
    mentorCategory2.setAttribute("class", "confirmation__info")
    mentorCategory2.textContent = dataMentors.Categories[1].name;
    content.appendChild(mentorCategory2);
  }

  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i].checked) {
      mentorPlatform = document.createElement("h3");
      mentorPlatform.setAttribute("class", "confirmation__info")
      mentorPlatform.textContent = `Plataforma: ${platforms[i].value}`;
      content.appendChild(mentorPlatform);
    }
  }

  mentorDate = document.createElement("h3");
  mentorDate.setAttribute("class", "confirmation__info")
  mentorDate.textContent = `Data: ${window.storedCalendarDate}`;
  content.appendChild(mentorDate);

  for (i = 0; i < schedules.length; i++) {
    if (schedules[i].checked) {
      mentorTime = document.createElement("h3");
      mentorTime.setAttribute("class", "confirmation__info")
      mentorTime.textContent = `Horário: ${schedules[i].value}`;
      content.appendChild(mentorTime);
    }
  }

  appointmentButton.style.display = "none"
}
