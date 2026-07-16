// js/managers/storageManager.js
// Gerencia localStorage para NPCs

const StorageManager = (() => {
    const STORAGE_KEY = 'npckeeper_npcs';

    function getAll() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Erro ao carregar NPCs:', e);
            return [];
        }
    }

    function saveAll(npcs) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(npcs));
        } catch (e) {
            console.error('Erro ao salvar NPCs:', e);
        }
    }

    function save(npc) {
        const npcs = getAll();
        const index = npcs.findIndex(n => n.id === npc.id);
        npc.updatedAt = new Date().toISOString();
        if (index >= 0) {
            npcs[index] = npc;
        } else {
            npcs.push(npc);
        }
        saveAll(npcs);
    }

    function remove(id) {
        const npcs = getAll().filter(n => n.id !== id);
        saveAll(npcs);
    }

    function get(id) {
        return getAll().find(n => n.id === id) || null;
    }

    function clear() {
        localStorage.removeItem(STORAGE_KEY);
    }

    return { getAll, saveAll, save, remove, get, clear };
})();
