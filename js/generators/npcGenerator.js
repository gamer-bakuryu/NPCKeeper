// js/generators/npcGenerator.js
// Gerador completo de NPC

const NPCGenerator = (() => {

    function generateId() {
        return 'npc_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    }

    function createBlankNPC() {
        const now = new Date().toISOString();
        return {
            id: generateId(),
            createdAt: now,
            updatedAt: now,
            sheetType: "npc",

            // Basic
            characterName: "",
            playerName: "Guardião",
            age: "",
            sex: "",
            occupation: "",
            role: "",
            residence: "",
            birthplace: "",
            portrait: "",

            // Narrative
            personality: [],
            objective: "",
            secret: "",
            caseLink: "",
            personalDescription: "",
            backstory: "",

            // Attributes
            attributes: {
                STR: 50, CON: 50, SIZ: 60,
                DEX: 50, APP: 50, INT: 60,
                POW: 50, EDU: 60, Luck: 50
            },

            // Derived
            hpMax: 11,
            hpCurrent: 11,
            mpMax: 10,
            mpCurrent: 10,
            sanMax: 50,
            sanCurrent: 50,
            move: 8,
            bonusDamage: "0",
            build: 0,

            // Skills
            skills: {},

            // Combat & Items
            weapons: [],
            inventory: [],
            spells: [],

            // Extras
            relations: [],
            traits: [],
            notes: ""
        };
    }

    function generateFull(options) {
        const npc = createBlankNPC();
        const sex = options.sex || (Math.random() > 0.5 ? "Masculino" : "Feminino");
        const occupations = Object.keys(OCCUPATIONS);
        const occupation = options.occupation || occupations[Math.floor(Math.random() * occupations.length)];
        const role = options.role || NARRATIVE_ROLES[Math.floor(Math.random() * NARRATIVE_ROLES.length)].id;
        const age = options.age || (Math.floor(Math.random() * 45) + 20);

        npc.characterName = NameGenerator.generate(sex);
        npc.sex = sex;
        npc.age = age;
        npc.occupation = occupation;
        npc.role = role;

        // Atributos
        npc.attributes = AttributeGenerator.generate(occupation, age);

        // Derivados
        const derived = AttributeGenerator.calcDerived(npc.attributes);
        npc.hpMax = derived.hp;
        npc.hpCurrent = derived.hp;
        npc.mpMax = derived.mp;
        npc.mpCurrent = derived.mp;
        npc.sanMax = derived.san;
        npc.sanCurrent = derived.san;
        npc.move = derived.mov;
        npc.bonusDamage = derived.bd;
        npc.build = derived.build;

        // Perícias
        npc.skills = SkillGenerator.generate(occupation, npc.attributes);

        // Narrativa
        npc.personality = NarrativeGenerator.generatePersonality(3);
        npc.objective = NarrativeGenerator.generateObjective(role);
        npc.secret = NarrativeGenerator.generateSecret(role);

        npc.updatedAt = new Date().toISOString();

        return npc;
    }

    return { createBlankNPC, generateFull, generateId };
})();
