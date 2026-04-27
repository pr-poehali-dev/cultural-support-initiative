import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { federalBodies } from '@/data/federalBodies';
import { programs } from '@/data/programs';
import { regionalBodies } from '@/data/regions';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[hsl(var(--primary))] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-white/25 bg-white/10">
                <Icon name="Landmark" size={18} className="text-white" />
              </div>
              <div>
                <div className="font-serif font-bold text-white">Справочник культуры</div>
                <div className="text-xs text-white/50">Российская Федерация</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              Официальный информационный ресурс о государственных органах власти в сфере культуры
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { label: federalBodies.length.toString(), sub: 'ведомств' },
                { label: regionalBodies.length.toString(), sub: 'регионов' },
                { label: programs.length.toString(), sub: 'программ' },
              ].map((s) => (
                <div key={s.sub} className="rounded border border-white/15 bg-white/8 px-3 py-2 text-center">
                  <div className="text-lg font-bold text-white">{s.label}</div>
                  <div className="text-xs text-white/50">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Разделы</div>
            <ul className="space-y-2.5">
              {[
                { to: '/', icon: 'Home', label: 'Главная' },
                { to: '/federal', icon: 'Building2', label: 'Федеральные органы' },
                { to: '/programs', icon: 'FileText', label: 'Проекты и программы' },
                { to: '/regions', icon: 'Map', label: 'Карта регионов' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                    <Icon name={item.icon} size={13} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Ведомства</div>
            <ul className="space-y-2">
              {federalBodies.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <Link to="/federal" className="text-sm text-white/60 transition-colors hover:text-white">
                    {b.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Контакты Минкультуры</div>
            <ul className="space-y-3">
              {[
                { icon: 'Globe', text: 'culture.gov.ru', href: 'https://www.culture.gov.ru' },
                { icon: 'Phone', text: '+7 (495) 629-10-00', href: 'tel:+74956291000' },
                { icon: 'Mail', text: 'info@culture.gov.ru', href: 'mailto:info@culture.gov.ru' },
                { icon: 'MapPin', text: 'Малый Гнездниковский пер., 7/6, Москва', href: null },
              ].map(({ icon, text, href }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon name={icon} size={13} className="mt-0.5 shrink-0 text-white/40" />
                  {href ? (
                    <a href={href} className="text-sm text-white/60 transition-colors hover:text-white">{text}</a>
                  ) : (
                    <span className="text-sm text-white/55">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/30 sm:flex-row">
          <span>© 2024 Справочник органов власти сферы культуры Российской Федерации</span>
          <span>Информация носит справочный характер</span>
        </div>
      </div>
    </footer>
  );
}
