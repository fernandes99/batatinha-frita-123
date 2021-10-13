import { Game } from './controller/game.js';

class Player {
    static create = () => {

    }

    static move = (direction) => {
        let current = parseInt(globalThis.game.player.style.bottom, 10);
        let range = direction == 'up' ? +globalThis.game.speedPlayers : -globalThis.game.speedPlayers;

        globalThis.game.player.style.bottom = `${current ? current + range : range}px`;
        Player.setState('moving');
    }

    static setState = (state) => {
        globalThis.game.player.dataset.state = state;

        if (state == 'dead') {
            alert("Você perdeu!");
            setTimeout(() => location.reload(), 500);
        }

        if (state == 'winner') {
            alert("Você ganhou!");
            setTimeout(() => location.reload(), 500);
        }
    }
}

const setGameSources = () => {
    globalThis.game.field = document.querySelector('#field');
    globalThis.game.player = document.querySelector('#p0');
    globalThis.game.killer = document.querySelector('#killer');
    globalThis.game.intro = document.querySelector('#introduction');
    globalThis.game.bots = document.querySelectorAll('.bot');
}

const checkStatePosition = () => {
    const checkArrival = () => {
        let fieldHeight = globalThis.game.field.offsetHeight;
        let playerHeight = globalThis.game.player.offsetHeight;
        let distance = parseInt(globalThis.game.player.style.bottom, 10);
        let isWinner = (distance + playerHeight) >= fieldHeight;

        return isWinner;
    }
    const isKilling = globalThis.game.killer.dataset.killing == 'true';

    if (isKilling) {
        Player.setState('dead');
        return;
    }

    if (checkArrival()) {
        Player.setState('winner');
        return;
    }
}

const keyPressListeners = () => {
    document.onkeydown = ev => {
        switch (ev.key) {
            case 'ArrowUp':
                console.log('Top Move Player');
                Player.move('up');
                checkStatePosition();
                break;

            case 'ArrowDown':
                console.log('Move Player');
                Player.move('down');
                checkStatePosition();
                break;
            case 'Enter':
                console.log('Game Starting');
                Game.start();
        }
    }

    document.onkeyup = ev => {
        switch (ev.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                console.log('Stop Player');
                Player.setState('stoped');
                break;
        }
    }
}

// Set Settings (TODO)
globalThis.game = {};
globalThis.game.spaceBetweenPlayers = 60;
globalThis.game.botsAmount = 5;
globalThis.game.fieldSize = { x: 800, y: 400 };
globalThis.game.speedPlayers = 5;
globalThis.speedToKill = .2;

document.addEventListener('DOMContentLoaded', () => {
    Game.create.bot(globalThis.game.botsAmount);
    Game.create.player();
    setGameSources();
    keyPressListeners();
})