import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  HelpCircle,
  Lock,
  Share2,
  Users,
} from 'lucide-react';
import {
  ASSET_IMAGES,
  CENTRAL_CASE_DATA,
  THINK_BEFORE_CARDS,
} from '../data/modulesData';
import { CentralCaseState } from '../types/huella';
import { IllustrationFrame } from './IllustrationFrame';

interface HomeViewProps {
  centralCase: CentralCaseState;
  onUpdateCentralCase: (patch: Partial<CentralCaseState>) => void;
  onStartJourney: () => void;
  onGoToRoute: () => void;
}

export function HomeView({
  centralCase,
  onUpdateCentralCase,
  onStartJourney,
  onGoToRoute,
}: HomeViewProps) {
  const [selectedThinkId, setSelectedThinkId] = useState<string>('info');
  const [validationError, setValidationError] = useState<string>('');

  const handleConfirmCentralCase = () => {
    if (!centralCase.selectedOption) {
      setValidationError(
        'Selecciona primero en qué momento consideras que aparece el problema.'
      );
      return;
    }
    if (centralCase.explanation.trim().length < 15) {
      setValidationError(
        'Escribe una explicación breve (al menos 15 caracteres) sobre tu elección para desbloquear el Módulo 1.'
      );
      return;
    }
    setValidationError('');
    onUpdateCentralCase({ completed: true });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeThink =
    THINK_BEFORE_CARDS.find((c) => c.id === selectedThinkId) ||
    THINK_BEFORE_CARDS[0];

  const getThinkIcon = (id: string) => {
    if (id === 'info') return <Eye className="h-5 w-5" aria-hidden="true" />;
    if (id === 'affect') return <Users className="h-5 w-5" aria-hidden="true" />;
    return <Share2 className="h-5 w-5" aria-hidden="true" />;
  };

  return (
    <main>
      {/* 1. Portada en Azul Noche */}
      <section className="bg-[#092E5D] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
          <div className="lg:col-span-6">
            <p className="text-sm font-medium text-[#6FB9F3]">
              Colegio Diego Montaña Cuéllar IED · Grado Undécimo · Usme, Bogotá
            </p>
            <h1 className="headline-balance font-display mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[1.08]">
              HUELLA DIGITAL
            </h1>
            <p className="headline-balance font-display mt-3 text-xl font-semibold text-[#6FB9F3] sm:text-2xl">
              Lo que compartes también cuenta tu historia.
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#E3EEFA] sm:text-[17px]">
              <p>
                Cada fotografía, comentario o video que publicamos puede llegar a
                personas que no imaginábamos. A veces compartimos algo para
                divertirnos, contar una experiencia o expresar una opinión, sin
                pensar en todo lo que puede pasar después.
              </p>
              <p>
                En HUELLA DIGITAL explorarás situaciones relacionadas con las
                redes sociales y descubrirás que una publicación puede tener
                diferentes consecuencias según lo que compartimos, a quién
                involucra y cómo actúan las personas que reciben el contenido.
              </p>
              <p className="font-medium text-white">
                Aquí no se trata de dejar de publicar, sino de aprender a tomar
                decisiones con más información y responsabilidad.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  centralCase.completed
                    ? onStartJourney()
                    : scrollToSection('caso-central')
                }
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1557A6] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1C69C4]"
              >
                <span>
                  {centralCase.completed
                    ? 'Continuar mi recorrido'
                    : 'Comenzar mi recorrido'}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('como-funciona')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <span>Conoce cómo funciona</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <IllustrationFrame
              src={ASSET_IMAGES.hero}
              alt="Ilustración editorial de un teléfono móvil rodeado de tarjetas de publicaciones, mensajes e imágenes sobre ondas de huella digital"
              darkBackdrop
              imgClassName="aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* 2. Sección «Antes de publicar, piensa» */}
      <section className="border-b border-[#D6E4F2] bg-[#EAF5FF] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1557A6]">
              Tres preguntas clave
            </p>
            <h2 className="headline-balance font-display mt-2 text-2xl font-bold text-[#092E5D] sm:text-[32px]">
              Antes de publicar, piensa
            </h2>
            <p className="mt-2 text-base text-[#52677F]">
              Selecciona cada tarjeta para descubrir cómo se conecta con las
              decisiones cotidianas en redes sociales.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {THINK_BEFORE_CARDS.map((card) => {
              const isSelected = card.id === selectedThinkId;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedThinkId(card.id)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-start rounded-xl border p-6 text-left transition-all ${
                    isSelected
                      ? 'border-[#1557A6] bg-white shadow-sm'
                      : 'border-[#D6E4F2] bg-white/80 hover:border-[#6FB9F3] hover:bg-white'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected
                        ? 'bg-[#1557A6] text-white'
                        : 'bg-[#EAF5FF] text-[#1557A6]'
                    }`}
                  >
                    {getThinkIcon(card.id)}
                  </span>
                  <h3 className="font-display mt-4 text-lg font-bold text-[#092E5D]">
                    {card.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#52677F]">
                    {card.shortDesc}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-[#1557A6]">
                    {isSelected ? 'Explicación activa' : 'Explorar pregunta'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explicación conectada con el problema ético central */}
          <div className="mt-6 rounded-xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-[#1557A6] uppercase">
                  Reflexión ética conectada
                </p>
                <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
                  {activeThink.question}
                </h3>
                <p className="editorial-prose mt-3">{activeThink.explanation}</p>
              </div>
              <div className="rounded-xl bg-[#EAF5FF] p-5 md:col-span-5">
                <p className="text-xs font-semibold text-[#092E5D]">
                  Conexión con el caso central
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                  {activeThink.connection}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Presentación del proyecto */}
      <section id="como-funciona" className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-[#1557A6]">
                Cómo funciona la experiencia
              </p>
              <h2 className="headline-balance font-display mt-2 text-2xl font-bold text-[#092E5D] sm:text-[32px]">
                Un espacio para pensar, decidir y crear
              </h2>
              <div className="editorial-prose mt-5 space-y-4">
                <p>
                  HUELLA DIGITAL es una experiencia educativa interactiva en la
                  que aprenderás a analizar situaciones relacionadas con lo que
                  publicamos en redes sociales.
                </p>
                <p>
                  Encontrarás historias ficticias, decisiones que no siempre son
                  sencillas, diferentes puntos de vista y actividades que te
                  permitirán construir tus propias respuestas.
                </p>
                <p>
                  Durante el recorrido también crearás materiales que te
                  ayudarán a expresar lo aprendido sobre identidad digital,
                  privacidad, respeto y responsabilidad.
                </p>
                <p>
                  Al finalizar tendrás una colección de trabajos elaborados por
                  ti y una reflexión sobre la huella digital que deseas
                  construir.
                </p>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF] p-6">
                <h3 className="font-display text-lg font-bold text-[#092E5D]">
                  Recorrido progresivo en 4 etapas
                </h3>
                <ol className="mt-4 space-y-3 text-sm text-[#17314F]">
                  <li className="flex gap-3">
                    <span className="font-mono-tabular font-semibold text-[#1557A6]">
                      01
                    </span>
                    <span>
                      Analiza el caso central para activar tu ruta de
                      aprendizaje.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono-tabular font-semibold text-[#1557A6]">
                      02
                    </span>
                    <span>
                      Avanza secuencialmente por los 6 módulos educativos (9
                      momentos en cada uno).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono-tabular font-semibold text-[#1557A6]">
                      03
                    </span>
                    <span>
                      Elabora tus 6 talleres creativos y resuelve el desafío
                      integrador final.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono-tabular font-semibold text-[#1557A6]">
                      04
                    </span>
                    <span>
                      Revisa tu portafolio «Mis creaciones» e imprímelo o
                      guárdalo en PDF.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border border-[#D6E4F2] bg-white p-5">
                <div className="flex items-start gap-3">
                  <Lock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1557A6]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#092E5D]">
                      Privacidad sin cuentas ni registros
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#52677F]">
                      Tus respuestas y materiales se guardan únicamente en este
                      navegador. No se requieren cuentas ni datos personales
                      sensibles; si borras los datos del navegador, se perderán.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Presentación del problema central y primera actividad interactiva */}
      <section
        id="caso-central"
        className="border-t border-[#D6E4F2] bg-[#EAF5FF]/60 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#1557A6]">
              Problema central · Punto de partida
            </p>
            <h2 className="headline-balance font-display mt-2 text-2xl font-bold text-[#092E5D] sm:text-[34px]">
              {CENTRAL_CASE_DATA.sectionTitle}
            </h2>
            <div className="editorial-prose mt-4 space-y-3">
              {CENTRAL_CASE_DATA.intro.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-8 rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <IllustrationFrame
                src={ASSET_IMAGES.centralCase}
                alt="Grupo de estudiantes de grado undécimo reunidos en el patio escolar mientras uno graba un video y otro compañero luce incómodo"
                imgClassName="aspect-[16/9]"
                caption="Caso central ficticio: una reunión después de clase y sus efectos en redes."
              />
              <h3 className="font-display mt-6 text-xl font-bold text-[#092E5D]">
                Historia principal: «{CENTRAL_CASE_DATA.storyTitle}»
              </h3>
              <div className="editorial-prose mt-3 space-y-3 text-base">
                {CENTRAL_CASE_DATA.storyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-6 lg:col-span-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1557A6]">
                  <HelpCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Primera actividad interactiva</span>
                </div>
                <h3 className="font-display mt-2 text-xl font-bold text-[#092E5D]">
                  {CENTRAL_CASE_DATA.question}
                </h3>

                <div className="mt-4 space-y-2.5">
                  {CENTRAL_CASE_DATA.options.map((opt) => {
                    const selected = centralCase.selectedOption === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors ${
                          selected
                            ? 'border-[#1557A6] bg-white'
                            : 'border-[#D6E4F2] bg-white/75 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="central_case_option"
                          value={opt.id}
                          checked={selected}
                          onChange={() =>
                            onUpdateCentralCase({ selectedOption: opt.id })
                          }
                          className="mt-1 h-4 w-4 accent-[#1557A6]"
                        />
                        <span className="text-sm leading-relaxed font-medium text-[#17314F]">
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="central-case-explanation"
                    className="block text-sm font-semibold text-[#092E5D]"
                  >
                    Explica brevemente tu elección
                  </label>
                  <textarea
                    id="central-case-explanation"
                    rows={3}
                    value={centralCase.explanation}
                    onChange={(e) =>
                      onUpdateCentralCase({ explanation: e.target.value })
                    }
                    placeholder="Escribe aquí por qué consideras que el problema aparece en ese momento..."
                    className="mt-2 w-full rounded-lg border border-[#D6E4F2] bg-white px-3.5 py-2.5 text-sm text-[#17314F] placeholder:text-[#52677F]/70 focus:border-[#1557A6] focus:outline-none"
                  />
                </div>

                {validationError && (
                  <p
                    role="alert"
                    className="mt-3 rounded-lg border border-[#D97706]/40 bg-[#FEF3C7] px-3.5 py-2 text-sm text-[#92400E]"
                  >
                    {validationError}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleConfirmCentralCase}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#1557A6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1C69C4]"
                >
                  <span>
                    {centralCase.completed
                      ? 'Actualizar respuesta y ver retroalimentación'
                      : 'Revisar mi respuesta y desbloquear Módulo 1'}
                  </span>
                </button>

                {centralCase.completed && (
                  <div className="mt-5 rounded-xl border border-[#1557A6]/30 bg-white p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#1557A6]">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Retroalimentación formativa · Módulo 1 desbloqueado</span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#17314F]">
                      {CENTRAL_CASE_DATA.feedback.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={onStartJourney}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#092E5D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1557A6]"
                      >
                        <span>Ir al Módulo 1</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={onGoToRoute}
                        className="inline-flex min-h-[44px] items-center rounded-lg border border-[#D6E4F2] px-4 py-2.5 text-sm font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
                      >
                        Ver mapa de módulos
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
