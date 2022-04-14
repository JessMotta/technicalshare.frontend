const htmlContraste = document.querySelector(".tudo")
const contrasteBtn = document.querySelector(".contraste__btn")

contrasteBtn.addEventListener("click", () =>{
    htmlContraste.classList.toggle("alto-contraste")
})