// js/managers/npcManager.js
// Gerencia o estado atual do NPC sendo editado

const NPCManager = (() => {
    let currentNPC = null;

    function setCurrent(npc) {
        currentNPC = npc;
    }

    function getCurrent() {
        return currentNPC;
    }

    function clearCurrent() {
        currentNPC = null;
    }

    function createNew() {
        const npc = NPCGenerator.createBlankNPC();
        currentNPC = npc;
        return npc;
    }

    function generateNew(options) {
        const npc = NPCGenerator.generateFull(options || {});
        currentNPC = npc;
        return npc;
    }

    function saveCurrent() {
        if (currentNPC) {
            StorageManager.save(currentNPC);
        }
    }

    function deleteCurrent() {
        if (currentNPC) {
            StorageManager.remove(currentNPC.id);
            currentNPC = null;
        }
    }

    return { setCurrent, getCurrent, clearCurrent, createNew, generateNew, saveCurrent, deleteCurrent };
})();
