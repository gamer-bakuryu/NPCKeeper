// js/data/occupations.js
// Profissões do Chamado de Cthulhu 7ª Edição com dados de perícias e tendência de atributos

const OCCUPATIONS = {
    "Antiquário": {
        skills: ["Avaliação", "Arte/Ofício", "História", "Biblioteca", "Outra Língua", "Mundo Natural", "Charme", "Persuasão"],
        creditMin: 30, creditMax: 70,
        attrTendency: { EDU: "high", INT: "high", FOR: "low" },
        skillFormula: "EDU × 4"
    },
    "Artista": {
        skills: ["Arte/Ofício", "Charme", "Escutar", "Persuasão", "Psicologia", "Fotografia", "História", "Outra Língua"],
        creditMin: 9, creditMax: 50,
        attrTendency: { APA: "high", POD: "high", DES: "mid" },
        skillFormula: "EDU × 2 + POD × 2"
    },
    "Atleta": {
        skills: ["Escalar", "Saltar", "Arremessar", "Nadar", "Esquivar", "Lutar (Briga)", "Cavalgar", "Primeiros Socorros"],
        creditMin: 9, creditMax: 70,
        attrTendency: { FOR: "high", CON: "high", DES: "high", EDU: "low" },
        skillFormula: "EDU × 2 + (FOR ou DES) × 2"
    },
    "Autor": {
        skills: ["Arte/Ofício (Escrita)", "Psicologia", "História", "Biblioteca", "Outra Língua", "Língua Própria", "Persuasão", "Ocultismo"],
        creditMin: 9, creditMax: 30,
        attrTendency: { EDU: "high", INT: "high", APA: "mid" },
        skillFormula: "EDU × 4"
    },
    "Bibliotecário": {
        skills: ["Biblioteca", "Outra Língua", "Língua Própria", "Contabilidade", "História", "Charme", "Persuasão", "Administração"],
        creditMin: 9, creditMax: 35,
        attrTendency: { EDU: "high", INT: "high", FOR: "low" },
        skillFormula: "EDU × 4"
    },
    "Clérigo": {
        skills: ["Contabilidade", "História", "Biblioteca", "Escutar", "Outra Língua", "Persuasão", "Psicologia", "Charme"],
        creditMin: 9, creditMax: 60,
        attrTendency: { EDU: "high", POD: "high", APA: "mid" },
        skillFormula: "EDU × 4"
    },
    "Coveiro": {
        skills: ["Arte/Ofício", "Escalar", "História", "Escutar", "Operar Maquinário", "Furtividade", "Encontrar", "Primeiros Socorros"],
        creditMin: 9, creditMax: 20,
        attrTendency: { FOR: "high", CON: "high", EDU: "low" },
        skillFormula: "EDU × 2 + FOR × 2"
    },
    "Criminoso": {
        skills: ["Arte/Ofício", "Chamamento", "Disfarce", "Intimidação", "Lutar (Briga)", "Furtividade", "Encontrar", "Psicologia"],
        creditMin: 5, creditMax: 65,
        attrTendency: { DES: "high", FOR: "mid", INT: "mid", EDU: "low" },
        skillFormula: "EDU × 2 + (DES ou FOR) × 2"
    },
    "Detetive Particular": {
        skills: ["Direito", "Biblioteca", "Encontrar", "Fotografar", "Disfarce", "Intimidação", "Psicologia", "Furtividade"],
        creditMin: 9, creditMax: 30,
        attrTendency: { INT: "high", DES: "mid", APA: "mid" },
        skillFormula: "EDU × 2 + (INT ou DES) × 2"
    },
    "Diletante": {
        skills: ["Arte/Ofício", "Charme", "Armas de Fogo", "Outra Língua", "Cavalgar", "Persuasão", "Psicologia", "Crédito"],
        creditMin: 50, creditMax: 99,
        attrTendency: { APA: "high", EDU: "mid", INT: "mid" },
        skillFormula: "EDU × 2 + APA × 2"
    },
    "Engenheiro": {
        skills: ["Arte/Ofício", "Ciência (Engenharia)", "Ciência (Física)", "Eletricidade", "Biblioteca", "Operar Maquinário", "Mecânica", "Encontrar"],
        creditMin: 30, creditMax: 60,
        attrTendency: { EDU: "high", INT: "high", DES: "mid" },
        skillFormula: "EDU × 4"
    },
    "Fazendeiro": {
        skills: ["Arte/Ofício (Agricultura)", "Mecânica", "Mundo Natural", "Operar Maquinário", "Rastrear", "Encontrar", "Armas de Fogo", "Primeiros Socorros"],
        creditMin: 9, creditMax: 30,
        attrTendency: { FOR: "high", CON: "high", DES: "mid", EDU: "low" },
        skillFormula: "EDU × 2 + (FOR ou DES) × 2"
    },
    "Jornalista": {
        skills: ["Arte/Ofício (Escrita)", "Persuasão", "Escutar", "Biblioteca", "Psicologia", "Fotografia", "Charme", "História"],
        creditMin: 9, creditMax: 30,
        attrTendency: { EDU: "mid", INT: "high", APA: "mid" },
        skillFormula: "EDU × 4"
    },
    "Médico": {
        skills: ["Primeiros Socorros", "Medicina", "Ciência (Biologia)", "Ciência (Farmacologia)", "Psicologia", "Outra Língua", "Biblioteca", "Persuasão"],
        creditMin: 30, creditMax: 80,
        attrTendency: { EDU: "high", INT: "high", POD: "mid" },
        skillFormula: "EDU × 4"
    },
    "Militar (Oficial)": {
        skills: ["Charme", "Contabilidade", "Armas de Fogo", "Intimidação", "Navegação", "Persuasão", "Psicologia", "Lutar (Briga)"],
        creditMin: 20, creditMax: 50,
        attrTendency: { FOR: "high", CON: "high", INT: "mid", DES: "mid" },
        skillFormula: "EDU × 2 + (FOR ou INT) × 2"
    },
    "Militar (Soldado)": {
        skills: ["Esquivar", "Lutar (Briga)", "Armas de Fogo", "Furtividade", "Escalar", "Primeiros Socorros", "Nadar", "Sobrevivência"],
        creditMin: 9, creditMax: 30,
        attrTendency: { FOR: "high", CON: "high", DES: "high", EDU: "low" },
        skillFormula: "EDU × 2 + (FOR ou DES) × 2"
    },
    "Missionário": {
        skills: ["Arte/Ofício", "Primeiros Socorros", "Outra Língua", "Medicina", "Charme", "Persuasão", "Mundo Natural", "Mecânica"],
        creditMin: 0, creditMax: 30,
        attrTendency: { POD: "high", EDU: "mid", APA: "mid" },
        skillFormula: "EDU × 4"
    },
    "Motorista": {
        skills: ["Dirigir Automóvel", "Eletricidade", "Escutar", "Mecânica", "Navegação", "Encontrar", "Lutar (Briga)", "Psicologia"],
        creditMin: 9, creditMax: 20,
        attrTendency: { DES: "high", CON: "mid", FOR: "mid" },
        skillFormula: "EDU × 2 + DES × 2"
    },
    "Músico": {
        skills: ["Arte/Ofício (Instrumento)", "Charme", "Escutar", "Persuasão", "Psicologia", "Avaliação", "Outra Língua", "Contabilidade"],
        creditMin: 9, creditMax: 30,
        attrTendency: { APA: "high", DES: "mid", POD: "mid" },
        skillFormula: "EDU × 2 + (APA ou POD) × 2"
    },
    "Parapsicólogo": {
        skills: ["Ocultismo", "Psicologia", "Fotografia", "Biblioteca", "Antropologia", "História", "Outra Língua", "Arte/Ofício"],
        creditMin: 9, creditMax: 30,
        attrTendency: { EDU: "high", POD: "high", INT: "high" },
        skillFormula: "EDU × 4"
    },
    "Piloto": {
        skills: ["Pilotar (Aeronave)", "Astronomia", "Eletricidade", "Mecânica", "Navegação", "Operar Maquinário", "Física", "Escutar"],
        creditMin: 20, creditMax: 70,
        attrTendency: { DES: "high", INT: "mid", CON: "mid" },
        skillFormula: "EDU × 2 + DES × 2"
    },
    "Policial": {
        skills: ["Armas de Fogo", "Direito", "Escutar", "Encontrar", "Lutar (Briga)", "Intimidação", "Persuasão", "Psicologia"],
        creditMin: 9, creditMax: 30,
        attrTendency: { FOR: "high", CON: "high", DES: "high", EDU: "low" },
        skillFormula: "EDU × 2 + (FOR ou DES) × 2"
    },
    "Professor": {
        skills: ["Biblioteca", "Outra Língua", "Língua Própria", "Psicologia", "História", "Persuasão", "Ciência", "Antropologia"],
        creditMin: 20, creditMax: 50,
        attrTendency: { EDU: "high", INT: "high", FOR: "low" },
        skillFormula: "EDU × 4"
    },
    "Vagabundo": {
        skills: ["Arte/Ofício", "Escalar", "Saltar", "Escutar", "Encontrar", "Furtividade", "Mundo Natural", "Lutar (Briga)"],
        creditMin: 0, creditMax: 5,
        attrTendency: { CON: "high", DES: "mid", FOR: "mid", EDU: "low" },
        skillFormula: "EDU × 2 + (FOR ou DES ou APA) × 2"
    },
    "Advogado": {
        skills: ["Direito", "Contabilidade", "Biblioteca", "Persuasão", "Charme", "Intimidação", "Psicologia", "Língua Própria"],
        creditMin: 30, creditMax: 80,
        attrTendency: { EDU: "high", INT: "high", APA: "mid" },
        skillFormula: "EDU × 4"
    },
    "Arqueólogo": {
        skills: ["Arqueologia", "Antropologia", "História", "Outra Língua", "Biblioteca", "Encontrar", "Ciência", "Navegação"],
        creditMin: 10, creditMax: 40,
        attrTendency: { EDU: "high", INT: "high", CON: "mid" },
        skillFormula: "EDU × 4"
    },
    "Enfermeiro": {
        skills: ["Primeiros Socorros", "Medicina", "Escutar", "Psicologia", "Ciência (Biologia)", "Persuasão", "Língua Própria", "Encontrar"],
        creditMin: 9, creditMax: 30,
        attrTendency: { EDU: "mid", INT: "mid", POD: "mid", CON: "mid" },
        skillFormula: "EDU × 4"
    },
    "Comerciante": {
        skills: ["Avaliação", "Contabilidade", "Charme", "Persuasão", "Psicologia", "Direito", "Escutar", "Língua Própria"],
        creditMin: 20, creditMax: 60,
        attrTendency: { APA: "high", INT: "mid", EDU: "mid" },
        skillFormula: "EDU × 2 + APA × 2"
    },
    "Marinheiro": {
        skills: ["Nadar", "Mecânica", "Mundo Natural", "Navegação", "Escutar", "Encontrar", "Lutar (Briga)", "Arremessar"],
        creditMin: 5, creditMax: 20,
        attrTendency: { FOR: "high", CON: "high", DES: "mid", EDU: "low" },
        skillFormula: "EDU × 2 + (FOR ou DES) × 2"
    },
    "Cultista": {
        skills: ["Ocultismo", "Persuasão", "Intimidação", "Psicologia", "História", "Outra Língua", "Furtividade", "Encontrar"],
        creditMin: 0, creditMax: 40,
        attrTendency: { POD: "high", INT: "high", SOR: "low" },
        skillFormula: "EDU × 2 + POD × 2"
    },
    "Fotógrafo": {
        skills: ["Fotografia", "Arte/Ofício (Fotografia)", "Persuasão", "Furtividade", "Encontrar", "Psicologia", "Charme", "Eletricidade"],
        creditMin: 9, creditMax: 30,
        attrTendency: { DES: "mid", INT: "mid", APA: "mid" },
        skillFormula: "EDU × 4"
    },
    "Mecânico": {
        skills: ["Mecânica", "Dirigir Automóvel", "Eletricidade", "Operar Maquinário", "Encontrar", "Arte/Ofício", "Lutar (Briga)", "Intimidação"],
        creditMin: 9, creditMax: 30,
        attrTendency: { DES: "high", FOR: "mid", INT: "mid" },
        skillFormula: "EDU × 2 + DES × 2"
    }
};
