import {
  Camera,
  Compass,
  Eye,
  Heart,
  Image as ImageIcon,
  Lock,
  MapPin,
  MessageSquare,
  Send,
  Share2,
  Shield,
  Trash2,
  AlertTriangle,
  Users,
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/modulesData';
import { PortfolioArtifacts } from '../types/huella';

export type ArtifactKey = keyof PortfolioArtifacts;

function renderSmallIcon(name: string) {
  const cls = 'h-4 w-4 shrink-0';
  switch (name) {
    case 'escudo':
    case 'seguridad':
      return <Shield className={cls} aria-hidden="true" />;
    case 'corazon':
      return <Heart className={cls} aria-hidden="true" />;
    case 'ubicacion':
      return <MapPin className={cls} aria-hidden="true" />;
    case 'imagen':
    case 'camara':
      return <Camera className={cls} aria-hidden="true" />;
    case 'privacidad':
      return <Lock className={cls} aria-hidden="true" />;
    case 'consentimiento':
      return <Users className={cls} aria-hidden="true" />;
    case 'enviar':
      return <Send className={cls} aria-hidden="true" />;
    case 'compartir':
      return <Share2 className={cls} aria-hidden="true" />;
    case 'borrar':
      return <Trash2 className={cls} aria-hidden="true" />;
    case 'alerta':
      return <AlertTriangle className={cls} aria-hidden="true" />;
    case 'brujula':
      return <Compass className={cls} aria-hidden="true" />;
    case 'ojo':
      return <Eye className={cls} aria-hidden="true" />;
    default:
      return <MessageSquare className={cls} aria-hidden="true" />;
  }
}

interface ArtifactPreviewCardProps {
  artifactKey: ArtifactKey;
  artifacts: PortfolioArtifacts;
}

export function ArtifactPreviewCard({
  artifactKey,
  artifacts,
}: ArtifactPreviewCardProps) {
  if (artifactKey === 'm1') {
    const a = artifacts.m1;
    return (
      <div className="print-surface rounded-xl border border-[#D6E4F2] bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAF5FF] pb-4">
          <div>
            <p className="text-xs font-semibold text-[#1557A6]">
              Módulo 1 · Ficha visual de identidad digital responsable
            </p>
            <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
              Así quiero construir mi identidad digital
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[#1557A6]">
            {a.selectedIcons.map((ic) => (
              <span
                key={ic}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF5FF]"
              >
                {renderSmallIcon(ic)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-[#EAF5FF]/60 p-4">
            <p className="text-xs font-semibold text-[#092E5D]">
              Tres valores que quiero reflejar
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[#17314F]">
              {a.values.map((v, i) => (
                <li key={i}>• {v || 'Sin completar'}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-[#EAF5FF]/60 p-4">
            <p className="text-xs font-semibold text-[#092E5D]">
              Tres tipos de contenido que me representan
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[#17314F]">
              {a.contentTypes.map((c, i) => (
                <li key={i}>• {c || 'Sin completar'}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[#D6E4F2] p-4">
            <p className="text-xs font-semibold text-[#092E5D]">
              Dos aspectos que prefiero mantener privados
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[#17314F]">
              {a.privateAspects.map((p, i) => (
                <li key={i}>• {p || 'Sin completar'}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[#D6E4F2] p-4">
            <p className="text-xs font-semibold text-[#092E5D]">
              Conducta que quiero evitar al publicar
            </p>
            <p className="mt-2 text-sm text-[#17314F]">
              {a.behaviorToAvoid || 'Sin completar'}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#092E5D] p-4 text-white">
          <p className="text-xs font-medium text-[#6FB9F3]">
            Mi frase de identidad digital
          </p>
          <p className="font-display mt-1 text-base font-semibold">
            {a.identityPhrase
              ? `«${a.identityPhrase}»`
              : '«Escribe una frase que describa la imagen que deseas construir en internet»'}
          </p>
        </div>
      </div>
    );
  }

  if (artifactKey === 'm2') {
    const a = artifacts.m2;
    const moments = [
      {
        title: 'Antes de publicar',
        subtitle: '¿Qué debo observar?',
        recs: a.beforeRecs,
        why: a.beforeWhy,
      },
      {
        title: 'Mientras decido',
        subtitle: '¿Qué derechos y personas considero?',
        recs: a.duringRecs,
        why: a.duringWhy,
      },
      {
        title: 'Después de publicar',
        subtitle: '¿Qué hago si compartí información sensible?',
        recs: a.afterRecs,
        why: a.afterWhy,
      },
    ];

    return (
      <div className="print-surface rounded-xl border border-[#D6E4F2] bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAF5FF] pb-4">
          <div>
            <p className="text-xs font-semibold text-[#1557A6]">
              Módulo 2 · Infografía digital sobre privacidad
            </p>
            <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
              Mi filtro de privacidad en tres momentos
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[#1557A6]">
            {a.selectedIcons.map((ic) => (
              <span
                key={ic}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF5FF]"
              >
                {renderSmallIcon(ic)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {moments.map((m, idx) => (
            <div
              key={m.title}
              className="flex flex-col justify-between rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/40 p-4"
            >
              <div>
                <p className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
                  MOMENTO 0{idx + 1}
                </p>
                <h4 className="font-display mt-1 text-base font-bold text-[#092E5D]">
                  {m.title}
                </h4>
                <p className="text-xs text-[#52677F]">{m.subtitle}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-[#17314F]">
                  {m.recs.map((r, i) => (
                    <li key={i}>• {r || 'Recomendación pendiente'}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 border-t border-[#D6E4F2] pt-3">
                <p className="text-xs font-semibold text-[#092E5D]">
                  Por qué es importante:
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#52677F]">
                  {m.why || 'Sin explicación aún'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (artifactKey === 'm3') {
    const a = artifacts.m3;
    const formatNames = {
      cartel: 'Cartel digital',
      carrusel: 'Carrusel de tres tarjetas',
      historieta: 'Historieta de tres escenas',
    };

    return (
      <div className="print-surface rounded-xl border border-[#D6E4F2] bg-white p-6">
        <div className="border-b border-[#EAF5FF] pb-4">
          <p className="text-xs font-semibold text-[#1557A6]">
            Módulo 3 · Mini campaña de consentimiento y respeto ·{' '}
            {formatNames[a.format]}
          </p>
          <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
            {a.title || 'Compartir también es respetar'}
          </h3>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-[#EAF5FF]/70 p-4">
            <p className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
              01 · SITUACIÓN
            </p>
            <p className="mt-2 text-sm text-[#17314F]">
              {a.situation || 'Describe la situación que involucra a otra persona.'}
            </p>
          </div>
          <div className="rounded-lg bg-[#EAF5FF]/70 p-4">
            <p className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
              02 · CONFLICTO DE CONSENTIMIENTO
            </p>
            <p className="mt-2 text-sm text-[#17314F]">
              {a.consentConflict || 'Explica el dilema o desacuerdo sobre la publicación.'}
            </p>
          </div>
          <div className="rounded-lg bg-[#EAF5FF]/70 p-4">
            <p className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
              03 · ACTUACIÓN RESPETUOSA
            </p>
            <p className="mt-2 text-sm text-[#17314F]">
              {a.respectfulAction || 'Propón una solución basada en el respeto y el diálogo.'}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#092E5D] p-4 text-white">
          <p className="text-xs text-[#6FB9F3]">Frase final de campaña</p>
          <p className="font-display mt-1 text-base font-semibold">
            {a.closingPhrase || '«Antes de publicar a alguien más, pregunta y escucha.»'}
          </p>
        </div>
      </div>
    );
  }

  if (artifactKey === 'm4') {
    const a = artifacts.m4;
    return (
      <div className="print-surface rounded-xl border border-[#D6E4F2] bg-white p-6">
        <div className="border-b border-[#EAF5FF] pb-4">
          <p className="text-xs font-semibold text-[#1557A6]">
            Módulo 4 · Línea de tiempo visual
          </p>
          <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
            {a.caseTitle || 'El recorrido de una publicación'}
          </h3>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {a.nodes.map((node, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/35 p-3.5"
            >
              <div className="flex items-center gap-2 text-[#1557A6]">
                {renderSmallIcon(node.icon)}
                <span className="font-mono-tabular text-xs font-semibold">
                  PASO 0{idx + 1}
                </span>
              </div>
              <h4 className="mt-1.5 text-sm font-bold text-[#092E5D]">
                {node.title || `Momento ${idx + 1}`}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-[#17314F]">
                {node.description || 'Descripción del momento pendiente.'}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-[#092E5D] p-4 text-white">
            <p className="text-xs text-[#6FB9F3]">Decisión clave</p>
            <p className="mt-1 text-sm">
              {a.keyDecision || 'Sin definir aún'}
            </p>
          </div>
          <div className="rounded-lg bg-[#EAF5FF] p-4">
            <p className="text-xs font-semibold text-[#092E5D]">
              Acción preventiva 1
            </p>
            <p className="mt-1 text-sm text-[#17314F]">
              {a.preventiveAction1 || 'Sin definir aún'}
            </p>
          </div>
          <div className="rounded-lg bg-[#EAF5FF] p-4">
            <p className="text-xs font-semibold text-[#092E5D]">
              Acción de atención 2
            </p>
            <p className="mt-1 text-sm text-[#17314F]">
              {a.preventiveAction2 || 'Sin definir aún'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (artifactKey === 'm5') {
    const a = artifacts.m5;
    const rows = [
      { label: '1. Situación que debo resolver', value: a.situation },
      { label: '2. Personas y derechos involucrados', value: a.peopleAndRights },
      { label: '3. Alternativas posibles', value: a.alternatives },
      { label: '4. Consecuencias de cada alternativa', value: a.consequences },
      {
        label: '5. Decisión más responsable y razones',
        value: a.responsibleDecision,
      },
    ];
    return (
      <div className="print-surface rounded-xl border border-[#D6E4F2] bg-white p-6">
        <div className="border-b border-[#EAF5FF] pb-4">
          <p className="text-xs font-semibold text-[#1557A6]">
            Módulo 5 · Matriz de análisis ético
          </p>
          <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
            Mi brújula ética digital: {a.chosenCaseTitle}
          </h3>
        </div>
        <div className="mt-4 divide-y divide-[#EAF5FF]">
          {rows.map((r) => (
            <div key={r.label} className="py-3">
              <p className="text-xs font-semibold text-[#1557A6]">{r.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#17314F]">
                {r.value || 'Sin completar'}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (artifactKey === 'm6') {
    const a = artifacts.m6;
    return (
      <div className="print-surface rounded-xl border border-[#D6E4F2] bg-[#092E5D] p-6 text-white sm:p-8">
        <p className="text-xs font-semibold text-[#6FB9F3]">
          Módulo 6 · Manifiesto visual personal de ciudadanía digital
        </p>
        <h3 className="font-display mt-2 text-2xl font-bold text-white">
          {a.title || 'Mi compromiso digital'}
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-12">
          <div className="rounded-xl bg-white/10 p-4 md:col-span-7">
            <p className="text-xs font-semibold text-[#6FB9F3]">
              Mis cinco compromisos
            </p>
            <ol className="mt-2.5 space-y-2 text-sm text-white">
              {a.commitments.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-mono-tabular text-[#6FB9F3]">
                    0{i + 1}
                  </span>
                  <span>{c || `Compromiso ${i + 1} pendiente`}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-3 md:col-span-5">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-semibold text-[#6FB9F3]">
                Para cuidar mi privacidad
              </p>
              <p className="mt-1 text-sm text-[#EAF5FF]">
                {a.privacyAction || 'Sin completar'}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-semibold text-[#6FB9F3]">
                Para respetar a los demás
              </p>
              <p className="mt-1 text-sm text-[#EAF5FF]">
                {a.respectAction || 'Sin completar'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 text-[#092E5D]">
          <p className="text-xs font-semibold text-[#1557A6]">
            Por qué importan estos compromisos
          </p>
          <p className="mt-1 text-sm text-[#17314F]">
            {a.whyImportant || 'Sin completar'}
          </p>
          <p className="font-display mt-3 border-t border-[#EAF5FF] pt-3 text-base font-bold text-[#092E5D]">
            {a.closingMotto
              ? `«${a.closingMotto}»`
              : '«Frase final sobre la huella digital que deseo dejar»'}
          </p>
        </div>
      </div>
    );
  }

  // Actividad integradora final
  const f = artifacts.final;
  const visualMap = {
    despedida: ASSET_IMAGES.final,
    reunion: ASSET_IMAGES.centralCase,
    identidad: ASSET_IMAGES.m1,
    consentimiento: ASSET_IMAGES.m3,
  };

  return (
    <div className="print-surface rounded-xl border border-[#D6E4F2] bg-white p-6">
      <div className="border-b border-[#EAF5FF] pb-4">
        <p className="text-xs font-semibold text-[#1557A6]">
          Actividad integradora final · Diseño de publicación responsable
        </p>
        <h3 className="font-display mt-1 text-xl font-bold text-[#092E5D]">
          Propuesta de publicación de despedida — Grado Undécimo
        </h3>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-12">
        <div className="overflow-hidden rounded-xl border border-[#D6E4F2] bg-[#EAF5FF] md:col-span-5">
          <img
            src={visualMap[f.selectedVisual]}
            alt="Ilustración seleccionada para la publicación responsable de despedida"
            referrerPolicy="no-referrer"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="bg-white p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1557A6]">
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Texto de acompañamiento</span>
            </div>
            <p className="mt-1.5 text-sm text-[#17314F]">
              {f.postCaption || 'Texto de acompañamiento pendiente.'}
            </p>
          </div>
        </div>

        <div className="space-y-3 md:col-span-7">
          <div className="rounded-lg bg-[#EAF5FF]/60 p-3.5">
            <p className="text-xs font-semibold text-[#092E5D]">
              Información que se decide mostrar
            </p>
            <p className="mt-1 text-sm text-[#17314F]">
              {f.infoToShow || 'Sin completar'}
            </p>
          </div>
          <div className="rounded-lg bg-[#EAF5FF]/60 p-3.5">
            <p className="text-xs font-semibold text-[#092E5D]">
              Información que se prefiere proteger
            </p>
            <p className="mt-1 text-sm text-[#17314F]">
              {f.infoToProtect || 'Sin completar'}
            </p>
          </div>
          <div className="rounded-lg border border-[#D6E4F2] p-3.5">
            <p className="text-xs font-semibold text-[#092E5D]">
              Consideraciones sobre las personas involucradas
            </p>
            <p className="mt-1 text-sm text-[#17314F]">
              {f.peopleConsiderations || 'Sin completar'}
            </p>
          </div>
          <div className="rounded-lg bg-[#092E5D] p-4 text-white">
            <p className="text-xs font-semibold text-[#6FB9F3]">
              Justificación ética (privacidad, dignidad y responsabilidad)
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#EAF5FF]">
              {f.ethicalJustification || 'Sin completar'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
