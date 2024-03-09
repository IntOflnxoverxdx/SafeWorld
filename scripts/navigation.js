const navbutton = document.querySelector("#nav-button");
const navigation = document.querySelector(".header__navigation")

navbutton.onclick = () =>{
    navbutton.classList.toggle("inactive");
    navigation.classList.toggle("inactive");
}