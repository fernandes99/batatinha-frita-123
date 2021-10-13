import { Game } from './controller/game.js';
import { Player } from './controller/player.js';

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
globalThis.game.settings = {};
globalThis.game.controls = {};

globalThis.game.settings.spaceBetweenPlayers = 50;
globalThis.game.settings.botsAmount = 5;
globalThis.game.settings.fieldSize = { width: 600, height: 600 };
globalThis.game.settings.speedPlayers = 1;
globalThis.game.settings.speedToKill = .2;
globalThis.game.settings.timer = 40; // in seconds
globalThis.game.settings.botsRateMove = 0.5; // 1 = 100%


document.addEventListener('DOMContentLoaded', () => {
    Game.create.field(globalThis.game.settings.fieldSize);
    Game.create.bot(globalThis.game.settings.botsAmount);
    Game.create.player();

    Game.set.sources();
    Game.set.timer();

    // TODO (extends inside Game.set.events())
    keyPressListeners();
})