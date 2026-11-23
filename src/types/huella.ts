export type AppView =
  | 'inicio'
  | 'recorrido'
  | 'modulo'
  | 'desafio'
  | 'creaciones'
  | 'recursos'
  | 'acerca'
  | 'cierre';

export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6;

export interface ConceptItem {
  term: string;
  definition: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  feedbackTitle: string;
  feedbackBody: string;
  conceptualNote: string;
  consequenceNote: string;
  perspectiveNote: string;
}

export interface CharacterPerspective {
  id: string;
  name: string;
  role: string;
  stance: string;
  quote: string;
}

export interface PrivacyHotspot {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  reveals: string;
  whyItMatters: string;
}

export interface TimelineNode {
  step: number;
  title: string;
  description: string;
  decisionPrompt: string;
  insight: string;
}

export interface ArgumentCard {
  id: string;
  quote: string;
  category: 'valores' | 'derechos' | 'consecuencias';
  explanation: string;
}

export interface SimulatedPostReview {
  id: string;
  title: string;
  author: string;
  content: string;
  tag: string;
  recommendedAssessment: 'positivo' | 'revisar';
  guidance: string;
}

export interface ModuleDefinition {
  id: ModuleId;
  shortTitle: string;
  title: string;
  centralQuestion: string;
  summary: string;
  illustration: string;
  illustrationAlt: string;
  introduction: string[];
  concepts: ConceptItem[];
  caseTitle: string;
  caseStory: string[];
  analysisPrompt: string;
  analysisQuestions?: string[];
  alternatives: DecisionOption[];
  allowCustomAlternative: boolean;
  newInfoTitle: string;
  newInfoText: string;
  newInfoQuestion: string;
  workshopTitle: string;
  workshopProductTitle: string;
  workshopDescription: string;
  reflectionQuestion: string;
  closingTakeaway: string;
}

// Estado del caso central
export interface CentralCaseState {
  selectedOption: string;
  explanation: string;
  completed: boolean;
}

// Estado individual por módulo (9 momentos)
export interface ModuleProgress {
  currentStep: number; // 1..9
  highestStepReached: number; // 1..9
  completed: boolean;
  // Respuestas del módulo
  analysisAnswers: Record<string, string>;
  // Interacciones específicas
  m2HotspotsFound: string[];
  m3PerspectivesRead: string[];
  m3SelectedValues: string[];
  m3ValuesJustification: string;
  m4NodesExplored: number[];
  m5Classifications: Record<string, 'valores' | 'derechos' | 'consecuencias'>;
  m5RespectAnswer: string;
  m5ConsequenceAnswer: string;
  m6PostAssessments: Record<string, { status: 'positivo' | 'revisar' | ''; question: string }>;
  m6SelectedPrinciples: string[];
  m6PrioritiesExplanation: string;
  // Paso 5 y 7 comunes
  decisionOption: string;
  customDecisionText: string;
  decisionJustification: string;
  revisedDecisionText: string;
  // Paso 9
  finalReflection: string;
}

export interface FinalChallengeState {
  currentMoment: number; // 1..5 + 6 (producto final)
  completed: boolean;
  moment1Comprehend: string;
  moment2Analyze: string;
  moment3Compare: string;
  moment4Decide: string;
  moment5Review: string;
}

// Productos del portafolio (6 talleres + actividad integradora)
export interface M1IdentityArtifact {
  updatedAt: string;
  selectedIcons: string[];
  values: [string, string, string];
  contentTypes: [string, string, string];
  privateAspects: [string, string];
  behaviorToAvoid: string;
  identityPhrase: string;
  checklist: boolean[];
}

export interface M2PrivacyArtifact {
  updatedAt: string;
  selectedIcons: string[];
  beforeRecs: [string, string];
  beforeWhy: string;
  duringRecs: [string, string];
  duringWhy: string;
  afterRecs: [string, string];
  afterWhy: string;
  checklist: boolean[];
}

export interface M3CampaignArtifact {
  updatedAt: string;
  format: 'cartel' | 'carrusel' | 'historieta';
  title: string;
  situation: string;
  consentConflict: string;
  respectfulAction: string;
  closingPhrase: string;
  checklist: boolean[];
}

export interface M4TimelineNodeItem {
  title: string;
  description: string;
  icon: string;
}

export interface M4TimelineArtifact {
  updatedAt: string;
  caseTitle: string;
  nodes: M4TimelineNodeItem[];
  keyDecision: string;
  preventiveAction1: string;
  preventiveAction2: string;
  checklist: boolean[];
}

export interface M5CompassArtifact {
  updatedAt: string;
  chosenCaseTitle: string;
  situation: string;
  peopleAndRights: string;
  alternatives: string;
  consequences: string;
  responsibleDecision: string;
  checklist: boolean[];
}

export interface M6ManifestoArtifact {
  updatedAt: string;
  title: string;
  commitments: [string, string, string, string, string];
  whyImportant: string;
  privacyAction: string;
  respectAction: string;
  closingMotto: string;
  checklist: boolean[];
}

export interface FinalPostArtifact {
  updatedAt: string;
  selectedVisual: 'despedida' | 'reunion' | 'identidad' | 'consentimiento';
  postCaption: string;
  infoToShow: string;
  infoToProtect: string;
  peopleConsiderations: string;
  ethicalJustification: string;
  checklist: boolean[];
}

export interface PortfolioArtifacts {
  m1: M1IdentityArtifact;
  m2: M2PrivacyArtifact;
  m3: M3CampaignArtifact;
  m4: M4TimelineArtifact;
  m5: M5CompassArtifact;
  m6: M6ManifestoArtifact;
  final: FinalPostArtifact;
}

export interface HuellaStore {
  centralCase: CentralCaseState;
  modules: Record<ModuleId, ModuleProgress>;
  finalChallenge: FinalChallengeState;
  artifacts: PortfolioArtifacts;
  lastActiveView: AppView;
  lastActiveModule: ModuleId;
}
