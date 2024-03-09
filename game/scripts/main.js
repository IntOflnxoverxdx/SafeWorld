canvas = document.querySelector("#game");
canvas.width = 1920;
canvas.height = 1080;
canvas.style = `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`;
ctx = canvas.getContext("2d");
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

canvas.addEventListener('mousemove', (event) => {
    mousePos = { x: 1920/canvas.clientWidth*event.clientX, y: 1080/canvas.clientHeight*event.clientY};
});


let dtime = 0;
let lastTime = Date.now();

let keys = {};
window.addEventListener("keydown", function(event) {
    keys[event.code] = true;
});
window.addEventListener("keyup", function(event) {
    keys[event.code] = false;
});

let rendered_walls = []


player = new Player();
cam = new Camera(player.camera_hitbox)



setInterval(function(){
    //reset
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    
    
    //main logic
    if (keys[controls["close"]]){
        floor_switch.style = "display:none;"
        player.canMove = true;
    }
    //draw_map();
    player.move(keys,dtime,dt);
    cam.draw_map(player.offsetX,player.offsetY,player.floor);
    ctx.drawImage(player.play_animation(dtime), player.x, player.y, player.width ,player.height);


    //debug functions
    //showFPS(dt);
    canvas.style = `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`;
    
    
    
    lastTime = now;
    dtime += dt
})
