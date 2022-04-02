//selecionando o 'Dino'
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

//keyCode.info(site para descobrir as teclas)

//Identificando se o usuario teclou a tela 'espaço'
function handleKeyUp(event) {
    if (event.keyCode === 32) {
        jump();
    }
}

function jump() {
    isJumping = true;
    //tudo aqui vai ser executado no intervalo definido
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //Fazendo o dino descer
            let downInterval = setInterval(() => {

                //Definindo até onde o dino pode descer
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            });
        } else {
            //Fazendo o dino pular
            position += 20;
            dino.style.bottom = position + 'px';
        }

    }, 20);
}

//Criando os cactus
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    //criando uma classe para o cactus
    cactus.classList.add('cactus');

    //criando uma classe filha para aparecer o cactus no html
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    //dando movimento ao cactus
    let leftInterval = setInterval(() => {
        //fazendo o cactus desaparecer
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            //Fim de jogo
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';            
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    //executando a função novamente depois de determinado tempo
    setTimeout(createCactus, randomTime);
}

//iniciando o jogo
createCactus();
document.addEventListener('keyup', handleKeyUp);