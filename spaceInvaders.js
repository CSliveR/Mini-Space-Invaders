const playground = {
    dom: document.getElementById("playground"),
    get width() { return this.dom.getBoundingClientRect().width },
    get height() { return this.dom.getBoundingClientRect().height },
};

class Balle{
    #x = 0
    #y = 0
    vx = 0
    vy = 0

    constructor(id = "balle"){ 
        let template = document.getElementById(id);
        let documentFragment = template.content.cloneNode(true);
        this.dom = documentFragment.firstElementChild;
        playground.dom.appendChild(documentFragment);
        
        this.x = Math.random() * playground.width;
        this.y = 0;
        let vitesseInitiale= 100;
        this.vx = 0;
        this.vy = vitesseInitiale + Math.random() * 50;
    }

    get width() {
        return this.dom.getBoundingClientRect().width;
    };

    get height() {
        return this.dom.getBoundingClientRect().height;
    };

    get x() { return this.#x; };

    get y() { return this.#y; };

    set x(v) {
        this.#x = v;
        this.dom.style.left = v.toString()+"px";
    }

    set y(v) {
        this.#y = v;
        this.dom.style.top = v.toString()+ "px";
    }
};

class Ship{
    #x = 0
    #y = 0

    constructor(id = "ship") {
        this.dom = document.getElementById(id);
        this.x = playground.width / 2;
        this.y = playground.height / 2;
    }

    get width() {
        return this.dom.getBoundingClientRect().width;
    };

    get height() {
        return this.dom.getBoundingClientRect().height;
    };

    get x(){return this.#x}

    get y() {return this.#y}
    
    set x(v) {
        this.#x = v;
        this.dom.style.left = v.toString()+"px";
    }

    set y(v) {
        this.#y = v;
        this.dom.style.top = v.toString()+ "px";
    }
}


function game(){
    let TableauDeBalle = [];

    function chute() {
        for(let i = 0; i < TableauDeBalle.length; i++){
            let balle = TableauDeBalle[i];
            balle.y = balle.y + 2;
        }
        requestAnimationFrame(chute);
    }

    for (let i = 0; i < 1 + Math.random() * 10; i++) {
        let balle = new Balle();
        TableauDeBalle.push(balle);
        chute();
    }
    let compteur = 0, nbVagues = 4 + Math.floor(Math.random() * 16);

    const intervalID = setInterval(function() {
        compteur++;
        for (let i = 0; i < 1 + Math.random() * 10; i++) {
            let balle = new Balle();
            TableauDeBalle.push(balle);
            chute();
        }

        if (compteur == nbVagues) {
            clearInterval(intervalID);
            alert("Vous avez survécu à" + " " +  nbVagues + " " + "vagues de boules de feu. Appuyez sur 'OK' puis sur 'C' pour rejouer");
            restart();
        }   

        if (enCollision(ship, balle)) {
            clearInterval(intervalID);
            alert("Vous n'avez pas survécu. Dommage ! :/");
            restart();
        }

    }, 2000 + Math.floor(Math.random() * 1000));

    let push = 30;

    window.addEventListener('keydown', e => {
        if (e.key == 'ArrowLeft' && ship.x >= 0 + ship.width) {
            ship.x -= push;
        }

        if (e.key == 'ArrowRight' && ship.x <= playground.width - ship.width - push) {
            ship.x += push;
        }

        if (e.key == 'ArrowUp' && ship.y >= 0 + ship.height + push) {
            ship.y -= push;
        }

        if (e.key == 'ArrowDown' && ship.y <= playground.height - ship.height + push) {
            ship.y += push;
        }
    })

}

function restart(){
    window.addEventListener('keydown', e => {
        if (e.key == 'c' || e.key == 'C') {
            location.reload();
            game();
        }})

}

function enCollision(balle, ship){
  if ( balle.x > ship.x + ship.width
       || balle.x < ship.x - balle.width
       || balle.y > ship.y + ship.height
        || balle.y < ship.y - balle.height) {
        return false;
    }else {
        return true;
    }
}

let ship = new Ship();
let balle = new Balle();


game();

