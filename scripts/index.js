const routes = {
    "/home":"/pages/home.html",
    "/servicos":"/pages/servicos.html",
    "/explorar":"/pages/explorar.html",
    404:"/pages/404.html",
}


function route(event){
    event = event || window.event
    event.preventDefault()
    
    window.history.pushState({}, "", event.target.href)

    handle()
}

function handle(){
    const {pathname} = window.location
    console.log(pathname)
    const route = routes[pathname] || routes[404] 
    
    fetch(route)
    .then(data => data.text())
    .then(html => {
        document.querySelector('#page').innerHTML = html
    })
}




// menu.JS




// const nav = document.querySelector('.nav')
// const btnMenu = document.querySelector('.btn-menu')
// const menu = document.querySelector('.menu')



// function handleButtonClick(event){

// }


// btnMenu.addEventListener("click",handleButtonClick)




const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
  if (event.type === "touchstart") event.preventDefault();
  event.stopPropagation();
  nav.classList.toggle("active");
  handleClickOutside(menu, () => {
    nav.classList.remove("active");
    setAria();
  });
  setAria();
}

function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) {
      targetElement.removeAttribute("data-target");
      html.removeEventListener("click", handleHTMLClick);
      html.removeEventListener("touchstart", handleHTMLClick);
      callback();
    }
  }
  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick);
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

function setAria() {
  const isActive = nav.classList.contains("active");
  btnMenu.setAttribute("aria-expanded", isActive);
  if (isActive) {
    btnMenu.setAttribute("aria-label", "Fechar Menu");
  } else {
    btnMenu.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);

