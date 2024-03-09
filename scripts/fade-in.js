document.querySelectorAll(".sidesblock").forEach(element => {
    element.classList.add("fade");
    if (element.classList.contains("inv")){
        element.classList.add("RIGHT");
    }else{
        element.classList.add("LEFT");
    }
});
document.querySelectorAll(".vertical-list li").forEach(element =>{
    element.classList.add("fade")
    element.classList.add("UP")
})

const fadeElements = document.querySelectorAll(".fade")

function checkElements(){
    fadeElements.forEach(el => {
        if (el.getBoundingClientRect().top <= window.innerHeight - 100){
            el.classList.remove("UP");
            el.classList.remove("LEFT");
            el.classList.remove("RIGHT");
        }
    });
}
checkElements()

document.onscroll = checkElements
