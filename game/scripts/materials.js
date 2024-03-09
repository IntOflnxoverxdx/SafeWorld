floor_materials = {
    "asphalt":{
        frames:[],
        duration:1,
        speed:1
    },
    "asphalt1":{
        frames:[],
        duration:1,
        speed:1
    },
    "asphalt2":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs1":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs2":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs3":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs4":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs5":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs6":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs7":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs8":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs9":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs10":{
        frames:[],
        duration:1,
        speed:1
    },
    "stairs11":{
        frames:[],
        duration:1,
        speed:1
    },
    "tile":{
        frames:[],
        duration:1,
        speed:1
    },
    "tile1":{
        frames:[],
        duration:1,
        speed:1
    },
    "tile2":{
        frames:[],
        duration:1,
        speed:1
    },
    "tile3":{
        frames:[],
        duration:1,
        speed:1
    },
    "tile4":{
        frames:[],
        duration:1,
        speed:1
    },
}
wall_materials = {
    "invisible":{
        frames:[],
        duration:1,
        speed:1
    },
    "asphalt":{
        frames:[],
        duration:1,
        speed:1
    },
}



for (let key in floor_materials) {
    if (floor_materials.hasOwnProperty(key)) {
        for (let i = 1; i <= floor_materials[key].duration; i++) {
            floor_materials[key].frames.push(Object.assign(new Image(), { src: `game/sprites/floor/${key}/${i}.png`, width: 16, height: 16}));
        }
    }
}
for (let key in wall_materials) {
    if (wall_materials.hasOwnProperty(key)) {
        for (let i = 1; i <= wall_materials[key].duration; i++) {
            wall_materials[key].frames.push(Object.assign(new Image(), { src: `game/sprites/wall/${key}/${i}.png`, width: 16, height: 16}));
        }
    }
}