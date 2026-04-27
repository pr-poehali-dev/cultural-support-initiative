import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { federalBodies } from '@/data/federalBodies';
import { programs } from '@/data/programs';
import { regionalBodies } from '@/data/regions';

const sections = [
  {
    icon: 'Building2',
    title: 'Федеральные органы власти',
    description: 'Министерства, агентства, службы и комитеты федерального уровня, формирующие государственную политику в сфере культуры',
    link: '/federal',
    count: federalBodies.length,
    unit: 'ведомства',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    icon: 'FileText',
    title: 'Государственные проекты и программы',
    description: 'Действующие и завершённые федеральные программы, национальные и федеральные проекты в области культуры',
    link: '/programs',
    count: programs.length,
    unit: 'программ',
    color: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    icon: 'Map',
    title: 'Карта регионов',
    description: 'Интерактивная карта размещения региональных органов управления культурой по всем субъектам Российской Федерации',
    link: '/regions',
    count: regionalBodies.length,
    unit: 'субъектов',
    color: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
];

const directions = [
  { icon: 'Shield', title: 'Охрана наследия', desc: 'Защита и сохранение объектов культурного наследия народов России' },
  { icon: 'BookOpen', title: 'Библиотечное дело', desc: 'Развитие библиотечной сети и обеспечение свободного доступа к знаниям' },
  { icon: 'Music2', title: 'Искусство', desc: 'Поддержка театрального, музыкального и изобразительного искусства' },
  { icon: 'Film', title: 'Кинематография', desc: 'Производство и прокат отечественных фильмов, кинофестивали' },
  { icon: 'Archive', title: 'Архивное дело', desc: 'Хранение и предоставление доступа к государственным архивным документам' },
  { icon: 'Users', title: 'Народное творчество', desc: 'Развитие любительского искусства и традиционной культуры народов РФ' },
  { icon: 'Globe', title: 'Международное сотрудничество', desc: 'Продвижение российской культуры за рубежом, культурные обмены' },
  { icon: 'GraduationCap', title: 'Образование в культуре', desc: 'Подготовка кадров для отрасли, детские школы искусств' },
  { icon: 'Monitor', title: 'Цифровая культура', desc: 'Цифровизация учреждений, виртуальные выставки и онлайн-доступ' },
];

export default function Home() {
  const activePrograms = programs.filter(p => p.status === 'active').length;

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background: 'linear-gradient(135deg, hsl(215,65%,16%) 0%, hsl(215,55%,24%) 50%, hsl(220,50%,28%) 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px)`,
          }}
        />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-5">
          <Icon name="Landmark" size={400} className="text-white" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs text-white/70 backdrop-blur-sm">
              <Icon name="Globe" size={12} />
              Российская Федерация · Официальный ресурс
            </div>
            <h1 className="mb-5 font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
              Справочник органов государственной власти<br />
              <span className="text-[hsl(30,80%,65%)]">в сфере культуры</span>
            </h1>
            <p className="mb-8 max-w-2xl text-base text-white/75 leading-relaxed md:text-lg">
              Полная информация о федеральных и региональных органах власти, государственных программах, контактах руководителей и предоставляемых государственных услугах
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/federal"
                className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-semibold text-[hsl(215,60%,20%)] shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
              >
                <Icon name="Building2" size={16} />
                Федеральные органы
              </Link>
              <Link
                to="/regions"
                className="inline-flex items-center gap-2 rounded border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Icon name="Map" size={16} />
                Карта регионов
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Icon name="FileText" size={16} />
                Программы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {[
              { value: regionalBodies.length.toString(), label: 'субъектов РФ', icon: 'MapPin', color: 'text-amber-600' },
              { value: federalBodies.length.toString(), label: 'федеральных ведомств', icon: 'Building2', color: 'text-blue-600' },
              { value: activePrograms.toString(), label: 'действующих программ', icon: 'TrendingUp', color: 'text-emerald-600' },
              { value: '873,6', label: 'млрд руб. в год', icon: 'Banknote', color: 'text-purple-600' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 px-6 py-5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded ${s.color.replace('text-', 'bg-').replace('600', '100')}`}>
                  <Icon name={s.icon} size={18} className={s.color} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разделы */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-[hsl(var(--accent))]" />
            <h2 className="font-serif text-2xl font-bold text-[hsl(var(--primary))]">Разделы справочника</h2>
          </div>
          <p className="mb-8 ml-4 text-muted-foreground">Выберите интересующий раздел для получения подробной информации</p>
          <div className="grid gap-5 md:grid-cols-3">
            {sections.map((section) => (
              <Link
                key={section.link}
                to={section.link}
                className={`group relative overflow-hidden rounded-lg border-2 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${section.color}`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className={`flex h-13 w-13 items-center justify-center rounded-lg p-3 ${section.iconBg}`}>
                    <Icon name={section.icon} size={26} className={section.iconColor} />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${section.iconColor}`}>{section.count}</div>
                    <div className="text-xs text-muted-foreground">{section.unit}</div>
                  </div>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--accent))] transition-colors">
                  {section.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${section.iconColor}`}>
                  Перейти в раздел <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Последние программы */}
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-[hsl(var(--accent))]" />
              <h2 className="font-serif text-2xl font-bold text-[hsl(var(--primary))]">Актуальные программы</h2>
            </div>
            <Link to="/programs" className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--accent))] hover:underline">
              Все программы <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <p className="mb-8 ml-4 text-muted-foreground">Действующие государственные программы в сфере культуры</p>
          <div className="grid gap-4 md:grid-cols-2">
            {programs.filter(p => p.status === 'active').slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to="/programs"
                className="group flex items-start gap-4 rounded-lg border border-border p-5 transition-all hover:border-[hsl(var(--primary))] hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <Icon name="FileCheck" size={18} className="text-emerald-700" />
                </div>
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">Действующая</span>
                    <span className="text-xs text-muted-foreground">{p.period}</span>
                  </div>
                  <div className="font-serif font-bold text-[hsl(var(--primary))] group-hover:text-[hsl(var(--accent))] transition-colors leading-snug">
                    {p.shortName}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Бюджет: {p.budget}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Направления деятельности */}
      <section className="bg-[hsl(var(--muted))] py-14">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-[hsl(var(--accent))]" />
            <h2 className="font-serif text-2xl font-bold text-[hsl(var(--primary))]">Направления государственной культурной политики</h2>
          </div>
          <p className="mb-8 ml-4 text-muted-foreground">Основные направления деятельности органов власти в сфере культуры</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {directions.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-lg border border-border bg-white p-4 shadow-sm"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--secondary))]">
                  <Icon name={item.icon} size={17} className="text-[hsl(var(--accent))]" />
                </div>
                <div>
                  <div className="mb-1 font-semibold text-[hsl(var(--primary))]">{item.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Федеральные ведомства */}
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-[hsl(var(--accent))]" />
              <h2 className="font-serif text-2xl font-bold text-[hsl(var(--primary))]">Федеральные ведомства</h2>
            </div>
            <Link to="/federal" className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--accent))] hover:underline">
              Подробнее <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <p className="mb-8 ml-4 text-muted-foreground">Ключевые органы государственного управления культурой</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {federalBodies.slice(0, 4).map((body) => {
              const typeColors: Record<string, string> = {
                ministry: 'bg-blue-50 border-blue-200 text-blue-700',
                agency: 'bg-green-50 border-green-200 text-green-700',
                service: 'bg-orange-50 border-orange-200 text-orange-700',
                committee: 'bg-purple-50 border-purple-200 text-purple-700',
              };
              const typeLabels: Record<string, string> = {
                ministry: 'Министерство',
                agency: 'Агентство/Учреждение',
                service: 'Служба',
                committee: 'Комитет',
              };
              return (
                <Link
                  key={body.id}
                  to="/federal"
                  className="group flex flex-col rounded-lg border border-border p-5 shadow-sm transition-all hover:shadow-md hover:border-[hsl(var(--primary))]"
                >
                  <div className={`mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeColors[body.type]}`}>
                    {typeLabels[body.type]}
                  </div>
                  <div className="mb-2 font-serif font-bold leading-snug text-[hsl(var(--primary))] group-hover:text-[hsl(var(--accent))] transition-colors">
                    {body.shortName}
                  </div>
                  <div className="mt-auto pt-3 text-xs text-muted-foreground border-t border-border">
                    {body.head}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14"
        style={{ background: 'linear-gradient(135deg, hsl(215,65%,16%) 0%, hsl(215,55%,24%) 100%)' }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <Icon name="Landmark" size={40} className="mx-auto mb-4 text-white/30" />
            <h2 className="mb-3 font-serif text-2xl font-bold text-white md:text-3xl">
              Справочник органов власти сферы культуры
            </h2>
            <p className="mb-7 text-white/65 leading-relaxed">
              Актуальная информация о {federalBodies.length} федеральных ведомствах, {regionalBodies.length} региональных органах управления культурой и {programs.length} государственных программах
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/regions"
                className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-[hsl(215,60%,20%)] shadow-lg transition-all hover:bg-white/90"
              >
                <Icon name="Map" size={16} />
                Карта регионов
              </Link>
              <Link
                to="/federal"
                className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Icon name="Building2" size={16} />
                Федеральные органы
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}