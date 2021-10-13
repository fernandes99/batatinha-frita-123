export class Bot {
    static move() {
        if (globalThis.game.killer.dataset.killing == 'true') return;

        globalThis.game.bots.forEach(bot => {
            bot.dataset.state = 'stoped';
            let rand = Math.random() < globalThis.game.settings.botsRateMove;

            if (!rand) return;

            let distance = parseInt(bot.style.bottom, 10) ? parseInt(bot.style.bottom, 10) : 0;
            bot.style.bottom = `${distance + 2}px`;
            bot.dataset.state = 'moving';
        });

        setInterval(this.move, 50);
    }

    static setState = (bot, state) => {
        bot.dataset.state = state;

        if (state == 'dead') {}
        if (state == 'winner') {}
    }
}