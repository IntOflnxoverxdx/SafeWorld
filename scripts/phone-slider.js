const relations = {
    causes:[document.querySelector("#causes"),document.querySelector(".fromcauses")],
    safety:[document.querySelector("#safety"),document.querySelector(".fromsafety")],
    game:[document.querySelector("#game"),document.querySelector(".fromgame")],
}
const stand = document.querySelector(".fromsection");



function setInactive(){
    stand.classList.remove("inactive")
    relations.game[1].classList.add("inactive")
    relations.causes[1].classList.add("inactive")
    relations.safety[1].classList.add("inactive")
}

relations.causes[0].onmouseout = setInactive;
relations.safety[0].onmouseout = setInactive;
relations.game[0].onmouseout = setInactive;

relations.causes[0].onmouseover = () =>{
    relations.causes[1].classList.remove("inactive")
    stand.classList.add("inactive")
    relations.safety[1].classList.add("inactive")
    relations.game[1].classList.add("inactive")
}
relations.safety[0].onmouseover = () =>{
    relations.safety[1].classList.remove("inactive")
    stand.classList.add("inactive")
    relations.causes[1].classList.add("inactive")
    relations.game[1].classList.add("inactive")
}
relations.game[0].onmouseover = () =>{
    relations.game[1].classList.remove("inactive")
    stand.classList.add("inactive")
    relations.safety[1].classList.add("inactive")
    relations.causes[1].classList.add("inactive")
}