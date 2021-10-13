export class Bot {
    static move() {
        let self = this;

        if (globalThis.game.killer.dataset.killing == 'true') {
            globalThis.game.bots.forEach(bot => {
                let randOnKilling = Math.random() < globalThis.game.settings.botsRateDeath;
                if (randOnKilling) Bot.setState(bot, 'dead');
            });
            return;
        }

        globalThis.game.bots.forEach(bot => {
            if (bot.dataset.state == 'dead') return;

            Bot.setState(bot, 'stoped');
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