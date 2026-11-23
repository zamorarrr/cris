import { useState } from 'react';
import { Fingerprint, Menu, X } from 'lucide-react';
import { AppView } from '../types/huella';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  completedCount: number;
  centralCompleted: boolean;
}

export function Navbar({
  activeView,
  onNavigate,
  completedCount,
  centralCompleted,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: AppView; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'recorrido', label: 'Módulos' },
    { id: 'creaciones', label: 'Mis creaciones' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'acerca', label: 'Acerca del proyecto' },
  ];

  const handleSelect = (view: AppView) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  const ctaLabel = centralCompleted
    ? `Mi recorrido (${completedCount}/6)`
    : 'Mi recorrido';

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#1557A6]/20 bg-[#092E5D] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zona 1: Marca en una sola línea */}
        <button
          type="button"
          onClick={() => handleSelect('inicio')}
          className="flex shrink-0 items-center gap-2.5 text-left whitespace-nowrap focus-visible:outline-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1557A6] text-[#6FB9F3]">
            <Fingerprint className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
            HUELLA DIGITAL
          </span>
        </button>

        {/* Zona 2: Enlaces de navegación en una sola línea */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 md:flex"
        >
          {navItems.map((item) => {
            const isCurrent =
              activeView === item.id ||
              (item.id === 'recorrido' &&
                (activeView === 'modulo' ||
                  activeView === 'desafio' ||
                  activeView === 'cierre'));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`whitespace-nowrap shrink-0 border-b-2 py-1 text-sm font-medium transition-colors ${
                  isCurrent
                    ? 'border-[#6FB9F3] text-white'
                    : 'border-transparent text-[#D6E8FB] hover:border-white/40 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zona 3: 1 acción principal + menú móvil */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => handleSelect('recorrido')}
            className="hidden whitespace-nowrap shrink-0 rounded-lg bg-[#1557A6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1C69C4] sm:inline-flex"
          >
            {ctaLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/15 bg-[#092E5D] px-4 py-4 md:hidden">
          <nav aria-label="Menú móvil" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isCurrent = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 py-2 text-left text-sm font-medium ${
                    isCurrent
                      ? 'bg-[#1557A6] text-white'
                      : 'text-[#D6E8FB] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleSelect('recorrido')}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#6FB9F3] px-4 py-2.5 text-sm font-bold text-[#092E5D]"
            >
              {ctaLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
