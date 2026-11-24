export const DOCTOR_PROFILE = {
  name: 'Dr. Roberto Cisneros De Ajuria',
  role: 'Director de CLINCOB · Cirujano Bariátrico Titular',
  tagline:
    'Quien lidera personalmente tu valoración, tu cirugía en Hospital Ángeles Villahermosa y tu seguimiento postoperatorio.',
  image: '/assets/dr-consultorio.jpg',
  scrubImage: '/assets/dr-quirofano.jpg',
  orImage: '/assets/dr-laparoscopia.jpg',
  cvUrl: '/assets/dr-cisneros-cv.pdf',
  credentials: [
    {
      title: 'Cirujano Certificado',
      detail: 'Consejo Mexicano de Cirugía General · Cirujano Credencializado en Hospital Ángeles Villahermosa.',
    },
    {
      title: 'Membresía Internacional (IFSO)',
      detail: 'Miembro de la Federación Internacional de Cirugía de Obesidad y Enfermedades Metabólicas y del Colegio Mexicano de Cirugía de Obesidad.',
    },
    {
      title: 'Formación de Alta Especialidad',
      detail: 'Médico Cirujano (UAG) con rotación en el Instituto Nacional de Ciencias Médicas y Nutrición Salvador Zubirán (INCMNSZ) y capacitación en Bypass Gástrico (Brasil).',
    },
    {
      title: 'Liderazgo Académico y Clínico',
      detail: 'Ex Jefe de Enseñanza e Investigación y Profesor Adjunto de Cirugía General en el Hospital de Alta Especialidad Dr. Gustavo A. Rovirosa Pérez.',
    },
  ],
};

export const ITINERARY_DAYS = [
  {
    id: 'dia-1',
    dayLabel: 'Día 1 · Llegada',
    title: 'Recepción y Hospedaje en Hotel Staybridge Suites',
    summary:
      'Llegas a Villahermosa (en avión o vehículo propio, solo o con tu acompañante). Tu habitación queda coordinada cerca de Hospital Ángeles para tu descanso previo.',
    rows: [
      {
        fecha: 'Día 1',
        hora: 'Check-in',
        lugar: 'Hotel Staybridge Suites',
        actividad: 'Hospedaje coordinado para paciente y acompañante (habitación lista a su nombre).',
        highlight: true,
      },
    ],
  },
  {
    id: 'dia-2',
    dayLabel: 'Día 2 · Cirugía',
    title: 'Valoración Integral, Internamiento y Cirugía',
    summary:
      'Por la mañana el Dr. Roberto Cisneros revisa tus estudios y medidas en el Consultorio 540. Por la tarde ingresas a Hospital Ángeles Villahermosa para tu cirugía.',
    rows: [
      {
        fecha: 'Día 2',
        hora: '11:00 a.m.',
        lugar: 'Consultorio 540',
        actividad: 'Revisión de estudios preoperatorios con el Dr. Cisneros.',
        highlight: true,
      },
      {
        fecha: 'Día 2',
        hora: '12:00 hrs.',
        lugar: 'Consultorio 540',
        actividad: 'Registro de peso, talla y valoración final.',
        highlight: false,
      },
      {
        fecha: 'Día 2',
        hora: '17:00 hrs.',
        lugar: 'Hospital Ángeles',
        actividad: 'Internamiento en habitación estándar (24 horas incluidas).',
        highlight: false,
      },
      {
        fecha: 'Día 2',
        hora: '20:00 hrs.',
        lugar: 'Hospital Ángeles',
        actividad: 'Cirugía bariátrica con torre laparoscópica avanzada y equipo completo.',
        highlight: true,
      },
    ],
  },
  {
    id: 'dia-5',
    dayLabel: 'Día 5 · Alta Segura',
    title: 'Retiro de Drenaje y Regreso a tu Ciudad',
    summary:
      'Tras tu recuperación inicial supervisada en Villahermosa, acudes al Consultorio 540 para retiro de drenaje y autorización médica de regreso a casa.',
    rows: [
      {
        fecha: 'Día 5',
        hora: '13:00 hrs.',
        lugar: 'Consultorio 540',
        actividad: 'Revisión clínica y retiro de drenaje por el equipo quirúrgico.',
        highlight: true,
      },
      {
        fecha: 'Día 5',
        hora: 'Tarde',
        lugar: 'Traslado',
        actividad: 'Regreso seguro a tu destino de origen con plan de alimentación e indicaciones.',
        highlight: false,
      },
    ],
  },
  {
    id: 'dia-15',
    dayLabel: 'Día 15+ · Seguimiento',
    title: 'Retiro de Puntos y 3 Meses de Acompañamiento',
    summary:
      'A los 12–15 días se realiza el retiro de puntos y continuamos contigo durante 3 meses con consultas de Nutrición, Psicología Bariátrica y Cirugía.',
    rows: [
      {
        fecha: 'Día 15',
        hora: '14:00 hrs.',
        lugar: 'Consultorio 540',
        actividad: 'Retiro de puntos y control postoperatorio.',
        highlight: true,
      },
      {
        fecha: 'Mes 1 a 3',
        hora: 'Programado',
        lugar: 'Presencial / Remoto',
        actividad: 'Seguimiento multidisciplinario: 3 consultas de Nutrición, 2 de Psicología y 3 de Cirugía.',
        highlight: false,
      },
    ],
  },
];

