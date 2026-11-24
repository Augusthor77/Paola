import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Search,
  Users,
  GraduationCap,
  Briefcase,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  normalizeText,
  cleanPhoneNumber,
  getWhatsAppUrl,
  getAvatarColor,
  generateInitials,
} from '../../utils/helpers.ts';

export const AuditoriaDirectorioView: React.FC = () => {
  const {
    students,
    guardians,
    teachers,
    admins,
    setSelectedStudentId,
    setPazYSalvoStudentId,
  } = useSchool();

  const [activeDirectoryTab, setActiveDirectoryTab] = useState<
    'estudiantes' | 'acudientes' | 'docentes' | 'administrativos'
  >('estudiantes');

  const [query, setQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('todos');
  const [financialFilter, setFinancialFilter] = useState<'todos' | 'al_dia' | 'en_mora'>('todos');

  const normalized = normalizeText(query.trim());

  // Filter students
  const filteredStudents = students.filter((st) => {
    if (gradeFilter !== 'todos' && st.gn !== Number(gradeFilter)) return false;
    if (financialFilter === 'al_dia' && !st.paid) return false;
    if (financialFilter === 'en_mora' && st.paid) return false;
    if (!normalized) return true;
    return (
      normalizeText(st.n).includes(normalized) ||
      normalizeText(st.doc).includes(normalized) ||
      normalizeText(st.g).includes(normalized) ||
      normalizeText(st.nfcCode).includes(normalized)
    );
  });

  // Filter guardians
  const filteredGuardians = guardians.filter((g) => {
    if (!normalized) return true;
    const kidsText = g.kids.map((k) => students[k]?.n || '').join(' ');
    return (
      normalizeText(g.n).includes(normalized) ||
      normalizeText(g.doc).includes(normalized) ||
      normalizeText(g.tel).includes(normalized) ||
      normalizeText(kidsText).includes(normalized)
    );
  });

  // Filter teachers
  const filteredTeachers = teachers.filter((t) => {
    if (!normalized) return true;
    return (
      normalizeText(t.n).includes(normalized) ||
      normalizeText(t.asig).includes(normalized) ||
      normalizeText(t.coord).includes(normalized) ||
      normalizeText(t.tel).includes(normalized)
    );
  });

  // Filter admins
  const filteredAdmins = admins.filter((m) => {
    if (!normalized) return true;
    return (
      normalizeText(m.n).includes(normalized) ||
      normalizeText(m.ocup).includes(normalized) ||
      normalizeText(m.tel).includes(normalized)
    );
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-emerald-800" />
            <span>Centro de Auditoría y Directorio Institucional</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Base de datos unificada de estudiantes, acudientes, docentes y directivos del Liceo
          </p>
        </div>

        {/* Directory Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveDirectoryTab('estudiantes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeDirectoryTab === 'estudiantes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <span>Alumnos ({students.length})</span>
          </button>
          <button
            onClick={() => setActiveDirectoryTab('acudientes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeDirectoryTab === 'acudientes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>Acudientes ({guardians.length})</span>
          </button>
          <button
            onClick={() => setActiveDirectoryTab('docentes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeDirectoryTab === 'docentes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Docentes ({teachers.length})</span>
          </button>
          <button
            onClick={() => setActiveDirectoryTab('administrativos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeDirectoryTab === 'administrativos'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-600" />
            <span>Staff ({admins.length})</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento (RC, TI, CC), carnet o contacto..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-emerald-600"
            />
          </div>

          {activeDirectoryTab === 'estudiantes' && (
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-white text-slate-800"
              >
                <option value="todos">Todos los Grados (1° a 11°)</option>
                {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    Grado {g}° {g <= 5 ? 'Primaria' : 'Bachillerato'}
                  </option>
                ))}
              </select>

              <select
                value={financialFilter}
                onChange={(e) => setFinancialFilter(e.target.value as any)}
                className="px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-white text-slate-800"
              >
                <option value="todos">Todos los estados</option>
                <option value="al_dia">Paz y Salvo</option>
                <option value="en_mora">En mora</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Estudiantes Directory Table */}
      {activeDirectoryTab === 'estudiantes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Mostrando <strong>{filteredStudents.length}</strong> de {students.length} estudiantes
            </span>
            <span className="text-[11px] text-slate-400">
              Haz clic en cualquier alumno para abrir su Ficha 360°
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="p-3.5">Estudiante</th>
                  <th className="p-3.5">Grado</th>
                  <th className="p-3.5">Documento</th>
                  <th className="p-3.5">Carnet NFC</th>
                  <th className="p-3.5">Acudiente Principal</th>
                  <th className="p-3.5">Estado Financiero</th>
                  <th className="p-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.slice(0, 50).map((st) => {
                  const guardian = guardians[st.ac[0]];
                  return (
                    <tr
                      key={st.id}
                      onClick={() => setSelectedStudentId(st.id)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                    >
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${getAvatarColor(
                              st.n
                            )}`}
                          >
                            {generateInitials(st.n)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                              {st.n}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {st.age} años · {st.sex}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">{st.g}</td>
                      <td className="p-3.5 font-mono text-slate-600">{st.doc}</td>
                      <td className="p-3.5 font-mono text-emerald-800 text-[11px]">
                        {st.nfcCode}
                      </td>
                      <td className="p-3.5">
                        {guardian ? (
                          <div>
                            <div className="font-medium text-slate-800">
                              {guardian.n} ({guardian.rel})
                            </div>
                            <div className="text-[11px] text-slate-400">{guardian.tel}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400">No asignado</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                            st.paid
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {st.paid ? 'Al Día' : `${st.debt}m en mora`}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold group-hover:underline">
                          <span>Ver Ficha</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredStudents.length > 50 && (
            <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-100">
              Mostrando los primeros 50 de {filteredStudents.length} resultados. Usa el filtro de grado o búsqueda para ver un grupo específico.
            </div>
          )}
        </div>
      )}

      {/* Acudientes Directory Table */}
      {activeDirectoryTab === 'acudientes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 text-xs text-slate-500">
            Mostrando <strong>{filteredGuardians.length}</strong> acudientes
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="p-3.5">Acudiente</th>
                  <th className="p-3.5">Parentesco</th>
                  <th className="p-3.5">Documento</th>
                  <th className="p-3.5">Teléfono / WhatsApp</th>
                  <th className="p-3.5">Correo Electrónico</th>
                  <th className="p-3.5">Estudiante(s) a Cargo</th>
                  <th className="p-3.5 text-right">Contacto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGuardians.slice(0, 50).map((g) => {
                  const whatsappMsg = `Cordial saludo ${g.n}, desde el Liceo Psicopedagógico Paola nos comunicamos respecto al seguimiento escolar de sus acudidos.`;
                  const waUrl = getWhatsAppUrl(g.tel, whatsappMsg);

                  return (
                    <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{g.n}</td>
                      <td className="p-3.5 font-medium text-slate-700">{g.rel}</td>
                      <td className="p-3.5 font-mono text-slate-600">{g.doc}</td>
                      <td className="p-3.5 font-mono text-slate-800">{g.tel}</td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">{g.mail}</td>
                      <td className="p-3.5">
                        <div className="space-y-0.5">
                          {g.kids.map((kidId) => {
                            const st = students[kidId];
                            if (!st) return null;
                            return (
                              <button
                                key={kidId}
                                onClick={() => setSelectedStudentId(kidId)}
                                className="block font-medium text-emerald-800 hover:underline text-left text-xs"
                              >
                                {st.n} ({st.g})
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Docentes Directory Table */}
      {activeDirectoryTab === 'docentes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 text-xs text-slate-500">
            Planta Docente Institucional: <strong>{filteredTeachers.length}</strong> docentes
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="p-3.5">Docente</th>
                  <th className="p-3.5">Asignatura Principal</th>
                  <th className="p-3.5">Dirección de Grupo</th>
                  <th className="p-3.5">Documento</th>
                  <th className="p-3.5">Teléfono</th>
                  <th className="p-3.5">Correo Institucional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{t.n}</div>
                      <div className="text-[11px] text-slate-500">{t.short}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-900">{t.asig}</td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {t.coord}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{t.doc}</td>
                    <td className="p-3.5 font-mono text-slate-800">{t.tel}</td>
                    <td className="p-3.5 font-mono text-emerald-800 text-[11px]">{t.mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Administrativos Directory Table */}
      {activeDirectoryTab === 'administrativos' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 text-xs text-slate-500">
            Equipo Directivo y Administrativo: <strong>{filteredAdmins.length}</strong> miembros
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                  <th className="p-3.5">Nombre</th>
                  <th className="p-3.5">Cargo / Ocupación</th>
                  <th className="p-3.5">Documento</th>
                  <th className="p-3.5">Teléfono</th>
                  <th className="p-3.5">Correo Electrónico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdmins.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{m.n}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900 bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-md">
                        {m.ocup}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{m.doc}</td>
                    <td className="p-3.5 font-mono text-slate-800">{m.tel}</td>
                    <td className="p-3.5 font-mono text-slate-700 text-[11px]">{m.mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditoriaDirectorioView;
