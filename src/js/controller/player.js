export class Player {
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