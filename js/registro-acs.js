const regMenu = document.querySelector(".select");

regMenu.addEventListener("click", () =>{
    regMenu.classList.toggle("active");
    const active = regMenu.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active){
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else{
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
})
