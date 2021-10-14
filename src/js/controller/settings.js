//TODO: Need Refactor

export class Settings {
    static handle = {
        modal: () => {
            const element = {
                button: document.querySelector('#button-settings'),
                modal: document.querySelector('#modal-settings')
            }
            const open = () => {
                element.modal.classList.remove('hide');
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

            const saveButton = document.querySelector('#save-settings');
            const options = {
                input: {
                    fieldSize: document.querySelector('#field-size-settings input'),
                    timer: document.querySelector('#timer-settings input'),
                },

                actions: {
                    populate: () => {
                        options.input.fieldSize.value = `${data.fieldSize.width}, ${data.fieldSize.height}`;
                        options.input.timer.value = `${data.timer}s`;
                    },

                    update: () => {
                        data.fieldSize =
                            { ...data.fieldSize,
                                width: parseInt(options.input.fieldSize.value.split(',')[0]),
                                height: parseInt(options.input.fieldSize.value.split(',')[1])
                            };

                        data.timer = parseInt(options.input.timer.value);

                        config.set(data);
                        location.reload();
                    }
                },
            }

            Object.values(options.input).forEach(item => {
                item.onfocus = () => item.parentNode.classList.add('active');
                item.onblur = () => item.parentNode.classList.remove('active');
            });

            options.actions.populate();
            saveButton.onclick = () => {
                options.actions.update();
            }

            globalThis.game.settings = data;
        }
    }
}