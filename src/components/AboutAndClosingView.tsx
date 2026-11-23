import { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Printer,
  RotateCcw,
  School,
} from 'lucide-react';

interface AboutViewProps {
  onGoToRoute: () => void;
  onResetProgress: () => void;
}

export function AboutView({ onGoToRoute, onResetProgress }: AboutViewProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <main className="bg-[#EAF5FF]/40 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1557A6]">
            <School className="h-5 w-5" aria-hidden="true" />
            <span>Acerca del proyecto educativo</span>
          </div>
          <h1 className="headline-balance font-display mt-2 text-3xl font-bold text-[#092E5D] sm:text-4xl">
            HUELLA DIGITAL: Piensa antes de publicar
          </h1>

          <div className="mt-6 grid gap-4 rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/50 p-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-[#52677F]">
                Institución de referencia
              </p>
              <p className="mt-1 text-base font-bold text-[#092E5D]">
                Colegio Diego Montaña Cuéllar IED
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#52677F]">Ubicación</p>
              <p className="mt-1 text-base font-bold text-[#092E5D]">
                Usme, Bogotá D. C., Colombia
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#52677F]">
                Grado destinatario
              </p>
              <p className="mt-1 text-base font-bold text-[#092E5D]">
                Undécimo
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#52677F]">
                Áreas articuladas
              </p>
              <p className="mt-1 text-base font-bold text-[#092E5D]">
                Tecnología e Informática · Educación Ética y en Valores Humanos
              </p>
            </div>
          </div>

          <div className="editorial-prose mt-6 space-y-4">
            <p>
              Este recurso educativo digital nace para acompañar a los
              estudiantes de grado undécimo en el análisis crítico de lo que
              comparten en redes sociales. En lugar de presentar listas de
              prohibiciones, propone dilemas realistas, perspectivas múltiples y
              talleres creativos que fortalecen la autonomía y el cuidado mutuo.
            </p>
            <p>
              Toda la experiencia funciona directamente en el navegador y no
              solicita cuentas, contraseñas ni fotografías personales reales.
              Los datos escritos permanecen almacenados de forma local en el
              dispositivo actual y pueden perderse si se borra el historial o
              almacenamiento del navegador.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAF5FF] pt-6">
            <button
              type="button"
              onClick={onGoToRoute}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1557A6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C69C4]"
            >
              <span>Ir a la ruta de aprendizaje</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6E4F2] px-4 py-2.5 text-sm font-semibold text-[#52677F] hover:bg-[#EAF5FF] hover:text-[#092E5D]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Reiniciar progreso local</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#DC2626]/30 bg-[#FEF2F2] px-4 py-2">
                <span className="text-xs font-semibold text-[#991B1B]">
                  ¿Borrar respuestas y portafolio guardados?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                  }}
                  className="rounded bg-[#DC2626] px-3 py-1 text-xs font-semibold text-white"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded bg-white px-3 py-1 text-xs font-semibold text-[#17314F]"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

interface ClosingViewProps {
  completedCount: number;
  createdCount: number;
  onViewPortfolio: () => void;
  onPrintPortfolio: () => void;
  onReviewModules: () => void;
  onGoHome: () => void;
}

export function ClosingView({
  completedCount,
  createdCount,
  onViewPortfolio,
  onPrintPortfolio,
  onReviewModules,
  onGoHome,
}: ClosingViewProps) {
  return (
    <main className="bg-[#092E5D] py-14 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8 sm:p-12">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#6FB9F3]">
            <Award className="h-5 w-5" aria-hidden="true" />
            <span>Cierre del recorrido educativo</span>
          </div>

          <h1 className="headline-balance font-display mt-3 text-3xl font-extrabold text-white sm:text-5xl">
            Tu huella no termina aquí.
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#E3EEFA] sm:text-[17px]">
            <p>
              Durante este recorrido analizaste situaciones relacionadas con las
              redes sociales, la privacidad, el respeto y las consecuencias de
              lo que compartimos.
            </p>
            <p>
              También conociste diferentes puntos de vista, tomaste decisiones y
              construiste materiales para expresar lo aprendido.
            </p>
            <p>
              Ahora tienes más herramientas para preguntarte qué información
              deseas compartir, a quién puede afectar una publicación y qué
              razones te ayudan a tomar una decisión responsable.
            </p>
            <p>
              Recuerda que participar en internet también implica reconocer a
              las personas que están al otro lado de la pantalla.
            </p>
            <p className="font-display text-lg font-bold text-[#6FB9F3]">
              Cada publicación es una decisión. Piensa qué huella quieres dejar.
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-xl bg-white/10 p-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="h-5 w-5 text-[#6FB9F3]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs text-[#BFD9F7]">Módulos completados</p>
                <p className="font-mono-tabular text-lg font-bold text-white">
                  {completedCount} / 6
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="h-5 w-5 text-[#6FB9F3]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs text-[#BFD9F7]">
                  Materiales en el portafolio
                </p>
                <p className="font-mono-tabular text-lg font-bold text-white">
                  {createdCount} / 7
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onViewPortfolio}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#6FB9F3] px-5 py-2.5 text-sm font-bold text-[#092E5D] hover:bg-white"
            >
              <span>Ver mis creaciones</span>
            </button>

            <button
              type="button"
              onClick={onPrintPortfolio}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1557A6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C69C4]"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>Descargar mi portafolio (PDF)</span>
            </button>

            <button
              type="button"
              onClick={onReviewModules}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Revisar los módulos
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
