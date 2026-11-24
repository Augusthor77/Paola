import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  BookOpen,
  Bookmark,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import manualData from '../../data/manualData.json';
import { normalizeText } from '../../utils/helpers.ts';

interface ManualEntry {
  s: string;
  p: number;
  t: string;
}

const TOPICS = [
  { label: 'Faltas leves (Tipo I)', query: 'faltas leves tipo I' },
  { label: 'Faltas graves y gravísimas', query: 'faltas graves gravísimas tipo III' },
  { label: 'Uso de Uniformes', query: 'uniforme de diario educacion fisica' },
  { label: 'Uso de Celulares y Dispositivos', query: 'celulares dispositivos electrónicos' },
  { label: 'Debido Proceso y Descargos', query: 'debido proceso descargos' },
  { label: 'Escala de Valoración (SIEE)', query: 'escala valoracion desempeno superior basico' },
  { label: 'Criterios de Promoción', query: 'promocion no promocion reprobacion' },
  { label: 'Comité de Convivencia Escolar', query: 'comite convivencia ruta atencion ley 1620' },
];

export const ManualConvivenciaView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('todos');

  // Extract unique chapters / sections
  const sections = useMemo(() => {
    return Array.from(new Set(manualData.map((m: any) => m.s as string)));
  }, []);

  const searchTokens = useMemo(() => {
    const clean = normalizeText(query.trim());
    return clean
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2);
  }, [query]);

  // Filtered manual items
  const filteredEntries = useMemo(() => {
    let items = manualData as ManualEntry[];

    if (selectedSection !== 'todos') {
      items = items.filter((m) => m.s === selectedSection);
    }

    if (!searchTokens.length) {
      return items.slice(0, 15);
    }

    // Score based on token matches
    const scored = items
      .map((entry) => {
        const normTitle = normalizeText(entry.s);
        const normText = normalizeText(entry.t);
        let score = 0;
        let matches = 0;

        searchTokens.forEach((tk) => {
          if (normTitle.includes(tk)) score += 8;
          if (normText.includes(tk)) {
            matches++;
            score += 3;
          }
        });

        return { entry, score, matches };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map((x) => x.entry).slice(0, 20);
  }, [searchTokens, selectedSection]);

  // Highlight matches in text
  const renderHighlightedText = (text: string) => {
    if (!searchTokens.length) return text;
    // Create regex from tokens
    try {
      const pattern = new RegExp(`(${searchTokens.join('|')})`, 'gi');
      const parts = text.split(pattern);
      return parts.map((part, i) => {
        const isMatch = searchTokens.some(
          (tk) => normalizeText(part) === normalizeText(tk)
        );
        if (isMatch) {
          return (
            <mark key={i} className="bg-amber-200 text-slate-900 px-0.5 rounded">
              {part}
            </mark>
          );
        }
        return part;
      });
    } catch {
      return text;
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-800" />
            <span>Manual de Convivencia y Prevención Escolar</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Reglamento oficial del Liceo Paola · Conforme a la Ley 1620 y Decreto 1965 (108 páginas indexadas)
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 self-start sm:self-auto">
          271 Artículos Digitalizados
        </span>
      </div>

      {/* Search and Topic Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar por palabra clave (ej: uniforme, celulares, inasistencia, debido proceso, faltas graves)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedSection('todos');
            }}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-emerald-600 shadow-2xs font-medium"
          />
        </div>

        {/* Quick Topic Chips */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Temas de Consulta Frecuente:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TOPICS.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(topic.query);
                  setSelectedSection('todos');
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-xs font-medium rounded-lg transition-colors"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Selector Dropdown */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-700 shrink-0" />
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setQuery('');
              }}
              className="text-xs font-medium border border-slate-200 rounded-lg p-2 bg-white text-slate-800 max-w-full sm:max-w-md"
            >
              <option value="todos">Explorar por Capítulo (Todos los títulos)</option>
              {sections.map((sec, idx) => (
                <option key={idx} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500">
            {filteredEntries.length} resultado(s) mostrados
          </span>
        </div>
      </div>

      {/* Manual Content Articles Grid */}
      <div className="space-y-3">
        {filteredEntries.map((entry, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-colors space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{entry.s}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Página {entry.p} del Manual
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {renderHighlightedText(entry.t)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManualConvivenciaView;
