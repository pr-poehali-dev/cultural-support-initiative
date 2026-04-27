import { useState } from 'react';
import { federalBodies, FederalBody } from '@/data/federalBodies';
import Icon from '@/components/ui/icon';

const typeLabels: Record<FederalBody['type'], string> = {
  ministry: 'Министерство',
  agency: 'Агентство / Учреждение',
  service: 'Служба',
  committee: 'Комитет',
};

const typeColors: Record<FederalBody['type'], { badge: string; icon: string; bg: string }> = {
  ministry: { badge: 'bg-blue-100 text-blue-800 border border-blue-200', icon: 'text-blue-600', bg: 'bg-blue-50' },
  agency: { badge: 'bg-green-100 text-green-800 border border-green-200', icon: 'text-green-600', bg: 'bg-green-50' },
  service: { badge: 'bg-orange-100 text-orange-800 border border-orange-200', icon: 'text-orange-600', bg: 'bg-orange-50' },
  committee: { badge: 'bg-purple-100 text-purple-800 border border-purple-200', icon: 'text-purple-600', bg: 'bg-purple-50' },
};

export default function Federal() {
  const [selected, setSelected] = useState<FederalBody | null>(federalBodies[0]);
  const [activeTab, setActiveTab] = useState<'functions' | 'services'>('functions');

  const grouped = {
    ministry: federalBodies.filter((b) => b.type === 'ministry'),
    committee: federalBodies.filter((b) => b.type === 'committee'),
    agency: federalBodies.filter((b) => b.type === 'agency'),
    service: federalBodies.filter((b) => b.type === 'service'),
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Главная</span>
            <Icon name="ChevronRight" size={12} />
            <span className="text-[hsl(var(--primary))]">Федеральные органы власти</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[hsl(var(--primary))] md:text-3xl">
            Федеральные органы власти в сфере культуры
          </h1>
          <p className="mt-2 text-muted-foreground">
            {federalBodies.length} органа государственной власти федерального уровня
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Список */}
          <div className="space-y-6 lg:col-span-2">
            {(Object.entries(grouped) as [FederalBody['type'], FederalBody[]][])
              .filter(([, items]) => items.length > 0)
              .map(([type, items]) => (
                <div key={type}>
                  <div className="mb-2 flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${typeColors[type].bg} border ${typeColors[type].badge.split(' ').find(c => c.startsWith('border')) || ''}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {typeLabels[type]}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {items.map((body) => {
                      const isSelected = selected?.id === body.id;
                      return (
                        <button
                          key={body.id}
                          onClick={() => { setSelected(body); setActiveTab('functions'); }}
                          className={`w-full rounded-lg border text-left transition-all duration-150 ${
                            isSelected
                              ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] shadow-lg'
                              : 'border-border bg-white hover:border-[hsl(var(--primary))]/50 hover:shadow-md'
                          }`}
                        >
                          <div className="p-4">
                            <div className={`mb-0.5 font-serif font-bold leading-snug ${
                              isSelected ? 'text-white' : 'text-[hsl(var(--primary))]'
                            }`}>
                              {body.shortName}
                            </div>
                            <div className={`text-xs ${isSelected ? 'text-white/65' : 'text-muted-foreground'}`}>
                              {body.head}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>

          {/* Детали */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="sticky top-20 overflow-hidden rounded-lg border border-border bg-white shadow-md">
                {/* Шапка */}
                <div className={`p-6 ${typeColors[selected.type].bg} border-b border-border`}>
                  <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${typeColors[selected.type].badge}`}>
                    {typeLabels[selected.type]}
                  </span>
                  <h2 className="font-serif text-xl font-bold leading-tight text-[hsl(var(--primary))]">{selected.name}</h2>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{selected.headTitle}:</span>
                    <span className="font-semibold text-[hsl(var(--primary))]">{selected.head}</span>
                  </div>
                </div>

                {/* Контакты */}
                <div className="grid grid-cols-2 gap-3 border-b border-border p-5">
                  {[
                    { icon: 'MapPin', label: 'Адрес', value: selected.address, href: null },
                    { icon: 'Phone', label: 'Телефон', value: selected.phone, href: `tel:${selected.phone}` },
                    { icon: 'Mail', label: 'E-mail', value: selected.email, href: `mailto:${selected.email}` },
                    { icon: 'Globe', label: 'Сайт', value: selected.website.replace('https://', ''), href: selected.website },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-2">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[hsl(var(--muted))]">
                        <Icon name={icon} size={13} className="text-[hsl(var(--accent))]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{label}</div>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="truncate text-xs font-medium text-[hsl(var(--primary))] hover:underline block">
                            {value}
                          </a>
                        ) : (
                          <div className="text-xs font-medium text-[hsl(var(--primary))]">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Табы */}
                <div className="px-5 pt-4">
                  <div className="mb-4 flex gap-1 border-b border-border">
                    {(['functions', 'services'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                          activeTab === tab
                            ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                            : 'border-transparent text-muted-foreground hover:text-[hsl(var(--primary))]'
                        }`}
                      >
                        <Icon name={tab === 'functions' ? 'Briefcase' : 'ClipboardList'} size={14} />
                        {tab === 'functions' ? 'Функции и полномочия' : 'Государственные услуги'}
                        <span className="rounded-full bg-[hsl(var(--muted))] px-1.5 py-0.5 text-xs">
                          {tab === 'functions' ? selected.functions.length : selected.services.length}
                        </span>
                      </button>
                    ))}
                  </div>
                  <ul className="mb-5 space-y-2.5">
                    {(activeTab === 'functions' ? selected.functions : selected.services).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent))]/10">
                          <Icon name="Check" size={11} className="text-[hsl(var(--accent))]" />
                        </div>
                        <span className="text-[hsl(var(--foreground))]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-white text-center text-muted-foreground">
                <Icon name="Building2" size={40} className="mb-3 opacity-20" />
                <p className="text-sm">Выберите ведомство из списка</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
