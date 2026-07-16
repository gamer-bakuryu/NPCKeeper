// js/ui/portraitHandler.js
// Gerencia upload e remoção de retrato

const PortraitHandler = (() => {

    function init() {
        const frame = document.getElementById('portraitFrame');
        const input = document.getElementById('portraitInput');
        const preview = document.getElementById('portraitPreview');
        const placeholder = document.getElementById('portraitPlaceholder');
        const removeBtn = document.getElementById('btnRemovePortrait');

        frame.addEventListener('click', () => input.click());

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                Toast.show('Selecione um arquivo de imagem válido.', 'error');
                return;
            }

            // Limitar a 2MB
            if (file.size > 2 * 1024 * 1024) {
                Toast.show('Imagem muito grande. Máximo 2MB.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(ev) {
                // Redimensionar para 512x512
                resizeImage(ev.target.result, 512, 512, (dataUrl) => {
                    preview.src = dataUrl;
                    preview.style.display = 'block';
                    placeholder.style.display = 'none';
                    removeBtn.style.display = 'block';

                    const npc = NPCManager.getCurrent();
                    if (npc) {
                        npc.portrait = dataUrl;
                    }
                });
            };
            reader.readAsDataURL(file);
        });

        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearPortrait();
            const npc = NPCManager.getCurrent();
            if (npc) {
                npc.portrait = "";
            }
        });
    }

    function resizeImage(dataUrl, maxW, maxH, callback) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            let w = img.width;
            let h = img.height;

            // Crop to square (center)
            const size = Math.min(w, h);
            const sx = (w - size) / 2;
            const sy = (h - size) / 2;

            canvas.width = maxW;
            canvas.height = maxH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, sx, sy, size, size, 0, 0, maxW, maxH);

            callback(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = dataUrl;
    }

    function setPortrait(dataUrl) {
        const preview = document.getElementById('portraitPreview');
        const placeholder = document.getElementById('portraitPlaceholder');
        const removeBtn = document.getElementById('btnRemovePortrait');

        if (dataUrl) {
            preview.src = dataUrl;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
            removeBtn.style.display = 'block';
        } else {
            clearPortrait();
        }
    }

    function clearPortrait() {
        const preview = document.getElementById('portraitPreview');
        const placeholder = document.getElementById('portraitPlaceholder');
        const removeBtn = document.getElementById('btnRemovePortrait');
        const input = document.getElementById('portraitInput');

        preview.src = '';
        preview.style.display = 'none';
        placeholder.style.display = 'block';
        removeBtn.style.display = 'none';
        input.value = '';
    }

    return { init, setPortrait, clearPortrait };
})();