export const PROCEDURES = [
  {
    name: 'Manga Gástrica',
    subtitle: 'Procedimiento restrictivo laparoscópico',
    image: '/assets/proc-manga.png',
    description:
      'Reduce la capacidad del estómago mediante laparoscopía mínimamente invasiva, favoreciendo saciedad temprana y pérdida de peso sostenida.',
    bullets: [
      'Cirugía laparoscópica con energía ultrasónica',
      '24 horas de hospitalización en Hospital Ángeles',
      'Seguimiento nutricional y psicológico por 3 meses',
    ],
  },
  {
    name: 'Bypass Gástrico',
    subtitle: 'Estándar de oro en cirugía metabólica',
    image: '/assets/proc-bypass.png',
    description:
      'Ideal para pacientes con obesidad severa o diabetes tipo II controlada, combinando restricción y mejoría metabólica integral.',
    bullets: [
      'Capacitación internacional del Dr. Cisneros',
      'Control efectivo de comorbilidades metabólicas',
      'Equipo completo: cirujano, anestesiólogo y ayudantes',
    ],
  },
  {
    name: 'Balón Gástrico',
    subtitle: 'Alternativa endoscópica sin cirugía',
    image: '/assets/proc-balon.jpg',
    description:
      'Colocación certificada de balón intragástrico para pacientes que buscan apoyo temporal supervisado acompañado de reeducación alimentaria.',
    bullets: [
      'Procedimiento ambulatorio mínimamente invasivo',
      'Certificación oficial Allergan / BIB System',
      'Plan integral con nutriólogas bariátricas',
    ],
  },
];

export const CLINC_VIDEOS = [
  {
    id: 'quirofano',
    title: 'Quirófano CLINCOB · Hospital Ángeles',
    subtitle: 'Instalaciones reales y protocolo quirúrgico',
    embedUrl: 'https://player.vimeo.com/video/431014557',
  },
  {
    id: 'sobrepeso',
    title: 'Sobrepeso, Obesidad y Superobesidad',
    subtitle: 'Orientación médica con el equipo CLINCOB',
    embedUrl: 'https://player.vimeo.com/video/431014647',
  },
  {
    id: 'balon',
    title: 'Balón Gástrico CLINCOB',
    subtitle: 'Alternativa endoscópica sin cirugía',
    embedUrl: 'https://player.vimeo.com/video/431014262',
  },
  {
    id: 'infantil',
    title: 'Obesidad Infantil y Prevención',
    subtitle: 'Enfoque multidisciplinario familiar',
    embedUrl: 'https://player.vimeo.com/video/431014386',
  },
];

export const PROTOCOL_STAGES = [
  {
    stage: 'Etapa 1 · Preoperatoria',
    title: 'Preparación Antes de Viajar',
    items: [
      'Evaluación médica remota de requisitos (edad 18 a 65 años, IMC y comorbilidades).',
      'Envío de estudios previos y dieta preoperatoria de 10 días antes de tu cirugía.',
      'Confirmación de tu ficha de itinerario personalizada con fechas, hotel y horarios.',
    ],
  },
  {
    stage: 'Etapa 2 · Día de Cirugía',
    title: 'Infraestructura Hospital Ángeles',
    items: [
      'Equipo completo: Cirujano Titular (Dr. Cisneros), 1–2 Anestesiólogos (según IMC), Ayudantes, Instrumentista y Circulante.',
      'Torre de laparoscopía de alta definición, engrapadora, cartuchos y energía ultrasónica Sonicision.',
      'Habitación estándar por 24 horas y medicamento hospitalario incluido.',
    ],
  },
  {
    stage: 'Etapa 3 · Postoperatoria',
    title: 'Seguimiento por 3 Meses',
    items: [
      'Cirugía Bariátrica: retiro de puntos (12–15 días), consulta al mes y a los 3 meses.',
      'Nutrición Bariátrica: consultas a los 15 días, al mes y a los 3 meses.',
      'Psicología Bariátrica: acompañamiento al mes y a los 3 meses de tu operación.',
    ],
  },
];

