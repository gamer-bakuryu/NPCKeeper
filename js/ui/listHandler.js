// js/ui/listHandler.js
// Gerencia listas dinâmicas (armas, inventário, magias, relações)

const ListHandler = (() => {

    // === WEAPONS ===
    function renderWeapons(weapons) {
        const container = document.getElementById('weaponsList');
        if (!weapons || weapons.length === 0) {
            container.innerHTML = '<div class="empty-inline">Nenhuma arma adicionada.</div>';
            return;
        }

        container.innerHTML = weapons.map((w, i) => `
            <div class="dynamic-item" data-index="${i}">
                <div class="item-fields">
                    <input type="text" class="form-input field-lg" value="${escHtml(w.name || '')}" placeholder="Nome da arma" data-field="name">
                    <input type="text" class="form-input field-sm" value="${escHtml(w.skill || '')}" placeholder="Perícia %" data-field="skill">
                    <input type="text" class="form-input field-sm" value="${escHtml(w.damage || '')}" placeholder="Dano" data-field="damage">
                    <input type="text" class="form-input field-sm" value="${escHtml(w.range || '')}" placeholder="Alcance" data-field="range">
                    <input type="text" class="form-input field-sm" value="${escHtml(w.attacks || '1')}" placeholder="Ataques" data-field="attacks">
                    <input type="text" class="form-input field-sm" value="${escHtml(w.ammo || '')}" placeholder="Munição" data-field="ammo">
                </div>
                <button type="button" class="btn btn-sm btn-danger btn-remove" onclick="ListHandler.removeWeapon(${i})">✕</button>
            </div>
        `).join('');

        // Listeners para atualizar
        container.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('change', () => {
                const item = input.closest('.dynamic-item');
                const idx = parseInt(item.dataset.index);
                const field = input.dataset.field;
                const npc = NPCManager.getCurrent();
                if (npc && npc.weapons[idx]) {
                    npc.weapons[idx][field] = input.value;
                }
            });
        });
    }

    function addWeapon() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.weapons.push({ name: "", skill: "", damage: "", range: "", attacks: "1", ammo: "" });
        renderWeapons(npc.weapons);
    }

    function removeWeapon(index) {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.weapons.splice(index, 1);
        renderWeapons(npc.weapons);
    }

    // === INVENTORY ===
    function renderInventory(items) {
        const container = document.getElementById('inventoryList');
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="empty-inline">Nenhum item no inventário.</div>';
            return;
        }

        container.innerHTML = items.map((item, i) => `
            <div class="dynamic-item" data-index="${i}">
                <div class="item-fields">
                    <input type="text" class="form-input field-lg" value="${escHtml(typeof item === 'string' ? item : (item.name || ''))}" placeholder="Nome do item" data-field="name">
                    <input type="text" class="form-input field-md" value="${escHtml(typeof item === 'string' ? '' : (item.description || ''))}" placeholder="Descrição" data-field="description">
                </div>
                <button type="button" class="btn btn-sm btn-danger btn-remove" onclick="ListHandler.removeItem(${i})">✕</button>
            </div>
        `).join('');

        container.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('change', () => {
                const itemEl = input.closest('.dynamic-item');
                const idx = parseInt(itemEl.dataset.index);
                const field = input.dataset.field;
                const npc = NPCManager.getCurrent();
                if (npc && npc.inventory[idx] !== undefined) {
                    if (typeof npc.inventory[idx] === 'string') {
                        npc.inventory[idx] = { name: npc.inventory[idx], description: "" };
                    }
                    npc.inventory[idx][field] = input.value;
                }
            });
        });
    }

    function addItem() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.inventory.push({ name: "", description: "" });
        renderInventory(npc.inventory);
    }

    function removeItem(index) {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.inventory.splice(index, 1);
        renderInventory(npc.inventory);
    }

    // === SPELLS ===
    function renderSpells(spells) {
        const container = document.getElementById('spellsList');
        if (!spells || spells.length === 0) {
            container.innerHTML = '<div class="empty-inline">Nenhuma magia conhecida.</div>';
            return;
        }

        container.innerHTML = spells.map((s, i) => `
            <div class="dynamic-item" data-index="${i}">
                <div class="item-fields">
                    <input type="text" class="form-input field-lg" value="${escHtml(typeof s === 'string' ? s : (s.name || ''))}" placeholder="Nome da magia" data-field="name">
                    <input type="text" class="form-input field-md" value="${escHtml(typeof s === 'string' ? '' : (s.cost || ''))}" placeholder="Custo" data-field="cost">
                    <input type="text" class="form-input field-lg" value="${escHtml(typeof s === 'string' ? '' : (s.description || ''))}" placeholder="Descrição" data-field="description">
                </div>
                <button type="button" class="btn btn-sm btn-danger btn-remove" onclick="ListHandler.removeSpell(${i})">✕</button>
            </div>
        `).join('');

        container.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('change', () => {
                const itemEl = input.closest('.dynamic-item');
                const idx = parseInt(itemEl.dataset.index);
                const field = input.dataset.field;
                const npc = NPCManager.getCurrent();
                if (npc && npc.spells[idx] !== undefined) {
                    if (typeof npc.spells[idx] === 'string') {
                        npc.spells[idx] = { name: npc.spells[idx], cost: "", description: "" };
                    }
                    npc.spells[idx][field] = input.value;
                }
            });
        });
    }

    function addSpell() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.spells.push({ name: "", cost: "", description: "" });
        renderSpells(npc.spells);
    }

    function removeSpell(index) {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.spells.splice(index, 1);
        renderSpells(npc.spells);
    }

    // === RELATIONS ===
    function renderRelations(relations) {
        const container = document.getElementById('relationsList');
        if (!relations || relations.length === 0) {
            container.innerHTML = '<div class="empty-inline">Nenhuma relação adicionada.</div>';
            return;
        }

        container.innerHTML = relations.map((r, i) => `
            <div class="dynamic-item" data-index="${i}">
                <div class="item-fields">
                    <input type="text" class="form-input field-md" value="${escHtml(r.name || '')}" placeholder="Nome" data-field="name">
                    <input type="text" class="form-input field-lg" value="${escHtml(r.description || r.relation || '')}" placeholder="Descrição da relação" data-field="description">
                </div>
                <button type="button" class="btn btn-sm btn-danger btn-remove" onclick="ListHandler.removeRelation(${i})">✕</button>
            </div>
        `).join('');

        container.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('change', () => {
                const itemEl = input.closest('.dynamic-item');
                const idx = parseInt(itemEl.dataset.index);
                const field = input.dataset.field;
                const npc = NPCManager.getCurrent();
                if (npc && npc.relations[idx]) {
                    npc.relations[idx][field] = input.value;
                }
            });
        });
    }

    function addRelation() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.relations.push({ name: "", description: "" });
        renderRelations(npc.relations);
    }

    function removeRelation(index) {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        npc.relations.splice(index, 1);
        renderRelations(npc.relations);
    }

    // Utility
    function escHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    return {
        renderWeapons, addWeapon, removeWeapon,
        renderInventory, addItem, removeItem,
        renderSpells, addSpell, removeSpell,
        renderRelations, addRelation, removeRelation
    };
})();
