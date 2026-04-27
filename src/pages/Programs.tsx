import { useState } from 'react';
import { programs, Program } from '@/data/programs';
import Icon from '@/components/ui/icon';

const statusConfig: Record<Program['status'], { label: string; badge: string; dot: string }> = {
  active: { label: 'Действующая', badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200', dot: 'bg-emerald-500' },
  completed: { label: 'Завершена', badge: 'bg-gray-100 text-gray-600 border border-gray-200', dot: 'bg-gray-400' },
  planned: { label: 'Планируется', badge: 'bg-blue-100 text-blue-800 border border-blue-200', dot: 'bg-blue-500' },
};

export default function Programs() {
  const [selected, setSelected] = useState<Program | null>(programs[0]);
  const [filter, setFilter] = useState<Program['status'] | 'all'>('all');

  const filtered = programs.filter((p) => filter === 'all' || p.status === filter);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Главная</span>
            <Icon name="ChevronRight" size={12} />
            <span className="text-[hsl(var(--primary))]">Проекты и программы</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[hsl(var(--primary))] md:text-3xl">
            Государственные проекты и программы в сфере культуры
          </h1>
          <p className="mt-2 text-muted-foreground">{programs.length} программ и проектов</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Фильтры */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Фильтр:</span>
          {([['all', 'Все', programs.length], ['active', 'Действующие', programs.filter(p => p.status === 'active').length], ['completed', 'Завершённые', programs.filter(p => p.status === 'completed').length]] as const).map(([val, label, count]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === val
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white'
                  : 'border-border bg-white text-muted-foreground hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]'
              }`}
            >
              {label}
              <span className={`rounded-full px-1.5 ${filter === val ? 'bg-white/20 text-white' : 'bg-[hsl(var(--muted))]'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Список */}
          <div className="space-y-3 lg:col-span-2">
            {filtered.map((program) => {
              const cfg = statusConfig[program.status];
              const isSelected = selected?.id === program.id;
              return (
                <button
                  key={program.id}
                  onClick={() => setSelected(program)}
                  className={`w-full rounded-lg border text-left transition-all duration-150 ${
                    isSelected
                      ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] shadow-lg'
                      : 'border-border bg-white hover:border-[hsl(var(--primary))]/50 hover:shadow-md'
                  }`}
                >
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                        <span className={`text-xs font-medium ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <span className={`text-xs ${isSelected ? 'text-white/60' : 'text-muted-foreground'}`}>
                        {program.period}
                      </span>
                    </div>
                    <div className={`font-serif font-bold leading-snug ${isSelected ? 'text-white' : 'text-[hsl(var(--primary))]'}`}>
                      {program.shortName}
                    </div>
                    <div className={`mt-1.5 text-xs ${isSelected ? 'text-white/65' : 'text-muted-foreground'}`}>
                      {program.budget}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Детали */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="sticky top-20 overflow-hidden rounded-lg border border-border bg-white shadow-md">
                {/* Шапка */}
                <div className="border-b border-border bg-[hsl(var(--muted))] p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[selected.status].badge}`}>
                      {statusConfig[selected.status].label}
                    </span>
                    <span className="text-sm text-muted-foreground">{selected.period}</span>
                  </div>
                  <h2 className="font-serif text-xl font-bold leading-snug text-[hsl(var(--primary))]">{selected.name}</h2>
                </div>

                <div className="p-6">
                  {/* Мета */}
                  <div className="mb-5 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-[hsl(var(--muted))] p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Banknote" size={13} />
                        Объём финансирования
                      </div>
                      <div className="font-bold text-[hsl(var(--primary))]">{selected.budget}</div>
                    </div>
                    <div className="rounded-lg bg-[hsl(var(--muted))] p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Calendar" size={13} />
                        Период реализации
                      </div>
                      <div className="font-bold text-[hsl(var(--primary))]">{selected.period}</div>
                    </div>
                  </div>

                  {/* Ответственный */}
                  <div className="mb-5 flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
                    <Icon name="Building" size={16} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                    <div>
                      <div className="text-xs text-muted-foreground">Ответственный исполнитель</div>
                      <div className="font-medium text-[hsl(var(--primary))]">{selected.responsible}</div>
                    </div>
                  </div>

                  {/* Цель */}
                  <div className="mb-5">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                      <Icon name="Target" size={15} className="text-[hsl(var(--accent))]" />
                      Цель программы
                    </div>
                    <p className="rounded-lg bg-[hsl(var(--muted))] p-4 text-sm leading-relaxed">{selected.goal}</p>
                  </div>

                  {/* Задачи */}
                  <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                      <Icon name="CheckSquare" size={15} className="text-[hsl(var(--accent))]" />
                      Задачи программы
                    </div>
                    <ul className="space-y-2">
                      {selected.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent))]/10 text-xs font-bold text-[hsl(var(--accent))]">
                            {i + 1}
                          </div>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Результаты */}
                  {selected.results && selected.results.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]">
                        <Icon name="Award" size={15} className="text-yellow-500" />
                        Ключевые результаты
                      </div>
                      <ul className="space-y-2">
                        {selected.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-3 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm">
                            <Icon name="TrendingUp" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                            <span className="text-emerald-800">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-white text-center text-muted-foreground">
                <Icon name="FileText" size={40} className="mb-3 opacity-20" />
                <p className="text-sm">Выберите программу из списка</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
