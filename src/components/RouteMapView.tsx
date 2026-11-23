import { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Lock,
  PlayCircle,
} from 'lucide-react';
import { ASSET_IMAGES, MODULES_DATA } from '../data/modulesData';
import { HuellaStore, ModuleId } from '../types/huella';
import { IllustrationFrame } from './IllustrationFrame';

interface RouteMapViewProps {
  store: HuellaStore;
  isModuleUnlocked: (id: ModuleId) => boolean;
  isFinalChallengeUnlocked: boolean;
  completedModulesCount: number;
  onOpenModule: (id: ModuleId) => void;
  onOpenCentralCase: () => void;
  onOpenFinalChallenge: () => void;
  onOpenClosing: () => void;
}

export function RouteMapView({
  store,
  isModuleUnlocked,
  isFinalChallengeUnlocked,
  completedModulesCount,
  onOpenModule,
  onOpenCentralCase,
  onOpenFinalChallenge,
  onOpenClosing,
}: RouteMapViewProps) {
  const [lockedNotice, setLockedNotice] = useState<string>('');

  const handleLockedClick = (message: string) => {
    setLockedNotice(message);
  };

  return (
    <main className="bg-[#EAF5FF]/40 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera y avance global */}
        <div className="rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-[#1557A6]">
                Ruta interactiva de aprendizaje
              </p>
              <h1 className="headline-balance font-display mt-1 text-3xl font-bold text-[#092E5D] sm:text-4xl">
                Seis módulos para pensar antes de publicar
              </h1>
              <p className="mt-2 max-w-2xl text-base text-[#52677F]">
                El recorrido avanza de forma secuencial: al completar los nueve
                momentos de un módulo se habilita el siguiente. Puedes volver a
                cualquier módulo completado cuando lo necesites.
              </p>
            </div>

            <div className="min-w-[230px] rounded-xl border border-[#D6E4F2] bg-[#EAF5FF] p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#092E5D]">
                <span>Progreso general</span>
                <span className="font-mono-tabular">
                  {completedModulesCount} / 6 módulos
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#1557A6] transition-all duration-300"
                  style={{ width: `${(completedModulesCount / 6) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[#52677F]">
                {store.centralCase.completed
                  ? 'Caso central completado'
                  : 'Pendiente: completar caso central en Inicio'}
              </p>
            </div>
          </div>

          {!store.centralCase.completed && (
            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-[#1557A6]/30 bg-[#EAF5FF] p-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <Compass
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#1557A6]"
                  aria-hidden="true"
                />
                <p className="text-sm text-[#17314F]">
                  Para desbloquear el <strong>Módulo 1</strong>, completa
                  primero la actividad del caso central «Una publicación que
                  llegó demasiado lejos».
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenCentralCase}
                className="inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-lg bg-[#1557A6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C69C4]"
              >
                <span>Ir al caso central</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {lockedNotice && (
            <div
              role="status"
              className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[#D97706]/40 bg-[#FEF3C7] px-4 py-3 text-sm text-[#92400E]"
            >
              <span>{lockedNotice}</span>
              <button
                type="button"
                onClick={() => setLockedNotice('')}
                className="text-xs font-semibold underline"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>

        {/* Mapa visual de los 6 módulos */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MODULES_DATA.map((mod) => {
            const progress = store.modules[mod.id];
            const unlocked = isModuleUnlocked(mod.id);
            const isCompleted = progress.completed;
            const inProgress =
              unlocked && !isCompleted && progress.highestStepReached > 1;

            let statusLabel = 'Bloqueado';
            let statusColor = 'text-[#52677F]';
            let statusIcon = <Lock className="h-4 w-4" aria-hidden="true" />;

            if (isCompleted) {
              statusLabel = 'Completado';
              statusColor = 'text-[#059669]';
              statusIcon = (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              );
            } else if (inProgress) {
              statusLabel = `En curso · Paso ${progress.currentStep}/9`;
              statusColor = 'text-[#1557A6]';
              statusIcon = (
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
              );
            } else if (unlocked) {
              statusLabel = 'Disponible';
              statusColor = 'text-[#1557A6]';
              statusIcon = (
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
              );
            }

            return (
              <article
                key={mod.id}
                className={`flex flex-col overflow-hidden rounded-2xl border bg-white transition-all ${
                  unlocked
                    ? 'border-[#D6E4F2] hover:border-[#6FB9F3]'
                    : 'border-[#E2E8F0] opacity-85'
                }`}
              >
                <div className="p-4 pb-0">
                  <IllustrationFrame
                    src={mod.illustration}
                    alt={mod.illustrationAlt}
                    imgClassName={`aspect-[4/3] ${!unlocked ? 'grayscale-[45%]' : ''}`}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono-tabular font-semibold text-[#52677F]">
                        MÓDULO 0{mod.id}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-semibold ${statusColor}`}
                      >
                        {statusIcon}
                        <span>{statusLabel}</span>
                      </span>
                    </div>

                    <h2 className="font-display mt-2 text-lg font-bold text-[#092E5D]">
                      {mod.title.replace(`Módulo ${mod.id}. `, '')}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#1557A6]">
                      {mod.centralQuestion}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#52677F]">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[#EAF5FF] pt-4">
                    {unlocked ? (
                      <button
                        type="button"
                        onClick={() => {
                          setLockedNotice('');
                          onOpenModule(mod.id);
                        }}
                        className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isCompleted
                            ? 'border border-[#1557A6] bg-white text-[#1557A6] hover:bg-[#EAF5FF]'
                            : 'bg-[#1557A6] text-white hover:bg-[#1C69C4]'
                        }`}
                      >
                        <span>
                          {isCompleted
                            ? 'Revisar módulo'
                            : inProgress
                              ? 'Continuar módulo'
                              : 'Explorar módulo'}
                        </span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleLockedClick(
                            mod.id === 1
                              ? 'Primero completa la actividad del caso central en la pantalla de Inicio.'
                              : `Completa los 9 momentos del Módulo ${mod.id - 1} para desbloquear el Módulo ${mod.id}.`
                          )
                        }
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#D6E4F2] bg-[#F8FAFC] px-4 py-2.5 text-sm font-medium text-[#52677F] hover:bg-[#EAF5FF]"
                      >
                        <Lock className="h-4 w-4" aria-hidden="true" />
                        <span>
                          {mod.id === 1
                            ? 'Completa el caso central'
                            : `Requiere Módulo ${mod.id - 1}`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bloque de Actividad Integradora Final y Cierre */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8 lg:col-span-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-5">
                <IllustrationFrame
                  src={ASSET_IMAGES.final}
                  alt="Estudiantes de grado undécimo revisando fotografías de despedida en una tableta con respeto"
                  imgClassName={`aspect-[16/9] ${!isFinalChallengeUnlocked ? 'grayscale-[45%]' : ''}`}
                />
              </div>
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  <span>Actividad integradora final</span>
                </div>
                <h2 className="font-display mt-1.5 text-2xl font-bold text-[#092E5D]">
                  El desafío final: antes de compartir
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#52677F]">
                  Integra los aprendizajes de los seis módulos en cinco momentos
                  de análisis y diseña una propuesta de publicación colectiva
                  para la despedida de grado undécimo.
                </p>

                <div className="mt-5">
                  {isFinalChallengeUnlocked ? (
                    <button
                      type="button"
                      onClick={onOpenFinalChallenge}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#092E5D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1557A6]"
                    >
                      <span>
                        {store.finalChallenge.completed
                          ? 'Revisar desafío final'
                          : 'Iniciar desafío final'}
                      </span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleLockedClick(
                          'El desafío final se desbloquea al completar los seis módulos del recorrido.'
                        )
                      }
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6E4F2] bg-[#F8FAFC] px-4 py-2.5 text-sm font-medium text-[#52677F]"
                    >
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      <span>Disponible al completar los 6 módulos</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-[#D6E4F2] bg-[#092E5D] p-6 text-white sm:p-8 lg:col-span-4">
            <div>
              <p className="text-xs font-semibold text-[#6FB9F3]">
                Cierre del recorrido
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold text-white">
                Tu huella no termina aquí.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#D6E8FB]">
                Al finalizar el desafío integrador podrás revisar la síntesis de
                tu aprendizaje y consolidar tu portafolio en PDF.
              </p>
            </div>
            <div className="mt-6">
              {store.finalChallenge.completed ? (
                <button
                  type="button"
                  onClick={onOpenClosing}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#6FB9F3] px-4 py-2.5 text-sm font-bold text-[#092E5D] hover:bg-white"
                >
                  <span>Ver pantalla de cierre</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <p className="text-xs text-[#BFD9F7]">
                  Se habilitará al finalizar el desafío integrador.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
