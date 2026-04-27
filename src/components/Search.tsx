import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { federalBodies } from '@/data/federalBodies';
import { programs } from '@/data/programs';
import { regionalBodies } from '@/data/regions';
import Icon from '@/components/ui/icon';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  path: string;
  icon: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  federalBodies.forEach((b) => {
    results.push({
      id: `fed-${b.id}`,
      title: b.shortName,
      subtitle: b.head,
      category: 'Федеральные органы',
      path: '/federal',
      icon: 'Building2',
    });
  });

  programs.forEach((p) => {
    results.push({
      id: `prog-${p.id}`,
      title: p.shortName,
      subtitle: `${p.period} · ${p.budget}`,
      category: 'Программы и проекты',
      path: '/programs',
      icon: 'FileText',
    });
  });

  regionalBodies.forEach((r) => {
    results.push({
      id: `reg-${r.id}`,
      title: r.region,
      subtitle: r.bodyName,
      category: 'Региональные органы',
      path: '/regions',
      icon: 'MapPin',
    });
  });

  return results;
}

const ALL_RESULTS = buildIndex();

export default function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return ALL_RESULTS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(result: SearchResult) {
    navigate(result.path);
    setQuery('');
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <div className="flex items-center gap-2 rounded border border-white/30 bg-white/10 px-3 py-2 backdrop-blur-sm focus-within:border-white/60 focus-within:bg-white/20 transition-all">
        <Icon name="Search" size={16} className="shrink-0 text-white/70" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Поиск по справочнику..."
          className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }}>
            <Icon name="X" size={14} className="text-white/60 hover:text-white" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded border border-border bg-white shadow-xl">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-[hsl(var(--muted))]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[hsl(var(--secondary))]">
                <Icon name={result.icon} size={15} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-[hsl(var(--primary))]">{result.title}</div>
                <div className="truncate text-xs text-muted-foreground">{result.subtitle}</div>
              </div>
              <span className="ml-auto shrink-0 rounded bg-[hsl(var(--muted))] px-2 py-0.5 text-xs text-muted-foreground">
                {result.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded border border-border bg-white px-4 py-6 text-center shadow-xl">
          <Icon name="SearchX" size={24} className="mx-auto mb-2 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground">По запросу «{query}» ничего не найдено</p>
        </div>
      )}
    </div>
  );
}