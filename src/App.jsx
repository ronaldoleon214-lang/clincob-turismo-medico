import { useState } from 'react';
import {
  Award,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  HeartPulse,
  Hotel,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  X,
} from 'lucide-react';
import {
  CLINC_VIDEOS,
  CONTACT_INFO,
  DOCTOR_PROFILE,
  FAQS,
  ITINERARY_DAYS,
  ORIGIN_CITIES,
  PROCEDURES,
  PROTOCOL_STAGES,
} from './data/clincobData';

const CONDITIONS_LIST = [
  'Diabetes tipo II',
  'Hipertensión',
  'Apnea del sueño',
  'Dolor articular',
  'Colesterol / Triglicéridos',
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState(ITINERARY_DAYS[1].id);
  const [selectedProcIdx, setSelectedProcIdx] = useState(0);
  const [selectedVideoId, setSelectedVideoId] = useState(CLINC_VIDEOS[0].id);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Interactive BMI & Candidacy state
  const [weightKg, setWeightKg] = useState(108);
  const [heightCm, setHeightCm] = useState(165);
  const [selectedConditions, setSelectedConditions] = useState(['Hipertensión']);

  // Interactive Trip Simulator state
  const [selectedCityId, setSelectedCityId] = useState(ORIGIN_CITIES[0].id);
  const [withCompanion, setWithCompanion] = useState(true);

  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    telefono: '',
    procedimiento: 'Manga Gástrica',
    acompanante: 'Sí, viajo con un acompañante',
    notas: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const activeDay = ITINERARY_DAYS.find((d) => d.id === selectedDayId) || ITINERARY_DAYS[0];
  const activeCity = ORIGIN_CITIES.find((c) => c.id === selectedCityId) || ORIGIN_CITIES[0];

  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  const hasComorbidity = selectedConditions.length > 0;

  let bmiStatus = 'Peso normal / sobrepeso';
  let suggestedProc = 'Balón Gástrico';
  let candidacyMsg = 'Valoración personalizada recomendada con el Dr. Cisneros.';

  if (bmi >= 40) {
    bmiStatus = 'Obesidad Grado III · Candidato Directo';
    suggestedProc = hasComorbidity ? 'Bypass Gástrico' : 'Manga Gástrica';
    candidacyMsg = 'Cumples criterio clínico directo para cirugía bariátrica.';
  } else if (bmi >= 35) {
    bmiStatus = hasComorbidity ? 'Obesidad Grado II · Candidato' : 'Obesidad Grado II';
    suggestedProc = 'Manga Gástrica';
    candidacyMsg = hasComorbidity
      ? 'Candidato ideal al programa quirúrgico por comorbilidad asociada.'
      : 'El Dr. Cisneros evaluará tu historial metabólico para definir cirugía o balón.';
  } else if (bmi >= 30) {
    bmiStatus = 'Obesidad Grado I';
    suggestedProc = 'Balón Gástrico';
    candidacyMsg = 'Excelente perfil para Balón Intragástrico y plan nutricional.';
  }

  const toggleCondition = (cond) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const handleApplyCalculator = () => {
    setFormData((prev) => ({
      ...prev,
      ciudad: activeCity.label,
      procedimiento: suggestedProc,
      acompanante: withCompanion ? 'Sí, viajo con un acompañante' : 'Viajo solo(a)',
      notas: `Peso: ${weightKg} kg | Estatura: ${heightCm} cm | IMC: ${bmi}${
        selectedConditions.length ? ` | Condiciones: ${selectedConditions.join(', ')}` : ''
      }`,
    }));
    const el = document.getElementById('agendar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProcedure = (procName) => {
    setFormData((prev) => ({ ...prev, procedimiento: procName }));
    const el = document.getElementById('agendar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const mailtoSubject = encodeURIComponent(
    `Solicitud Turismo Médico CLINCOB - ${formData.procedimiento} (${formData.ciudad || 'Foráneo'})`
  );
  const mailtoBody = encodeURIComponent(
    `Hola Dr. Roberto Cisneros / Equipo CLINCOB,\n\nSolicito información para Turismo Médico:\n- Nombre: ${formData.nombre}\n- Ciudad de origen: ${formData.ciudad}\n- Teléfono / WhatsApp: ${formData.telefono}\n- Procedimiento de interés: ${formData.procedimiento}\n- Acompañante: ${formData.acompanante}\n- Notas: ${formData.notas || 'N/A'}\n`
  );

  return (
    <div>
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" className="brand-wrap">
            <img src="/assets/clincob-logo-v2.png" alt="CLINCOB Logo" className="brand-logo" />
            <span className="brand-divider" />
            <span className="brand-tag">Turismo Médico</span>
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            <a href="#doctor">Dr. Cisneros</a>
            <a href="#itinerario">Itinerario</a>
            <a href="#procedimientos">Procedimientos</a>
            <a href="#protocolo">Protocolo</a>
            <a href="#preguntas">Preguntas</a>
          </nav>

          <div className="header-actions">
            <a href={CONTACT_INFO.phoneHref} className="btn btn-secondary" aria-label="Llamar a CLINCOB al (993) 310 0430">
              <Phone size={15} />
              Contactar
            </a>
            <a href="#agendar" className="btn btn-primary">
              Agendar Valoración
            </a>
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a href="#doctor" onClick={() => setMobileMenuOpen(false)}>
              Dr. Roberto Cisneros
            </a>
            <a href="#itinerario" onClick={() => setMobileMenuOpen(false)}>
              Itinerario de Viaje
            </a>
            <a href="#procedimientos" onClick={() => setMobileMenuOpen(false)}>
              Procedimientos
            </a>
            <a href="#protocolo" onClick={() => setMobileMenuOpen(false)}>
              Protocolo Clínico
            </a>
            <a href="#agendar" onClick={() => setMobileMenuOpen(false)}>
              Agendar Valoración
            </a>
          </div>
        )}
      </header>

      {/* EDITORIAL DARK HERO */}
      <section id="inicio" className="hero-editorial">
        <img
          src="/assets/dr-laparoscopia.jpg"
          alt=""
          aria-hidden="true"
          className="hero-ambient-bg"
        />
        <div className="container hero-split">
          <div>
            <div className="hero-kicker">
              Cirugía Bariátrica Segura · Turismo Médico Villahermosa
            </div>
            <h1 className="hero-title">
              Recupera tu salud en <em>manos certificadas</em>, con todo tu viaje resuelto.
            </h1>

            <ul className="hero-checklist">
              <li>
                <CheckCircle2 size={18} color="#2dd4bf" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Cirujano Certificado</strong> por el Consejo Mexicano de Cirugía General y miembro <strong>IFSO</strong>
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} color="#2dd4bf" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Hospédate en hoteles de prestigio 5 estrellas</strong> con comodidad para ti y tu acompañante
                </span>
              </li>
              <li>
                <CheckCircle2 size={18} color="#2dd4bf" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Acompañamiento médico directo</strong> del Dr. Roberto Cisneros antes, durante y después de tu cirugía
                </span>
              </li>
            </ul>

            <div className="hero-ctas">
              <a href="#evaluacion" className="btn btn-champagne">
                <CalendarCheck size={17} />
                Calcular mi IMC y Simular Viaje
              </a>
              <a href="#agendar" className="btn btn-ghost-light">
                Agendar Valoración Gratuita
              </a>
            </div>

            <div className="hero-metrics">
              <div className="hero-metric">
                <strong>+300</strong>
                <span>Casos de éxito comprobados</span>
              </div>
              <div className="hero-metric">
                <strong>100%</strong>
                <span>Protocolo laparoscópico seguro</span>
              </div>
              <div className="hero-metric">
                <strong>3 Meses</strong>
                <span>Seguimiento postoperatorio</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-frame">
            <div className="hero-main-photo-wrap">
              <img
                src={DOCTOR_PROFILE.image}
                alt={DOCTOR_PROFILE.name}
                className="hero-main-photo"
              />
              <div className="hero-main-photo-grad" />
            </div>
            <div className="hero-doc-caption">
              <div>
                <small>Certificación Vigente · Cirujano Titular</small>
                <h2>{DOCTOR_PROFILE.name}</h2>
                <p>Director Médico CLINCOB · Más de 20 años de trayectoria quirúrgica</p>
              </div>
              <a
                href="#doctor"
                className="btn btn-primary"
                style={{ padding: '10px 16px', fontSize: '0.82rem' }}
              >
                Trayectoria
              </a>
            </div>
          </div>
        </div>

        <div className="concierge-strip">
          <div className="container concierge-strip-grid">
            <div className="concierge-item">
              <span className="concierge-num">01</span>
              <span>Hospedaje en hoteles 5 estrellas</span>
            </div>
            <div className="concierge-item">
              <span className="concierge-num">02</span>
              <span>Valoración y cirugía certificada</span>
            </div>
            <div className="concierge-item">
              <span className="concierge-num">03</span>
              <span>Recuperación supervisada y alta segura</span>
            </div>
            <div className="concierge-item">
              <span className="concierge-num">04</span>
              <span>Seguimiento nutricional y médico 3 meses</span>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR SPOTLIGHT */}
      <section id="doctor" className="section">
        <div className="container doctor-grid">
          <div className="doctor-portrait-box">
            <div className="doctor-seal">
              <Award size={16} />
              <span>Miembro IFSO · Hospital Ángeles</span>
            </div>
            <img src={DOCTOR_PROFILE.scrubImage} alt={DOCTOR_PROFILE.name} />
            <div className="doctor-portrait-overlay" />
            <div className="doctor-portrait-footer">
              <div>
                <small>Sede Quirúrgica</small>
                <strong>Hospital Ángeles Piso 5 · 540</strong>
              </div>
              <div>
                <small>Formación</small>
                <strong>UAG · INCMNSZ · Brasil</strong>
              </div>
            </div>
          </div>

          <div>
            <span className="section-eyebrow">Liderazgo Médico Directo</span>
            <h2 className="section-title">
              Atendido de principio a fin por el {DOCTOR_PROFILE.name}
            </h2>
            <p className="section-desc">
              {DOCTOR_PROFILE.tagline}
            </p>

            <blockquote className="doctor-quote">
              “Acompaño personalmente a cada paciente que viaja a Villahermosa: desde su primera
              revisión en el Consultorio 540 hasta su regreso seguro a casa.”
            </blockquote>

            <div className="doctor-badges-row">
              <span className="doc-auth-badge">
                <ShieldCheck size={16} color="#0d9488" />
                Consejo Mexicano de Cirugía General
              </span>
              <span className="doc-auth-badge">
                <Award size={16} color="#0d9488" />
                Miembro Internacional IFSO
              </span>
            </div>

            <div className="credentials-list">
              {DOCTOR_PROFILE.credentials.slice(0, 3).map((cred, idx) => {
                const icons = [ShieldCheck, Award, Building2];
                const CredIcon = icons[idx] || Stethoscope;
                return (
                  <div key={cred.title} className="credential-row">
                    <div className="credential-icon">
                      <CredIcon size={18} />
                    </div>
                    <div>
                      <h4>{cred.title}</h4>
                      <p>{cred.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href="#agendar" className="btn btn-primary">
                <UserCheck size={17} />
                Agendar Consulta con el Dr. Cisneros
              </a>
              <a
                href={DOCTOR_PROFILE.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <FileText size={17} />
                Descargar C.V. Completo (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA VISUAL + SIMULADOR INTERACTIVO */}
      <section id="itinerario" className="section section-ivory">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Experiencia Turismo Médico CLINCOB</span>
            <h2 className="section-title">Así se Vive tu Cirugía en Villahermosa</h2>
            <p className="section-desc">
              No vienes a improvisar: llegas a una suite cómoda con tu acompañante, te operas en
              Hospital Ángeles y regresas a casa con seguimiento completo.
            </p>
          </div>

          {/* 3-Photo Experience Gallery */}
          <div className="experience-grid">
            <article className="exp-photo-card">
              <span className="exp-step-pill">01 · Hospedaje</span>
              <img src="/assets/hotel-suite.jpg" alt="Hospedaje en hotel de prestigio 5 estrellas" />
              <div className="exp-photo-grad" />
              <div className="exp-photo-content">
                <small>Hoteles de Prestigio 5 Estrellas</small>
                <h3>Suite para Ti y tu Acompañante</h3>
                <p>Hospédate en hoteles de prestigio a minutos del hospital desde tu llegada.</p>
              </div>
            </article>

            <article className="exp-photo-card">
              <span className="exp-step-pill">02 · Hospital</span>
              <img src="/assets/hospital-suite.jpg" alt="Habitación privada Hospital Ángeles" />
              <div className="exp-photo-grad" />
              <div className="exp-photo-content">
                <small>Internamiento 24 Horas</small>
                <h3>Hospital Ángeles Villahermosa</h3>
                <p>Habitación estándar incluida, enfermería y medicamentos.</p>
              </div>
            </article>

            <article className="exp-photo-card">
              <span className="exp-step-pill">03 · Quirófano</span>
              <img
                src="/assets/dr-laparoscopia.jpg"
                alt="Quirófano Laparoscópico CLINCOB"
                style={{ objectPosition: '28% center', filter: 'contrast(1.06) brightness(1.02)' }}
              />
              <div className="exp-photo-grad" />
              <div className="exp-photo-content">
                <small>Tecnología Quirúrgica</small>
                <h3>Torre Laparoscópica Avanzada</h3>
                <p>Cirugía guiada por el Dr. Cisneros con equipo completo.</p>
              </div>
            </article>
          </div>

          {/* Interactive BMI Calculator + Trip Simulator */}
          <div id="evaluacion" className="interactive-lab" style={{ marginBottom: '34px' }}>
            {/* BMI Calculator */}
            <div className="lab-card">
              <div>
                <span className="section-eyebrow" style={{ marginBottom: '4px' }}>
                  Pre-Evaluación en 15 Segundos
                </span>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem' }}>
                  ¿Eres candidato? Calcula tu IMC
                </h3>
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <span>Peso actual</span>
                  <span className="slider-val">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="200"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="range-input"
                />
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <span>Estatura</span>
                  <span className="slider-val">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="140"
                  max="200"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="range-input"
                />
              </div>

              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px' }}>
                  ¿Presentas alguna condición asociada?
                </div>
                <div className="condition-pills">
                  {CONDITIONS_LIST.map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      className={`cond-pill ${selectedConditions.includes(cond) ? 'selected' : ''}`}
                      onClick={() => toggleCondition(cond)}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bmi-result-box">
                <div>
                  <span className="bmi-tag">{bmiStatus}</span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-900)' }}>
                    Sugerencia: {suggestedProc}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                    {candidacyMsg}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="bmi-score">{bmi}</div>
                  <small style={{ fontSize: '0.72rem', color: 'var(--slate-500)', fontWeight: 700 }}>
                    IMC kg/m²
                  </small>
                </div>
              </div>

              <div className="bmi-gauge-wrap">
                <div className="bmi-gauge-bar">
                  <div
                    className="bmi-gauge-marker"
                    style={{ left: `${Math.min(96, Math.max(4, ((bmi - 20) / 30) * 100))}%` }}
                  />
                </div>
                <div className="bmi-gauge-labels">
                  <span>20</span>
                  <span>25 Normal</span>
                  <span>30 Grado I</span>
                  <span>35 Grado II</span>
                  <span>40+ Grado III</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={handleApplyCalculator}
              >
                <CalendarCheck size={17} />
                Enviar mi IMC ({bmi}) al Dr. Cisneros
              </button>
            </div>

            {/* Trip Simulator */}
            <div className="lab-card dark">
              <div>
                <span className="section-eyebrow" style={{ color: 'var(--champagne)', marginBottom: '4px' }}>
                  Simulador de Viaje Médico
                </span>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem' }}>
                  Arma tu Estancia en Villahermosa
                </h3>
              </div>

              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
                  1. ¿Desde dónde nos visitas?
                </div>
                <div className="city-selector">
                  {ORIGIN_CITIES.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      className={`city-btn ${selectedCityId === city.id ? 'active' : ''}`}
                      onClick={() => setSelectedCityId(city.id)}
                    >
                      {city.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
                  2. ¿Viajas acompañado(a)?
                </div>
                <div className="city-selector">
                  <button
                    type="button"
                    className={`city-btn ${withCompanion ? 'active' : ''}`}
                    onClick={() => setWithCompanion(true)}
                  >
                    Con acompañante (habitación compartida)
                  </button>
                  <button
                    type="button"
                    className={`city-btn ${!withCompanion ? 'active' : ''}`}
                    onClick={() => setWithCompanion(false)}
                  >
                    Viajo solo(a)
                  </button>
                </div>
              </div>

              <div className="nights-strip">
                <div className="night-pill">
                  <small>Noche 1</small>
                  <span>Hotel 5 Estrellas</span>
                </div>
                <div className="night-pill">
                  <small>Noche 2</small>
                  <span>Hospital Ángeles</span>
                </div>
                <div className="night-pill">
                  <small>Noches 3–4</small>
                  <span>Recuperación Hotel</span>
                </div>
                <div className="night-pill">
                  <small>Día 5</small>
                  <span>Retiro drenaje y regreso</span>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.86rem',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--teal-400)' }}>Traslado:</strong>{' '}
                  {activeCity.travelMode}
                </div>
                <div>
                  <strong style={{ color: 'var(--teal-400)' }}>Hospedaje:</strong>{' '}
                  {withCompanion
                    ? activeCity.stayNights
                    : '4 noches en hotel de prestigio 5 estrellas (habitación individual)'}
                </div>
                <div>
                  <strong style={{ color: 'var(--teal-400)' }}>Alta y Regreso:</strong>{' '}
                  {activeCity.returnNote}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-champagne"
                style={{ width: '100%' }}
                onClick={handleApplyCalculator}
              >
                Reservar Fechas desde {activeCity.label}
              </button>
            </div>
          </div>

          <div className="journey-tabs">
            {ITINERARY_DAYS.map((day, idx) => {
              const isActive = day.id === selectedDayId;
              const icons = [Hotel, Stethoscope, ShieldCheck, CalendarCheck];
              const StepIcon = icons[idx] || Hotel;
              const shortTitles = [
                'Llegada y Hotel',
                'Estudios y Cirugía',
                'Alta y Regreso',
                'Puntos y Seguimiento',
              ];
              return (
                <button
                  key={day.id}
                  type="button"
                  className={`journey-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedDayId(day.id)}
                >
                  <span className="journey-tab-icon">
                    <StepIcon size={18} />
                  </span>
                  <div>
                    <small>{day.dayLabel}</small>
                    <strong>{shortTitles[idx] || day.title}</strong>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="travel-pass">
            <div>
              <span className="travel-pass-label">
                Detalle de etapa seleccionada · {activeDay.dayLabel}
              </span>
              <h3>{activeDay.title}</h3>
              <p>
                Torre de Especialidades Hospital Ángeles Piso 5, Consultorio 540 · Paseo Usumacinta
                2085, Col. Tabasco 2000. Hospedaje coordinado en hoteles de prestigio 5 estrellas
                (incluye opción para acompañante).
              </p>
            </div>

            <div className="travel-pass-stops">
              {activeDay.rows.map((row, idx) => (
                <div key={`${row.fecha}-${idx}`} className="pass-stop">
                  <strong>{row.hora}</strong>
                  <span>
                    <b>{row.lugar}:</b> {row.actividad}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <a href="#agendar" className="btn btn-champagne">
                <CalendarCheck size={17} />
                Solicitar Mi Ficha
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDIMIENTOS (INTERACTIVE EXPLORER) */}
      <section id="procedimientos" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Opciones Quirúrgicas y Endoscópicas</span>
            <h2 className="section-title">Procedimientos Bariátricos de Alta Precisión</h2>
            <p className="section-desc">
              El Dr. Roberto Cisneros evalúa tu caso clínico para recomendarte el procedimiento más
              seguro y efectivo para tu salud metabólica.
            </p>
          </div>

          {(() => {
            const activeProc = PROCEDURES[selectedProcIdx] || PROCEDURES[0];
            const procMeta = [
              { stay: '5 días en Villahermosa', mode: 'Laparoscopía 24h Hospital', follow: '3 meses incluidos' },
              { stay: '5 días en Villahermosa', mode: 'Cirugía Metabólica', follow: '3 meses incluidos' },
              { stay: 'Estancia corta', mode: 'Endoscopia Ambulatoria', follow: 'Plan nutricional integral' },
            ][selectedProcIdx];

            return (
              <div className="proc-explorer">
                <div className="proc-selector-list">
                  {PROCEDURES.map((proc, index) => (
                    <button
                      key={proc.name}
                      type="button"
                      className={`proc-tab-btn ${selectedProcIdx === index ? 'active' : ''}`}
                      onClick={() => setSelectedProcIdx(index)}
                    >
                      <div>
                        <small>{proc.subtitle}</small>
                        <h3>{proc.name}</h3>
                      </div>
                      <HeartPulse
                        size={22}
                        color={selectedProcIdx === index ? '#e6d5b8' : '#0f766e'}
                      />
                    </button>
                  ))}
                </div>

                <div className="proc-detail-panel">
                  <div className="proc-detail-top">
                    <div>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--champagne)',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        {activeProc.subtitle}
                      </span>
                      <h3>{activeProc.name}</h3>
                      <p>{activeProc.description}</p>
                    </div>
                    <img
                      src={activeProc.image}
                      alt={activeProc.name}
                      className="proc-visual-img"
                    />
                  </div>

                  <div className="proc-metrics-strip">
                    <div>
                      <small>Estancia sugerida</small>
                      <strong>{procMeta.stay}</strong>
                    </div>
                    <div>
                      <small>Modalidad</small>
                      <strong>{procMeta.mode}</strong>
                    </div>
                    <div>
                      <small>Seguimiento</small>
                      <strong>{procMeta.follow}</strong>
                    </div>
                  </div>

                  <ul className="proc-list">
                    {activeProc.bullets.map((b) => (
                      <li key={b}>
                        <CheckCircle2 size={17} color="#2dd4bf" style={{ flexShrink: 0 }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <button
                      type="button"
                      className="btn btn-champagne"
                      onClick={() => handleSelectProcedure(activeProc.name)}
                    >
                      <CalendarCheck size={17} />
                      Solicitar Valoración para {activeProc.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* RECORRIDO EN VIDEO (MATERIAL ORIGINAL CLINCOB) */}
      <section className="section section-ivory">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Conoce Nuestras Instalaciones</span>
            <h2 className="section-title">Recorrido Virtual y Videos CLINCOB</h2>
            <p className="section-desc">
              Acompáñanos a conocer las instalaciones de Hospital Ángeles Villahermosa y el
              enfoque de nuestro equipo multidisciplinario antes de tu viaje.
            </p>
          </div>

          {(() => {
            const activeVideo =
              CLINC_VIDEOS.find((v) => v.id === selectedVideoId) || CLINC_VIDEOS[0];
            return (
              <div className="video-layout">
                <div className="video-frame-box">
                  <iframe
                    src={activeVideo.embedUrl}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="video-list">
                  {CLINC_VIDEOS.map((vid) => (
                    <button
                      key={vid.id}
                      type="button"
                      className={`video-item-btn ${vid.id === selectedVideoId ? 'active' : ''}`}
                      onClick={() => setSelectedVideoId(vid.id)}
                    >
                      <strong>{vid.title}</strong>
                      <span>{vid.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* PROTOCOLO + EQUIPO MULTIDISCIPLINARIO */}
      <section id="protocolo" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Protocolo CLINCOB</span>
            <h2 className="section-title">Seguridad Clínica en 3 Etapas</h2>
            <p className="section-desc">
              No solo operamos: te acompañamos antes de viajar, durante tu estancia en Hospital
              Ángeles y en los 3 meses posteriores junto a nuestro equipo multidisciplinario.
            </p>
          </div>

          <div className="protocol-grid">
            {PROTOCOL_STAGES.map((stage, idx) => (
              <div key={stage.stage} className="protocol-card">
                <div className="protocol-num">0{idx + 1}</div>
                <span className="stage-num">{stage.stage}</span>
                <h3>{stage.title}</h3>
                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2
                        size={16}
                        color="#2dd4bf"
                        style={{ flexShrink: 0, marginTop: '3px' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + FORMULARIO DE VALORACION */}
      <section id="preguntas" className="section section-ivory">
        <div className="container booking-grid">
          <div>
            <span className="section-eyebrow">Preguntas Frecuentes</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Resolvemos tus dudas sobre viajar para operarte
            </h2>
            <p className="section-desc" style={{ marginBottom: '24px' }}>
              Si vienes de Coatzacoalcos, Veracruz, Campeche, Chiapas, CDMX o cualquier otro estado
              o país, nuestro equipo coordina cada detalle contigo.
            </p>

            <div className="faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={faq.q} className="faq-item">
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    {isOpen && <div className="faq-content">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div id="agendar" className="form-card">
            <span className="section-eyebrow">Pre-Valoración Gratuita</span>
            <h3 style={{ fontSize: '1.45rem', marginBottom: '6px' }}>
              Solicita tu Plan de Turismo Médico
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
              Déjanos tus datos para que el equipo del Dr. Roberto Cisneros prepare tu itinerario y
              fechas disponibles.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    placeholder="Ej. Virginia Fausto"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="ciudad">Ciudad / Estado de origen</label>
                  <input
                    id="ciudad"
                    type="text"
                    required
                    placeholder="Ej. Coatzacoalcos, Ver."
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="telefono">Teléfono / WhatsApp</label>
                  <input
                    id="telefono"
                    type="tel"
                    required
                    placeholder="10 dígitos"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="procedimiento">Procedimiento de interés</label>
                  <select
                    id="procedimiento"
                    value={formData.procedimiento}
                    onChange={(e) => setFormData({ ...formData, procedimiento: e.target.value })}
                  >
                    <option value="Manga Gástrica">Manga Gástrica</option>
                    <option value="Bypass Gástrico">Bypass Gástrico</option>
                    <option value="Balón Gástrico">Balón Gástrico</option>
                    <option value="Quiero orientación del Dr. Cisneros">
                      Quiero orientación del Dr. Cisneros
                    </option>
                  </select>
                </div>

                <div className="form-field full">
                  <label htmlFor="acompanante">¿Viajas con acompañante?</label>
                  <select
                    id="acompanante"
                    value={formData.acompanante}
                    onChange={(e) => setFormData({ ...formData, acompanante: e.target.value })}
                  >
                    <option value="Sí, viajo con un acompañante">
                      Sí, viajo con un acompañante (hospedaje compartido)
                    </option>
                    <option value="Viajo solo(a)">Viajo solo(a)</option>
                    <option value="Aún por definir">Aún por definir</option>
                  </select>
                </div>

                <div className="form-field full">
                  <label htmlFor="notas">Peso aproximado, estatura o dudas</label>
                  <textarea
                    id="notas"
                    rows={3}
                    placeholder="Cuéntanos brevemente si tienes alguna enfermedad como diabetes o hipertensión, o fechas tentativas de viaje."
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '18px' }}
              >
                <CalendarCheck size={18} />
                Generar Solicitud de Itinerario
              </button>
            </form>

            {submitted && (
              <div className="form-success">
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--teal-700)' }}>
                  ¡Pre-solicitud lista para enviar!
                </strong>
                <p style={{ fontSize: '0.86rem', color: 'var(--slate-700)', marginBottom: '12px' }}>
                  Gracias, <strong>{formData.nombre}</strong>. Puedes enviar tu ficha directamente por
                  correo a <strong>citas@clincob.com.mx</strong> o comunicarte al{' '}
                  <strong>{CONTACT_INFO.phoneDisplay}</strong>.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <a
                    href={`mailto:citas@clincob.com.mx?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="btn btn-primary"
                    style={{ padding: '9px 16px', fontSize: '0.84rem' }}
                  >
                    <Mail size={15} />
                    Enviar por Correo Ahora
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="btn btn-secondary"
                    style={{ padding: '9px 16px', fontSize: '0.84rem' }}
                  >
                    <Phone size={15} />
                    Llamar a Clínica
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <img
                src="/assets/clincob-logo-white-v2.png"
                alt="CLINCOB"
                style={{ height: '64px', marginBottom: '14px' }}
              />
              <p style={{ fontSize: '0.9rem', maxWidth: '340px' }}>
                Clínica Contra la Obesidad en Hospital Ángeles Villahermosa. Programa especializado
                de Turismo Médico dirigido por el Dr. Roberto Cisneros De Ajuria.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--white)', marginBottom: '12px' }}>Sede y Consultorio</h4>
              <p style={{ fontSize: '0.88rem', display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <MapPin size={18} color="#2dd4bf" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{CONTACT_INFO.address}</span>
              </p>
              <p style={{ fontSize: '0.88rem', display: 'flex', gap: '8px' }}>
                <Building2 size={18} color="#2dd4bf" style={{ flexShrink: 0 }} />
                <span>Hospedaje aliado en hoteles de prestigio 5 estrellas</span>
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--white)', marginBottom: '12px' }}>Contacto Directo</h4>
              <p style={{ fontSize: '0.88rem', display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <Phone size={16} color="#2dd4bf" />
                <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phoneDisplay}</a>
              </p>
              <p style={{ fontSize: '0.88rem', display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <Mail size={16} color="#2dd4bf" />
                <span>citas@clincob.com.mx · info@clincob.com.mx</span>
              </p>
              <p style={{ fontSize: '0.84rem', display: 'flex', gap: '8px', color: '#94a3b8' }}>
                <Clock size={16} color="#2dd4bf" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{CONTACT_INFO.hours}</span>
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} CLINCOB — Clínica Contra la Obesidad.</span>
            <span>Turismo Médico Bariátrico · Villahermosa, Tabasco, México.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
