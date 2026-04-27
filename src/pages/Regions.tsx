import { useState, useMemo } from 'react';
import { regionalBodies, federalDistricts, RegionalBody } from '@/data/regions';
import Icon from '@/components/ui/icon';

const districtColors: Record<string, { fill: string; light: string; text: string }> = {
  'Центральный':      { fill: '#1e3a6e', light: '#dbe6f5', text: 'text-blue-900' },
  'Северо-Западный':  { fill: '#1d5fa3', light: '#d1e9f7', text: 'text-blue-800' },
  'Южный':            { fill: '#b45309', light: '#fef3c7', text: 'text-amber-800' },
  'Северо-Кавказский':{ fill: '#7c2d12', light: '#fee2e2', text: 'text-red-900' },
  'Приволжский':      { fill: '#166534', light: '#d1fae5', text: 'text-green-900' },
  'Уральский':        { fill: '#581c87', light: '#ede9fe', text: 'text-purple-900' },
  'Сибирский':        { fill: '#164e63', light: '#cffafe', text: 'text-cyan-900' },
  'Дальневосточный':  { fill: '#7f1d1d', light: '#ffe4e6', text: 'text-rose-900' },
};

export default function Regions() {
  const [selectedDistrict, setSelectedDistrict] = useState('Все округа');
  const [selected, setSelected] = useState<RegionalBody | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = regionalBodies;
    if (selectedDistrict !== 'Все округа') result = result.filter((r) => r.federalDistrict === selectedDistrict);
    if (search.trim().length > 1) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.region.toLowerCase().includes(q) || r.bodyName.toLowerCase().includes(q) || r.head.toLowerCase().includes(q));
    }
    return result;
  }, [selectedDistrict, search]);

  const filteredIds = new Set(filtered.map((r) => r.id));

  const countByDistrict = useMemo(() => {
    const m: Record<string, number> = {};
    regionalBodies.forEach((r) => { m[r.federalDistrict] = (m[r.federalDistrict] || 0) + 1; });
    return m;
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Главная</span>
            <Icon name="ChevronRight" size={12} />
            <span className="text-[hsl(var(--primary))]">Карта регионов</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[hsl(var(--primary))] md:text-3xl">
            Региональные органы управления культурой
          </h1>
          <p className="mt-2 text-muted-foreground">
            {regionalBodies.length} субъектов Российской Федерации · 8 федеральных округов
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Фильтры по округам */}
        <div className="mb-6 flex flex-wrap gap-2">
          {federalDistricts.map((d) => {
            const color = districtColors[d];
            const isActive = selectedDistrict === d;
            const count = d === 'Все округа' ? regionalBodies.length : (countByDistrict[d] || 0);
            return (
              <button
                key={d}
                onClick={() => { setSelectedDistrict(d); setSelected(null); }}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'shadow-md'
                    : 'border-border bg-white text-muted-foreground hover:border-[hsl(var(--primary))]/40'
                }`}
                style={isActive && color ? { backgroundColor: color.fill, borderColor: color.fill, color: '#fff' } :
                       isActive ? { backgroundColor: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary))', color: '#fff' } : {}}
              >
                {color && !isActive && (
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color.fill }} />
                )}
                {d}
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${isActive ? 'bg-white/25 text-white' : 'bg-[hsl(var(--muted))]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-5">
          {/* Карта */}
          <div className="overflow-hidden rounded-lg border border-border bg-white shadow-md xl:col-span-3">
            <div className="flex items-center justify-between border-b border-border bg-[hsl(var(--muted))] px-5 py-3">
              <div>
                <div className="text-sm font-semibold text-[hsl(var(--primary))]">
                  Карта субъектов Российской Федерации
                </div>
                <div className="text-xs text-muted-foreground">
                  Нажмите на точку для просмотра контактов органа управления культурой
                </div>
              </div>
              <div className="text-xs font-medium text-[hsl(var(--primary))]">
                {filtered.length} / {regionalBodies.length}
              </div>
            </div>

            <div className="relative" style={{ paddingBottom: '56%' }}>
              <svg
                viewBox="0 0 860 480"
                className="absolute inset-0 h-full w-full"
                style={{ background: 'linear-gradient(180deg, #deeaf5 0%, #c8dcea 100%)' }}
              >
                {/* Сетка */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#b8d0e4" strokeWidth="0.4" />
                  </pattern>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.25" />
                  </filter>
                </defs>
                <rect width="860" height="480" fill="url(#grid)" />

                {/* Силуэт России (упрощённый) */}
                <path
                  d="M58 82 L100 62 L160 55 L240 50 L320 50 L380 48 L460 47 L550 50 L640 54 L720 58 L800 62 L840 72 L848 90 L845 112 L835 128 L830 145 L835 160 L840 178 L838 200 L830 220 L822 240 L818 258 L820 276 L815 295 L800 310 L782 318 L760 326 L745 342 L730 358 L714 368 L696 372 L676 368 L656 355 L636 346 L616 344 L596 350 L574 354 L554 348 L534 336 L514 326 L494 320 L474 316 L454 312 L434 308 L414 308 L394 312 L374 318 L354 322 L334 326 L314 322 L294 314 L274 308 L254 298 L234 284 L214 270 L194 258 L172 246 L150 236 L128 226 L108 216 L88 206 L68 194 L56 178 L50 160 L48 140 L52 120 L56 100 Z"
                  fill="#c0d8ea"
                  stroke="#9ab8cc"
                  strokeWidth="1.2"
                />

                {/* Водоёмы */}
                <ellipse cx="262" cy="128" rx="48" ry="28" fill="#a8c8dc" stroke="#88aec8" strokeWidth="0.7" opacity="0.7" />
                <ellipse cx="175" cy="168" rx="38" ry="22" fill="#a0c0d8" stroke="#88aec8" strokeWidth="0.7" opacity="0.6" />
                <ellipse cx="518" cy="98" rx="32" ry="17" fill="#a8c8dc" stroke="#88aec8" strokeWidth="0.7" opacity="0.6" />
                <ellipse cx="674" cy="116" rx="42" ry="20" fill="#a0c0d8" stroke="#88aec8" strokeWidth="0.7" opacity="0.6" />
                <ellipse cx="346" cy="270" rx="13" ry="8" fill="#80b0cc" stroke="#5c90b0" strokeWidth="0.8" opacity="0.9" />
                <ellipse cx="652" cy="218" rx="10" ry="7" fill="#80b0cc" stroke="#5c90b0" strokeWidth="0.8" opacity="0.9" />

                {/* Точки регионов */}
                {regionalBodies.map((r) => {
                  const color = districtColors[r.federalDistrict]?.fill || '#1e3a6e';
                  const isSelected = selected?.id === r.id;
                  const isHovered = hoveredId === r.id;
                  const isFiltered = filteredIds.has(r.id);
                  const radius = isSelected ? 10 : isHovered ? 9 : 7;

                  return (
                    <g
                      key={r.id}
                      onClick={() => isFiltered && setSelected(r)}
                      onMouseEnter={() => setHoveredId(r.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: isFiltered ? 'pointer' : 'default' }}
                    >
                      {isSelected && (
                        <circle cx={r.cx} cy={r.cy} r={16} fill={color} opacity={0.15} />
                      )}
                      <circle
                        cx={r.cx}
                        cy={r.cy}
                        r={radius}
                        fill={isSelected ? '#c47000' : isFiltered ? color : '#ccc'}
                        stroke="white"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        filter={isSelected || isHovered ? 'url(#shadow)' : undefined}
                        style={{ transition: 'all 0.15s ease' }}
                      />
                      {(isSelected || isHovered) && isFiltered && (
                        <text
                          x={r.cx}
                          y={r.cy - 14}
                          textAnchor="middle"
                          fontSize="8.5"
                          fontWeight="600"
                          fill="#1e3a5f"
                          style={{ pointerEvents: 'none', paintOrder: 'stroke' }}
                          stroke="white"
                          strokeWidth="2.5"
                        >
                          {r.region.length > 20 ? r.region.slice(0, 18) + '…' : r.region}
                        </text>
                      )}
                    </g>
                  );
                })}

                <text x="12" y="474" fontSize="8" fill="#7a9cb4" opacity="0.6">
                  Схема территории Российской Федерации
                </text>
              </svg>
            </div>

            {/* Легенда */}
            <div className="border-t border-border px-5 py-3">
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {Object.entries(districtColors).map(([name, { fill }]) => (
                  <div key={name} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: fill }} />
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая панель */}
          <div className="space-y-4 xl:col-span-2">
            {/* Карточка выбранного */}
            {selected ? (
              <div className="overflow-hidden rounded-lg border border-border bg-white shadow-md">
                <div
                  className="border-b border-border p-4"
                  style={{ backgroundColor: districtColors[selected.federalDistrict]?.light || '#f5f5f5' }}
                >
                  <div
                    className="mb-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: districtColors[selected.federalDistrict]?.fill || '#1e3a6e' }}
                  >
                    <Icon name="MapPin" size={11} />
                    {selected.federalDistrict} федеральный округ
                  </div>
                  <h2 className="font-serif text-lg font-bold text-[hsl(var(--primary))]">{selected.region}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">{selected.bodyName}</p>
                </div>
                <div className="space-y-3 p-4 text-sm">
                  {[
                    { icon: 'User', label: 'Руководитель', value: selected.head, href: null },
                    { icon: 'MapPin', label: 'Адрес', value: selected.address, href: null },
                    { icon: 'Phone', label: 'Телефон', value: selected.phone, href: `tel:${selected.phone}` },
                    { icon: 'Mail', label: 'E-mail', value: selected.email, href: `mailto:${selected.email}` },
                    { icon: 'Globe', label: 'Сайт', value: selected.website.replace('https://', ''), href: selected.website },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[hsl(var(--muted))]">
                        <Icon name={icon} size={12} className="text-[hsl(var(--accent))]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{label}</div>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="break-all text-xs font-medium text-[hsl(var(--primary))] hover:underline">
                            {value}
                          </a>
                        ) : (
                          <div className="text-xs font-medium text-[hsl(var(--primary))]">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-3">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[hsl(var(--primary))]"
                  >
                    <Icon name="X" size={12} />
                    Закрыть
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-white text-center text-muted-foreground">
                <Icon name="MousePointerClick" size={24} className="mb-2 opacity-30" />
                <p className="text-sm">Нажмите на регион на карте</p>
              </div>
            )}

            {/* Поиск и список */}
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <div className="border-b border-border p-3">
                <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
                  <Icon name="Search" size={14} className="text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск по регионам..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  {search && (
                    <button onClick={() => setSearch('')}>
                      <Icon name="X" size={12} className="text-muted-foreground hover:text-[hsl(var(--primary))]" />
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">Ничего не найдено</div>
                ) : (
                  filtered.map((r) => {
                    const color = districtColors[r.federalDistrict];
                    return (
                      <button
                        key={r.id}
                        onClick={() => setSelected(r)}
                        className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-[hsl(var(--muted))] ${
                          selected?.id === r.id ? 'bg-[hsl(var(--muted))]' : ''
                        }`}
                      >
                        <div
                          className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white ring-offset-0"
                          style={{ backgroundColor: color?.fill || '#999' }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-[hsl(var(--primary))]">{r.region}</div>
                          <div className="truncate text-xs text-muted-foreground">{r.federalDistrict} ФО</div>
                        </div>
                        <Icon name="ChevronRight" size={14} className="shrink-0 text-muted-foreground/50" />
                      </button>
                    );
                  })
                )}
              </div>
              <div className="border-t border-border px-4 py-2 text-right text-xs text-muted-foreground">
                Показано: {filtered.length} из {regionalBodies.length}
              </div>
            </div>
          </div>
        </div>

        {/* Статистика по округам */}
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-[hsl(var(--accent))]" />
            <h2 className="font-serif text-xl font-bold text-[hsl(var(--primary))]">Статистика по федеральным округам</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(districtColors).map(([name, { fill, light }]) => {
              const count = countByDistrict[name] || 0;
              return (
                <button
                  key={name}
                  onClick={() => { setSelectedDistrict(name); setSelected(null); }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
                  style={selectedDistrict === name ? { borderColor: fill, backgroundColor: light } : {}}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: fill }}>
                    <span className="text-sm font-bold text-white">{count}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[hsl(var(--primary))]">{name}</div>
                    <div className="text-xs text-muted-foreground">субъектов</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
