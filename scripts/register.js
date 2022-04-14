let mentorName = document.getElementById("name");
let mentorEmail = document.getElementById("email");
let category = document.getElementById("category");

// por enquanto não armazena esses valores no banco de dados
let mentor = document.getElementById("mentor");
let mentored = document.getElementById("mentored");

// armazena o id do usuário, e o id da categoria associada
let userID;
let categoryValue;

// botão para registrar usuario
let register = document.getElementById("register");

register.addEventListener("click", async function () {
  // checa se todos os campos estão preenchidos
  if (
    mentorName.value != "" &&
    mentorEmail.value != "" &&
    category.value != 0
  ) {
    //   cria o usuário
    await createUser({
      name: mentorName.value,
      email: mentorEmail.value,
      password: "12345678",
    });
    // procura o usuario pelo nome criado para poder identificar seu id gerado no sistema
    await getUsers().then((data) => {
      data.forEach((user) => {
        if (user.name === mentorName.value) {
          userID = user.id;
          categoryValue = parseInt(category.value);
          linkUserToCategory(userID, categoryValue);
        }
      });
    });
  }
});
// função que associa o id do usuário ao id da categoria
async function linkUserToCategory(userID, categoryValue) {
  await associateUserToCategory(userID, categoryValue);
  window.location.href = "./confirmation_register.html"
}
