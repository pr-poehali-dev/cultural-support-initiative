import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[hsl(var(--primary))] text-white/80">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="Landmark" size={18} className="text-white" />
              <span className="font-serif font-bold text-white">Справочник культуры</span>
            </div>
            <p className="text-sm leading-relaxed opacity-75">
              Официальный информационный ресурс о государственных органах власти
              Российской Федерации в сфере культуры
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Разделы</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/federal" className="hover:text-white transition-colors">Федеральные органы</Link></li>
              <li><Link to="/programs" className="hover:text-white transition-colors">Проекты и программы</Link></li>
              <li><Link to="/regions" className="hover:text-white transition-colors">Карта регионов</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Контакты</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="Globe" size={14} />
                <a href="https://www.culture.gov.ru" className="hover:text-white transition-colors">culture.gov.ru</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={14} />
                <span>+7 (495) 629-10-00</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={14} />
                <span>info@culture.gov.ru</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/15 pt-4 text-center text-xs opacity-60">
          © 2024 Справочник органов власти сферы культуры Российской Федерации
        </div>
      </div>
    </footer>
  );
}
