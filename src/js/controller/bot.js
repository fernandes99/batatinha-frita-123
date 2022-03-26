export class Bot {
    static create = (amount) => {
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
    }

    static move() {
        if (globalThis.game.killer.dataset.killing == 'true') {
            globalThis.game.bots.forEach(bot => {
                if (bot.dataset.state == 'dead') return;
                if (bot.dataset.state == 'moving') Bot.setState(bot, 'stoped');

                let randOnKilling = Math.random() < globalThis.game.settings.botsRateDeath;
                if (randOnKilling) Bot.setState(bot, 'dead');
            });
            return;
        }

        globalThis.game.bots.forEach(bot => {
            if (bot.dataset.state == 'dead') return;

            let rand = Math.random() < globalThis.game.settings.botsRateMove;
            if (!rand) return;

            let distance = parseInt(bot.style.bottom, 10) ? parseInt(bot.style.bottom, 10) : 0;
            bot.style.bottom = `${distance + 2}px`;
            Bot.setState(bot, 'moving');
        });

        setInterval(this.move, 50);
    }

    static setState = (bot, state) => {
        bot.dataset.state = state;

        if (state == 'dead') {}
        if (state == 'winner') {}
    }
}