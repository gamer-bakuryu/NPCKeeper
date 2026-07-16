// js/generators/skillGenerator.js
// Geração inteligente de perícias baseada na profissão

const SkillGenerator = (() => {

    // Gerar valor de perícia com variação
    function randomSkillValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Normalizar nome da perícia para comparação
    function normalizeSkillName(name) {
        return name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '');
    }

    // Verificar se uma perícia é da profissão (comparação flexível)
    function isOccupationSkill(skillName, occupationSkills) {
        const normalizedSkill = normalizeSkillName(skillName);
        return occupationSkills.some(occSkill => {
            const normalizedOcc = normalizeSkillName(occSkill);
            return normalizedSkill.includes(normalizedOcc) || normalizedOcc.includes(normalizedSkill);
        });
    }

    // Gerar perícias para uma profissão
    function generate(occupation, attributes) {
        const skillValues = {};

        // Inicializar todas com valor base
        for (const skill of SKILLS) {
            let base = skill.base;
            if (skill.derivedFrom === 'EDU') {
                base = attributes.EDU || 50;
            } else if (skill.derivedFrom === 'DEX_HALF') {
                base = Math.floor((attributes.DEX || 50) / 2);
            }
            skillValues[skill.name] = base;
        }

        if (!occupation || !OCCUPATIONS[occupation]) {
            return skillValues;
        }

        const occData = OCCUPATIONS[occupation];
        const occSkills = occData.skills || [];

        // Calcular pontos de ocupação disponíveis (simplificado)
        const edu = attributes.EDU || 50;
        const totalOccPoints = edu * 4; // Simplificação

        // Distribuir pontos entre as perícias da profissão
        const matchedSkills = [];
        for (const skill of SKILLS) {
            if (isOccupationSkill(skill.name, occSkills)) {
                matchedSkills.push(skill.name);
            }
        }

        if (matchedSkills.length > 0) {
            // Cada perícia de profissão recebe uma porção dos pontos
            const avgPoints = Math.floor(totalOccPoints / matchedSkills.length);

            for (const skillName of matchedSkills) {
                const base = skillValues[skillName];
                // Valor entre 40% e 80% dos pontos médios
                const bonus = randomSkillValue(
                    Math.floor(avgPoints * 0.4),
                    Math.floor(avgPoints * 0.8)
                );
                const newValue = Math.min(base + bonus, 90);
                skillValues[skillName] = Math.max(newValue, base);
            }
        }

        // Crédito baseado na profissão
        if (occData.creditMin !== undefined) {
            skillValues["Crédito"] = randomSkillValue(occData.creditMin, occData.creditMax);
        }

        // Adicionar alguns pontos pessoais aleatórios (INT × 2)
        const personalPoints = (attributes.INT || 50) * 2;
        const nonOccSkills = SKILLS.filter(s => !isOccupationSkill(s.name, occSkills) && s.name !== "Crédito");
        const numPersonalSkills = Math.min(4, nonOccSkills.length);
        const selectedPersonal = [];

        for (let i = 0; i < numPersonalSkills; i++) {
            const idx = Math.floor(Math.random() * nonOccSkills.length);
            const skill = nonOccSkills.splice(idx, 1)[0];
            if (skill) selectedPersonal.push(skill.name);
        }

        const avgPersonal = Math.floor(personalPoints / numPersonalSkills);
        for (const skillName of selectedPersonal) {
            const base = skillValues[skillName];
            const bonus = randomSkillValue(
                Math.floor(avgPersonal * 0.3),
                Math.floor(avgPersonal * 0.6)
            );
            skillValues[skillName] = Math.min(base + bonus, 75);
        }

        return skillValues;
    }

    // Retornar lista de perícias da profissão
    function getOccupationSkills(occupation) {
        if (!occupation || !OCCUPATIONS[occupation]) return [];
        const occSkills = OCCUPATIONS[occupation].skills || [];
        const matched = [];
        for (const skill of SKILLS) {
            if (isOccupationSkill(skill.name, occSkills)) {
                matched.push(skill.name);
            }
        }
        return matched;
    }

    return { generate, getOccupationSkills, isOccupationSkill };
})();
