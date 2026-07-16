// js/data/skills.js
// Lista completa de perícias do Chamado de Cthulhu 7ª Edição com valores base

const SKILLS_DATA = [
    { name: "Antropologia", base: 1 },
    { name: "Arqueologia", base: 1 },
    { name: "Armas de Fogo (Pistola)", base: 20 },
    { name: "Armas de Fogo (Rifle/Espingarda)", base: 25 },
    { name: "Arremessar", base: 20 },
    { name: "Arte/Ofício", base: 5 },
    { name: "Astronomia", base: 1 },
    { name: "Avaliação", base: 5 },
    { name: "Cavalgar", base: 5 },
    { name: "Charme", base: 15 },
    { name: "Ciência (Biologia)", base: 1 },
    { name: "Ciência (Engenharia)", base: 1 },
    { name: "Ciência (Farmacologia)", base: 1 },
    { name: "Ciência (Física)", base: 1 },
    { name: "Ciência (Geologia)", base: 1 },
    { name: "Ciência (Matemática)", base: 1 },
    { name: "Ciência (Meteorologia)", base: 1 },
    { name: "Ciência (Química)", base: 1 },
    { name: "Contabilidade", base: 5 },
    { name: "Crédito", base: 0 },
    { name: "Demolições", base: 1 },
    { name: "Direito", base: 5 },
    { name: "Dirigir Automóvel", base: 20 },
    { name: "Disfarce", base: 5 },
    { name: "Eletricidade", base: 10 },
    { name: "Encontrar", base: 25 },
    { name: "Escalar", base: 20 },
    { name: "Escutar", base: 20 },
    { name: "Esquivar", base: 0, derivedFrom: "DEX_HALF" },
    { name: "Fotografia", base: 5 },
    { name: "Furtividade", base: 20 },
    { name: "História", base: 5 },
    { name: "Intimidação", base: 15 },
    { name: "Lábia", base: 5 },
    { name: "Língua Própria", base: 0, derivedFrom: "EDU" },
    { name: "Lutar (Briga)", base: 25 },
    { name: "Lutar (Espada)", base: 20 },
    { name: "Lutar (Chicote)", base: 5 },
    { name: "Mecânica", base: 10 },
    { name: "Medicina", base: 1 },
    { name: "Mundo Natural", base: 10 },
    { name: "Navegação", base: 10 },
    { name: "Natação", base: 20 },
    { name: "Ocultismo", base: 5 },
    { name: "Operar Maquinário", base: 1 },
    { name: "Outra Língua", base: 1 },
    { name: "Persuasão", base: 10 },
    { name: "Pilotar (Aeronave)", base: 1 },
    { name: "Pilotar (Barco)", base: 1 },
    { name: "Primeiros Socorros", base: 30 },
    { name: "Psicanálise", base: 1 },
    { name: "Psicologia", base: 10 },
    { name: "Rastrear", base: 10 },
    { name: "Saltar", base: 20 },
    { name: "Sobrevivência", base: 10 },
    { name: "Armas de Fogo (Metralhadora)", base: 10 },
    { name: "Administração", base: 1 },
    { name: "Arqueologia", base: 1 },
    { name: "Nadar", base: 20 }
];

// Remove duplicatas por nome
const SKILLS = [];
const seenSkills = new Set();
for (const skill of SKILLS_DATA) {
    if (!seenSkills.has(skill.name)) {
        seenSkills.add(skill.name);
        SKILLS.push(skill);
    }
}
SKILLS.sort((a, b) => a.name.localeCompare(b.name, 'pt'));
