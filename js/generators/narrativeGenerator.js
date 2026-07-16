// js/generators/narrativeGenerator.js
// Gerador de elementos narrativos (objetivo, segredo, personalidade)

const NarrativeGenerator = (() => {

    function pickRandom(arr) {
        if (!arr || arr.length === 0) return "";
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateObjective(role) {
        const roleObjectives = OBJECTIVES_DATA[role] || [];
        const generalObjectives = OBJECTIVES_DATA.general || [];
        const combined = [...roleObjectives, ...generalObjectives];
        return pickRandom(combined);
    }

    function generateSecret(role) {
        const roleSecrets = SECRETS_DATA[role] || [];
        const generalSecrets = SECRETS_DATA.general || [];
        const combined = [...roleSecrets, ...generalSecrets];
        return pickRandom(combined);
    }

    function generatePersonality(count) {
        count = count || 3;
        const shuffled = [...PERSONALITY_TRAITS].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    return { generateObjective, generateSecret, generatePersonality };
})();
