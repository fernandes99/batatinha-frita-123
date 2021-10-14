export class Settings {
    static handle = {
        modal: () => {
            const element = {
                button: document.querySelector('#button-settings'),
                modal: document.querySelector('#modal-settings')
            }
            const open = () => {
                element.modal.classList.remove('hide');
                Settings.handle.configs();
                Settings.handle.tabs();
            }
            const close = () => element.modal.classList.add('hide');

            element.button.onclick = () => open();
            element.modal.onclick = ev => ev.target.id == ('modal-settings') ? close() : null;
        },

        tabs: () => {
            const tab = {
                parent: document.querySelector('.modal-tabs'),
                general: document.querySelector('#general-tab'),
                players: document.querySelector('#players-tab'),
                bots: document.querySelector('#bots-tab')
            };
            const content = {
                parent: document.querySelector('.modal-content'),
                general: document.querySelector('#general-content'),
                players: document.querySelector('#players-content'),
                bots: document.querySelector('#bots-content')
            };

            const resetTabs = () => {
                [...tab.parent.children].forEach(item => {
                    if (item.classList.contains('active')) item.classList.remove('active');
                });

                [...content.parent.children].forEach(item => {
                    if (item.classList.contains('active')) item.classList.remove('active');
                })
            };
            const activeTab = (element, content) => {
                resetTabs();
                element.classList.add('active');
                content.classList.add('active')
            };

            tab.general.onclick = () => activeTab(tab.general, content.general);
            tab.players.onclick = () => activeTab(tab.players, content.players);
            tab.bots.onclick = () => activeTab(tab.bots, content.bots);
        },

        configs: () => {
            const config = {
                get: localStorage.getItem('settings'),
                set: data => localStorage.setItem('settings', JSON.stringify(data))
            }

            let data = config.get ? JSON.parse(config.get) : config.set({...globalThis.game.settings});

            const input = {
                fieldSize: document.querySelector('#field-size-settings input'),
                timer: document.querySelector('#timer-settings input')
            }

            input.fieldSize.value = `${data.fieldSize.width}, ${data.fieldSize.height}`;
            input.timer.value = `${data.timer}s`;
        }
    }
}