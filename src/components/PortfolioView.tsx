import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  FileText,
  Printer,
  X,
} from 'lucide-react';
import { HuellaStore, ModuleId, PortfolioArtifacts } from '../types/huella';
import { ArtifactKey, ArtifactPreviewCard } from './ArtifactPreviewCard';
import { WorkshopEditor } from './WorkshopEditor';

interface PortfolioViewProps {
  store: HuellaStore;
  createdCount: number;
  isModuleUnlocked: (id: ModuleId) => boolean;
  isFinalUnlocked: boolean;
  onUpdateArtifact: <K extends keyof PortfolioArtifacts>(
    key: K,
    updater: (current: PortfolioArtifacts[K]) => PortfolioArtifacts[K]
  ) => void;
  onGoToModuleWorkshop: (id: ModuleId) => void;
  onGoToFinalChallenge: () => void;
  onGoToRoute: () => void;
  onPrintTarget: (target: 'all' | ArtifactKey) => void;
}

const PORTFOLIO_CATALOG: {
  key: ArtifactKey;
  moduleLabel: string;
  productTitle: string;
  moduleId?: ModuleId;
}[] = [
  {
    key: 'm1',
    moduleLabel: 'Módulo 1 · Mi identidad digital',
    productTitle: 'Ficha visual de identidad digital responsable',
    moduleId: 1,
  },
  {
    key: 'm2',
    moduleLabel: 'Módulo 2 · ¿Qué estoy compartiendo?',
    productTitle: 'Infografía sobre privacidad',
    moduleId: 2,
  },
  {
    key: 'm3',
    moduleLabel: 'Módulo 3 · No todo se publica',
    productTitle: 'Mini campaña de consentimiento y respeto',
    moduleId: 3,
  },
  {
    key: 'm4',
    moduleLabel: 'Módulo 4 · Lo que internet recuerda',
    productTitle: 'Línea de tiempo sobre el recorrido de una publicación',
    moduleId: 4,
  },
  {
    key: 'm5',
    moduleLabel: 'Módulo 5 · Mis decisiones, mis responsabilidades',
    productTitle: 'Matriz de análisis ético',
    moduleId: 5,
  },
  {
    key: 'm6',
    moduleLabel: 'Módulo 6 · Mi futuro digital',
    productTitle: 'Manifiesto visual de ciudadanía digital',
    moduleId: 6,
  },
  {
    key: 'final',
    moduleLabel: 'Actividad integradora final',
    productTitle: 'Diseño de una publicación responsable y justificación',
  },
];

