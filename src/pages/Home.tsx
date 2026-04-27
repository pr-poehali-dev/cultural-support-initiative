import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const sections = [
  {
    icon: 'Building2',
    title: 'Федеральные органы власти',
    description: 'Министерства, агентства и службы федерального уровня, осуществляющие государственную политику в сфере культуры',
    link: '/federal',
    count: '4 ведомства',
  },
  {
    icon: 'FileText',
    title: 'Государственные проекты и программы',
    description: 'Действующие и завершённые федеральные программы и национальные проекты в области культуры',
    link: '/programs',
    count: '4 программы',
  },
  {
    icon: 'Map',
    title: 'Карта регионов',
    description: 'Интерактивная карта размещения региональных органов управления культурой по субъектам Российской Федерации',
    link: '/regions',
    count: '85 субъектов',
  },
];

const stats = [
  { value: '85', label: 'субъектов РФ', icon: 'MapPin' },
  { value: '4', label: 'федеральных ведомства', icon: 'Building2' },
  { value: '873,6', label: 'млрд руб. финансирование', icon: 'TrendingUp' },
  { value: '2030', label: 'год реализации программы', icon: 'Calendar' },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[hsl(215,60%,18%)] to-[hsl(215,55%,26%)] py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-2 text-xs uppercase tracking-widest text-white/60">
              Российская Федерация · Сфера культуры
            </div>
            <h1 className="mb-4 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Справочник органов государственной власти в сфере культуры
            </h1>
            <p className="mb-8 text-lg text-white/80 leading-relaxed">
              Официальная информация о федеральных и региональных органах власти, государственных программах, контактах и предоставляемых услугах
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/federal"
                className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-medium text-[hsl(215,60%,20%)] transition-colors hover:bg-white/90"
              >
                <Icon name="Building2" size={16} />
                Федеральные органы
              </Link>
              <Link
                to="/regions"
                className="inline-flex items-center gap-2 rounded border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Icon name="Map" size={16} />
                Карта регионов
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[hsl(var(--secondary))]">
                  <Icon name={s.icon as any} size={18} className="text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[hsl(var(--primary))]">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 font-serif text-2xl font-bold text-[hsl(var(--primary))]">Разделы справочника</h2>
          <div className="mb-8 h-1 w-16 bg-[hsl(var(--accent))]" />
          <div className="grid gap-6 md:grid-cols-3">
            {sections.map((section) => (
              <Link
                key={section.link}
                to={section.link}
                className="group block rounded border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-[hsl(var(--secondary))]">
                    <Icon name={section.icon as any} size={22} className="text-[hsl(var(--primary))]" />
                  </div>
                  <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs text-muted-foreground">
                    {section.count}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--accent))] transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[hsl(var(--accent))]">
                  Перейти в раздел <Icon name="ArrowRight" size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 font-serif text-2xl font-bold text-[hsl(var(--primary))]">Основные направления деятельности</h2>
          <div className="mb-8 h-1 w-16 bg-[hsl(var(--accent))]" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: 'Shield', title: 'Охрана наследия', desc: 'Защита и сохранение объектов культурного наследия народов России' },
              { icon: 'BookOpen', title: 'Библиотечное дело', desc: 'Развитие библиотечной сети и обеспечение доступа к знаниям' },
              { icon: 'Music', title: 'Искусство', desc: 'Поддержка театрального, музыкального и изобразительного искусства' },
              { icon: 'Film', title: 'Кинематография', desc: 'Производство и прокат отечественных фильмов, фестивали' },
              { icon: 'Archive', title: 'Архивное дело', desc: 'Хранение и предоставление доступа к архивным документам' },
              { icon: 'Users', title: 'Народное творчество', desc: 'Развитие любительского искусства и традиционной культуры' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded border border-border bg-[hsl(var(--muted))] p-4">
                <div className="mt-0.5 shrink-0">
                  <Icon name={item.icon as any} size={18} className="text-[hsl(var(--accent))]" />
                </div>
                <div>
                  <div className="mb-1 font-medium text-[hsl(var(--primary))]">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
