import { useState } from 'react';
import { CheckCircle2, Eye, Printer, Save } from 'lucide-react';
import { WORKSHOP_CRITERIA } from '../data/modulesData';
import { PortfolioArtifacts } from '../types/huella';
import { ArtifactKey, ArtifactPreviewCard } from './ArtifactPreviewCard';

interface WorkshopEditorProps {
  artifactKey: ArtifactKey;
  artifacts: PortfolioArtifacts;
  onUpdateArtifact: <K extends keyof PortfolioArtifacts>(
    key: K,
    updater: (current: PortfolioArtifacts[K]) => PortfolioArtifacts[K]
  ) => void;
  onPrintSingle?: (key: ArtifactKey) => void;
  onSaved?: () => void;
}

const M1_ICONS = [
  { id: 'escudo', label: 'Respeto' },
  { id: 'corazon', label: 'Empatía' },
  { id: 'brujula', label: 'Criterio' },
  { id: 'ojo', label: 'Atención' },
  { id: 'privacidad', label: 'Privacidad' },
];

const M2_ICONS = [
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'imagen', label: 'Imagen' },
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'consentimiento', label: 'Consentimiento' },
  { id: 'seguridad', label: 'Seguridad' },
];

const M4_ICONS = [
  { id: 'camara', label: 'Grabación' },
  { id: 'enviar', label: 'Publicación' },
  { id: 'compartir', label: 'Difusión' },
  { id: 'borrar', label: 'Eliminación' },
  { id: 'alerta', label: 'Reaparición' },
  { id: 'escudo', label: 'Protección' },
];

const M5_NEW_CASES = [
  'Difusión de un audio editado en un chat escolar',
  'Captura de una conversación privada compartida sin permiso',
  'Publicación de una lista con apodos de compañeros de curso',
];

