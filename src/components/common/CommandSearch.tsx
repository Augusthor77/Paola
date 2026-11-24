import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Search,
  X,
  User,
  GraduationCap,
  Users,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { normalizeText, getAvatarColor, generateInitials } from '../../utils/helpers.ts';

export const CommandSearch: React.FC = () => {
  const {
    globalSearchOpen,
    setGlobalSearchOpen,
    students,
    teachers,
    guardians,
    admins,
    setSelectedStudentId,
    setActiveTab,
  } = useSchool();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(!globalSearchOpen);
      }
      if (e.key === 'Escape' && globalSearchOpen) {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [globalSearchOpen, setGlobalSearchOpen]);

  if (!globalSearchOpen) return null;

  const normalized = normalizeText(query.trim());

  const matchedStudents = normalized
    ? students
        .filter(
          (s) =>
            normalizeText(s.n).includes(normalized) ||
            normalizeText(s.doc).includes(normalized) ||
            normalizeText(s.g).includes(normalized) ||
            normalizeText(s.nfcCode).includes(normalized)
        )
        .slice(0, 6)
    : [];

  const matchedTeachers = normalized
    ? teachers
        .filter(
          (t) =>
            normalizeText(t.n).includes(normalized) ||
            normalizeText(t.asig).includes(normalized) ||
            normalizeText(t.coord).includes(normalized)
        )
        .slice(0, 4)
    : [];

  const matchedGuardians = normalized
    ? guardians
        .filter(
          (g) =>
            normalizeText(g.n).includes(normalized) ||
            normalizeText(g.tel).includes(normalized) ||
            normalizeText(g.rel).includes(normalized)
        )
        .slice(0, 4)
    : [];

  const matchedAdmins = normalized
    ? admins
        .filter(
          (m) =>
            normalizeText(m.n).includes(normalized) ||
            normalizeText(m.ocup).includes(normalized)
        )
        .slice(0, 3)
    : [];

  const totalResults =
    matchedStudents.length +
    matchedTeachers.length +
    matchedGuardians.length +
    matchedAdmins.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar por estudiante, documento, docente, acudiente, o grado..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono bg-slate-200 text-slate-600 rounded">
            ESC
          </kbd>
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium">
                Escribe un nombre, documento de identidad, carnet o grado escolar
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-[11px]">
                <button
                  onClick={() => setQuery('1° Primaria')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full"
                >
                  1° Primaria
                </button>
                <button
                  onClick={() => setQuery('Felipe Sandoval')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full"
                >
                  Prof. Felipe
                </button>
                <button
                  onClick={() => setQuery('11°')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full"
                >
                  11° Bachillerato
                </button>
                <button
                  onClick={() => setQuery('RC')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full"
                >
                  Registro Civil (RC)
                </button>
              </div>
            </div>
          )}

          {query.trim() && totalResults === 0 && (
            <div className="py-8 text-center text-slate-400">
              <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
              <p className="text-xs font-semibold text-slate-700">
                No se encontraron resultados para &ldquo;{query}&rdquo;
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Verifica la ortografía o intenta buscar por grado o número de documento.
              </p>
            </div>
          )}

          {/* Students Category */}
          {matchedStudents.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Estudiantes ({matchedStudents.length})</span>
              </div>
              <div className="space-y-1">
                {matchedStudents.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStudentId(st.id);
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/40 text-left flex items-center justify-between text-xs transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${getAvatarColor(
                          st.n
                        )}`}
                      >
                        {generateInitials(st.n)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate group-hover:text-emerald-900">
                          {st.n}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span className="font-medium text-emerald-700">{st.g}</span>
                          <span>·</span>
                          <span>{st.doc}</span>
                          <span>·</span>
                          <span className={st.paid ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                            {st.paid ? 'Al día' : `${st.debt}m en mora`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ver Ficha 360°</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teachers Category */}
          {matchedTeachers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Docentes ({matchedTeachers.length})</span>
              </div>
              <div className="space-y-1">
                {matchedTeachers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab('horarios');
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 text-left flex items-center justify-between text-xs transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {generateInitials(t.n)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">
                          {t.n}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {t.asig} · {t.coord} · Tel: {t.tel}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-blue-700 font-medium">Ver horario</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Guardians Category */}
          {matchedGuardians.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Acudientes ({matchedGuardians.length})</span>
              </div>
              <div className="space-y-1">
                {matchedGuardians.map((g) => (
                  <div
                    key={g.id}
                    className="w-full p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 text-left flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900">
                        {g.n}{' '}
                        <span className="text-[10px] font-normal text-slate-500">
                          ({g.rel})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Tel: {g.tel} · {g.mail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center">
          <span>
            Presiona <strong>Enter</strong> o haz clic para ver la ficha completa
          </span>
          <span className="font-mono text-[10px]">Liceo Psicopedagógico Paola</span>
        </div>
      </div>
    </div>
  );
};

export default CommandSearch;
