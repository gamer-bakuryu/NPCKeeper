// js/generators/nameGenerator.js
// Gerador de nomes aleatórios

const NameGenerator = (() => {

    function generate(sex) {
        let firstNames;

        if (sex === "Feminino") {
            firstNames = NPC_NAMES.female.first;
        } else if (sex === "Masculino") {
            firstNames = NPC_NAMES.male.first;
        } else {
            // Aleatório
            firstNames = Math.random() > 0.5
                ? NPC_NAMES.male.first
                : NPC_NAMES.female.first;
        }

        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = NPC_NAMES.male.last[Math.floor(Math.random() * NPC_NAMES.male.last.length)];

        return `${first} ${last}`;
    }

    return { generate };
})();
