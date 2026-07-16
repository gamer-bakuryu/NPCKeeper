// js/app.js
// Inicialização e orquestração principal do NPCKeeper

// === TOAST SYSTEM ===
const Toast = (() => {
    function show(message, type) {
        type = type || 'info';
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    return { show };
})();

// === APP ===
const App = (() => {

    function init() {
        ModalHandler.init();
        PortraitHandler.init();
        ThemeHandler.init();
        FormHandler.init();

        initHeaderButtons();
        initSidebar();
        initImportExport();

        refreshList();

        // Show welcome if no NPCs
        const npcs = StorageManager.getAll();
        if (npcs.length === 0) {
            showWelcome();
        }
    }

    function initHeaderButtons() {
        document.getElementById('btnNewNpc').addEventListener('click', createNewNPC);
        document.getElementById('btnWelcomeNew').addEventListener('click', createNewNPC);
    }

    function initSidebar() {
        const toggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close on click outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                e.target !== toggle) {
                sidebar.classList.remove('open');
            }
        });

        // Search
        document.getElementById('searchNpc').addEventListener('input', refreshList);

        // Filter
        document.getElementById('filterRole').addEventListener('change', refreshList);
    }

    function initImportExport() {
        document.getElementById('btnExportAll').addEventListener('click', () => {
            const npcs = StorageManager.getAll();
            if (npcs.length === 0) {
                Toast.show('Nenhum NPC para exportar.', 'error');
                return;
            }
            ExportManager.exportAll(npcs);
            Toast.show(`${npcs.length} NPC(s) exportado(s)!`, 'success');
        });

        const fileInput = document.getElementById('importFileInput');
        document.getElementById('btnImportNpcs').addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            ExportManager.importFromFile(file, (err, npcs) => {
                if (err) {
                    Toast.show('Erro ao importar arquivo.', 'error');
                    console.error(err);
                    return;
                }

                let imported = 0;
                npcs.forEach(npc => {
                    // Check if already exists
                    const existing = StorageManager.get(npc.id);
                    if (!existing) {
                        StorageManager.save(npc);
                        imported++;
                    } else {
                        // Generate new ID for duplicates
                        npc.id = NPCGenerator.generateId();
                        StorageManager.save(npc);
                        imported++;
                    }
                });

                refreshList();
                Toast.show(`${imported} NPC(s) importado(s)!`, 'success');
                fileInput.value = '';
            });
        });
    }

    function createNewNPC() {
        const npc = NPCManager.createNew();
        showEditor(npc);
    }

    function showWelcome() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('npcEditor').style.display = 'none';
        NPCManager.clearCurrent();

        // Deselect list items
        document.querySelectorAll('.npc-list-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    function showEditor(npc) {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('npcEditor').style.display = 'block';
        NPCManager.setCurrent(npc);
        FormHandler.loadNPCToForm(npc);

        // Highlight in list
        document.querySelectorAll('.npc-list-item').forEach(item => {
            item.classList.toggle('active', item.dataset.id === npc.id);
        });

        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    }

    function openNPC(id) {
        const npc = StorageManager.get(id);
        if (npc) {
            showEditor(npc);
        }
    }

    function refreshList() {
        const searchQuery = (document.getElementById('searchNpc').value || '').toLowerCase();
        const roleFilter = document.getElementById('filterRole').value;

        let npcs = StorageManager.getAll();

        // Filter
        if (searchQuery) {
            npcs = npcs.filter(npc =>
                (npc.characterName || '').toLowerCase().includes(searchQuery) ||
                (npc.occupation || '').toLowerCase().includes(searchQuery)
            );
        }

        if (roleFilter) {
            npcs = npcs.filter(npc => npc.role === roleFilter);
        }

        // Sort by updated
        npcs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        // Render
        const list = document.getElementById('npcList');
        const empty = document.getElementById('emptyState');
        const count = document.getElementById('npcCount');

        const allNpcs = StorageManager.getAll();
        count.textContent = allNpcs.length;

        if (npcs.length === 0) {
            list.innerHTML = '';
            list.appendChild(empty);
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';

        const currentNPC = NPCManager.getCurrent();
        list.innerHTML = npcs.map(npc => {
            const isActive = currentNPC && currentNPC.id === npc.id;
            const roleData = NARRATIVE_ROLES.find(r => r.id === npc.role);
            const roleIcon = roleData ? roleData.icon : '👤';
            const hasPortrait = npc.portrait && npc.portrait.length > 0;

            return `
                <div class="npc-list-item ${isActive ? 'active' : ''}" data-id="${npc.id}">
                    <div class="npc-list-thumb">
                        ${hasPortrait
                            ? `<img src="${npc.portrait}" alt="">`
                            : roleIcon
                        }
                    </div>
                    <div class="npc-list-info">
                        <div class="npc-list-name">${npc.characterName || 'Sem Nome'}</div>
                        <div class="npc-list-role">${npc.occupation || ''}${npc.role ? ' · ' + npc.role : ''}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Click listeners
        list.querySelectorAll('.npc-list-item').forEach(item => {
            item.addEventListener('click', () => {
                openNPC(item.dataset.id);
            });
        });
    }

    // Init on DOM ready
    document.addEventListener('DOMContentLoaded', init);

    return { refreshList, showWelcome, showEditor, openNPC };
})();
