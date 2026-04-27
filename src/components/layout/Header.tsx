import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Федеральные органы власти', path: '/federal' },
  { label: 'Государственные проекты и программы', path: '/programs' },
  { label: 'Карта регионов', path: '/regions' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg">
      <div className="border-b border-white/10 py-1">
        <div className="container mx-auto flex items-center justify-between px-4 text-xs opacity-75">
          <span>Официальный справочник</span>
          <span>Российская Федерация</span>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded border border-white/30 bg-white/10">
              <Icon name="Landmark" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest opacity-70">Российская Федерация</div>
              <div className="font-serif text-lg font-bold leading-tight">
                Справочник органов власти<br />
                <span className="text-sm font-normal opacity-90">в сфере культуры</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="hidden border-t border-white/15 md:block">
          <ul className="flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${
                    location.pathname === item.path
                      ? 'border-b-2 border-[hsl(var(--accent))] bg-white/10 text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end py-3 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white"
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/15 bg-[hsl(var(--primary))] md:hidden">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-5 py-3 text-sm font-medium border-b border-white/10 ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-white'
                      : 'text-white/80'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
