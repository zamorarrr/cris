import { useState } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES, FINAL_CHALLENGE_DATA } from '../data/modulesData';
import { FinalChallengeState, PortfolioArtifacts } from '../types/huella';
import { ArtifactKey } from './ArtifactPreviewCard';
import { IllustrationFrame } from './IllustrationFrame';
import { WorkshopEditor } from './WorkshopEditor';

interface FinalChallengeViewProps {
  state: FinalChallengeState;
  artifacts: PortfolioArtifacts;
  onUpdateState: (patch: Partial<FinalChallengeState>) => void;
  onUpdateArtifact: <K extends keyof PortfolioArtifacts>(
    key: K,
    updater: (current: PortfolioArtifacts[K]) => PortfolioArtifacts[K]
  ) => void;
  onBackToRoute: () => void;
  onFinishChallenge: () => void;
  onPrintSingle: (key: ArtifactKey) => void;
}

export function FinalChallengeView({
  state,
  artifacts,
  onUpdateState,
  onUpdateArtifact,
  onBackToRoute,
  onFinishChallenge,
  onPrintSingle,
}: FinalChallengeViewProps) {
  const [notice, setNotice] = useState('');
  const moment = state.currentMoment;

  const momentKeys = [
    'moment1Comprehend',
    'moment2Analyze',
    'moment3Compare',
    'moment4Decide',
    'moment5Review',
  ] as const;

  const handleNextMoment = () => {
    if (moment <= 5) {
      const key = momentKeys[moment - 1];
      if ((state[key] || '').trim().length < 12) {
        setNotice(
          'Escribe tu análisis en este momento (al menos 12 caracteres) para continuar.'
        );
        return;
      }
    }
    setNotice('');
    onUpdateState({ currentMoment: moment + 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteAll = () => {
    const f = artifacts.final;
    if (
      !f.postCaption.trim() ||
      !f.infoToShow.trim() ||
      !f.infoToProtect.trim() ||
      !f.ethicalJustification.trim()
    ) {
      setNotice(
        'Completa el texto de acompañamiento, la información a mostrar, la información a proteger y tu justificación ética.'
      );
      return;
    }
    setNotice('');
    onUpdateArtifact('final', (curr) => ({ ...curr }));
    onUpdateState({ completed: true });
    onFinishChallenge();
  };

  return (
    <main className="bg-[#EAF5FF]/40 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToRoute}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D6E4F2] bg-white px-3.5 py-2 text-sm font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Volver a la ruta</span>
          </button>

          <span className="font-mono-tabular text-sm font-semibold text-[#1557A6]">
            {moment <= 5 ? `Momento 0${moment} / 05` : 'Producto final'}
          </span>
        </div>

        {/* Presentación de la situación integradora */}
        <section className="mt-5 rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>{FINAL_CHALLENGE_DATA.subtitle}</span>
              </div>
              <h1 className="headline-balance font-display mt-1 text-2xl font-bold text-[#092E5D] sm:text-3xl">
                {FINAL_CHALLENGE_DATA.title}
              </h1>
              <div className="editorial-prose mt-4 space-y-2.5 text-base">
                {FINAL_CHALLENGE_DATA.situation.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <IllustrationFrame
                src={ASSET_IMAGES.final}
                alt="Grupo de estudiantes de grado undécimo decidiendo en equipo qué fotos de despedida publicar"
                imgClassName="aspect-[16/9]"
              />
            </div>
          </div>

          {/* Barra de pasos del desafío */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {FINAL_CHALLENGE_DATA.moments.map((m) => (
              <button
                key={m.step}
                type="button"
                onClick={() => onUpdateState({ currentMoment: m.step })}
                className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
                  moment === m.step
                    ? 'border-[#1557A6] bg-[#1557A6] text-white'
                    : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#092E5D]'
                }`}
              >
                0{m.step}. {m.title.split('. ')[1]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onUpdateState({ currentMoment: 6 })}
              className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold ${
                moment === 6
                  ? 'border-[#1557A6] bg-[#1557A6] text-white'
                  : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#092E5D]'
              }`}
            >
              06. Producto
            </button>
          </div>
        </section>

        {/* Momento activo */}
        <section className="mt-6 rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          {moment <= 5 ? (
            <div>
              <h2 className="font-display text-2xl font-bold text-[#092E5D]">
                {FINAL_CHALLENGE_DATA.moments[moment - 1].title}
              </h2>
              <p className="mt-2 text-base text-[#17314F]">
                {FINAL_CHALLENGE_DATA.moments[moment - 1].prompt}
              </p>

              <textarea
                rows={5}
                value={state[momentKeys[moment - 1]]}
                onChange={(e) =>
                  onUpdateState({ [momentKeys[moment - 1]]: e.target.value })
                }
                placeholder="Desarrolla tu análisis aplicando lo trabajado en los seis módulos..."
                className="mt-4 w-full rounded-xl border border-[#D6E4F2] px-4 py-3 text-sm text-[#17314F] focus:border-[#1557A6] focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <h2 className="font-display text-2xl font-bold text-[#092E5D]">
                Producto final: Diseño de una publicación responsable
              </h2>
              <p className="mt-2 text-sm text-[#52677F]">
                Utiliza la plantilla para diseñar la publicación ficticia de
                despedida integrando privacidad, consentimiento, identidad y
                responsabilidad.
              </p>
              <div className="mt-6">
                <WorkshopEditor
                  artifactKey="final"
                  artifacts={artifacts}
                  onUpdateArtifact={onUpdateArtifact}
                  onPrintSingle={onPrintSingle}
                />
              </div>
            </div>
          )}

          {notice && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-[#D97706]/40 bg-[#FEF3C7] px-4 py-3 text-sm text-[#92400E]"
            >
              {notice}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAF5FF] pt-6">
            <button
              type="button"
              disabled={moment === 1}
              onClick={() => onUpdateState({ currentMoment: moment - 1 })}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold ${
                moment === 1
                  ? 'cursor-not-allowed border-[#E2E8F0] text-[#52677F]/50'
                  : 'border-[#D6E4F2] bg-white text-[#092E5D] hover:bg-[#EAF5FF]'
              }`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Anterior</span>
            </button>

            {moment <= 5 ? (
              <button
                type="button"
                onClick={handleNextMoment}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1557A6] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1C69C4]"
              >
                <span>
                  {moment === 5
                    ? 'Pasar al producto final'
                    : 'Continuar al siguiente momento'}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteAll}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#059669] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#047857]"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Finalizar desafío e ir al cierre</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