export function PortfolioView({
  store,
  createdCount,
  isModuleUnlocked,
  isFinalUnlocked,
  onUpdateArtifact,
  onGoToModuleWorkshop,
  onGoToFinalChallenge,
  onGoToRoute,
  onPrintTarget,
}: PortfolioViewProps) {
  const [editingKey, setEditingKey] = useState<ArtifactKey | null>(null);

  return (
    <main className="bg-[#EAF5FF]/40 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado del portafolio */}
        <section className="no-print rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-[#1557A6]">
                Portafolio digital del estudiante
              </p>
              <h1 className="headline-balance font-display mt-1 text-3xl font-bold text-[#092E5D] sm:text-4xl">
                Mis creaciones
              </h1>
              <p className="mt-2 max-w-2xl text-base text-[#52677F]">
                Aquí se reúnen los siete materiales elaborados a lo largo de tu
                recorrido. Puedes editarlos, volver al módulo correspondiente o
                imprimir y guardar tu portafolio en PDF desde el navegador.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF] px-4 py-3 text-right">
                <p className="text-xs font-semibold text-[#52677F]">
                  Materiales guardados
                </p>
                <p className="font-mono-tabular text-2xl font-bold text-[#092E5D]">
                  {createdCount} / 7
                </p>
              </div>

              <button
                type="button"
                onClick={() => onPrintTarget('all')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#092E5D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1557A6]"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                <span>Imprimir / Guardar portafolio PDF</span>
              </button>
            </div>
          </div>

          {createdCount === 0 && (
            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/60 p-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <FileText
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#1557A6]"
                  aria-hidden="true"
                />
                <p className="text-sm text-[#17314F]">
                  Aún no has guardado creaciones en tu portafolio. Avanza en los
                  módulos para diseñar tu primer material en el Momento 8.
                </p>
              </div>
              <button
                type="button"
                onClick={onGoToRoute}
                className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg bg-[#1557A6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C69C4]"
              >
                <span>Ir a la ruta</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        {/* Comparación del recorrido: idea inicial vs aprendizaje */}
        {store.centralCase.completed && (
          <section className="mt-6 rounded-2xl border border-[#D6E4F2] bg-white p-6">
            <h2 className="font-display text-lg font-bold text-[#092E5D]">
              Evolución de tu reflexión ética
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-[#EAF5FF]/50 p-4">
                <p className="text-xs font-semibold text-[#1557A6]">
                  Tu respuesta inicial en el caso central
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#17314F]">
                  {store.centralCase.explanation}
                </p>
              </div>
              <div className="rounded-xl bg-[#EAF5FF]/50 p-4">
                <p className="text-xs font-semibold text-[#1557A6]">
                  Tu reflexión de cierre más reciente
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#17314F]">
                  {store.modules[6].finalReflection ||
                    store.modules[5].finalReflection ||
                    store.modules[4].finalReflection ||
                    store.modules[3].finalReflection ||
                    store.modules[2].finalReflection ||
                    store.modules[1].finalReflection ||
                    'Completa el Momento 9 de los módulos para comparar tus ideas iniciales con tus aprendizajes finales.'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Lista de los 7 productos */}
        <div className="no-print mt-8 space-y-8">
          {PORTFOLIO_CATALOG.map((item) => {
            const artifact = store.artifacts[item.key];
            const isSaved = Boolean(artifact.updatedAt);
            const checkedCount = artifact.checklist.filter(Boolean).length;
            const canAccessModule = item.moduleId
              ? isModuleUnlocked(item.moduleId)
              : isFinalUnlocked;

            return (
              <section
                key={item.key}
                className="rounded-2xl border border-[#D6E4F2] bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-[#EAF5FF] pb-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold text-[#1557A6]">
                      {item.moduleLabel}
                    </p>
                    <h2 className="font-display mt-0.5 text-xl font-bold text-[#092E5D]">
                      {item.productTitle}
                    </h2>
                    <p className="mt-1 text-xs text-[#52677F]">
                      {isSaved
                        ? `Guardado el ${artifact.updatedAt} · ${checkedCount}/6 criterios revisados`
                        : 'Pendiente de elaboración'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {isSaved && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669]">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>Elaborado</span>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setEditingKey(item.key)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D6E4F2] bg-white px-3.5 py-2 text-xs font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
                    >
                      <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onPrintTarget(item.key)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D6E4F2] bg-white px-3.5 py-2 text-xs font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
                    >
                      <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Imprimir / PDF</span>
                    </button>

                    {canAccessModule && (
                      <button
                        type="button"
                        onClick={() =>
                          item.moduleId
                            ? onGoToModuleWorkshop(item.moduleId)
                            : onGoToFinalChallenge()
                        }
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#1557A6] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1C69C4]"
                      >
                        <span>
                          {item.moduleId ? 'Volver al módulo' : 'Ir al desafío'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <ArtifactPreviewCard
                    artifactKey={item.key}
                    artifacts={store.artifacts}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Modal de edición directa desde el portafolio */}
      {editingKey && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Editar material del portafolio"
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[#092E5D]/60 p-4"
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#D6E4F2] bg-[#EAF5FF] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#092E5D]">
                Editar material:{' '}
                {
                  PORTFOLIO_CATALOG.find((c) => c.key === editingKey)
                    ?.productTitle
                }
              </h2>
              <button
                type="button"
                onClick={() => setEditingKey(null)}
                aria-label="Cerrar editor"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#092E5D] hover:bg-[#D6E4F2]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <WorkshopEditor
              artifactKey={editingKey}
              artifacts={store.artifacts}
              onUpdateArtifact={onUpdateArtifact}
              onPrintSingle={(k) => {
                setEditingKey(null);
                onPrintTarget(k);
              }}
              onSaved={() => setEditingKey(null)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
