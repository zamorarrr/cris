import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  Eye,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import {
  ASSET_IMAGES,
  M2_HOTSPOTS,
  M3_PERSPECTIVES,
  M3_VALUES,
  M4_TIMELINE_NODES,
  M5_ARGUMENTS,
  M6_POST_REVIEWS,
  M6_PRINCIPLES,
  MODULES_DATA,
  STEP_LABELS,
} from '../data/modulesData';
import {
  ModuleId,
  ModuleProgress,
  PortfolioArtifacts,
} from '../types/huella';
import { IllustrationFrame } from './IllustrationFrame';
import { ArtifactKey } from './ArtifactPreviewCard';
import { WorkshopEditor } from './WorkshopEditor';

interface ModuleWorkspaceProps {
  moduleId: ModuleId;
  progress: ModuleProgress;
  artifacts: PortfolioArtifacts;
  onUpdateModule: (
    moduleId: ModuleId,
    updater: (curr: ModuleProgress) => ModuleProgress
  ) => void;
  onUpdateArtifact: <K extends keyof PortfolioArtifacts>(
    key: K,
    updater: (current: PortfolioArtifacts[K]) => PortfolioArtifacts[K]
  ) => void;
  onBackToRoute: () => void;
  onCompleteModule: (nextModuleId?: ModuleId) => void;
  onPrintSingle: (key: ArtifactKey) => void;
}

