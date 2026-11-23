import { useCallback, useEffect, useState } from 'react';
import {
  AppView,
  HuellaStore,
  ModuleId,
  ModuleProgress,
  PortfolioArtifacts,
} from '../types/huella';

const STORAGE_KEY = 'huella_digital_dmc_v1';

function createEmptyModuleProgress(): ModuleProgress {
  return {
    currentStep: 1,
    highestStepReached: 1,
    completed: false,
    analysisAnswers: {},
    m2HotspotsFound: [],
    m3PerspectivesRead: [],
    m3SelectedValues: [],
    m3ValuesJustification: '',
    m4NodesExplored: [],
    m5Classifications: {},
    m5RespectAnswer: '',
    m5ConsequenceAnswer: '',
    m6PostAssessments: {},
    m6SelectedPrinciples: [],
    m6PrioritiesExplanation: '',
    decisionOption: '',
    customDecisionText: '',
    decisionJustification: '',
    revisedDecisionText: '',
    finalReflection: '',
  };
}

export function createInitialStore(): HuellaStore {
  return {
    centralCase: {
      selectedOption: '',
      explanation: '',
      completed: false,
    },
    modules: {
      1: createEmptyModuleProgress(),
      2: createEmptyModuleProgress(),
      3: createEmptyModuleProgress(),
      4: createEmptyModuleProgress(),
      5: createEmptyModuleProgress(),
      6: createEmptyModuleProgress(),
    },
    finalChallenge: {
      currentMoment: 1,
      completed: false,
      moment1Comprehend: '',
      moment2Analyze: '',
      moment3Compare: '',
      moment4Decide: '',
      moment5Review: '',
    },
    artifacts: {
      m1: {
        updatedAt: '',
        selectedIcons: ['escudo', 'corazon'],
        values: ['', '', ''],
        contentTypes: ['', '', ''],
        privateAspects: ['', ''],
        behaviorToAvoid: '',
        identityPhrase: '',
        checklist: [false, false, false, false, false, false],
      },
      m2: {
        updatedAt: '',
        selectedIcons: ['ubicacion', 'privacidad', 'seguridad'],
        beforeRecs: ['', ''],
        beforeWhy: '',
        duringRecs: ['', ''],
        duringWhy: '',
        afterRecs: ['', ''],
        afterWhy: '',
        checklist: [false, false, false, false, false, false],
      },
      m3: {
        updatedAt: '',
        format: 'cartel',
        title: '',
        situation: '',
        consentConflict: '',
        respectfulAction: '',
        closingPhrase: '',
        checklist: [false, false, false, false, false, false],
      },
      m4: {
        updatedAt: '',
        caseTitle: '',
        nodes: [
          { title: '1. Creación del contenido', description: '', icon: 'camara' },
          { title: '2. Publicación inicial', description: '', icon: 'enviar' },
          { title: '3. Reacciones y copias', description: '', icon: 'compartir' },
          { title: '4. Intento de retiro', description: '', icon: 'borrar' },
          { title: '5. Reaparición posterior', description: '', icon: 'alerta' },
          { title: '6. Respuesta responsable', description: '', icon: 'escudo' },
        ],
        keyDecision: '',
        preventiveAction1: '',
        preventiveAction2: '',
        checklist: [false, false, false, false, false, false],
      },
      m5: {
        updatedAt: '',
        chosenCaseTitle: 'Difusión de un audio editado en un chat escolar',
        situation: '',
        peopleAndRights: '',
        alternatives: '',
        consequences: '',
        responsibleDecision: '',
        checklist: [false, false, false, false, false, false],
      },
      m6: {
        updatedAt: '',
        title: '',
        commitments: ['', '', '', '', ''],
        whyImportant: '',
        privacyAction: '',
        respectAction: '',
        closingMotto: '',
        checklist: [false, false, false, false, false, false],
      },
      final: {
        updatedAt: '',
        selectedVisual: 'despedida',
        postCaption: '',
        infoToShow: '',
        infoToProtect: '',
        peopleConsiderations: '',
        ethicalJustification: '',
        checklist: [false, false, false, false, false, false],
      },
    },
    lastActiveView: 'inicio',
    lastActiveModule: 1,
  };
}

