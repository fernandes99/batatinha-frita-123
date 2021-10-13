import { Bot } from './bot.js';
import { Player } from './player.js';

export class Game {
    static create = {
        field (size) {
            globalThis.game.field = document.querySelector('#field');

            globalThis.game.field.style.width = `${size.width}px`;
            globalThis.game.field.style.height = `${size.height}px`;
        },

        bot (amount) {
            for (let i = 0; i < amount; i++) {
                const playersContainer = document.querySelector('#players');
                let position = i * globalThis.game.settings.spaceBetweenPlayers;
                let bot = document.createElement('div');

                bot.setAttribute('id', `bot${i}`);
                bot.setAttribute('class', `bot`);
                bot.dataset.state = 'live';
                bot.style.left = `${position}px`;

                playersContainer.appendChild(bot);
            }
        },

        player() {
            const playersContainer = document.querySelector('#players');
            let bots = document.querySelectorAll('.bot');
            let position = bots.length * globalThis.game.settings.spaceBetweenPlayers;
            let player = document.createElement('div');

            player.setAttribute('id', `p0`);
            player.setAttribute('class', `player`);
            player.dataset.state = 'live';
            player.style.left = `${position}px`;

            playersContainer.appendChild(player);
        }
    }

    static set = {
        sources() {
            globalThis.game.field = document.querySelector('#field');
            globalThis.game.timer = document.querySelector('#timer');
            globalThis.game.player = document.querySelector('#p0');
            globalThis.game.killer = document.querySelector('#killer');
            globalThis.game.intro = document.querySelector('#introduction');
            globalThis.game.bots = document.querySelectorAll('.bot');
        },

        events() {},

        timer() {
            const minutes = ("0" + Math.floor(globalThis.game.settings.timer / 60)).slice(-2);
            const seconds = ("0" + (globalThis.game.settings.timer - minutes * 60)).slice(-2);

            globalThis.game.timer.dataset.timer = `${minutes}:${seconds}`;
        }
    }

    static setLoopToKill(speed = 1) {
        const audio = new Audio('src/assets/audios/voice-batatinha-frita-123.mp3');

        console.log('Inicializing Audio Batatinha 123 in Speed: ' + speed);

        audio.playbackRate = speed;
        audio.play();

        audio.addEventListener("ended", () => {
            console.log('Killer is Killing');
            globalThis.game.killer.dataset.killing = 'true';

            setTimeout(() => {
                console.log('Killer is NOT Killing');
                globalThis.game.killer.dataset.killing = 'false';
                this.setLoopToKill(speed + globalThis.game.settings.speedToKill);
            }, 1000);
        });
    }

    static start = () => {
        globalThis.game.intro.classList.add('hide');

        const startTimer = () => {
            let timer = () => {
                --globalThis.game.settings.timer;
                this.set.timer();

                if (globalThis.game.settings.timer <= 0) Player.setState('dead');
            }

            setInterval(timer, 1000);
        }

        startTimer();
        this.setLoopToKill();

        Bot.move();
    }
}