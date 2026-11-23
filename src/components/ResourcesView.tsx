import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  HelpCircle,
  Scale,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  CONSULTATION_SOURCES,
  DIGITAL_RIGHTS,
  FAQ_ITEMS,
  GLOSSARY_ITEMS,
} from '../data/modulesData';

type ResourceTab = 'glosario' | 'derechos' | 'faq' | 'fuentes' | 'ayuda';

export function ResourcesView() {
  const [activeTab, setActiveTab] = useState<ResourceTab>('glosario');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredGlossary = GLOSSARY_ITEMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs: { id: ResourceTab; label: string }[] = [
    { id: 'glosario', label: 'Glosario digital' },
    { id: 'derechos', label: 'Derechos digitales' },
    { id: 'faq', label: 'Preguntas frecuentes' },
    { id: 'fuentes', label: 'Fuentes de consulta' },
    { id: 'ayuda', label: 'Ayuda de uso' },
  ];

  return (
    <main className="bg-[#EAF5FF]/40 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-[#1557A6]">
            Biblioteca de consulta
          </p>
          <h1 className="headline-balance font-display mt-1 text-3xl font-bold text-[#092E5D] sm:text-4xl">
            Recursos de apoyo y ciudadanía digital
          </h1>
          <p className="mt-2 max-w-2xl text-base text-[#52677F]">
            Consulta definiciones clave, marco de derechos en Colombia,
            preguntas frecuentes, referentes bibliográficos y orientaciones para
            navegar por la página.
          </p>

          <div
            role="tablist"
            aria-label="Categorías de recursos"
            className="mt-6 flex flex-wrap gap-2"
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[40px] rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'border-[#1557A6] bg-[#1557A6] text-white'
                      : 'border-[#D6E4F2] bg-[#EAF5FF]/50 text-[#092E5D] hover:bg-[#EAF5FF]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        <section className="mt-6 rounded-2xl border border-[#D6E4F2] bg-white p-6 sm:p-8">
          {/* Glosario */}
          {activeTab === 'glosario' && (
            <div>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-[#092E5D]">
                  <BookOpen className="h-5 w-5 text-[#1557A6]" aria-hidden="true" />
                  <h2 className="font-display text-xl font-bold">
                    Glosario digital
                  </h2>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#52677F]"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar concepto..."
                    aria-label="Buscar concepto en el glosario"
                    className="w-full rounded-lg border border-[#D6E4F2] py-2 pr-3 pl-9 text-sm focus:border-[#1557A6] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredGlossary.map((item) => (
                  <article
                    key={item.term}
                    className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5"
                  >
                    <h3 className="font-display text-lg font-bold text-[#092E5D]">
                      {item.term}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                      {item.definition}
                    </p>
                  </article>
                ))}
                {filteredGlossary.length === 0 && (
                  <p className="text-sm text-[#52677F]">
                    No se encontraron conceptos que coincidan con «{searchQuery}».
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Derechos digitales */}
          {activeTab === 'derechos' && (
            <div>
              <div className="flex items-center gap-2 text-[#092E5D]">
                <Scale className="h-5 w-5 text-[#1557A6]" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold">
                  Derechos digitales y protección constitucional
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#52677F]">
                Relación entre intimidad, buen nombre, libertad de expresión y
                protección de datos personales en Colombia.
              </p>

              <div className="mt-6 space-y-4">
                {DIGITAL_RIGHTS.map((r) => (
                  <article
                    key={r.title}
                    className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5"
                  >
                    <p className="text-xs font-semibold text-[#1557A6]">
                      {r.foundation}
                    </p>
                    <h3 className="font-display mt-1 text-lg font-bold text-[#092E5D]">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[#17314F]">
                      {r.explanation}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Preguntas frecuentes */}
          {activeTab === 'faq' && (
            <div>
              <div className="flex items-center gap-2 text-[#092E5D]">
                <HelpCircle
                  className="h-5 w-5 text-[#1557A6]"
                  aria-hidden="true"
                />
                <h2 className="font-display text-xl font-bold">
                  Preguntas frecuentes
                </h2>
              </div>

              <div className="mt-6 divide-y divide-[#D6E4F2] rounded-xl border border-[#D6E4F2]">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="p-4 sm:p-5">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : idx)
                        }
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="font-display text-base font-bold text-[#092E5D]">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#1557A6] transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-sm leading-relaxed text-[#17314F]">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fuentes de consulta */}
          {activeTab === 'fuentes' && (
            <div>
              <h2 className="font-display text-xl font-bold text-[#092E5D]">
                Fuentes de consulta y referentes oficiales
              </h2>
              <div className="mt-5 space-y-3">
                {CONSULTATION_SOURCES.map((src) => (
                  <div
                    key={src.title}
                    className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/35 p-4"
                  >
                    <h3 className="font-display text-base font-bold text-[#092E5D]">
                      {src.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#17314F]">{src.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ayuda para utilizar la página */}
          {activeTab === 'ayuda' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-[#092E5D]">
                <ShieldCheck
                  className="h-5 w-5 text-[#1557A6]"
                  aria-hidden="true"
                />
                <h2 className="font-display text-xl font-bold">
                  Ayuda para utilizar la página
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5">
                  <h3 className="font-display text-base font-bold text-[#092E5D]">
                    1. Navegación y avance secuencial
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    Empieza en «Inicio» resolviendo la primera actividad del
                    caso central. Esto desbloqueará el Módulo 1. Al terminar los
                    nueve momentos de cada módulo se abrirá automáticamente el
                    siguiente, hasta completar los seis y el Desafío Final.
                  </p>
                </div>

                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5">
                  <h3 className="font-display text-base font-bold text-[#092E5D]">
                    2. Talleres y guardado en PDF
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    En el Momento 8 de cada módulo elaborarás un producto en la
                    plantilla interactiva. Al hacer clic en «Imprimir / Guardar
                    PDF», selecciona «Guardar como PDF» en la ventana de
                    impresión de tu navegador para conservar una copia limpia.
                  </p>
                </div>

                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5">
                  <h3 className="font-display text-base font-bold text-[#092E5D]">
                    3. Privacidad y datos locales
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    No necesitas crear cuentas ni escribir datos sensibles.
                    Utiliza nombres o situaciones ficticias en tus ejemplos.
                    Todo queda guardado únicamente en este dispositivo y
                    navegador.
                  </p>
                </div>

                <div className="rounded-xl border border-[#D6E4F2] bg-[#EAF5FF]/40 p-5">
                  <h3 className="font-display text-base font-bold text-[#092E5D]">
                    4. Accesibilidad y lectura
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#17314F]">
                    Todos los botones y actividades pueden recorrerse con el
                    teclado (tecla Tab y Enter) y se adaptan a computadores,
                    tabletas y teléfonos móviles.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