function loadStore(): HuellaStore {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialStore();
    const parsed = JSON.parse(raw) as Partial<HuellaStore>;
    const base = createInitialStore();
    return {
      ...base,
      ...parsed,
      centralCase: { ...base.centralCase, ...(parsed.centralCase || {}) },
      modules: {
        1: { ...base.modules[1], ...(parsed.modules?.[1] || {}) },
        2: { ...base.modules[2], ...(parsed.modules?.[2] || {}) },
        3: { ...base.modules[3], ...(parsed.modules?.[3] || {}) },
        4: { ...base.modules[4], ...(parsed.modules?.[4] || {}) },
        5: { ...base.modules[5], ...(parsed.modules?.[5] || {}) },
        6: { ...base.modules[6], ...(parsed.modules?.[6] || {}) },
      },
      finalChallenge: { ...base.finalChallenge, ...(parsed.finalChallenge || {}) },
      artifacts: {
        m1: { ...base.artifacts.m1, ...(parsed.artifacts?.m1 || {}) },
        m2: { ...base.artifacts.m2, ...(parsed.artifacts?.m2 || {}) },
        m3: { ...base.artifacts.m3, ...(parsed.artifacts?.m3 || {}) },
        m4: { ...base.artifacts.m4, ...(parsed.artifacts?.m4 || {}) },
        m5: { ...base.artifacts.m5, ...(parsed.artifacts?.m5 || {}) },
        m6: { ...base.artifacts.m6, ...(parsed.artifacts?.m6 || {}) },
        final: { ...base.artifacts.final, ...(parsed.artifacts?.final || {}) },
      },
    };
  } catch {
    return createInitialStore();
  }
}

export function useHuellaStorage() {
  const [store, setStore] = useState<HuellaStore>(() => loadStore());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [store]);

  const updateCentralCase = useCallback(
    (patch: Partial<HuellaStore['centralCase']>) => {
      setStore((prev) => ({
        ...prev,
        centralCase: { ...prev.centralCase, ...patch },
      }));
    },
    []
  );

  const updateModule = useCallback(
    (moduleId: ModuleId, updater: (current: ModuleProgress) => ModuleProgress) => {
      setStore((prev) => ({
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: updater(prev.modules[moduleId]),
        },
      }));
    },
    []
  );

  const updateFinalChallenge = useCallback(
    (patch: Partial<HuellaStore['finalChallenge']>) => {
      setStore((prev) => ({
        ...prev,
        finalChallenge: { ...prev.finalChallenge, ...patch },
      }));
    },
    []
  );

  const updateArtifact = useCallback(
    <K extends keyof PortfolioArtifacts>(
      key: K,
      updater: (current: PortfolioArtifacts[K]) => PortfolioArtifacts[K]
    ) => {
      setStore((prev) => ({
        ...prev,
        artifacts: {
          ...prev.artifacts,
          [key]: {
            ...updater(prev.artifacts[key]),
            updatedAt: new Date().toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
          },
        },
      }));
    },
    []
  );

  const setNavigationState = useCallback((view: AppView, moduleId?: ModuleId) => {
    setStore((prev) => ({
      ...prev,
      lastActiveView: view,
      lastActiveModule: moduleId ?? prev.lastActiveModule,
    }));
  }, []);

  const resetAllProgress = useCallback(() => {
    const fresh = createInitialStore();
    setStore(fresh);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Reglas estrictas de desbloqueo secuencial
  const isModuleUnlocked = useCallback(
    (moduleId: ModuleId): boolean => {
      if (!store.centralCase.completed) return false;
      if (moduleId === 1) return true;
      const prevId = (moduleId - 1) as ModuleId;
      return store.modules[prevId].completed;
    },
    [store.centralCase.completed, store.modules]
  );

  const isFinalChallengeUnlocked = store.modules[6].completed;

  const completedModulesCount = ([1, 2, 3, 4, 5, 6] as ModuleId[]).filter(
    (id) => store.modules[id].completed
  ).length;

  const createdArtifactsCount = (
    ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'final'] as (keyof PortfolioArtifacts)[]
  ).filter((k) => Boolean(store.artifacts[k].updatedAt)).length;

  return {
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
  };
}
