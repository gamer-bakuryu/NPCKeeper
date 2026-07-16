// js/managers/exportManager.js
// Exportação e importação de NPCs no formato compatível com CallKeeper

const ExportManager = (() => {

    // Converter para formato CallKeeper
    function toCallKeeperFormat(npc) {
        // Montar a estrutura de skills no formato CallKeeper
        const skills = {};
        if (npc.skills) {
            for (const [name, value] of Object.entries(npc.skills)) {
                skills[name] = {
                    value: value,
                    half: Math.floor(value / 2),
                    fifth: Math.floor(value / 5)
                };
            }
        }

        // Montar atributos no formato CallKeeper
        const attributes = {};
        if (npc.attributes) {
            for (const [key, value] of Object.entries(npc.attributes)) {
                attributes[key] = {
                    value: value,
                    half: Math.floor(value / 2),
                    fifth: Math.floor(value / 5)
                };
            }
        }

        // Montar backstory com elementos narrativos
        const backstoryParts = [];
        if (npc.role) backstoryParts.push(`Papel: ${npc.role}`);
        if (npc.objective) backstoryParts.push(`Objetivo: ${npc.objective}`);
        if (npc.secret) backstoryParts.push(`Segredo: ${npc.secret}`);
        if (npc.caseLink) backstoryParts.push(`Ligação: ${npc.caseLink}`);
        if (npc.backstory) backstoryParts.push(`\n${npc.backstory}`);

        return {
            id: npc.id || NPCGenerator.generateId(),
            createdAt: npc.createdAt || new Date().toISOString(),
            updatedAt: npc.updatedAt || new Date().toISOString(),
            sheetType: "npc",
            playerName: npc.playerName || "Guardião",
            characterName: npc.characterName || "NPC Sem Nome",
            age: npc.age ? String(npc.age) : "",
            sex: npc.sex || "",
            occupation: npc.occupation || "",
            residence: npc.residence || "",
            birthplace: npc.birthplace || "",
            portrait: npc.portrait || "",
            attributes: attributes,
            hpMax: npc.hpMax || 0,
            hpCurrent: npc.hpCurrent || 0,
            mpMax: npc.mpMax || 0,
            mpCurrent: npc.mpCurrent || 0,
            sanMax: npc.sanMax || 0,
            sanCurrent: npc.sanCurrent || 0,
            move: npc.move || 8,
            bonusDamage: npc.bonusDamage || "0",
            build: npc.build || 0,
            skills: skills,
            inventory: npc.inventory || [],
            weapons: npc.weapons || [],
            spells: npc.spells || [],
            relations: npc.relations || [],
            personalDescription: npc.personalDescription || "",
            traits: npc.personality || npc.traits || [],
            backstory: backstoryParts.join('\n'),
            notes: npc.notes || ""
        };
    }

    // Exportar um NPC
    function exportNPC(npc) {
        const data = toCallKeeperFormat(npc);
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const safeName = (npc.characterName || 'npc').replace(/[^a-zA-Z0-9]/g, '_');
        a.download = `npc_${safeName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Exportar todos os NPCs
    function exportAll(npcs) {
        const data = npcs.map(npc => toCallKeeperFormat(npc));
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `npckeeper_export_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Importar NPCs de arquivo JSON
    function importFromFile(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                let data = JSON.parse(e.target.result);
                if (!Array.isArray(data)) {
                    data = [data];
                }
                // Validar e converter
                const npcs = data.map(item => {
                    // Se vier no formato CallKeeper, converter de volta
                    return fromCallKeeperFormat(item);
                });
                callback(null, npcs);
            } catch (err) {
                callback(err, null);
            }
        };
        reader.onerror = function() {
            callback(new Error('Erro ao ler arquivo'), null);
        };
        reader.readAsText(file);
    }

    // Converter do formato CallKeeper para formato interno
    function fromCallKeeperFormat(data) {
        const npc = NPCGenerator.createBlankNPC();

        npc.id = data.id || npc.id;
        npc.createdAt = data.createdAt || npc.createdAt;
        npc.updatedAt = data.updatedAt || npc.updatedAt;
        npc.characterName = data.characterName || "";
        npc.playerName = data.playerName || "Guardião";
        npc.age = data.age || "";
        npc.sex = data.sex || "";
        npc.occupation = data.occupation || "";
        npc.residence = data.residence || "";
        npc.birthplace = data.birthplace || "";
        npc.portrait = data.portrait || "";

        // Atributos
        if (data.attributes) {
            for (const [key, val] of Object.entries(data.attributes)) {
                if (typeof val === 'object' && val.value !== undefined) {
                    npc.attributes[key] = val.value;
                } else if (typeof val === 'number') {
                    npc.attributes[key] = val;
                }
            }
        }

        npc.hpMax = data.hpMax || 0;
        npc.hpCurrent = data.hpCurrent || 0;
        npc.mpMax = data.mpMax || 0;
        npc.mpCurrent = data.mpCurrent || 0;
        npc.sanMax = data.sanMax || 0;
        npc.sanCurrent = data.sanCurrent || 0;
        npc.move = data.move || 8;
        npc.bonusDamage = data.bonusDamage || "0";
        npc.build = data.build || 0;

        // Skills
        if (data.skills) {
            for (const [name, val] of Object.entries(data.skills)) {
                if (typeof val === 'object' && val.value !== undefined) {
                    npc.skills[name] = val.value;
                } else if (typeof val === 'number') {
                    npc.skills[name] = val;
                }
            }
        }

        npc.inventory = data.inventory || [];
        npc.weapons = data.weapons || [];
        npc.spells = data.spells || [];
        npc.relations = data.relations || [];
        npc.personality = data.traits || [];
        npc.personalDescription = data.personalDescription || "";
        npc.backstory = data.backstory || "";
        npc.notes = data.notes || "";

        // Tentar extrair role do backstory se existir
        if (data.backstory) {
            const roleMatch = data.backstory.match(/Papel:\s*(.+)/);
            if (roleMatch) npc.role = roleMatch[1].trim();
            const objMatch = data.backstory.match(/Objetivo:\s*(.+)/);
            if (objMatch) npc.objective = objMatch[1].trim();
            const secMatch = data.backstory.match(/Segredo:\s*(.+)/);
            if (secMatch) npc.secret = secMatch[1].trim();
            const linkMatch = data.backstory.match(/Ligação:\s*(.+)/);
            if (linkMatch) npc.caseLink = linkMatch[1].trim();
        }

        return npc;
    }

    return { exportNPC, exportAll, importFromFile, toCallKeeperFormat };
})();
