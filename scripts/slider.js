const imgs = document.querySelectorAll(".locations-photos img");
let currentIndex = 0
function showImage(index) {
    imgs.forEach((img, i) => {
        img.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}
showImage(currentIndex)
if (window.innerWidth <= 1280){
    imgs.forEach((img, i) => {
        img.style.transform = `translateX(0)`;
    });
}
const backward = ()=>{

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = imgs.length - 3;
    }
    showImage(currentIndex);
}

const forward = ()=>{
    if (currentIndex < imgs.length - 3) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

window.addEventListener("resize", () =>{
    if (window.innerWidth <= 1280){
        imgs.forEach((img, i) => {
            img.style.transform = `translateX(0)`;
        });
    }else{
        currentIndex = 0;
        showImage(currentIndex)
    }
});
document.querySelector("#backbutton").onclick = backward;
document.querySelector("#forwbutton").onclick = forward;