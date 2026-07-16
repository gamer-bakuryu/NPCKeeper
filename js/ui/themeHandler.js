// js/ui/themeHandler.js
// Toggle dark/light theme

const ThemeHandler = (() => {
    const STORAGE_KEY = 'npckeeper_theme';

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }
        updateIcon();

        document.getElementById('btnThemeToggle').addEventListener('click', toggle);
    }

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);
        updateIcon();
    }

    function updateIcon() {
        const theme = document.documentElement.getAttribute('data-theme');
        const btn = document.getElementById('btnThemeToggle');
        btn.querySelector('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    return { init };
})();
