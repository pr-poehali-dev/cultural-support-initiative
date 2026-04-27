import { useState } from 'react';
import { programs, Program } from '@/data/programs';
import Icon from '@/components/ui/icon';

const statusLabels: Record<Program['status'], string> = {
  active: 'Действующая',
  completed: 'Завершена',
  planned: 'Планируется',
};

const statusColors: Record<Program['status'], string> = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-600',
  planned: 'bg-blue-100 text-blue-800',
};

export default function Programs() {
  const [selected, setSelected] = useState<Program | null>(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-2 text-sm text-muted-foreground">Главная / Государственные проекты и программы</div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-[hsl(var(--primary))]">
        Государственные проекты и программы в сфере культуры
      </h1>
      <div className="mb-8 h-1 w-16 bg-[hsl(var(--accent))]" />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => setSelected(program)}
              className={`w-full rounded border text-left transition-all ${
                selected?.id === program.id
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white shadow-md'
                  : 'border-border bg-white hover:border-[hsl(var(--primary))] hover:shadow-sm'
              }`}
            >
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
                    selected?.id === program.id ? 'bg-white/20 text-white' : statusColors[program.status]
                  }`}>
                    {statusLabels[program.status]}
                  </span>
                  <span className={`text-xs ${selected?.id === program.id ? 'text-white/60' : 'text-muted-foreground'}`}>
                    {program.period}
                  </span>
                </div>
                <div className={`font-serif font-bold leading-tight ${
                  selected?.id === program.id ? 'text-white' : 'text-[hsl(var(--primary))]'
                }`}>
                  {program.shortName}
                </div>
                <div className={`mt-1 text-xs ${selected?.id === program.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                  Бюджет: {program.budget}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="rounded border border-border bg-white shadow-sm">
              <div className="border-b border-border bg-[hsl(var(--muted))] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[selected.status]}`}>
                    {statusLabels[selected.status]}
                  </span>
                  <span className="text-xs text-muted-foreground">{selected.period}</span>
                </div>
                <h2 className="font-serif text-xl font-bold text-[hsl(var(--primary))]">{selected.name}</h2>
              </div>

              <div className="p-5">
                <div className="mb-5 grid gap-3 text-sm md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <Icon name="DollarSign" size={15} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                    <div>
                      <div className="text-xs text-muted-foreground">Объём финансирования</div>
                      <div className="font-medium text-[hsl(var(--primary))]">{selected.budget}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Building" size={15} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                    <div>
                      <div className="text-xs text-muted-foreground">Ответственный исполнитель</div>
                      <div className="font-medium text-[hsl(var(--primary))] text-xs">{selected.responsible}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 rounded bg-[hsl(var(--muted))] p-4">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Цель программы</div>
                  <p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">{selected.goal}</p>
                </div>

                <div className="mb-5">
                  <div className="mb-3 text-sm font-semibold text-[hsl(var(--primary))]">Задачи:</div>
                  <ul className="space-y-2">
                    {selected.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm">
                        <Icon name="CheckSquare" size={15} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selected.results && selected.results.length > 0 && (
                  <div>
                    <div className="mb-3 text-sm font-semibold text-[hsl(var(--primary))]">Ключевые результаты:</div>
                    <ul className="space-y-2">
                      {selected.results.map((result) => (
                        <li key={result} className="flex items-start gap-2 text-sm">
                          <Icon name="Star" size={15} className="mt-0.5 shrink-0 text-yellow-500" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded border border-dashed border-border bg-white text-center text-muted-foreground">
              <Icon name="FileText" size={36} className="mb-3 opacity-30" />
              <p className="text-sm">Выберите программу из списка слева<br />для просмотра подробной информации</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