export function ModuleWorkspace({
  moduleId,
  progress,
  artifacts,
  onUpdateModule,
  onUpdateArtifact,
  onBackToRoute,
  onCompleteModule,
  onPrintSingle,
}: ModuleWorkspaceProps) {
  const mod = MODULES_DATA.find((m) => m.id === moduleId)!;
  const [stepNotice, setStepNotice] = useState<string>('');
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    M2_HOTSPOTS[0].id
  );
  const [activePerspectiveId, setActivePerspectiveId] = useState<string>(
    M3_PERSPECTIVES[0].id
  );
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(1);

  const step = progress.currentStep;

  const goToStep = (targetStep: number) => {
    setStepNotice('');
    onUpdateModule(moduleId, (curr) => ({
      ...curr,
      currentStep: targetStep,
      highestStepReached: Math.max(curr.highestStepReached, targetStep),
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    // Validación pedagógica por paso antes de avanzar
    if (step === 4) {
      if (moduleId === 1) {
        const answered = (mod.analysisQuestions || []).every(
          (_, idx) => (progress.analysisAnswers[`q${idx}`] || '').trim().length >= 8
        );
        if (!answered) {
          setStepNotice(
            'Responde brevemente las cuatro preguntas de análisis para continuar.'
          );
          return;
        }
      } else if (moduleId === 2) {
        if (progress.m2HotspotsFound.length < 3) {
          setStepNotice(
            'Inspecciona al menos 3 elementos en la publicación simulada de Samuel antes de continuar.'
          );
          return;
        }
      } else if (moduleId === 3) {
        if (
          progress.m3SelectedValues.length < 2 ||
          progress.m3ValuesJustification.trim().length < 10
        ) {
          setStepNotice(
            'Selecciona al menos dos valores en tensión y justifica cómo se relacionan con el caso.'
          );
          return;
        }
      } else if (moduleId === 4) {
        if (progress.m4NodesExplored.length < 4) {
          setStepNotice(
            'Explora al menos 4 momentos de la línea de tiempo interactiva para continuar.'
          );
          return;
        }
      } else if (moduleId === 5) {
        if (
          Object.keys(progress.m5Classifications).length < 4 ||
          progress.m5RespectAnswer.trim().length < 10 ||
          progress.m5ConsequenceAnswer.trim().length < 10
        ) {
          setStepNotice(
            'Clasifica las 4 tarjetas de argumentos y responde las dos preguntas de análisis ético.'
          );
          return;
        }
      } else if (moduleId === 6) {
        const reviewedCount = Object.values(progress.m6PostAssessments).filter(
          (v) => v.status !== ''
        ).length;
        if (
          reviewedCount < 3 ||
          progress.m6SelectedPrinciples.length !== 5 ||
          progress.m6PrioritiesExplanation.trim().length < 10
        ) {
          setStepNotice(
            'Evalúa al menos 3 publicaciones, elige exactamente 5 principios y explica cuáles consideras prioritarios.'
          );
          return;
        }
      }
    }

    if (step === 5) {
      if (!progress.decisionOption) {
        setStepNotice('Selecciona una alternativa de decisión para continuar.');
        return;
      }
      if (
        (progress.decisionOption === 'otra' ||
          progress.decisionOption === 'D') &&
        progress.customDecisionText.trim().length < 10
      ) {
        setStepNotice('Describe tu alternativa propuesta.');
        return;
      }
      if (progress.decisionJustification.trim().length < 15) {
        setStepNotice(
          'Escribe la justificación de tu decisión (al menos 15 caracteres).'
        );
        return;
      }
    }

    if (step === 7 && progress.revisedDecisionText.trim().length < 10) {
      setStepNotice(
        'Explica si la nueva información cambia o fortalece tu decisión inicial.'
      );
      return;
    }

    if (step === 8) {
      const artKey = `m${moduleId}` as ArtifactKey;
      if (!artifacts[artKey].updatedAt) {
        onUpdateArtifact(artKey, (c) => ({ ...c }));
      }
    }

    if (step < 9) {
      goToStep(step + 1);
    }
  };

  const handleFinishModule = () => {
    if (progress.finalReflection.trim().length < 12) {
      setStepNotice(
        'Escribe tu reflexión de cierre antes de completar el módulo.'
      );
      return;
    }
    setStepNotice('');
    onUpdateModule(moduleId, (curr) => ({
      ...curr,
      completed: true,
      highestStepReached: 9,
    }));
    const nextId = moduleId < 6 ? ((moduleId + 1) as ModuleId) : undefined;
    onCompleteModule(nextId);
  };

  const selectedAlternative =
    mod.alternatives.find((a) => a.id === progress.decisionOption) ||
    mod.alternatives[0];

  const activeHotspot =
    M2_HOTSPOTS.find((h) => h.id === activeHotspotId) || M2_HOTSPOTS[0];
  const activePerspective =
    M3_PERSPECTIVES.find((p) => p.id === activePerspectiveId) ||
    M3_PERSPECTIVES[0];
  const activeNode =
    M4_TIMELINE_NODES.find((n) => n.step === activeTimelineStep) ||
    M4_TIMELINE_NODES[0];

  return (
    <main className="bg-[#EAF5FF]/40 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navegación superior del módulo */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToRoute}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D6E4F2] bg-white px-3.5 py-2 text-sm font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Volver a la ruta de módulos</span>
          </button>

          <div className="flex items-center gap-3 text-sm font-semibold text-[#092E5D]">
            <span className="font-mono-tabular text-[#1557A6]">
              Paso 0{step} / 09
            </span>
            {progress.completed && (
              <span className="inline-flex items-center gap-1 text-[#059669]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Completado</span>
              </span>
            )}
          </div>
        </div>

        {/* Encabezado del módulo + barra de 9 momentos */}
        <header className="mt-5 rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-wide text-[#1557A6] uppercase">
            {mod.title}
          </p>
          <h1 className="headline-balance font-display mt-1 text-2xl font-bold text-[#092E5D] sm:text-3xl">
            {mod.centralQuestion}
          </h1>

          {/* Indicador de avance de 9 momentos */}
          <nav
            aria-label="Pasos del módulo"
            className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-9"
          >
            {STEP_LABELS.map((label, idx) => {
              const sNum = idx + 1;
              const isCurrent = step === sNum;
              const isReachable =
                progress.completed || sNum <= progress.highestStepReached;
              const isDone = sNum < progress.highestStepReached || progress.completed;

              return (
                <button
                  key={label}
                  type="button"
                  disabled={!isReachable}
                  onClick={() => isReachable && goToStep(sNum)}
                  className={`flex flex-col items-start rounded-lg border p-2 text-left transition-colors ${
                    isCurrent
                      ? 'border-[#1557A6] bg-[#1557A6] text-white'
                      : isReachable
                        ? 'border-[#D6E4F2] bg-[#EAF5FF]/60 text-[#092E5D] hover:bg-[#EAF5FF]'
                        : 'cursor-not-allowed border-[#E2E8F0] bg-[#F8FAFC] text-[#52677F]/60'
                  }`}
                >
                  <span className="font-mono-tabular text-[11px] font-semibold">
                    0{sNum}
                    {isDone && !isCurrent ? ' ✓' : ''}
                  </span>
                  <span className="mt-0.5 truncate w-full text-[11px] font-medium">
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Contenido dinámico del momento activo */}
        <section className="mt-6 rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          {/* PASO 1: INTRODUCCIÓN */}
          {step === 1 && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-[#1557A6]">
                  Momento 1 · Introducción
                </p>
                <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                  Punto de partida del módulo
                </h2>
                <div className="editorial-prose mt-4 space-y-4">
                  {mod.introduction.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <IllustrationFrame
                  src={mod.illustration}
                  alt={mod.illustrationAlt}
                  imgClassName="aspect-[4/3]"
                />
              </div>
            </div>
          )}

          {/* PASO 2: CONCEPTOS PRINCIPALES */}
          {step === 2 && (
            <div>
              <p className="text-xs font-semibold text-[#1557A6]">
                Momento 2 · Conceptos principales
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                Ideas clave para analizar la situación
              </h2>
              <p className="mt-2 text-sm text-[#52677F]">
                Cada tarjeta presenta un concepto fundamental que te servirá
                para argumentar tus decisiones en este módulo.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {mod.concepts.map((c, idx) => (
                  <article
                    key={c.term}
                    className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5"
                  >
                    <p className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
                      0{idx + 1}
                    </p>
                    <h3 className="font-display mt-1 text-lg font-bold text-[#092E5D]">
                      {c.term}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[#17314F]">
                      {c.definition}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* PASO 3: CASO HIPOTÉTICO */}
          {step === 3 && (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <IllustrationFrame
                  src={mod.illustration}
                  alt={mod.illustrationAlt}
                  imgClassName="aspect-[4/3]"
                  caption={`Caso interactivo: «${mod.caseTitle}»`}
                />
              </div>
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-[#1557A6]">
                  Momento 3 · Caso hipotético
                </p>
                <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                  «{mod.caseTitle}»
                </h2>
                <div className="editorial-prose mt-4 space-y-4">
                  {mod.caseStory.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PASO 4: ANÁLISIS DE LA SITUACIÓN (específico por módulo) */}
          {step === 4 && (
            <div>
              <p className="text-xs font-semibold text-[#1557A6]">
                Momento 4 · Análisis de la situación
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                Examina lo que ocurre en el caso
              </h2>
              <p className="mt-2 text-base text-[#52677F]">
                {mod.analysisPrompt}
              </p>

              {/* MÓDULO 1: 4 Preguntas guía */}
              {moduleId === 1 && (
                <div className="mt-6 space-y-5">
                  {(mod.analysisQuestions || []).map((q, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/35 p-5"
                    >
                      <label
                        htmlFor={`m1-q-${idx}`}
                        className="block text-base font-semibold text-[#092E5D]"
                      >
                        {idx + 1}. {q}
                      </label>
                      <textarea
                        id={`m1-q-${idx}`}
                        rows={2}
                        value={progress.analysisAnswers[`q${idx}`] || ''}
                        onChange={(e) =>
                          onUpdateModule(1, (curr) => ({
                            ...curr,
                            analysisAnswers: {
                              ...curr.analysisAnswers,
                              [`q${idx}`]: e.target.value,
                            },
                          }))
                        }
                        placeholder="Escribe tu análisis..."
                        className="mt-2.5 w-full rounded-lg border border-[#D6E4F2] bg-white px-3.5 py-2.5 text-sm text-[#17314F] focus:border-[#1557A6] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* MÓDULO 2: Detective de publicaciones interactivo */}
              {moduleId === 2 && (
                <div className="mt-6 grid gap-6 lg:grid-cols-12">
                  {/* Simulación interactiva de la publicación de Samuel */}
                  <div className="lg:col-span-6">
                    <div className="overflow-hidden rounded-2xl border border-[#D6E4F2] bg-white">
                      <div className="flex items-center justify-between border-b border-[#EAF5FF] px-4 py-3">
                        <div>
                          <p className="text-sm font-bold text-[#092E5D]">
                            @samuel.11b
                          </p>
                          <p className="text-xs text-[#52677F]">
                            Etiqueta: Café El Mirador · Usme
                          </p>
                        </div>
                        <span className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
                          {progress.m2HotspotsFound.length}/5 pistas
                        </span>
                      </div>

                      <div className="relative bg-[#EAF5FF]">
                        <img
                          src={ASSET_IMAGES.m2}
                          alt="Publicación ficticia de Samuel con elementos de información personal inspeccionables"
                          referrerPolicy="no-referrer"
                          className="aspect-[4/3] w-full object-cover"
                        />

                        {/* Puntos interactivos sobre la imagen */}
                        {M2_HOTSPOTS.map((hs, idx) => {
                          const found = progress.m2HotspotsFound.includes(
                            hs.id
                          );
                          const isCurrent = activeHotspotId === hs.id;
                          return (
                            <button
                              key={hs.id}
                              type="button"
                              onClick={() => {
                                setActiveHotspotId(hs.id);
                                if (!found) {
                                  onUpdateModule(2, (curr) => ({
                                    ...curr,
                                    m2HotspotsFound: [
                                      ...curr.m2HotspotsFound,
                                      hs.id,
                                    ],
                                  }));
                                }
                              }}
                              aria-label={`Inspeccionar ${hs.label}`}
                              style={{
                                left: `${hs.xPercent}%`,
                                top: `${hs.yPercent}%`,
                              }}
                              className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono-tabular text-xs font-bold shadow-md transition-transform hover:scale-110 ${
                                isCurrent
                                  ? 'border-white bg-[#092E5D] text-white'
                                  : found
                                    ? 'border-white bg-[#059669] text-white'
                                    : 'border-white bg-[#1557A6] text-white'
                              }`}
                            >
                              {found ? '✓' : idx + 1}
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-4 text-sm text-[#17314F]">
                        <p>
                          <strong>@samuel.11b:</strong> Tarde con el combo del
                          colegio después de clases @camila_r @nico_g @laura.m
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Panel de hallazgo del detective */}
                  <div className="flex flex-col justify-between gap-4 lg:col-span-6">
                    <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
                        <Search className="h-4 w-4" aria-hidden="true" />
                        <span>Elemento inspeccionado</span>
                      </div>
                      <h3 className="font-display mt-2 text-lg font-bold text-[#092E5D]">
                        {activeHotspot.label}
                      </h3>
                      <p className="mt-2 text-sm text-[#17314F]">
                        <strong>Qué muestra:</strong> {activeHotspot.reveals}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#52677F]">
                        <strong>Por qué conviene analizarlo:</strong>{' '}
                        {activeHotspot.whyItMatters}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#092E5D]">
                        Lista de pistas (haz clic en cada una):
                      </p>
                      {M2_HOTSPOTS.map((hs, idx) => {
                        const found = progress.m2HotspotsFound.includes(hs.id);
                        return (
                          <button
                            key={hs.id}
                            type="button"
                            onClick={() => {
                              setActiveHotspotId(hs.id);
                              if (!found) {
                                onUpdateModule(2, (curr) => ({
                                  ...curr,
                                  m2HotspotsFound: [
                                    ...curr.m2HotspotsFound,
                                    hs.id,
                                  ],
                                }));
                              }
                            }}
                            className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium ${
                              activeHotspotId === hs.id
                                ? 'border-[#1557A6] bg-[#EAF5FF] text-[#092E5D]'
                                : 'border-[#D6E4F2] bg-white text-[#17314F] hover:bg-[#EAF5FF]/40'
                            }`}
                          >
                            <span>
                              0{idx + 1}. {hs.label}
                            </span>
                            <span
                              className={
                                found
                                  ? 'font-semibold text-[#059669]'
                                  : 'text-[#52677F]'
                              }
                            >
                              {found ? 'Revisado' : 'Por revisar'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* MÓDULO 3: 4 Perspectivas + Valores en tensión */}
              {moduleId === 3 && (
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#092E5D]">
                      Actividad 1. Conoce las perspectivas de los personajes
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {M3_PERSPECTIVES.map((p) => {
                        const active = activePerspectiveId === p.id;
                        const read = progress.m3PerspectivesRead.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setActivePerspectiveId(p.id);
                              if (!read) {
                                onUpdateModule(3, (curr) => ({
                                  ...curr,
                                  m3PerspectivesRead: [
                                    ...curr.m3PerspectivesRead,
                                    p.id,
                                  ],
                                }));
                              }
                            }}
                            className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                              active
                                ? 'border-[#1557A6] bg-[#1557A6] text-white'
                                : 'border-[#D6E4F2] bg-[#EAF5FF]/40 text-[#092E5D] hover:bg-[#EAF5FF]'
                            }`}
                          >
                            <span className="text-sm font-bold">{p.name}</span>
                            <span
                              className={`mt-1 text-xs ${
                                active ? 'text-[#EAF5FF]' : 'text-[#52677F]'
                              }`}
                            >
                              {p.stance}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-5">
                      <p className="text-xs font-semibold text-[#1557A6]">
                        {activePerspective.name} · {activePerspective.role}
                      </p>
                      <p className="mt-2 text-base italic text-[#092E5D]">
                        {activePerspective.quote}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-[#092E5D]">
                      Actividad 2. ¿Qué valores están en tensión?
                    </h3>
                    <p className="mt-1 text-sm text-[#52677F]">
                      Selecciona los valores que intervienen en el caso y
                      justifica cómo se relacionan con la situación.
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {M3_VALUES.map((v) => {
                        const selected = progress.m3SelectedValues.includes(
                          v.id
                        );
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() =>
                              onUpdateModule(3, (curr) => ({
                                ...curr,
                                m3SelectedValues: selected
                                  ? curr.m3SelectedValues.filter(
                                      (x) => x !== v.id
                                    )
                                  : [...curr.m3SelectedValues, v.id],
                              }))
                            }
                            className={`rounded-xl border p-4 text-left transition-colors ${
                              selected
                                ? 'border-[#1557A6] bg-[#EAF5FF]'
                                : 'border-[#D6E4F2] bg-white hover:bg-[#EAF5FF]/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-display text-sm font-bold text-[#092E5D]">
                                {v.label}
                              </span>
                              {selected && (
                                <CheckCircle2
                                  className="h-4 w-4 text-[#1557A6]"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                            <p className="mt-1 text-xs text-[#52677F]">
                              {v.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      rows={3}
                      value={progress.m3ValuesJustification}
                      onChange={(e) =>
                        onUpdateModule(3, (curr) => ({
                          ...curr,
                          m3ValuesJustification: e.target.value,
                        }))
                      }
                      placeholder="Explica cómo chocan o se complementan los valores seleccionados entre Camila, Nicolás y el grupo..."
                      className="mt-4 w-full rounded-lg border border-[#D6E4F2] px-3.5 py-2.5 text-sm text-[#17314F] focus:border-[#1557A6] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* MÓDULO 4: Línea de tiempo interactiva de 6 momentos */}
              {moduleId === 4 && (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {M4_TIMELINE_NODES.map((node) => {
                      const active = activeTimelineStep === node.step;
                      const explored = progress.m4NodesExplored.includes(
                        node.step
                      );
                      return (
                        <button
                          key={node.step}
                          type="button"
                          onClick={() => {
                            setActiveTimelineStep(node.step);
                            if (!explored) {
                              onUpdateModule(4, (curr) => ({
                                ...curr,
                                m4NodesExplored: [
                                  ...curr.m4NodesExplored,
                                  node.step,
                                ],
                              }));
                            }
                          }}
                          className={`rounded-xl border p-4 text-left transition-colors ${
                            active
                              ? 'border-[#1557A6] bg-[#1557A6] text-white'
                              : explored
                                ? 'border-[#1557A6]/40 bg-[#EAF5FF]/60 text-[#092E5D]'
                                : 'border-[#D6E4F2] bg-white text-[#092E5D] hover:bg-[#EAF5FF]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="font-mono-tabular">
                              MOMENTO 0{node.step}
                            </span>
                            {explored && !active && <span>Analizado ✓</span>}
                          </div>
                          <h3 className="font-display mt-1.5 text-base font-bold">
                            {node.title}
                          </h3>
                          <p
                            className={`mt-1 text-xs ${
                              active ? 'text-[#EAF5FF]' : 'text-[#52677F]'
                            }`}
                          >
                            {node.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/60 p-6">
                    <p className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
                      ANÁLISIS DEL MOMENTO 0{activeNode.step}
                    </p>
                    <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
                      {activeNode.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#1557A6]">
                      {activeNode.decisionPrompt}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-[#17314F]">
                      {activeNode.insight}
                    </p>
                  </div>
                </div>
              )}

              {/* MÓDULO 5: Clasificador de argumentos + Dos formas de analizar */}
              {moduleId === 5 && (
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#092E5D]">
                      Actividad 1. Examina las razones
                    </h3>
                    <p className="mt-1 text-sm text-[#52677F]">
                      Clasifica cada argumento según se relacione principalmente
                      con valores/principios, derechos o consecuencias.
                    </p>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {M5_ARGUMENTS.map((arg) => {
                        const chosen = progress.m5Classifications[arg.id];
                        return (
                          <div
                            key={arg.id}
                            className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/35 p-4"
                          >
                            <p className="font-display text-base font-bold text-[#092E5D]">
                              {arg.quote}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {(
                                [
                                  { id: 'valores', label: 'Valores / Deber' },
                                  { id: 'derechos', label: 'Derechos' },
                                  {
                                    id: 'consecuencias',
                                    label: 'Consecuencias',
                                  },
                                ] as const
                              ).map((cat) => (
                                <button
                                  key={cat.id}
                                  type="button"
                                  onClick={() =>
                                    onUpdateModule(5, (curr) => ({
                                      ...curr,
                                      m5Classifications: {
                                        ...curr.m5Classifications,
                                        [arg.id]: cat.id,
                                      },
                                    }))
                                  }
                                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                                    chosen === cat.id
                                      ? 'border-[#1557A6] bg-[#1557A6] text-white'
                                      : 'border-[#D6E4F2] bg-white text-[#092E5D]'
                                  }`}
                                >
                                  {cat.label}
                                </button>
                              ))}
                            </div>
                            {chosen && (
                              <p className="mt-3 text-xs leading-relaxed text-[#52677F]">
                                {arg.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-display text-lg font-bold text-[#092E5D]">
                      Actividad 2. Dos formas de analizar la situación
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-[#D6E4F2] bg-white p-4">
                        <label
                          htmlFor="m5-respect"
                          className="block text-sm font-bold text-[#092E5D]"
                        >
                          Desde el respeto por las personas:
                        </label>
                        <p className="mt-1 text-xs text-[#52677F]">
                          ¿La decisión reconoce la dignidad de quien aparece en
                          el video?
                        </p>
                        <textarea
                          id="m5-respect"
                          rows={3}
                          value={progress.m5RespectAnswer}
                          onChange={(e) =>
                            onUpdateModule(5, (curr) => ({
                              ...curr,
                              m5RespectAnswer: e.target.value,
                            }))
                          }
                          placeholder="Tu respuesta desde la ética del deber..."
                          className="mt-2.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                        />
                      </div>

                      <div className="rounded-xl border border-[#D6E4F2] bg-white p-4">
                        <label
                          htmlFor="m5-consequence"
                          className="block text-sm font-bold text-[#092E5D]"
                        >
                          Desde sus consecuencias:
                        </label>
                        <p className="mt-1 text-xs text-[#52677F]">
                          ¿Qué efectos podrían producirse si el contenido
                          continúa circulando?
                        </p>
                        <textarea
                          id="m5-consequence"
                          rows={3}
                          value={progress.m5ConsequenceAnswer}
                          onChange={(e) =>
                            onUpdateModule(5, (curr) => ({
                              ...curr,
                              m5ConsequenceAnswer: e.target.value,
                            }))
                          }
                          placeholder="Tu respuesta desde la ética de las consecuencias..."
                          className="mt-2.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MÓDULO 6: Auditoría de publicaciones + Construcción de criterios */}
              {moduleId === 6 && (
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#092E5D]">
                      Actividad 1. Revisa las publicaciones ficticias de Daniela
                    </h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {M6_POST_REVIEWS.map((post) => {
                        const state = progress.m6PostAssessments[post.id] || {
                          status: '',
                          question: '',
                        };
                        return (
                          <div
                            key={post.id}
                            className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/35 p-4"
                          >
                            <p className="text-xs font-semibold text-[#1557A6]">
                              {post.author} · {post.tag}
                            </p>
                            <h4 className="font-display mt-1 text-base font-bold text-[#092E5D]">
                              {post.title}
                            </h4>
                            <p className="mt-1.5 text-sm text-[#17314F]">
                              {post.content}
                            </p>

                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateModule(6, (curr) => ({
                                    ...curr,
                                    m6PostAssessments: {
                                      ...curr.m6PostAssessments,
                                      [post.id]: {
                                        ...state,
                                        status: 'positivo',
                                      },
                                    },
                                  }))
                                }
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                                  state.status === 'positivo'
                                    ? 'border-[#059669] bg-[#059669] text-white'
                                    : 'border-[#D6E4F2] bg-white text-[#092E5D]'
                                }`}
                              >
                                Aspecto positivo
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateModule(6, (curr) => ({
                                    ...curr,
                                    m6PostAssessments: {
                                      ...curr.m6PostAssessments,
                                      [post.id]: {
                                        ...state,
                                        status: 'revisar',
                                      },
                                    },
                                  }))
                                }
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                                  state.status === 'revisar'
                                    ? 'border-[#D97706] bg-[#D97706] text-white'
                                    : 'border-[#D6E4F2] bg-white text-[#092E5D]'
                                }`}
                              >
                                Requiere revisión
                              </button>
                            </div>

                            {state.status && (
                              <p className="mt-2.5 text-xs leading-relaxed text-[#52677F]">
                                {post.guidance}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-[#092E5D]">
                        Actividad 2. Construye tus criterios (elige 5 principios)
                      </h3>
                      <span className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
                        {progress.m6SelectedPrinciples.length} / 5 seleccionados
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                      {M6_PRINCIPLES.map((pr) => {
                        const selected =
                          progress.m6SelectedPrinciples.includes(pr);
                        const disabled =
                          !selected &&
                          progress.m6SelectedPrinciples.length >= 5;
                        return (
                          <button
                            key={pr}
                            type="button"
                            disabled={disabled}
                            onClick={() =>
                              onUpdateModule(6, (curr) => ({
                                ...curr,
                                m6SelectedPrinciples: selected
                                  ? curr.m6SelectedPrinciples.filter(
                                      (x) => x !== pr
                                    )
                                  : [...curr.m6SelectedPrinciples, pr],
                              }))
                            }
                            className={`rounded-lg border p-3 text-left text-xs font-semibold transition-colors ${
                              selected
                                ? 'border-[#1557A6] bg-[#1557A6] text-white'
                                : disabled
                                  ? 'cursor-not-allowed border-[#E2E8F0] bg-[#F8FAFC] text-[#52677F]/50'
                                  : 'border-[#D6E4F2] bg-white text-[#092E5D] hover:bg-[#EAF5FF]'
                            }`}
                          >
                            {pr}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      rows={3}
                      value={progress.m6PrioritiesExplanation}
                      onChange={(e) =>
                        onUpdateModule(6, (curr) => ({
                          ...curr,
                          m6PrioritiesExplanation: e.target.value,
                        }))
                      }
                      placeholder="Explica cuáles de esos cinco principios consideras prioritarios y por qué..."
                      className="mt-4 w-full rounded-lg border border-[#D6E4F2] px-3.5 py-2.5 text-sm focus:border-[#1557A6] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PASO 5: DECISIONES INTERACTIVAS */}
          {step === 5 && (
            <div>
              <p className="text-xs font-semibold text-[#1557A6]">
                Momento 5 · Decisiones interactivas
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                ¿Qué decisión tomarías frente al caso?
              </h2>
              <p className="mt-2 text-sm text-[#52677F]">
                Lee con atención las alternativas, elige una postura y escribe
                las razones que la sustentan.
              </p>

              <div className="mt-5 space-y-3">
                {mod.alternatives.map((alt) => {
                  const selected = progress.decisionOption === alt.id;
                  return (
                    <label
                      key={alt.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                        selected
                          ? 'border-[#1557A6] bg-[#EAF5FF]/70'
                          : 'border-[#D6E4F2] bg-white hover:bg-[#EAF5FF]/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`mod-${moduleId}-decision`}
                        value={alt.id}
                        checked={selected}
                        onChange={() =>
                          onUpdateModule(moduleId, (curr) => ({
                            ...curr,
                            decisionOption: alt.id,
                          }))
                        }
                        className="mt-1 h-4 w-4 accent-[#1557A6]"
                      />
                      <span className="text-sm leading-relaxed font-medium text-[#092E5D]">
                        {alt.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {(progress.decisionOption === 'D' ||
                progress.decisionOption === 'otra') && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-[#092E5D]">
                    Describe tu propuesta alternativa
                  </label>
                  <input
                    type="text"
                    value={progress.customDecisionText}
                    onChange={(e) =>
                      onUpdateModule(moduleId, (curr) => ({
                        ...curr,
                        customDecisionText: e.target.value,
                      }))
                    }
                    placeholder="Escribe cuál sería tu propuesta de acción..."
                    className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3.5 py-2.5 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                </div>
              )}

              <div className="mt-5">
                <label
                  htmlFor={`mod-${moduleId}-justification`}
                  className="block text-sm font-semibold text-[#092E5D]"
                >
                  Argumenta tu decisión (incluye al menos dos razones)
                </label>
                <textarea
                  id={`mod-${moduleId}-justification`}
                  rows={4}
                  value={progress.decisionJustification}
                  onChange={(e) =>
                    onUpdateModule(moduleId, (curr) => ({
                      ...curr,
                      decisionJustification: e.target.value,
                    }))
                  }
                  placeholder="Explica qué derechos, valores o consecuencias tuviste en cuenta..."
                  className="mt-2 w-full rounded-lg border border-[#D6E4F2] px-3.5 py-2.5 text-sm text-[#17314F] focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* PASO 6: RETROALIMENTACIÓN FORMATIVA */}
          {step === 6 && (
            <div>
              <p className="text-xs font-semibold text-[#1557A6]">
                Momento 6 · Retroalimentación ética
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                {selectedAlternative.feedbackTitle}
              </h2>
              <p className="editorial-prose mt-3">
                {selectedAlternative.feedbackBody}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
                    <Compass className="h-4 w-4" aria-hidden="true" />
                    <span>Retroalimentación conceptual</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    {selectedAlternative.conceptualNote}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span>Sobre las consecuencias</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    {selectedAlternative.consequenceNote}
                  </p>
                </div>

                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Sobre las perspectivas</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    {selectedAlternative.perspectiveNote}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#D6E4F2] bg-white p-4 text-sm text-[#52677F]">
                <strong className="text-[#092E5D]">Tu argumento inicial:</strong>{' '}
                {progress.decisionJustification}
              </div>
            </div>
          )}

          {/* PASO 7: REVISIÓN DE LA DECISIÓN CON NUEVA INFORMACIÓN */}
          {step === 7 && (
            <div>
              <p className="text-xs font-semibold text-[#1557A6]">
                Momento 7 · Revisión de la decisión
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                {mod.newInfoTitle}
              </h2>

              <div className="mt-4 rounded-xl border border-[#1557A6]/30 bg-[#EAF5FF] p-5">
                <p className="text-base leading-relaxed font-medium text-[#092E5D]">
                  {mod.newInfoText}
                </p>
              </div>

              <div className="mt-5">
                <label
                  htmlFor={`mod-${moduleId}-review`}
                  className="block text-base font-semibold text-[#092E5D]"
                >
                  {mod.newInfoQuestion}
                </label>
                <textarea
                  id={`mod-${moduleId}-review`}
                  rows={4}
                  value={progress.revisedDecisionText}
                  onChange={(e) =>
                    onUpdateModule(moduleId, (curr) => ({
                      ...curr,
                      revisedDecisionText: e.target.value,
                    }))
                  }
                  placeholder="Explica qué razones cambiaron, cuáles se fortalecieron o cómo ajustarías tu decisión..."
                  className="mt-2.5 w-full rounded-lg border border-[#D6E4F2] px-3.5 py-2.5 text-sm text-[#17314F] focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* PASO 8: TALLER DE CREACIÓN */}
          {step === 8 && (
            <div>
              <p className="text-xs font-semibold text-[#1557A6]">
                Momento 8 · Taller de creación
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                {mod.workshopTitle}
              </h2>
              <p className="mt-2 text-base text-[#52677F]">
                <strong>Producto:</strong> {mod.workshopProductTitle}.{' '}
                {mod.workshopDescription}
              </p>

              <div className="mt-6">
                <WorkshopEditor
                  artifactKey={`m${moduleId}` as ArtifactKey}
                  artifacts={artifacts}
                  onUpdateArtifact={onUpdateArtifact}
                  onPrintSingle={onPrintSingle}
                />
              </div>
            </div>
          )}

          {/* PASO 9: REFLEXIÓN DE CIERRE */}
          {step === 9 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#1557A6]">
                  Momento 9 · Reflexión de cierre
                </p>
                <h2 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
                  Síntesis de lo aprendido
                </h2>
              </div>

              <div className="rounded-xl bg-[#092E5D] p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6FB9F3]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>Aprendizaje de cierre</span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-[#EAF5FF]">
                  {mod.closingTakeaway}
                </p>
              </div>

              <div>
                <label
                  htmlFor={`mod-${moduleId}-reflection`}
                  className="block text-base font-semibold text-[#092E5D]"
                >
                  {mod.reflectionQuestion}
                </label>
                <textarea
                  id={`mod-${moduleId}-reflection`}
                  rows={4}
                  value={progress.finalReflection}
                  onChange={(e) =>
                    onUpdateModule(moduleId, (curr) => ({
                      ...curr,
                      finalReflection: e.target.value,
                    }))
                  }
                  placeholder="Escribe tu reflexión personal para cerrar este módulo..."
                  className="mt-2.5 w-full rounded-lg border border-[#D6E4F2] px-3.5 py-2.5 text-sm text-[#17314F] focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            </div>
          )}

          {stepNotice && (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-[#D97706]/40 bg-[#FEF3C7] px-4 py-3 text-sm text-[#92400E]"
            >
              {stepNotice}
            </p>
          )}

          {/* Controles inferiores del paso */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAF5FF] pt-6">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => goToStep(step - 1)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold ${
                step === 1
                  ? 'cursor-not-allowed border-[#E2E8F0] text-[#52677F]/50'
                  : 'border-[#D6E4F2] bg-white text-[#092E5D] hover:bg-[#EAF5FF]'
              }`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Regresar</span>
            </button>

            {step < 9 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1557A6] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1C69C4]"
              >
                <span>
                  {step === 5
                    ? 'Revisar mi decisión'
                    : step === 7
                      ? 'Crear mi material'
                      : 'Continuar'}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishModule}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#059669] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#047857]"
              >
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                <span>
                  {moduleId < 6
                    ? `Completar Módulo ${moduleId} y desbloquear Módulo ${moduleId + 1}`
                    : 'Completar Módulo 6 y desbloquear Desafío Final'}
                </span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
