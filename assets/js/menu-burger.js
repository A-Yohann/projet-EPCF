let count = 0

const burger = document.querySelector('.burger-icon');
const navbar = document.querySelector('.navbar')
const menu = document.querySelector('#menu')

burger.addEventListener('click', function (burger){
    if (count == 0) {
        navbar.classList.add('nav-menu')
        menu.classList.add('burger-menu')
        count = 1
        return
    } else if (count == 1) {
        navbar.classList.remove('nav-menu')
        menu.classList.remove('burger-menu')
        count = 0
        return
    }
})