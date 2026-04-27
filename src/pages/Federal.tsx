import { useState } from 'react';
import { federalBodies, FederalBody } from '@/data/federalBodies';
import Icon from '@/components/ui/icon';

const typeLabels: Record<FederalBody['type'], string> = {
  ministry: 'Министерство',
  agency: 'Агентство',
  service: 'Служба',
  committee: 'Комитет',
};

const typeColors: Record<FederalBody['type'], string> = {
  ministry: 'bg-blue-100 text-blue-800',
  agency: 'bg-green-100 text-green-800',
  service: 'bg-orange-100 text-orange-800',
  committee: 'bg-purple-100 text-purple-800',
};

export default function Federal() {
  const [selected, setSelected] = useState<FederalBody | null>(null);
  const [activeTab, setActiveTab] = useState<'functions' | 'services'>('functions');

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-2 text-sm text-muted-foreground">Главная / Федеральные органы власти</div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-[hsl(var(--primary))]">
        Федеральные органы власти в сфере культуры
      </h1>
      <div className="mb-8 h-1 w-16 bg-[hsl(var(--accent))]" />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {federalBodies.map((body) => (
            <button
              key={body.id}
              onClick={() => { setSelected(body); setActiveTab('functions'); }}
              className={`w-full rounded border text-left transition-all ${
                selected?.id === body.id
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white shadow-md'
                  : 'border-border bg-white hover:border-[hsl(var(--primary))] hover:shadow-sm'
              }`}
            >
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
                    selected?.id === body.id ? 'bg-white/20 text-white' : typeColors[body.type]
                  }`}>
                    {typeLabels[body.type]}
                  </span>
                </div>
                <div className={`font-serif font-bold leading-tight ${
                  selected?.id === body.id ? 'text-white' : 'text-[hsl(var(--primary))]'
                }`}>
                  {body.shortName}
                </div>
                <div className={`mt-1 text-xs ${
                  selected?.id === body.id ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {body.head}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="rounded border border-border bg-white shadow-sm">
              <div className="border-b border-border bg-[hsl(var(--muted))] p-5">
                <span className={`mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${typeColors[selected.type]}`}>
                  {typeLabels[selected.type]}
                </span>
                <h2 className="font-serif text-xl font-bold text-[hsl(var(--primary))]">{selected.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium">{selected.headTitle}:</span> {selected.head}
                </p>
              </div>

              <div className="p-5">
                <div className="mb-5 grid gap-3 text-sm md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Icon name="MapPin" size={15} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                    <span className="text-muted-foreground">{selected.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={15} className="shrink-0 text-[hsl(var(--accent))]" />
                    <a href={`tel:${selected.phone}`} className="text-[hsl(var(--primary))] hover:underline">
                      {selected.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={15} className="shrink-0 text-[hsl(var(--accent))]" />
                    <a href={`mailto:${selected.email}`} className="text-[hsl(var(--primary))] hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Globe" size={15} className="shrink-0 text-[hsl(var(--accent))]" />
                    <a href={selected.website} target="_blank" rel="noopener noreferrer"
                      className="truncate text-[hsl(var(--primary))] hover:underline">
                      {selected.website.replace('https://', '')}
                    </a>
                  </div>
                </div>

                <div className="mb-4 flex gap-1 border-b border-border">
                  <button
                    onClick={() => setActiveTab('functions')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === 'functions'
                        ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                        : 'border-transparent text-muted-foreground hover:text-[hsl(var(--primary))]'
                    }`}
                  >
                    Функции и полномочия
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === 'services'
                        ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                        : 'border-transparent text-muted-foreground hover:text-[hsl(var(--primary))]'
                    }`}
                  >
                    Государственные услуги
                  </button>
                </div>

                <ul className="space-y-2">
                  {(activeTab === 'functions' ? selected.functions : selected.services).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Icon name="ChevronRight" size={15} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded border border-dashed border-border bg-white text-center text-muted-foreground">
              <Icon name="Building2" size={36} className="mb-3 opacity-30" />
              <p className="text-sm">Выберите ведомство из списка слева<br />для просмотра подробной информации</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
