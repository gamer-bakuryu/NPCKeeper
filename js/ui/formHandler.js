// js/ui/formHandler.js
// Gerencia o formulário do editor de NPC

const FormHandler = (() => {
    let showOnlyModified = false;

    function init() {
        initTabs();
        initOccupationSelect();
        initRoleSelect();
        initPersonalityGrid();
        initSkillsGrid();
        initButtonListeners();
        initAttributeListeners();
    }

    // === TABS ===
    function initTabs() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
                tab.classList.add('active');
                const target = document.getElementById(tab.dataset.tab);
                if (target) target.classList.add('active');
            });
        });
    }

    // === SELECTS ===
    function initOccupationSelect() {
        const select = document.getElementById('npcOccupation');
        const occupations = Object.keys(OCCUPATIONS).sort();
        occupations.forEach(occ => {
            const opt = document.createElement('option');
            opt.value = occ;
            opt.textContent = occ;
            select.appendChild(opt);
        });
    }

    function initRoleSelect() {
        const select = document.getElementById('npcRole');
        const filter = document.getElementById('filterRole');

        NARRATIVE_ROLES.forEach(role => {
            const opt = document.createElement('option');
            opt.value = role.id;
            opt.textContent = `${role.icon} ${role.label}`;
            select.appendChild(opt);

            const fopt = document.createElement('option');
            fopt.value = role.id;
            fopt.textContent = `${role.icon} ${role.label}`;
            filter.appendChild(fopt);
        });
    }

    // === PERSONALITY GRID ===
    function initPersonalityGrid() {
        const grid = document.getElementById('personalityGrid');
        grid.innerHTML = '';
        PERSONALITY_TRAITS.forEach(trait => {
            const tag = document.createElement('span');
            tag.className = 'trait-tag';
            tag.textContent = trait;
            tag.dataset.trait = trait;
            tag.addEventListener('click', () => {
                tag.classList.toggle('selected');
                updatePersonalityFromGrid();
            });
            grid.appendChild(tag);
        });
    }

    function updatePersonalityFromGrid() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        const selected = [];
        document.querySelectorAll('.trait-tag.selected').forEach(tag => {
            selected.push(tag.dataset.trait);
        });
        npc.personality = selected;
    }

    function setPersonalityGrid(traits) {
        document.querySelectorAll('.trait-tag').forEach(tag => {
            tag.classList.remove('selected');
            if (traits && traits.includes(tag.dataset.trait)) {
                tag.classList.add('selected');
            }
        });
    }

    // === SKILLS GRID ===
    function initSkillsGrid() {
        const grid = document.getElementById('skillsGrid');
        grid.innerHTML = '';

        SKILLS.forEach(skill => {
            const row = document.createElement('div');
            row.className = 'skill-row';
            row.dataset.skillName = skill.name;

            const nameSpan = document.createElement('span');
            nameSpan.className = 'skill-name';
            nameSpan.textContent = skill.name;

            const baseSpan = document.createElement('span');
            baseSpan.className = 'skill-base';
            baseSpan.textContent = `(${skill.base})`;

            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'skill-input';
            input.min = 0;
            input.max = 99;
            input.value = skill.base;
            input.dataset.skillName = skill.name;
            input.dataset.base = skill.base;

            input.addEventListener('change', () => {
                const npc = NPCManager.getCurrent();
                if (npc) {
                    npc.skills[skill.name] = parseInt(input.value) || 0;
                    updateSkillRowStyle(row, input);
                }
            });

            row.appendChild(nameSpan);
            row.appendChild(baseSpan);
            row.appendChild(input);
            grid.appendChild(row);
        });

        // Skill search
        document.getElementById('searchSkill').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            document.querySelectorAll('.skill-row').forEach(row => {
                const name = row.dataset.skillName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                row.classList.toggle('hidden', !name.includes(query));
            });
        });
    }

    function updateSkillRowStyle(row, input) {
        const base = parseInt(input.dataset.base) || 0;
        const value = parseInt(input.value) || 0;
        row.classList.toggle('modified', value > base);
    }

    function highlightOccupationSkills(occupation) {
        document.querySelectorAll('.skill-row').forEach(row => {
            row.classList.remove('occupation-skill');
        });

        if (!occupation) return;
        const occSkills = SkillGenerator.getOccupationSkills(occupation);
        occSkills.forEach(skillName => {
            const row = document.querySelector(`.skill-row[data-skill-name="${skillName}"]`);
            if (row) row.classList.add('occupation-skill');
        });
    }

    function setSkillValues(skills) {
        document.querySelectorAll('.skill-input').forEach(input => {
            const name = input.dataset.skillName;
            if (skills && skills[name] !== undefined) {
                input.value = skills[name];
            } else {
                input.value = input.dataset.base || 0;
            }
            const row = input.closest('.skill-row');
            if (row) updateSkillRowStyle(row, input);
        });
    }

    // === BUTTONS ===
    function initButtonListeners() {
        // Generate Name
        document.getElementById('btnGenName').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            const sex = document.getElementById('npcSex').value;
            const name = NameGenerator.generate(sex);
            document.getElementById('npcName').value = name;
            npc.characterName = name;
        });

        // Generate Attributes
        document.getElementById('btnGenAttributes').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            const occ = document.getElementById('npcOccupation').value;
            const age = document.getElementById('npcAge').value;
            npc.attributes = AttributeGenerator.generate(occ, age);
            loadAttributesToForm(npc);
            recalcDerived();
            Toast.show('Atributos gerados!', 'success');
        });

        // Reset Attributes
        document.getElementById('btnResetAttributes').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            npc.attributes = { STR: 50, CON: 50, SIZ: 60, DEX: 50, APP: 50, INT: 60, POW: 50, EDU: 60, Luck: 50 };
            loadAttributesToForm(npc);
            recalcDerived();
        });

        // Calc Derived
        document.getElementById('btnCalcDerived').addEventListener('click', recalcDerived);

        // Generate Skills
        document.getElementById('btnGenSkills').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            const occ = document.getElementById('npcOccupation').value;
            if (!occ) {
                Toast.show('Selecione uma profissão primeiro.', 'error');
                return;
            }
            readAttributesFromForm(npc);
            npc.skills = SkillGenerator.generate(occ, npc.attributes);
            setSkillValues(npc.skills);
            highlightOccupationSkills(occ);
            Toast.show('Perícias geradas!', 'success');
        });

        // Reset Skills
        document.getElementById('btnResetSkills').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            npc.skills = {};
            setSkillValues({});
            Toast.show('Perícias resetadas.', 'info');
        });

        // Toggle Modified
        document.getElementById('btnToggleModified').addEventListener('click', () => {
            showOnlyModified = !showOnlyModified;
            document.querySelectorAll('.skill-row').forEach(row => {
                if (showOnlyModified) {
                    const input = row.querySelector('.skill-input');
                    const base = parseInt(input.dataset.base) || 0;
                    const value = parseInt(input.value) || 0;
                    row.classList.toggle('hidden', value <= base);
                } else {
                    row.classList.remove('hidden');
                }
            });
            const btn = document.getElementById('btnToggleModified');
            btn.textContent = showOnlyModified ? '👁️ Mostrar Todas' : '👁️ Só Modificadas';
        });

        // Generate Personality
        document.getElementById('btnGenPersonality').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            const traits = NarrativeGenerator.generatePersonality(3);
            npc.personality = traits;
            setPersonalityGrid(traits);
            Toast.show('Personalidade gerada!', 'success');
        });

        // Generate Objective
        document.getElementById('btnGenObjective').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            const role = document.getElementById('npcRole').value;
            npc.objective = NarrativeGenerator.generateObjective(role);
            document.getElementById('npcObjective').value = npc.objective;
        });

        // Generate Secret
        document.getElementById('btnGenSecret').addEventListener('click', () => {
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            const role = document.getElementById('npcRole').value;
            npc.secret = NarrativeGenerator.generateSecret(role);
            document.getElementById('npcSecret').value = npc.secret;
        });

        // Generate All
        document.getElementById('btnGenerateAll').addEventListener('click', () => {
            const options = {
                sex: document.getElementById('npcSex').value || undefined,
                occupation: document.getElementById('npcOccupation').value || undefined,
                role: document.getElementById('npcRole').value || undefined,
                age: document.getElementById('npcAge').value || undefined
            };
            const npc = NPCGenerator.generateFull(options);
            // Preserve ID and portrait if editing existing
            const current = NPCManager.getCurrent();
            if (current && current.id) {
                npc.id = current.id;
                npc.createdAt = current.createdAt;
                npc.portrait = current.portrait;
            }
            NPCManager.setCurrent(npc);
            loadNPCToForm(npc);
            Toast.show('NPC gerado completamente!', 'success');
        });

        // Save
        document.getElementById('btnSaveNpc').addEventListener('click', () => {
            readFormToNPC();
            NPCManager.saveCurrent();
            App.refreshList();
            Toast.show('NPC salvo com sucesso!', 'success');
        });

        // Export
        document.getElementById('btnExportNpc').addEventListener('click', () => {
            readFormToNPC();
            const npc = NPCManager.getCurrent();
            if (!npc) return;
            ExportManager.exportNPC(npc);
            Toast.show('JSON exportado!', 'success');
        });

        // Delete
        document.getElementById('btnDeleteNpc').addEventListener('click', () => {
            ModalHandler.confirm('Tem certeza que deseja excluir este NPC?', () => {
                NPCManager.deleteCurrent();
                App.refreshList();
                App.showWelcome();
                Toast.show('NPC excluído.', 'info');
            });
        });

        // Weapons, Inventory, Spells, Relations
        document.getElementById('btnAddWeapon').addEventListener('click', ListHandler.addWeapon);
        document.getElementById('btnAddItem').addEventListener('click', ListHandler.addItem);
        document.getElementById('btnAddSpell').addEventListener('click', ListHandler.addSpell);
        document.getElementById('btnAddRelation').addEventListener('click', ListHandler.addRelation);

        // Occupation change — highlight skills
        document.getElementById('npcOccupation').addEventListener('change', (e) => {
            highlightOccupationSkills(e.target.value);
        });
    }

    // === ATTRIBUTE LISTENERS ===
    function initAttributeListeners() {
        const attrIds = ['attrSTR', 'attrCON', 'attrSIZ', 'attrDEX', 'attrAPP', 'attrINT', 'attrPOW', 'attrEDU', 'attrLuck'];
        attrIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => {
                    const npc = NPCManager.getCurrent();
                    if (npc) {
                        readAttributesFromForm(npc);
                    }
                });
            }
        });
    }

    // === LOAD NPC TO FORM ===
    function loadNPCToForm(npc) {
        if (!npc) return;

        // Basic
        document.getElementById('npcName').value = npc.characterName || '';
        document.getElementById('npcAge').value = npc.age || '';
        document.getElementById('npcSex').value = npc.sex || '';
        document.getElementById('npcOccupation').value = npc.occupation || '';
        document.getElementById('npcRole').value = npc.role || '';
        document.getElementById('npcResidence').value = npc.residence || '';
        document.getElementById('npcBirthplace').value = npc.birthplace || '';

        // Portrait
        PortraitHandler.setPortrait(npc.portrait);

        // Narrative
        setPersonalityGrid(npc.personality || []);
        document.getElementById('npcObjective').value = npc.objective || '';
        document.getElementById('npcSecret').value = npc.secret || '';
        document.getElementById('npcCaseLink').value = npc.caseLink || '';
        document.getElementById('npcDescription').value = npc.personalDescription || '';
        document.getElementById('npcBackstory').value = npc.backstory || '';

        // Attributes
        loadAttributesToForm(npc);

        // Derived
        document.getElementById('hpMax').value = npc.hpMax || 0;
        document.getElementById('hpCurrent').value = npc.hpCurrent || 0;
        document.getElementById('mpMax').value = npc.mpMax || 0;
        document.getElementById('mpCurrent').value = npc.mpCurrent || 0;
        document.getElementById('sanMax').value = npc.sanMax || 0;
        document.getElementById('sanCurrent').value = npc.sanCurrent || 0;
        document.getElementById('move').value = npc.move || 8;
        document.getElementById('bonusDamage').value = npc.bonusDamage || '0';
        document.getElementById('build').value = npc.build || 0;

        // Skills
        setSkillValues(npc.skills);
        highlightOccupationSkills(npc.occupation);

        // Dynamic lists
        ListHandler.renderWeapons(npc.weapons || []);
        ListHandler.renderInventory(npc.inventory || []);
        ListHandler.renderSpells(npc.spells || []);
        ListHandler.renderRelations(npc.relations || []);

        // Notes
        document.getElementById('npcNotes').value = npc.notes || '';

        // Editor title
        document.getElementById('editorTitle').textContent = npc.characterName || 'Novo NPC';

        // Show delete button for saved NPCs
        const isNew = !StorageManager.get(npc.id);
        document.getElementById('btnDeleteNpc').style.display = isNew ? 'none' : 'inline-flex';

        // Reset to first tab
        document.querySelector('.tab').click();
    }

    function loadAttributesToForm(npc) {
        const a = npc.attributes || {};
        document.getElementById('attrSTR').value = a.STR || 50;
        document.getElementById('attrCON').value = a.CON || 50;
        document.getElementById('attrSIZ').value = a.SIZ || 60;
        document.getElementById('attrDEX').value = a.DEX || 50;
        document.getElementById('attrAPP').value = a.APP || 50;
        document.getElementById('attrINT').value = a.INT || 60;
        document.getElementById('attrPOW').value = a.POW || 50;
        document.getElementById('attrEDU').value = a.EDU || 60;
        document.getElementById('attrLuck').value = a.Luck || 50;
    }

    function readAttributesFromForm(npc) {
        npc.attributes = {
            STR: parseInt(document.getElementById('attrSTR').value) || 50,
            CON: parseInt(document.getElementById('attrCON').value) || 50,
            SIZ: parseInt(document.getElementById('attrSIZ').value) || 60,
            DEX: parseInt(document.getElementById('attrDEX').value) || 50,
            APP: parseInt(document.getElementById('attrAPP').value) || 50,
            INT: parseInt(document.getElementById('attrINT').value) || 60,
            POW: parseInt(document.getElementById('attrPOW').value) || 50,
            EDU: parseInt(document.getElementById('attrEDU').value) || 60,
            Luck: parseInt(document.getElementById('attrLuck').value) || 50
        };
    }

    function recalcDerived() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;
        readAttributesFromForm(npc);
        const d = AttributeGenerator.calcDerived(npc.attributes);

        npc.hpMax = d.hp;
        npc.hpCurrent = d.hp;
        npc.mpMax = d.mp;
        npc.mpCurrent = d.mp;
        npc.sanMax = d.san;
        npc.sanCurrent = d.san;
        npc.move = d.mov;
        npc.bonusDamage = d.bd;
        npc.build = d.build;

        document.getElementById('hpMax').value = d.hp;
        document.getElementById('hpCurrent').value = d.hp;
        document.getElementById('mpMax').value = d.mp;
        document.getElementById('mpCurrent').value = d.mp;
        document.getElementById('sanMax').value = d.san;
        document.getElementById('sanCurrent').value = d.san;
        document.getElementById('move').value = d.mov;
        document.getElementById('bonusDamage').value = d.bd;
        document.getElementById('build').value = d.build;

        // Update Esquivar base
        const dodge = Math.floor(npc.attributes.DEX / 2);
        const dodgeInput = document.querySelector('.skill-input[data-skill-name="Esquivar"]');
        if (dodgeInput) {
            dodgeInput.dataset.base = dodge;
            if (npc.skills && (npc.skills['Esquivar'] === undefined || npc.skills['Esquivar'] < dodge)) {
                dodgeInput.value = dodge;
                if (npc.skills) npc.skills['Esquivar'] = dodge;
            }
        }

        // Update Língua Própria base
        const langInput = document.querySelector('.skill-input[data-skill-name="Língua Própria"]');
        if (langInput) {
            langInput.dataset.base = npc.attributes.EDU;
            if (npc.skills && (npc.skills['Língua Própria'] === undefined || npc.skills['Língua Própria'] < npc.attributes.EDU)) {
                langInput.value = npc.attributes.EDU;
                if (npc.skills) npc.skills['Língua Própria'] = npc.attributes.EDU;
            }
        }
    }

    // === READ FORM TO NPC ===
    function readFormToNPC() {
        const npc = NPCManager.getCurrent();
        if (!npc) return;

        npc.characterName = document.getElementById('npcName').value;
        npc.age = document.getElementById('npcAge').value;
        npc.sex = document.getElementById('npcSex').value;
        npc.occupation = document.getElementById('npcOccupation').value;
        npc.role = document.getElementById('npcRole').value;
        npc.residence = document.getElementById('npcResidence').value;
        npc.birthplace = document.getElementById('npcBirthplace').value;

        npc.objective = document.getElementById('npcObjective').value;
        npc.secret = document.getElementById('npcSecret').value;
        npc.caseLink = document.getElementById('npcCaseLink').value;
        npc.personalDescription = document.getElementById('npcDescription').value;
        npc.backstory = document.getElementById('npcBackstory').value;

        readAttributesFromForm(npc);

        npc.hpMax = parseInt(document.getElementById('hpMax').value) || 0;
        npc.hpCurrent = parseInt(document.getElementById('hpCurrent').value) || 0;
        npc.mpMax = parseInt(document.getElementById('mpMax').value) || 0;
        npc.mpCurrent = parseInt(document.getElementById('mpCurrent').value) || 0;
        npc.sanMax = parseInt(document.getElementById('sanMax').value) || 0;
        npc.sanCurrent = parseInt(document.getElementById('sanCurrent').value) || 0;
        npc.move = parseInt(document.getElementById('move').value) || 8;
        npc.bonusDamage = document.getElementById('bonusDamage').value;
        npc.build = parseInt(document.getElementById('build').value) || 0;

        // Read skills from form
        document.querySelectorAll('.skill-input').forEach(input => {
            npc.skills[input.dataset.skillName] = parseInt(input.value) || 0;
        });

        npc.notes = document.getElementById('npcNotes').value;

        npc.updatedAt = new Date().toISOString();
    }

    return { init, loadNPCToForm, readFormToNPC };
})();
