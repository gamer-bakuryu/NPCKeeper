// js/generators/attributeGenerator.js
// Geração de atributos com influência da profissão

const AttributeGenerator = (() => {

    // Rola 3d6 × 5
    function roll3d6x5() {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            sum += Math.floor(Math.random() * 6) + 1;
        }
        return sum * 5;
    }

    // Rola (2d6+6) × 5
    function roll2d6p6x5() {
        let sum = 6;
        for (let i = 0; i < 2; i++) {
            sum += Math.floor(Math.random() * 6) + 1;
        }
        return sum * 5;
    }

    // Aplicar tendência da profissão
    function applyTendency(value, tendency) {
        if (tendency === "high") {
            // Garante mínimo de 50 e adiciona bônus
            value = Math.max(value, 50);
            value += Math.floor(Math.random() * 15) + 5;
        } else if (tendency === "mid") {
            // Valor normal, leve ajuste para cima
            value += Math.floor(Math.random() * 10);
        } else if (tendency === "low") {
            // Reduz um pouco
            value -= Math.floor(Math.random() * 10) + 5;
        }
        return Math.max(15, Math.min(99, value));
    }

    // Gerar atributos
    function generate(occupation, age) {
        const attrs = {
            STR: roll3d6x5(),
            CON: roll3d6x5(),
            SIZ: roll2d6p6x5(),
            DEX: roll3d6x5(),
            APP: roll3d6x5(),
            INT: roll2d6p6x5(),
            POW: roll3d6x5(),
            EDU: roll2d6p6x5(),
            Luck: roll3d6x5()
        };

        // Mapear nomes do sistema para chaves internas
        const attrMap = {
            FOR: 'STR', CON: 'CON', TAM: 'SIZ',
            DES: 'DEX', APA: 'APP', INT: 'INT',
            POD: 'POW', EDU: 'EDU', SOR: 'Luck'
        };

        // Aplicar tendências da profissão
        if (occupation && OCCUPATIONS[occupation]) {
            const tendency = OCCUPATIONS[occupation].attrTendency || {};
            for (const [key, dir] of Object.entries(tendency)) {
                const internalKey = attrMap[key];
                if (internalKey && attrs[internalKey] !== undefined) {
                    attrs[internalKey] = applyTendency(attrs[internalKey], dir);
                }
            }
        }

        // Ajustes por idade
        age = parseInt(age) || 30;
        if (age < 20) {
            // Jovem: menos EDU e STR, mais DEX
            attrs.EDU = Math.max(attrs.EDU - 10, 30);
            attrs.STR = Math.max(attrs.STR - 5, 15);
            attrs.SIZ = Math.max(attrs.SIZ - 5, 30);
        } else if (age >= 40 && age < 50) {
            attrs.EDU = Math.min(attrs.EDU + 5, 99);
            // Uma redução leve
            const reduce = 5;
            const choices = ['STR', 'CON', 'DEX', 'APP'];
            const pick = choices[Math.floor(Math.random() * choices.length)];
            attrs[pick] = Math.max(attrs[pick] - reduce, 15);
        } else if (age >= 50 && age < 60) {
            attrs.EDU = Math.min(attrs.EDU + 10, 99);
            const reduce = 10;
            const choices = ['STR', 'CON', 'DEX', 'APP'];
            for (let i = 0; i < 2; i++) {
                const pick = choices[Math.floor(Math.random() * choices.length)];
                attrs[pick] = Math.max(attrs[pick] - Math.floor(reduce / 2), 15);
            }
        } else if (age >= 60 && age < 70) {
            attrs.EDU = Math.min(attrs.EDU + 15, 99);
            const choices = ['STR', 'CON', 'DEX', 'APP'];
            for (const attr of choices) {
                attrs[attr] = Math.max(attrs[attr] - Math.floor(Math.random() * 10 + 5), 15);
            }
        } else if (age >= 70) {
            attrs.EDU = Math.min(attrs.EDU + 20, 99);
            const choices = ['STR', 'CON', 'DEX', 'APP'];
            for (const attr of choices) {
                attrs[attr] = Math.max(attrs[attr] - Math.floor(Math.random() * 20 + 10), 15);
            }
        }

        // Garantir limites
        for (const key of Object.keys(attrs)) {
            attrs[key] = Math.max(15, Math.min(99, attrs[key]));
        }

        return attrs;
    }

    // Calcular valores derivados
    function calcDerived(attrs) {
        const hp = Math.floor((attrs.CON + attrs.SIZ) / 10);
        const mp = Math.floor(attrs.POW / 5);
        const san = attrs.POW;

        // Movimento
        let mov = 8;
        if (attrs.DEX < attrs.SIZ && attrs.STR < attrs.SIZ) {
            mov = 7;
        } else if (attrs.DEX > attrs.SIZ && attrs.STR > attrs.SIZ) {
            mov = 9;
        }

        // Bônus de Dano e Corpulência
        const combined = attrs.STR + attrs.SIZ;
        let bd = "0";
        let build = 0;
        if (combined <= 64) { bd = "-2"; build = -2; }
        else if (combined <= 84) { bd = "-1"; build = -1; }
        else if (combined <= 124) { bd = "0"; build = 0; }
        else if (combined <= 164) { bd = "+1d4"; build = 1; }
        else if (combined <= 204) { bd = "+1d6"; build = 2; }
        else { bd = "+2d6"; build = 3; }

        // Esquiva base = DEX / 2
        const dodge = Math.floor(attrs.DEX / 2);

        return { hp, mp, san, mov, bd, build, dodge };
    }

    return { generate, calcDerived };
})();