export const TEAM_MEMBERS = [
  {
    role: 'Nutrición Bariátrica',
    name: 'Lic. Gabriela Fernández Rivero',
    image: '/assets/team-1.png',
    bio: 'Licenciada en Nutrición (UAG), Maestrante en Nutrición Clínica (UVM), Diplomado en Nutrición Bariátrica y experiencia en el INCMNSZ.',
  },
  {
    role: 'Nutrición Bariátrica',
    name: 'Lic. Itzel Salcedo Grajales',
    image: '/assets/team-2.png',
    bio: 'Licenciada en Nutrición (UAG), Antropometrista ISAK Nivel I, Certificación NIH y servicio social en Dirección de Nutrición del INCMNSZ.',
  },
  {
    role: 'Psicología Bariátrica',
    name: 'Lic. Blanca Estela Pérez Fernández',
    image: '/assets/team-3.png',
    bio: 'Psicóloga Clínica (UVM), Diplomados en Psicología Bariátrica y de la Obesidad, Miembro activo del Colegio Mexicano de Cirugía Bariátrica.',
  },
];

export const FAQS = [
  {
    q: '¿Puedo viajar acompañado de un familiar?',
    a: 'Sí. De hecho, en nuestro itinerario de Turismo Médico coordinamos tu hospedaje en Hotel Staybridge Suites contemplando a tu acompañante (la habitación puede quedar a su nombre) para que estés respaldado desde tu llegada hasta tu regreso.',
  },
  {
    q: '¿Cuántos días necesito permanecer en Villahermosa?',
    a: 'El esquema habitual para pacientes foráneos contempla llegar un día antes de la cirugía para hospedaje, realizar valoración y cirugía al día siguiente (con 24h de internamiento en Hospital Ángeles) y acudir al Consultorio 540 al 5to día para retiro de drenaje antes de regresar a tu ciudad.',
  },
  {
    q: '¿Quién realiza personalmente la valoración y la cirugía?',
    a: 'Todo el proceso quirúrgico es dirigido e impartido personalmente por el Dr. Roberto Cisneros De Ajuria, Director de CLINCOB y Cirujano Certificado credencializado en Hospital Ángeles Villahermosa.',
  },
  {
    q: '¿Qué requisitos médicos debo cumplir para ser candidato?',
    a: 'Tener entre 18 y 65 años, obesidad grado II con enfermedad agregada (prediabetes, diabetes tipo II controlada, hipertensión controlada, dislipidemia o apnea del sueño) u obesidad grado III. Durante tu consulta de valoración el Dr. Cisneros confirma tu candidatura.',
  },
];

export const ORIGIN_CITIES = [
  {
    id: 'coatzacoalcos',
    label: 'Coatzacoalcos / Veracruz',
    travelMode: 'Traslado terrestre (~2 hrs en auto propio)',
    stayNights: '4 noches en Staybridge Suites (habitación para ti y tu acompañante)',
    returnNote: 'Regreso al Día 5 tras retiro de drenaje en Consultorio 540.',
  },
  {
    id: 'cdmx',
    label: 'CDMX / Centro',
    travelMode: 'Vuelo directo a Villahermosa (~1h 20m)',
    stayNights: '4 noches en Staybridge Suites a minutos de Hospital Ángeles',
    returnNote: 'Alta quirúrgica supervisada antes de tu vuelo de regreso.',
  },
  {
    id: 'sureste',
    label: 'Mérida / Cancún / Chiapas',
    travelMode: 'Vuelo corto o carretera hacia Villahermosa',
    stayNights: '4 noches en Staybridge Suites con opción de acompañante',
    returnNote: 'Seguimiento remoto de Nutrición y Psicología por 3 meses.',
  },
  {
    id: 'extranjero',
    label: 'Monterrey / EE.UU. / Otro',
    travelMode: 'Conexión aérea al Aeropuerto de Villahermosa (VSA)',
    stayNights: 'Estancia coordinada en Staybridge Suites + 24h en Hospital Ángeles',
    returnNote: 'Coordinación completa de estudios previos antes de viajar.',
  },
];

export const CONTACT_INFO = {
  clinic: 'CLINCOB — Clínica Contra la Obesidad',
  address:
    'Torre de Especialidades del Hospital Ángeles Villahermosa, Piso 5, Consultorio 540. Av. Paseo Usumacinta 2085, Col. Tabasco 2000 / Atasta de Serra, C.P. 86035, Villahermosa, Tab., México.',
  phoneDisplay: '(993) 310 0430',
  phoneHref: 'tel:+529933100430',
  emails: ['citas@clincob.com.mx', 'info@clincob.com.mx'],
  hours: 'Lunes a Sábado: 9:00–14:00 y 17:00–19:00 | Domingos: 9:00–14:00',
};
