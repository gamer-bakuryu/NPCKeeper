/**
 * Profissões com perícias associadas e tendências de atributos.
 *
 * attributeBias: tendência para geração automática
 *   'up' = acima da média, 'down' = abaixo, sem indicação = neutro
 *
 * skills: lista de perícias sugeridas com valores mínimo e máximo de alocação.
 * creditMin / creditMax: faixa de Crédito para a profissão.
 */
const OCCUPATIONS = {
    'Antiquário': {
        attributeBias: { INT:'up', EDU:'up', FOR:'down' },
        creditMin:30, creditMax:70,
        skills: [
            { name:'Avaliar', min:40, max:70 },
            { name:'Arte/Ofício (qualquer)', min:30, max:60 },
            { name:'História', min:40, max:70 },
            { name:'Biblioteca', min:50, max:80 },
            { name:'Língua Estrangeira (qualquer)', min:20, max:50 },
            { name:'Charme', min:20, max:50 },
            { name:'Direito', min:15, max:40 },
            { name:'Detectar Sinais', min:25, max:55 }
        ]
    },
    'Artista': {
        attributeBias: { APA:'up', POD:'up', FOR:'down' },
        creditMin:9, creditMax:50,
        skills: [
            { name:'Arte/Ofício (qualquer)', min:50, max:80 },
            { name:'Charme', min:25, max:55 },
            { name:'Persuasão', min:20, max:50 },
            { name:'Psicologia', min:20, max:45 },
            { name:'Detectar Sinais', min:25, max:55 },
            { name:'História', min:15, max:40 },
            { name:'Língua Própria', min:30, max:60 },
            { name:'Fotografia', min:15, max:40 }
        ]
    },
    'Atleta': {
        attributeBias: { FOR:'up', DES:'up', CON:'up', EDU:'down' },
        creditMin:9, creditMax:70,
        skills: [
            { name:'Escalar', min:40, max:70 },
            { name:'Saltar', min:40, max:70 },
            { name:'Arremessar', min:30, max:60 },
            { name:'Nadar', min:35, max:65 },
            { name:'Briga', min:25, max:55 },
            { name:'Cavalgar', min:15, max:40 },
            { name:'Esquivar', min:25, max:50 },
            { name:'Primeiros Socorros', min:20, max:45 }
        ]
    },
    'Bibliotecário': {
        attributeBias: { EDU:'up', INT:'up', FOR:'down' },
        creditMin:9, creditMax:35,
        skills: [
            { name:'Biblioteca', min:60, max:90 },
            { name:'Língua Própria', min:40, max:70 },
            { name:'Língua Estrangeira (qualquer)', min:20, max:50 },
            { name:'História', min:30, max:60 },
            { name:'Contabilidade', min:15, max:40 },
            { name:'Avaliar', min:15, max:40 },
            { name:'Persuasão', min:15, max:35 },
            { name:'Psicologia', min:15, max:35 }
        ]
    },
    'Clérigo': {
        attributeBias: { POD:'up', EDU:'up', APA:'up' },
        creditMin:9, creditMax:60,
        skills: [
            { name:'Persuasão', min:35, max:65 },
            { name:'Psicologia', min:30, max:60 },
            { name:'História', min:25, max:50 },
            { name:'Biblioteca', min:30, max:55 },
            { name:'Escutar', min:25, max:50 },
            { name:'Língua Estrangeira (qualquer)', min:20, max:45 },
            { name:'Charme', min:20, max:45 },
            { name:'Contabilidade', min:10, max:30 }
        ]
    },
    'Criminoso': {
        attributeBias: { DES:'up', APA:'down' },
        creditMin:5, creditMax:65,
        skills: [
            { name:'Furtividade', min:40, max:70 },
            { name:'Prestidigitação', min:35, max:65 },
            { name:'Fechaduras', min:35, max:65 },
            { name:'Detectar Sinais', min:30, max:55 },
            { name:'Intimidação', min:25, max:55 },
            { name:'Armas de Fogo (pistola)', min:20, max:50 },
            { name:'Briga', min:25, max:50 },
            { name:'Psicologia', min:15, max:40 }
        ]
    },
    'Detetive Particular': {
        attributeBias: { INT:'up', DES:'up' },
        creditMin:9, creditMax:50,
        skills: [
            { name:'Detectar Sinais', min:40, max:70 },
            { name:'Psicologia', min:30, max:60 },
            { name:'Furtividade', min:25, max:55 },
            { name:'Persuasão', min:25, max:50 },
            { name:'Biblioteca', min:25, max:50 },
            { name:'Armas de Fogo (pistola)', min:25, max:50 },
            { name:'Direito', min:20, max:45 },
            { name:'Fotografia', min:15, max:40 }
        ]
    },
    'Diletante': {
        attributeBias: { APA:'up', EDU:'up' },
        creditMin:50, creditMax:99,
        skills: [
            { name:'Charme', min:30, max:60 },
            { name:'Armas de Fogo (pistola)', min:20, max:50 },
            { name:'Cavalgar', min:20, max:50 },
            { name:'Arte/Ofício (qualquer)', min:20, max:50 },
            { name:'Língua Estrangeira (qualquer)', min:20, max:50 },
            { name:'Direito', min:15, max:40 },
            { name:'Detectar Sinais', min:20, max:45 },
            { name:'Psicologia', min:15, max:35 }
        ]
    },
    'Engenheiro': {
        attributeBias: { INT:'up', EDU:'up' },
        creditMin:30, creditMax:60,
        skills: [
            { name:'Arte/Ofício (qualquer)', min:30, max:60 },
            { name:'Ciência (Física)', min:30, max:60 },
            { name:'Ciência (Química)', min:20, max:45 },
            { name:'Eletricidade', min:40, max:70 },
            { name:'Mecânica', min:35, max:65 },
            { name:'Biblioteca', min:25, max:50 },
            { name:'Detectar Sinais', min:20, max:40 },
            { name:'Operar Maquinário', min:25, max:50 }
        ]
    },
    'Fazendeiro': {
        attributeBias: { FOR:'up', CON:'up', EDU:'down' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Arte/Ofício (qualquer)', min:30, max:55 },
            { name:'Mecânica', min:25, max:55 },
            { name:'Mundo Natural', min:30, max:60 },
            { name:'Rastrear', min:20, max:50 },
            { name:'Operar Maquinário', min:20, max:50 },
            { name:'Briga', min:20, max:45 },
            { name:'Armas de Fogo (rifle/espingarda)', min:25, max:55 },
            { name:'Primeiros Socorros', min:20, max:40 }
        ]
    },
    'Jornalista': {
        attributeBias: { INT:'up', EDU:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Persuasão', min:40, max:70 },
            { name:'Escutar', min:30, max:60 },
            { name:'Biblioteca', min:35, max:65 },
            { name:'Psicologia', min:25, max:55 },
            { name:'Fotografia', min:25, max:50 },
            { name:'Língua Própria', min:35, max:60 },
            { name:'História', min:15, max:40 },
            { name:'Charme', min:20, max:45 }
        ]
    },
    'Médico': {
        attributeBias: { INT:'up', EDU:'up', POD:'up' },
        creditMin:30, creditMax:80,
        skills: [
            { name:'Medicina', min:50, max:80 },
            { name:'Primeiros Socorros', min:40, max:70 },
            { name:'Ciência (Biologia)', min:30, max:60 },
            { name:'Ciência (Farmácia)', min:25, max:50 },
            { name:'Psicologia', min:30, max:55 },
            { name:'Biblioteca', min:25, max:50 },
            { name:'Língua Estrangeira (Latim)', min:15, max:40 },
            { name:'Persuasão', min:15, max:35 }
        ]
    },
    'Militar': {
        attributeBias: { FOR:'up', CON:'up', DES:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Armas de Fogo (rifle/espingarda)', min:40, max:70 },
            { name:'Armas de Fogo (pistola)', min:30, max:55 },
            { name:'Briga', min:35, max:60 },
            { name:'Esquivar', min:25, max:50 },
            { name:'Furtividade', min:25, max:50 },
            { name:'Primeiros Socorros', min:25, max:50 },
            { name:'Sobrevivência', min:20, max:45 },
            { name:'Escalar', min:20, max:45 }
        ]
    },
    'Motorista/Piloto': {
        attributeBias: { DES:'up', CON:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Dirigir Automóveis', min:50, max:80 },
            { name:'Mecânica', min:35, max:65 },
            { name:'Eletricidade', min:20, max:45 },
            { name:'Escutar', min:20, max:45 },
            { name:'Navegação', min:20, max:50 },
            { name:'Detectar Sinais', min:20, max:40 },
            { name:'Briga', min:15, max:35 },
            { name:'Armas de Fogo (pistola)', min:15, max:35 }
        ]
    },
    'Músico': {
        attributeBias: { APA:'up', POD:'up', EDU:'down' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Arte/Ofício (Instrumento)', min:50, max:80 },
            { name:'Escutar', min:30, max:60 },
            { name:'Charme', min:25, max:55 },
            { name:'Persuasão', min:20, max:45 },
            { name:'Psicologia', min:15, max:40 },
            { name:'Língua Própria', min:20, max:40 },
            { name:'Avaliar', min:10, max:30 },
            { name:'Contabilidade', min:10, max:25 }
        ]
    },
    'Parapsicólogo': {
        attributeBias: { POD:'up', INT:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Ocultismo', min:45, max:75 },
            { name:'Psicologia', min:30, max:60 },
            { name:'Biblioteca', min:35, max:65 },
            { name:'Fotografia', min:20, max:45 },
            { name:'História', min:20, max:45 },
            { name:'Persuasão', min:15, max:40 },
            { name:'Língua Estrangeira (qualquer)', min:15, max:40 },
            { name:'Antropologia', min:10, max:30 }
        ]
    },
    'Policial': {
        attributeBias: { FOR:'up', CON:'up', DES:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Armas de Fogo (pistola)', min:35, max:65 },
            { name:'Briga', min:30, max:55 },
            { name:'Direito', min:25, max:50 },
            { name:'Intimidação', min:30, max:55 },
            { name:'Psicologia', min:20, max:45 },
            { name:'Detectar Sinais', min:25, max:50 },
            { name:'Primeiros Socorros', min:20, max:40 },
            { name:'Dirigir Automóveis', min:20, max:45 }
        ]
    },
    'Professor': {
        attributeBias: { EDU:'up', INT:'up', FOR:'down' },
        creditMin:20, creditMax:70,
        skills: [
            { name:'Biblioteca', min:50, max:80 },
            { name:'Língua Própria', min:40, max:70 },
            { name:'Psicologia', min:20, max:50 },
            { name:'Persuasão', min:20, max:45 },
            { name:'História', min:30, max:60 },
            { name:'Língua Estrangeira (qualquer)', min:20, max:50 },
            { name:'Ciência (qualquer)', min:15, max:45 },
            { name:'Charme', min:15, max:35 }
        ]
    },
    'Vagabundo': {
        attributeBias: { CON:'up', FOR:'down', APA:'down', EDU:'down' },
        creditMin:0, creditMax:5,
        skills: [
            { name:'Furtividade', min:30, max:60 },
            { name:'Escutar', min:25, max:55 },
            { name:'Mundo Natural', min:20, max:50 },
            { name:'Prestidigitação', min:15, max:45 },
            { name:'Briga', min:20, max:50 },
            { name:'Navegação', min:15, max:40 },
            { name:'Sobrevivência', min:25, max:55 },
            { name:'Detectar Sinais', min:20, max:45 }
        ]
    },
    'Advogado': {
        attributeBias: { INT:'up', EDU:'up', APA:'up' },
        creditMin:30, creditMax:80,
        skills: [
            { name:'Direito', min:50, max:80 },
            { name:'Persuasão', min:40, max:70 },
            { name:'Biblioteca', min:35, max:60 },
            { name:'Psicologia', min:25, max:50 },
            { name:'Charme', min:25, max:50 },
            { name:'Intimidação', min:15, max:40 },
            { name:'Contabilidade', min:20, max:45 },
            { name:'Língua Própria', min:30, max:55 }
        ]
    },
    'Arqueólogo': {
        attributeBias: { EDU:'up', INT:'up' },
        creditMin:10, creditMax:40,
        skills: [
            { name:'Arqueologia', min:50, max:80 },
            { name:'Biblioteca', min:35, max:60 },
            { name:'História', min:40, max:65 },
            { name:'Língua Estrangeira (qualquer)', min:25, max:50 },
            { name:'Antropologia', min:20, max:45 },
            { name:'Detectar Sinais', min:20, max:45 },
            { name:'Escalar', min:15, max:35 },
            { name:'Fotografia', min:15, max:40 }
        ]
    },
    'Enfermeiro': {
        attributeBias: { INT:'up', EDU:'up', CON:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Primeiros Socorros', min:50, max:80 },
            { name:'Medicina', min:25, max:50 },
            { name:'Ciência (Biologia)', min:20, max:45 },
            { name:'Psicologia', min:20, max:45 },
            { name:'Escutar', min:20, max:45 },
            { name:'Persuasão', min:15, max:35 },
            { name:'Língua Própria', min:20, max:40 },
            { name:'Detectar Sinais', min:15, max:35 }
        ]
    },
    'Marinheiro': {
        attributeBias: { CON:'up', FOR:'up', DES:'up' },
        creditMin:9, creditMax:30,
        skills: [
            { name:'Pilotar (Barco)', min:40, max:70 },
            { name:'Navegação', min:30, max:60 },
            { name:'Nadar', min:30, max:60 },
            { name:'Mecânica', min:20, max:50 },
            { name:'Briga', min:25, max:50 },
            { name:'Escalar', min:20, max:45 },
            { name:'Sobrevivência', min:15, max:40 },
            
