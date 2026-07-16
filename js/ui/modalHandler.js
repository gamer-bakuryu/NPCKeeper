// js/ui/modalHandler.js
// Gerencia modais

const ModalHandler = (() => {
    const overlay = () => document.getElementById('modalOverlay');
    const modal = () => document.getElementById('modal');
    const title = () => document.getElementById('modalTitle');
    const body = () => document.getElementById('modalBody');
    const footer = () => document.getElementById('modalFooter');

    function show(options) {
        title().textContent = options.title || 'Modal';
        body().innerHTML = options.body || '';
        footer().innerHTML = '';

        if (options.buttons) {
            options.buttons.forEach(btn => {
                const button = document.createElement('button');
                button.className = `btn btn-sm ${btn.class || 'btn-ghost'}`;
                button.textContent = btn.text;
                button.addEventListener('click', () => {
                    if (btn.action) btn.action();
                    if (btn.close !== false) hide();
                });
                footer().appendChild(button);
            });
        }

        overlay().style.display = 'flex';
    }

    function hide() {
        overlay().style.display = 'none';
    }

    function confirm(message, onConfirm) {
        show({
            title: 'Confirmar',
            body: `<p>${message}</p>`,
            buttons: [
                { text: 'Cancelar', class: 'btn-ghost' },
                { text: 'Confirmar', class: 'btn-danger', action: onConfirm }
            ]
        });
    }

    function init() {
        document.getElementById('modalClose').addEventListener('click', hide);
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === overlay()) hide();
        });
    }

    return { show, hide, confirm, init };
})();
