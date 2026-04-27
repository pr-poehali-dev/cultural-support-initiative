import { useState } from 'react';
import { regionalBodies, federalDistricts, RegionalBody } from '@/data/regions';
import Icon from '@/components/ui/icon';

const districtColors: Record<string, string> = {
  'Центральный': '#1e3a5f',
  'Северо-Западный': '#2e5fa3',
  'Южный': '#c47000',
  'Северо-Кавказский': '#7b3500',
  'Приволжский': '#1a6e3c',
  'Уральский': '#5a2d82',
  'Сибирский': '#006080',
  'Дальневосточный': '#8b1a1a',
};

export default function Regions() {
  const [selectedDistrict, setSelectedDistrict] = useState('Все округа');
  const [selected, setSelected] = useState<RegionalBody | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = regionalBodies.filter(
    (r) => selectedDistrict === 'Все округа' || r.federalDistrict === selectedDistrict,
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-2 text-sm text-muted-foreground">Главная / Карта регионов</div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-[hsl(var(--primary))]">
        Региональные органы управления культурой
      </h1>
      <div className="mb-6 h-1 w-16 bg-[hsl(var(--accent))]" />

      <div className="mb-6 flex flex-wrap gap-2">
        {federalDistricts.map((d) => (
          <button
            key={d}
            onClick={() => { setSelectedDistrict(d); setSelected(null); }}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedDistrict === d
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'border border-border bg-white text-muted-foreground hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded border border-border bg-white shadow-sm lg:col-span-3">
          <div className="border-b border-border px-4 py-3">
            <div className="text-sm font-medium text-[hsl(var(--primary))]">
              Интерактивная карта субъектов РФ
            </div>
            <div className="text-xs text-muted-foreground">Нажмите на отметку региона для просмотра информации</div>
          </div>
          <div className="relative overflow-hidden" style={{ paddingBottom: '55%' }}>
            <svg
              viewBox="0 0 860 470"
              className="absolute inset-0 h-full w-full"
              style={{ background: 'linear-gradient(180deg, #e8f0f8 0%, #d4e8f5 100%)' }}
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c5d8e8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="860" height="470" fill="url(#grid)" />

              <path
                d="M 60 80 L 120 60 L 200 55 L 280 50 L 360 52 L 440 50 L 540 55 L 640 60 L 740 65 L 820 70 L 840 90 L 840 110 L 820 115 L 820 130 L 800 135 L 790 150 L 780 165 L 790 180 L 800 200 L 810 220 L 820 240 L 820 260 L 810 280 L 800 300 L 780 310 L 760 320 L 750 340 L 740 360 L 720 370 L 700 375 L 680 370 L 660 360 L 640 350 L 620 345 L 600 350 L 580 355 L 560 350 L 540 340 L 520 330 L 500 325 L 480 320 L 460 315 L 440 310 L 420 305 L 400 310 L 380 315 L 360 320 L 340 325 L 320 330 L 300 325 L 280 315 L 260 310 L 240 300 L 220 285 L 200 270 L 180 260 L 160 250 L 140 240 L 120 230 L 100 220 L 80 210 L 60 200 L 50 180 L 48 160 L 50 140 L 55 120 L 60 100 Z"
                fill="#c8daea"
                stroke="#9ab8ce"
                strokeWidth="1"
              />

              <ellipse cx="260" cy="130" rx="50" ry="30" fill="#b8cfe0" stroke="#9ab8ce" strokeWidth="0.8" />
              <ellipse cx="180" cy="170" rx="40" ry="25" fill="#b0c8dc" stroke="#9ab8ce" strokeWidth="0.8" />
              <ellipse cx="510" cy="100" rx="35" ry="20" fill="#b8cfe0" stroke="#9ab8ce" strokeWidth="0.8" />
              <ellipse cx="670" cy="120" rx="45" ry="22" fill="#b0c8dc" stroke="#9ab8ce" strokeWidth="0.8" />

              <ellipse cx="350" cy="270" rx="15" ry="10" fill="#7aaccc" stroke="#5c90b0" strokeWidth="0.8" opacity="0.8" />
              <ellipse cx="650" cy="220" rx="12" ry="8" fill="#7aaccc" stroke="#5c90b0" strokeWidth="0.8" opacity="0.8" />

              {filtered.map((r) => {
                const color = districtColors[r.federalDistrict] || '#1e3a5f';
                const isSelected = selected?.id === r.id;
                const isHovered = hoveredId === r.id;
                return (
                  <g
                    key={r.id}
                    onClick={() => setSelected(r)}
                    onMouseEnter={() => setHoveredId(r.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={r.cx}
                      cy={r.cy}
                      r={isSelected ? 12 : isHovered ? 10 : 8}
                      fill={isSelected ? '#c47000' : color}
                      stroke="white"
                      strokeWidth={isSelected ? 3 : 2}
                      style={{ transition: 'all 0.15s' }}
                    />
                    {(isSelected || isHovered) && (
                      <text
                        x={r.cx}
                        y={r.cy - 16}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="600"
                        fill="#1e3a5f"
                        style={{ pointerEvents: 'none' }}
                      >
                        {r.region.length > 18 ? r.region.slice(0, 16) + '…' : r.region}
                      </text>
                    )}
                  </g>
                );
              })}

              <text x="12" y="460" fontSize="9" fill="#88a8c0" opacity="0.7">
                Схематическое изображение территории Российской Федерации
              </text>
            </svg>
          </div>

          <div className="border-t border-border px-4 py-3">
            <div className="flex flex-wrap gap-3">
              {Object.entries(districtColors).map(([name, color]) => (
                <div key={name} className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="rounded border border-border bg-white shadow-sm">
              <div className="border-b border-border bg-[hsl(var(--muted))] p-4">
                <div
                  className="mb-1 inline-block rounded px-2 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: districtColors[selected.federalDistrict] }}
                >
                  {selected.federalDistrict} ФО
                </div>
                <h2 className="font-serif text-lg font-bold text-[hsl(var(--primary))]">{selected.region}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{selected.bodyName}</p>
              </div>
              <div className="space-y-3 p-4 text-sm">
                <div className="flex items-start gap-2">
                  <Icon name="User" size={14} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                  <div>
                    <div className="text-xs text-muted-foreground">Руководитель</div>
                    <div className="font-medium text-[hsl(var(--primary))]">{selected.head}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={14} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
                  <span className="text-muted-foreground">{selected.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} className="shrink-0 text-[hsl(var(--accent))]" />
                  <a href={`tel:${selected.phone}`} className="text-[hsl(var(--primary))] hover:underline">
                    {selected.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} className="shrink-0 text-[hsl(var(--accent))]" />
                  <a href={`mailto:${selected.email}`} className="truncate text-[hsl(var(--primary))] hover:underline">
                    {selected.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Globe" size={14} className="shrink-0 text-[hsl(var(--accent))]" />
                  <a href={selected.website} target="_blank" rel="noopener noreferrer"
                    className="truncate text-[hsl(var(--primary))] hover:underline">
                    {selected.website.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded border border-dashed border-border bg-white text-center text-muted-foreground">
              <Icon name="MapPin" size={36} className="mb-3 opacity-30" />
              <p className="text-sm">Нажмите на регион на карте<br />или выберите из списка</p>
            </div>
          )}

          <div className="mt-4 rounded border border-border bg-white">
            <div className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Регионы на карте ({filtered.length})
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`flex w-full items-center gap-3 border-b border-border px-4 py-2.5 text-left text-sm transition-colors last:border-0 hover:bg-[hsl(var(--muted))] ${
                    selected?.id === r.id ? 'bg-[hsl(var(--muted))]' : ''
                  }`}
                >
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: districtColors[r.federalDistrict] }}
                  />
                  <div className="min-w-0">
                    <div className="truncate font-medium text-[hsl(var(--primary))]">{r.region}</div>
                    <div className="truncate text-xs text-muted-foreground">{r.federalDistrict} ФО</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
