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
                let position = i * globalThis.game.spaceBetweenPlayers;
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
            let position = bots.length * globalThis.game.spaceBetweenPlayers;
            let player = document.createElement('div');

            player.setAttribute('id', `p0`);
            player.setAttribute('class', `player`);
            player.dataset.state = 'live';
            player.style.left = `${position}px`;

            playersContainer.appendChild(player);
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
                this.setLoopToKill(speed + globalThis.speedToKill);
            }, 1000);
        });
    }

    static start = () => {
        globalThis.game.intro.classList.add('hide');
        this.setLoopToKill();
    }
}