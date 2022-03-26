export class Player {
    static create = () => {
        const playersContainer = document.querySelector('#players');
        const bots = document.querySelectorAll('.bot');
        const position = bots.length * globalThis.game.settings.spaceBetweenPlayers;
        let player = document.createElement('div');

        player.setAttribute('id', `p0`);
        player.setAttribute('class', `player`);
        player.dataset.state = 'live';
        player.style.left = `${position}px`;

        playersContainer.appendChild(player);
    }

    static move = (direction) => {
        let current = parseInt(globalThis.game.player.style.bottom, 10);
        let range = direction == 'up' ? +globalThis.game.settings.speedPlayers : -globalThis.game.settings.speedPlayers;

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