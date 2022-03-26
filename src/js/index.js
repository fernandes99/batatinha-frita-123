import { Game } from './controller/game.js';
import { Bot } from './controller/bot.js';
import { Player } from './controller/player.js';
import { Settings } from './controller/settings.js';

// Set Settings Default (TODO)
globalThis.game = {};
globalThis.game.settings = {};
globalThis.game.settings.spaceBetweenPlayers = 50;
globalThis.game.settings.botsAmount = 10;
globalThis.game.settings.fieldSize = { width: 600, height: 600 };
globalThis.game.settings.speedPlayers = 1;
globalThis.game.settings.speedToKill = .2;
globalThis.game.settings.timer = 40; // in seconds
globalThis.game.settings.botsRateMove = 0.5; // 1 = 100%
globalThis.game.settings.botsRateDeath = 0.007;


document.addEventListener('DOMContentLoaded', () => {
    Settings.handle.configs();
    Settings.handle.modal();

    Game.create.field(globalThis.game.settings.fieldSize);

    Bot.create(globalThis.game.settings.botsAmount);
    Player.create();

    Game.set.sources();
    Game.set.timer();

    

    // TODO (extends inside Game.set.events()) 
    keyPressListeners();
})

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
                Player.move('up');
                checkStatePosition();
                break;

            case 'ArrowDown':
                Player.move('down');
                checkStatePosition();
                break;
            case 'Enter':
                Game.start();
        }
    }

    document.onkeyup = ev => {
        switch (ev.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                Player.setState('stoped');
                break;
        }
    }
}