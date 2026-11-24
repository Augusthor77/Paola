import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import { UserRole } from '../../types/index.ts';
import { Shield, GraduationCap, Users, Check, X, Search } from 'lucide-react';
import { normalizeText } from '../../utils/helpers.ts';

interface RoleSwitcherModalProps {
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ onClose }) => {
  const {
    currentRole,
    teachers,
    guardians,
    students,
    selectedTeacherIndex,
    selectedGuardianIndex,
    setRole,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<UserRole>(currentRole);
  const [searchDocente, setSearchDocente] = useState('');
  const [searchAcudiente, setSearchAcudiente] = useState('');

  const filteredTeachers = teachers.filter((t) =>
    normalizeText(`${t.n} ${t.asig} ${t.coord}`).includes(normalizeText(searchDocente))
  );

  const filteredGuardians = guardians.filter((g) => {
    const kidsNames = g.kids.map((k) => students[k]?.n || '').join(' ');
    return normalizeText(`${g.n} ${g.rel} ${kidsNames}`).includes(normalizeText(searchAcudiente));
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Selector de Perfil y Rol
            </h3>
            <p className="text-xs text-slate-500">
              Prueba la plataforma desde la perspectiva de cada usuario institucional
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Type Selector Tabs */}
        <div className="grid grid-cols-3 p-2 bg-slate-100 border-b border-slate-200 gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Rectoría / Admin</span>
          </button>
          <button
            onClick={() => setActiveTab('profesor')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'profesor'
                ? 'bg-white text-emerald-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Docentes ({teachers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('acudiente')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'acudiente'
                ? 'bg-white text-emerald-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>Acudientes ({guardians.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Admin Tab */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
                    AO
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Augusto Ordóñez
                    </h4>
                    <p className="text-xs text-slate-600">
                      Rectoría y Dirección General · Control Total
                    </p>
                    <p className="text-[11px] text-emerald-800 font-mono mt-0.5">
                      direccion@liceopaola.com
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Acceso a indicadores financieros, control de torniquetes NFC, auditoría de los 175 alumnos, gestión de pensiones, y publicación de comunicados oficiales.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold">
                    HC
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Hernán Campos Patiño
                    </h4>
                    <p className="text-xs text-slate-600">
                      Rector Institucional
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      hernan.campos@liceopaola.com
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setRole('admin');
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                Ingresar como Rectoría / Administración
              </button>
            </div>
          )}

          {/* Teacher Tab */}
          {activeTab === 'profesor' && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar docente o asignatura..."
                  value={searchDocente}
                  onChange={(e) => setSearchDocente(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {filteredTeachers.map((t) => {
                  const isSelected =
                    currentRole === 'profesor' && selectedTeacherIndex === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setRole('profesor', t.id);
                        onClose();
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/70 text-blue-900'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">{t.n}</div>
                        <div className="text-[11px] text-slate-500">
                          {t.asig} · <span className="font-medium text-emerald-700">{t.coord}</span>
                        </div>
                      </div>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {t.mail.split('@')[0]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Acudiente Tab */}
          {activeTab === 'acudiente' && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar acudiente o nombre del estudiante..."
                  value={searchAcudiente}
                  onChange={(e) => setSearchAcudiente(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {filteredGuardians.slice(0, 30).map((g) => {
                  const isSelected =
                    currentRole === 'acudiente' && selectedGuardianIndex === g.id;
                  const kidsDesc = g.kids
                    .map((k) => students[k] ? `${students[k].n} (${students[k].g})` : '')
                    .filter(Boolean)
                    .join(' · ');

                  return (
                    <button
                      key={g.id}
                      onClick={() => {
                        setRole('acudiente', undefined, g.id, 0);
                        onClose();
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 text-amber-900'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-slate-900 truncate">
                          {g.n}{' '}
                          <span className="text-[10px] font-normal text-slate-500">
                            ({g.rel})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 truncate">
                          Estudiante(s): <span className="font-medium text-emerald-800">{kidsDesc}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Mostrando acudientes con estudiantes activos en Primaria y Bachillerato
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Usuario activo: <strong>{currentRole}</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcherModal;