export function WorkshopEditor({
  artifactKey,
  artifacts,
  onUpdateArtifact,
  onPrintSingle,
  onSaved,
}: WorkshopEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const currentChecklist = artifacts[artifactKey].checklist;

  const toggleChecklist = (idx: number) => {
    onUpdateArtifact(artifactKey, (curr) => {
      const next = [...curr.checklist];
      next[idx] = !next[idx];
      return { ...curr, checklist: next };
    });
  };

  const handleSave = () => {
    onUpdateArtifact(artifactKey, (curr) => ({ ...curr }));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
    onSaved?.();
  };

  return (
    <div className="space-y-8">
      {/* Editor específico según módulo */}
      <div className="rounded-xl border border-[#D6E4F2] bg-white p-5 sm:p-6">
        {artifactKey === 'm1' && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-[#092E5D]">
                Elige los iconos que acompañarán tu ficha
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {M1_ICONS.map((ic) => {
                  const active = artifacts.m1.selectedIcons.includes(ic.id);
                  return (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() =>
                        onUpdateArtifact('m1', (c) => ({
                          ...c,
                          selectedIcons: active
                            ? c.selectedIcons.filter((x) => x !== ic.id)
                            : [...c.selectedIcons, ic.id],
                        }))
                      }
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        active
                          ? 'border-[#1557A6] bg-[#1557A6] text-white'
                          : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#17314F]'
                      }`}
                    >
                      {ic.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {artifacts.m1.values.map((val, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-[#092E5D]">
                    1.{i + 1} Valor que quiero reflejar
                  </label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) =>
                      onUpdateArtifact('m1', (c) => {
                        const next = [...c.values] as [string, string, string];
                        next[i] = e.target.value;
                        return { ...c, values: next };
                      })
                    }
                    placeholder={`Ej. ${['Respeto', 'Empatía', 'Autenticidad'][i]}`}
                    className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {artifacts.m1.contentTypes.map((ct, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-[#092E5D]">
                    2.{i + 1} Contenido que me representa
                  </label>
                  <input
                    type="text"
                    value={ct}
                    onChange={(e) =>
                      onUpdateArtifact('m1', (c) => {
                        const next = [...c.contentTypes] as [
                          string,
                          string,
                          string,
                        ];
                        next[i] = e.target.value;
                        return { ...c, contentTypes: next };
                      })
                    }
                    placeholder={`Ej. ${['Proyectos escolares', 'Música o arte', 'Opiniones respetuosas'][i]}`}
                    className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {artifacts.m1.privateAspects.map((pa, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-[#092E5D]">
                    3.{i + 1} Aspecto que prefiero mantener privado
                  </label>
                  <input
                    type="text"
                    value={pa}
                    onChange={(e) =>
                      onUpdateArtifact('m1', (c) => {
                        const next = [...c.privateAspects] as [string, string];
                        next[i] = e.target.value;
                        return { ...c, privateAspects: next };
                      })
                    }
                    placeholder={`Ej. ${['Mi dirección o rutina diaria', 'Conversaciones familiares'][i]}`}
                    className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                4. Una conducta que quiero evitar al publicar
              </label>
              <input
                type="text"
                value={artifacts.m1.behaviorToAvoid}
                onChange={(e) =>
                  onUpdateArtifact('m1', (c) => ({
                    ...c,
                    behaviorToAvoid: e.target.value,
                  }))
                }
                placeholder="Ej. Compartir bromas que expongan o ridiculicen a alguien"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                5. Frase que describa la imagen que deseo construir en internet
              </label>
              <textarea
                rows={2}
                value={artifacts.m1.identityPhrase}
                onChange={(e) =>
                  onUpdateArtifact('m1', (c) => ({
                    ...c,
                    identityPhrase: e.target.value,
                  }))
                }
                placeholder="Escribe tu frase personal..."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>
          </div>
        )}

        {artifactKey === 'm2' && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#092E5D]">
                Iconos de tu infografía de privacidad
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {M2_ICONS.map((ic) => {
                  const active = artifacts.m2.selectedIcons.includes(ic.id);
                  return (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() =>
                        onUpdateArtifact('m2', (c) => ({
                          ...c,
                          selectedIcons: active
                            ? c.selectedIcons.filter((x) => x !== ic.id)
                            : [...c.selectedIcons, ic.id],
                        }))
                      }
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        active
                          ? 'border-[#1557A6] bg-[#1557A6] text-white'
                          : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#17314F]'
                      }`}
                    >
                      {ic.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Momento 1: Antes */}
            <div className="rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/35 p-4">
              <h4 className="font-display text-sm font-bold text-[#092E5D]">
                Antes de publicar: ¿qué debo observar?
              </h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <input
                    key={i}
                    type="text"
                    value={artifacts.m2.beforeRecs[i]}
                    onChange={(e) =>
                      onUpdateArtifact('m2', (c) => {
                        const next = [...c.beforeRecs] as [string, string];
                        next[i] = e.target.value;
                        return { ...c, beforeRecs: next };
                      })
                    }
                    placeholder={`Recomendación ${i + 1}`}
                    className="w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                ))}
              </div>
              <textarea
                rows={2}
                value={artifacts.m2.beforeWhy}
                onChange={(e) =>
                  onUpdateArtifact('m2', (c) => ({
                    ...c,
                    beforeWhy: e.target.value,
                  }))
                }
                placeholder="Explica brevemente por qué son importantes estas recomendaciones..."
                className="mt-3 w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            {/* Momento 2: Mientras decido */}
            <div className="rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/35 p-4">
              <h4 className="font-display text-sm font-bold text-[#092E5D]">
                Mientras decido: ¿qué derechos y personas debo considerar?
              </h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <input
                    key={i}
                    type="text"
                    value={artifacts.m2.duringRecs[i]}
                    onChange={(e) =>
                      onUpdateArtifact('m2', (c) => {
                        const next = [...c.duringRecs] as [string, string];
                        next[i] = e.target.value;
                        return { ...c, duringRecs: next };
                      })
                    }
                    placeholder={`Recomendación ${i + 1}`}
                    className="w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                ))}
              </div>
              <textarea
                rows={2}
                value={artifacts.m2.duringWhy}
                onChange={(e) =>
                  onUpdateArtifact('m2', (c) => ({
                    ...c,
                    duringWhy: e.target.value,
                  }))
                }
                placeholder="Explica brevemente por qué son importantes..."
                className="mt-3 w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            {/* Momento 3: Después */}
            <div className="rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/35 p-4">
              <h4 className="font-display text-sm font-bold text-[#092E5D]">
                Después de publicar: ¿qué hacer si compartí información que no quería divulgar?
              </h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <input
                    key={i}
                    type="text"
                    value={artifacts.m2.afterRecs[i]}
                    onChange={(e) =>
                      onUpdateArtifact('m2', (c) => {
                        const next = [...c.afterRecs] as [string, string];
                        next[i] = e.target.value;
                        return { ...c, afterRecs: next };
                      })
                    }
                    placeholder={`Recomendación ${i + 1}`}
                    className="w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                ))}
              </div>
              <textarea
                rows={2}
                value={artifacts.m2.afterWhy}
                onChange={(e) =>
                  onUpdateArtifact('m2', (c) => ({
                    ...c,
                    afterWhy: e.target.value,
                  }))
                }
                placeholder="Explica brevemente por qué son importantes..."
                className="mt-3 w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>
          </div>
        )}

        {artifactKey === 'm3' && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-[#092E5D]">
                Formato de tu mini campaña
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {(
                  [
                    { id: 'cartel', label: 'Cartel digital' },
                    { id: 'carrusel', label: 'Carrusel de tres tarjetas' },
                    { id: 'historieta', label: 'Historieta de tres escenas' },
                  ] as const
                ).map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() =>
                      onUpdateArtifact('m3', (c) => ({ ...c, format: fmt.id }))
                    }
                    className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      artifacts.m3.format === fmt.id
                        ? 'border-[#1557A6] bg-[#1557A6] text-white'
                        : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#092E5D]'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Título de la campaña
              </label>
              <input
                type="text"
                value={artifacts.m3.title}
                onChange={(e) =>
                  onUpdateArtifact('m3', (c) => ({ ...c, title: e.target.value }))
                }
                placeholder="Ej. Tu foto también es mi imagen: pregunta antes"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                1. Situación que involucre publicar contenido de otra persona
              </label>
              <textarea
                rows={2}
                value={artifacts.m3.situation}
                onChange={(e) =>
                  onUpdateArtifact('m3', (c) => ({
                    ...c,
                    situation: e.target.value,
                  }))
                }
                placeholder="Describe la escena o caso breve..."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                2. Conflicto relacionado con el consentimiento
              </label>
              <textarea
                rows={2}
                value={artifacts.m3.consentConflict}
                onChange={(e) =>
                  onUpdateArtifact('m3', (c) => ({
                    ...c,
                    consentConflict: e.target.value,
                  }))
                }
                placeholder="¿Por qué surge la tensión entre quien publica y quien aparece?"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                3. Propuesta de actuación respetuosa
              </label>
              <textarea
                rows={2}
                value={artifacts.m3.respectfulAction}
                onChange={(e) =>
                  onUpdateArtifact('m3', (c) => ({
                    ...c,
                    respectfulAction: e.target.value,
                  }))
                }
                placeholder="¿Cómo resolver la situación respetando la autonomía y dignidad?"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                4. Frase final que invite a reflexionar
              </label>
              <input
                type="text"
                value={artifacts.m3.closingPhrase}
                onChange={(e) =>
                  onUpdateArtifact('m3', (c) => ({
                    ...c,
                    closingPhrase: e.target.value,
                  }))
                }
                placeholder="Ej. Compartir también es respetar el límite del otro."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>
          </div>
        )}

        {artifactKey === 'm4' && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Título de tu publicación ficticia
              </label>
              <input
                type="text"
                value={artifacts.m4.caseTitle}
                onChange={(e) =>
                  onUpdateArtifact('m4', (c) => ({
                    ...c,
                    caseTitle: e.target.value,
                  }))
                }
                placeholder="Ej. La historia de una foto de descanso escolar"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {artifacts.m4.nodes.map((node, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/35 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-xs font-semibold text-[#1557A6]">
                      MOMENTO 0{idx + 1}
                    </span>
                    <select
                      value={node.icon}
                      aria-label={`Icono del momento ${idx + 1}`}
                      onChange={(e) =>
                        onUpdateArtifact('m4', (c) => {
                          const next = [...c.nodes];
                          next[idx] = { ...next[idx], icon: e.target.value };
                          return { ...c, nodes: next };
                        })
                      }
                      className="rounded border border-[#D6E4F2] bg-white px-2 py-1 text-xs"
                    >
                      {M4_ICONS.map((ic) => (
                        <option key={ic.id} value={ic.id}>
                          {ic.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    value={node.title}
                    onChange={(e) =>
                      onUpdateArtifact('m4', (c) => {
                        const next = [...c.nodes];
                        next[idx] = { ...next[idx], title: e.target.value };
                        return { ...c, nodes: next };
                      })
                    }
                    className="mt-2 w-full rounded border border-[#D6E4F2] bg-white px-2.5 py-1.5 text-sm font-semibold text-[#092E5D]"
                  />
                  <textarea
                    rows={2}
                    value={node.description}
                    onChange={(e) =>
                      onUpdateArtifact('m4', (c) => {
                        const next = [...c.nodes];
                        next[idx] = {
                          ...next[idx],
                          description: e.target.value,
                        };
                        return { ...c, nodes: next };
                      })
                    }
                    placeholder="¿Qué ocurre en este momento de la línea de tiempo?"
                    className="mt-2 w-full rounded border border-[#D6E4F2] bg-white px-2.5 py-1.5 text-xs text-[#17314F]"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Decisión importante en el recorrido
              </label>
              <input
                type="text"
                value={artifacts.m4.keyDecision}
                onChange={(e) =>
                  onUpdateArtifact('m4', (c) => ({
                    ...c,
                    keyDecision: e.target.value,
                  }))
                }
                placeholder="Ej. Consultar y revisar antes de subir el archivo a un perfil abierto"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  Acción 1 para prevenir una consecuencia negativa
                </label>
                <input
                  type="text"
                  value={artifacts.m4.preventiveAction1}
                  onChange={(e) =>
                    onUpdateArtifact('m4', (c) => ({
                      ...c,
                      preventiveAction1: e.target.value,
                    }))
                  }
                  placeholder="Acción preventiva..."
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  Acción 2 para atender si ya circuló
                </label>
                <input
                  type="text"
                  value={artifacts.m4.preventiveAction2}
                  onChange={(e) =>
                    onUpdateArtifact('m4', (c) => ({
                      ...c,
                      preventiveAction2: e.target.value,
                    }))
                  }
                  placeholder="Acción de atención o apoyo..."
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {artifactKey === 'm5' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Selecciona el caso nuevo al que aplicarás la matriz
              </label>
              <select
                value={artifacts.m5.chosenCaseTitle}
                onChange={(e) =>
                  onUpdateArtifact('m5', (c) => ({
                    ...c,
                    chosenCaseTitle: e.target.value,
                  }))
                }
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] bg-white px-3 py-2.5 text-sm font-medium text-[#092E5D]"
              >
                {M5_NEW_CASES.map((cs) => (
                  <option key={cs} value={cs}>
                    {cs}
                  </option>
                ))}
              </select>
            </div>

            {(
              [
                {
                  key: 'situation',
                  label: '1. Situación que debo resolver',
                  placeholder: 'Resume el dilema central del caso seleccionado...',
                },
                {
                  key: 'peopleAndRights',
                  label: '2. Personas y derechos involucrados',
                  placeholder:
                    '¿Quiénes se ven afectados y qué derechos o valores están en juego?',
                },
                {
                  key: 'alternatives',
                  label: '3. Alternativas posibles',
                  placeholder: 'Enumera al menos dos caminos de acción...',
                },
                {
                  key: 'consequences',
                  label: '4. Consecuencias de cada alternativa',
                  placeholder: 'Describe los posibles efectos sobre las personas...',
                },
                {
                  key: 'responsibleDecision',
                  label:
                    '5. Decisión que considero más responsable y razones que la sustentan',
                  placeholder:
                    'Justifica tu decisión integrando respeto y consecuencias...',
                },
              ] as const
            ).map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  {field.label}
                </label>
                <textarea
                  rows={2}
                  value={artifacts.m5[field.key]}
                  onChange={(e) =>
                    onUpdateArtifact('m5', (c) => ({
                      ...c,
                      [field.key]: e.target.value,
                    }))
                  }
                  placeholder={field.placeholder}
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {artifactKey === 'm6' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                1. Título propio para tu manifiesto
              </label>
              <input
                type="text"
                value={artifacts.m6.title}
                onChange={(e) =>
                  onUpdateArtifact('m6', (c) => ({ ...c, title: e.target.value }))
                }
                placeholder="Ej. Mi pacto por una huella consciente"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#092E5D]">
                2. Cinco compromisos relacionados con tus decisiones digitales
              </p>
              <div className="mt-2 space-y-2">
                {artifacts.m6.commitments.map((cm, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={cm}
                    onChange={(e) =>
                      onUpdateArtifact('m6', (c) => {
                        const next = [...c.commitments] as [
                          string,
                          string,
                          string,
                          string,
                          string,
                        ];
                        next[idx] = e.target.value;
                        return { ...c, commitments: next };
                      })
                    }
                    placeholder={`Compromiso ${idx + 1}`}
                    className="w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                3. Explicación de por qué estos compromisos son importantes
              </label>
              <textarea
                rows={2}
                value={artifacts.m6.whyImportant}
                onChange={(e) =>
                  onUpdateArtifact('m6', (c) => ({
                    ...c,
                    whyImportant: e.target.value,
                  }))
                }
                placeholder="Conecta tus compromisos con tu proyecto de vida y convivencia..."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  4. Una acción para cuidar mi privacidad
                </label>
                <input
                  type="text"
                  value={artifacts.m6.privacyAction}
                  onChange={(e) =>
                    onUpdateArtifact('m6', (c) => ({
                      ...c,
                      privacyAction: e.target.value,
                    }))
                  }
                  placeholder="Ej. Desactivar ubicación automática en fotos"
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  5. Una acción para respetar los derechos de otros
                </label>
                <input
                  type="text"
                  value={artifacts.m6.respectAction}
                  onChange={(e) =>
                    onUpdateArtifact('m6', (c) => ({
                      ...c,
                      respectAction: e.target.value,
                    }))
                  }
                  placeholder="Ej. Pedir autorización antes de publicar fotos grupales"
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                6. Frase final que exprese la huella digital que deseas construir
              </label>
              <input
                type="text"
                value={artifacts.m6.closingMotto}
                onChange={(e) =>
                  onUpdateArtifact('m6', (c) => ({
                    ...c,
                    closingMotto: e.target.value,
                  }))
                }
                placeholder="Tu frase de cierre..."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>
          </div>
        )}

        {artifactKey === 'final' && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-[#092E5D]">
                Selecciona la ilustración para la publicación colectiva
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    { id: 'despedida', label: 'Despedida consensual' },
                    { id: 'reunion', label: 'Actividad escolar' },
                    { id: 'consentimiento', label: 'Diálogo grupal' },
                    { id: 'identidad', label: 'Identidad positiva' },
                  ] as const
                ).map((vis) => (
                  <button
                    key={vis.id}
                    type="button"
                    onClick={() =>
                      onUpdateArtifact('final', (c) => ({
                        ...c,
                        selectedVisual: vis.id,
                      }))
                    }
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                      artifacts.final.selectedVisual === vis.id
                        ? 'border-[#1557A6] bg-[#1557A6] text-white'
                        : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#092E5D]'
                    }`}
                  >
                    {vis.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Texto de acompañamiento de la publicación
              </label>
              <textarea
                rows={2}
                value={artifacts.final.postCaption}
                onChange={(e) =>
                  onUpdateArtifact('final', (c) => ({
                    ...c,
                    postCaption: e.target.value,
                  }))
                }
                placeholder="Redacta el mensaje respetuoso que acompañará el recuerdo de grado 11..."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  Información que decides mostrar
                </label>
                <textarea
                  rows={2}
                  value={artifacts.final.infoToShow}
                  onChange={(e) =>
                    onUpdateArtifact('final', (c) => ({
                      ...c,
                      infoToShow: e.target.value,
                    }))
                  }
                  placeholder="Ej. Logros del curso y fotos aprobadas..."
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#092E5D]">
                  Información que prefieres proteger
                </label>
                <textarea
                  rows={2}
                  value={artifacts.final.infoToProtect}
                  onChange={(e) =>
                    onUpdateArtifact('final', (c) => ({
                      ...c,
                      infoToProtect: e.target.value,
                    }))
                  }
                  placeholder="Ej. Datos personales, ubicaciones exactas y el video ambiguo..."
                  className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Consideraciones sobre las personas involucradas
              </label>
              <textarea
                rows={2}
                value={artifacts.final.peopleConsiderations}
                onChange={(e) =>
                  onUpdateArtifact('final', (c) => ({
                    ...c,
                    peopleConsiderations: e.target.value,
                  }))
                }
                placeholder="¿Cómo atendieron la solicitud de quien no quería aparecer?"
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#092E5D]">
                Justificación ética (privacidad, dignidad y responsabilidad digital)
              </label>
              <textarea
                rows={3}
                value={artifacts.final.ethicalJustification}
                onChange={(e) =>
                  onUpdateArtifact('final', (c) => ({
                    ...c,
                    ethicalJustification: e.target.value,
                  }))
                }
                placeholder="Explica en un párrafo por qué tu propuesta respeta la privacidad, la dignidad y la responsabilidad digital..."
                className="mt-1.5 w-full rounded-lg border border-[#D6E4F2] px-3 py-2 text-sm focus:border-[#1557A6] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Criterios visibles de revisión ética */}
        <div className="mt-6 border-t border-[#EAF5FF] pt-5">
          <p className="text-sm font-bold text-[#092E5D]">
            Autoevaluación del material (criterios de revisión)
          </p>
          <p className="mt-1 text-xs text-[#52677F]">
            Marca los criterios que ya refleja tu creación antes de guardarla en
            el portafolio:
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {WORKSHOP_CRITERIA.map((criterion, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#D6E4F2] bg-[#EAF5FF]/40 p-3 text-xs text-[#17314F]"
              >
                <input
                  type="checkbox"
                  checked={currentChecklist[idx] || false}
                  onChange={() => toggleChecklist(idx)}
                  className="mt-0.5 h-4 w-4 accent-[#1557A6]"
                />
                <span>{criterion}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botones de acción del taller */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAF5FF] pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1557A6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1C69C4]"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              <span>Guardar en mi portafolio</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6E4F2] px-4 py-2.5 text-sm font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{showPreview ? 'Ocultar vista previa' : 'Ver vista previa'}</span>
            </button>

            {onPrintSingle && (
              <button
                type="button"
                onClick={() => onPrintSingle(artifactKey)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6E4F2] px-4 py-2.5 text-sm font-semibold text-[#092E5D] hover:bg-[#EAF5FF]"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                <span>Imprimir / Guardar PDF</span>
              </button>
            )}
          </div>

          {savedToast && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669]">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Guardado en «Mis creaciones»</span>
            </span>
          )}
        </div>
      </div>

      {showPreview && (
        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-[#52677F] uppercase">
            Vista previa editorial de tu material
          </p>
          <ArtifactPreviewCard
            artifactKey={artifactKey}
            artifacts={artifacts}
          />
        </div>
      )}
    </div>
  );
}
