import { useEffect, useState } from 'react';
import { AboutView, ClosingView } from './components/AboutAndClosingView';
import { ArtifactKey, ArtifactPreviewCard } from './components/ArtifactPreviewCard';
import { FinalChallengeView } from './components/FinalChallengeView';
import { HomeView } from './components/HomeView';
import { ModuleWorkspace } from './components/ModuleWorkspace';
import { Navbar } from './components/Navbar';
import { PortfolioView } from './components/PortfolioView';
import { ResourcesView } from './components/ResourcesView';
import { RouteMapView } from './components/RouteMapView';
import { useHuellaStorage } from './hooks/useHuellaStorage';
import { AppView, ModuleId } from './types/huella';

const ALL_ARTIFACT_KEYS: ArtifactKey[] = [
  'm1',
  'm2',
  'm3',
  'm4',
  'm5',
  'm6',
  'final',
];

export default function App() {
  const {
    store,
    updateCentralCase,
    updateModule,
    updateFinalChallenge,
    updateArtifact,
    setNavigationState,
    resetAllProgress,
    isModuleUnlocked,
    isFinalChallengeUnlocked,
    completedModulesCount,
    createdArtifactsCount,
  } = useHuellaStorage();

  const [activeView, setActiveView] = useState<AppView>(() =>
    store.lastActiveView || 'inicio'
  );
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(() =>
    store.lastActiveModule || 1
  );
  const [printTarget, setPrintTarget] = useState<'all' | ArtifactKey>('all');

  const navigate = (view: AppView, moduleId?: ModuleId) => {
    // Protección de desbloqueo secuencial en navegación directa
    if (view === 'modulo' && moduleId && !isModuleUnlocked(moduleId)) {
      setActiveView('recorrido');
      setNavigationState('recorrido');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'desafio' && !isFinalChallengeUnlocked) {
      setActiveView('recorrido');
      setNavigationState('recorrido');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'cierre' && !store.finalChallenge.completed) {
      setActiveView('recorrido');
      setNavigationState('recorrido');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveView(view);
    if (moduleId) setActiveModuleId(moduleId);
    setNavigationState(view, moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerPrint = (target: 'all' | ArtifactKey) => {
    setPrintTarget(target);
    // Permitir que React renderice la hoja de impresión específica antes de abrir el diálogo PDF
    setTimeout(() => {
      window.print();
    }, 80);
  };

  useEffect(() => {
    const handleAfterPrint = () => {
      setPrintTarget('all');
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const keysToPrint =
    printTarget === 'all' ? ALL_ARTIFACT_KEYS : [printTarget];

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#17314F]">
      <Navbar
        activeView={activeView}
        onNavigate={(v) => navigate(v)}
        completedCount={completedModulesCount}
        centralCompleted={store.centralCase.completed}
      />

      {/* Contenido interactivo de pantalla (se oculta al imprimir PDF) */}
      <div className="no-print flex-1">
        {activeView === 'inicio' && (
          <HomeView
            centralCase={store.centralCase}
            onUpdateCentralCase={updateCentralCase}
            onStartJourney={() => navigate('modulo', 1)}
            onGoToRoute={() => navigate('recorrido')}
          />
        )}

        {activeView === 'recorrido' && (
          <RouteMapView
            store={store}
            isModuleUnlocked={isModuleUnlocked}
            isFinalChallengeUnlocked={isFinalChallengeUnlocked}
            completedModulesCount={completedModulesCount}
            onOpenModule={(id) => navigate('modulo', id)}
            onOpenCentralCase={() => {
              navigate('inicio');
              setTimeout(() => {
                document
                  .getElementById('caso-central')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}
            onOpenFinalChallenge={() => navigate('desafio')}
            onOpenClosing={() => navigate('cierre')}
          />
        )}

        {activeView === 'modulo' && (
          <ModuleWorkspace
            moduleId={activeModuleId}
            progress={store.modules[activeModuleId]}
            artifacts={store.artifacts}
            onUpdateModule={updateModule}
            onUpdateArtifact={updateArtifact}
            onBackToRoute={() => navigate('recorrido')}
            onCompleteModule={(nextId) => {
              if (nextId) {
                navigate('modulo', nextId);
              } else {
                navigate('desafio');
              }
            }}
            onPrintSingle={(k) => triggerPrint(k)}
          />
        )}

        {activeView === 'desafio' && (
          <FinalChallengeView
            state={store.finalChallenge}
            artifacts={store.artifacts}
            onUpdateState={updateFinalChallenge}
            onUpdateArtifact={updateArtifact}
            onBackToRoute={() => navigate('recorrido')}
            onFinishChallenge={() => navigate('cierre')}
            onPrintSingle={(k) => triggerPrint(k)}
          />
        )}

        {activeView === 'creaciones' && (
          <PortfolioView
            store={store}
            createdCount={createdArtifactsCount}
            isModuleUnlocked={isModuleUnlocked}
            isFinalUnlocked={isFinalChallengeUnlocked}
            onUpdateArtifact={updateArtifact}
            onGoToModuleWorkshop={(id) => {
              updateModule(id, (curr) => ({ ...curr, currentStep: 8 }));
              navigate('modulo', id);
            }}
            onGoToFinalChallenge={() => {
              updateFinalChallenge({ currentMoment: 6 });
              navigate('desafio');
            }}
            onGoToRoute={() => navigate('recorrido')}
            onPrintTarget={(t) => triggerPrint(t)}
          />
        )}

        {activeView === 'recursos' && <ResourcesView />}

        {activeView === 'acerca' && (
          <AboutView
            onGoToRoute={() => navigate('recorrido')}
            onResetProgress={() => {
              resetAllProgress();
              navigate('inicio');
            }}
          />
        )}

        {activeView === 'cierre' && (
          <ClosingView
            completedCount={completedModulesCount}
            createdCount={createdArtifactsCount}
            onViewPortfolio={() => navigate('creaciones')}
            onPrintPortfolio={() => triggerPrint('all')}
            onReviewModules={() => navigate('recorrido')}
            onGoHome={() => navigate('inicio')}
          />
        )}
      </div>

      {/* Hoja dedicada exclusiva para impresión y guardado en PDF */}
      <div className="print-only hidden bg-white p-2 text-[#17314F]">
        <div className="border-b-2 border-[#092E5D] pb-4">
          <p className="text-xs font-semibold text-[#1557A6]">
            Colegio Diego Montaña Cuéllar IED · Usme, Bogotá D. C. · Grado
            Undécimo
          </p>
          <h1 className="font-display mt-1 text-2xl font-bold text-[#092E5D]">
            HUELLA DIGITAL: Portafolio de ciudadanía digital
          </h1>
          <p className="mt-1 text-xs text-[#52677F]">
            Áreas: Tecnología e Informática y Educación Ética y en Valores
            Humanos
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {keysToPrint.map((key, index) => (
            <div
              key={key}
              className={`print-break-inside-avoid ${
                index > 0 && printTarget === 'all' ? 'mt-6' : ''
              }`}
            >
              <ArtifactPreviewCard
                artifactKey={key}
                artifacts={store.artifacts}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pie de página limpio */}
      <footer className="no-print border-t border-[#D6E4F2] bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-xs text-[#52677F] sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            <strong className="text-[#092E5D]">
              HUELLA DIGITAL: Piensa antes de publicar
            </strong>{' '}
            · Colegio Diego Montaña Cuéllar IED · Usme, Bogotá D. C.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate('recursos')}
              className="hover:text-[#1557A6] hover:underline"
            >
              Recursos y glosario
            </button>
            <button
              type="button"
              onClick={() => navigate('creaciones')}
              className="hover:text-[#1557A6] hover:underline"
            >
              Mis creaciones
            </button>
            <button
              type="button"
              onClick={() => navigate('acerca')}
              className="hover:text-[#1557A6] hover:underline"
            >
              Acerca del proyecto
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
