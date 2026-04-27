import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Search from '@/components/Search';

const navItems = [
  { label: 'Главная', path: '/', icon: 'Home' },
  { label: 'Федеральные органы', path: '/federal', icon: 'Building2' },
  { label: 'Проекты и программы', path: '/programs', icon: 'FileText' },
  { label: 'Карта регионов', path: '/regions', icon: 'Map' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[hsl(var(--primary))] text-white shadow-xl">
      <div className="border-b border-white/10 bg-black/20 py-1">
        <div className="container mx-auto flex items-center justify-between px-4 text-xs text-white/60">
          <span>Российская Федерация · Официальный справочник</span>
          <span className="hidden sm:block">Министерство культуры Российской Федерации</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/25 bg-white/10 shadow-inner">
              <Icon name="Landmark" size={22} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/55 leading-none mb-0.5">
                Справочник органов власти
              </div>
              <div className="font-serif text-base font-bold text-white leading-tight">
                Сфера культуры России
              </div>
            </div>
          </Link>

          <div className="hidden flex-1 max-w-lg md:block">
            <Search />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded p-2 text-white/80 hover:bg-white/10 md:hidden"
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        <nav className="hidden border-t border-white/10 md:block">
          <ul className="flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative ${
                      isActive
                        ? 'text-white'
                        : 'text-white/65 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--accent))]" />
                    )}
                    <Icon name={item.icon} size={14} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/15 bg-[hsl(215,65%,16%)] md:hidden">
          <div className="p-3">
            <Search />
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 border-b border-white/8 px-5 py-3 text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-white/10 text-white'
                        : 'text-white/70'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}