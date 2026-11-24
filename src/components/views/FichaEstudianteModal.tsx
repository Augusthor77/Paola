import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  X,
  User,
  CreditCard,
  Calendar,
  BookOpen,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import {
  formatCurrency,
  getWhatsAppUrl,
  getAvatarColor,
  generateInitials,
  getCategoryBadgeStyle,
} from '../../utils/helpers.ts';
import { MONTHLY_TUITION_FEE } from '../../data/schoolData.ts';

const crestImg = '/assets/aistudio/image_c40ec28d.png';

export const FichaEstudianteModal: React.FC = () => {
  const {
    selectedStudentId,
    setSelectedStudentId,
    students,
    guardians,
    notes,
    attendanceLogs,
    currentRole,
    setPazYSalvoStudentId,
    markPayment,
    addAgendaNote,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'perfil' | 'agenda' | 'asistencia' | 'financiero'>('perfil');
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [newNoteCategory, setNewNoteCategory] = useState<'tarea' | 'actitud' | 'felic' | 'citacion' | 'otro'>('actitud');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDesc, setNewNoteDesc] = useState('');

  if (selectedStudentId === null) return null;
  const student = students[selectedStudentId];
  if (!student) return null;

  // Student linked guardians
  const linkedGuardians = student.ac.map((idx) => guardians[idx]).filter(Boolean);

  // Student notes
  const studentNotes = notes.filter((n) => n.studentId === student.id);

  // Student attendance
  const studentAttendance = attendanceLogs.filter((l) => l.studentId === student.id);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteDesc.trim()) return;

    addAgendaNote({
      studentId: student.id,
      category: newNoteCategory,
      title: newNoteTitle.trim(),
      description: newNoteDesc.trim(),
    });

    setNewNoteTitle('');
    setNewNoteDesc('');
    setNewNoteOpen(false);
    setActiveTab('agenda');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header / Student ID summary */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 shadow-xs ${getAvatarColor(
                student.n
              )}`}
            >
              {generateInitials(student.n)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  Matrícula #2026-{String(100 + student.id).padStart(4, '0')}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {student.nfcCode}
                </span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 truncate">
                {student.n}
              </h3>
              <p className="text-xs text-slate-500">
                {student.g} · {student.doc} · {student.age} años · {student.sex}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {student.paid && (
              <button
                onClick={() => {
                  setSelectedStudentId(null);
                  setPazYSalvoStudentId(student.id);
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Paz y Salvo</span>
              </button>
            )}
            <button
              onClick={() => setSelectedStudentId(null)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-4 p-1.5 bg-slate-100 border-b border-slate-200 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`py-2 px-2 rounded-lg text-center transition-colors ${
              activeTab === 'perfil'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ficha & Acudientes
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`py-2 px-2 rounded-lg text-center transition-colors ${
              activeTab === 'agenda'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Observador ({studentNotes.length})
          </button>
          <button
            onClick={() => setActiveTab('asistencia')}
            className={`py-2 px-2 rounded-lg text-center transition-colors ${
              activeTab === 'asistencia'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Asistencia NFC
          </button>
          <button
            onClick={() => setActiveTab('financiero')}
            className={`py-2 px-2 rounded-lg text-center transition-colors ${
              activeTab === 'financiero'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cartera ({student.paid ? 'Al día' : 'Mora'})
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PERFIL & ACUDIENTES */}
          {activeTab === 'perfil' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Información Académica
                  </span>
                  <div className="text-xs space-y-1">
                    <p><strong className="text-slate-700">Grado:</strong> {student.g}</p>
                    <p><strong className="text-slate-700">Documento:</strong> {student.doc}</p>
                    <p><strong className="text-slate-700">Jornada:</strong> Única Diurna (07:00 a 14:00)</p>
                    <p><strong className="text-slate-700">Carnet NFC:</strong> {student.nfcCode}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Estado en el Plantel
                  </span>
                  <div className="text-xs space-y-1">
                    <p><strong className="text-slate-700">Matrícula:</strong> Ordinaria Vigente 2026</p>
                    <p>
                      <strong className="text-slate-700">Pensión:</strong>{' '}
                      <span className={student.paid ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {student.paid ? 'Al día (Paz y Salvo)' : `En mora (${student.debt} meses)`}
                      </span>
                    </p>
                    <p><strong className="text-slate-700">Sede:</strong> Principal Terranova — Jamundí</p>
                  </div>
                </div>
              </div>

              {/* Linked Guardians */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Acudientes y Contactos de Emergencia</span>
                </h4>

                <div className="space-y-2.5">
                  {linkedGuardians.map((g) => {
                    const waMsg = `Estimado(a) ${g.n}, nos comunicamos desde el Liceo Psicopedagógico Paola en relación a su acudido ${student.n} (${student.g}).`;
                    const waUrl = getWhatsAppUrl(g.tel, waMsg);

                    return (
                      <div
                        key={g.id}
                        className="p-3.5 border border-slate-200 rounded-xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 text-xs">
                            {g.n}{' '}
                            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                              {g.rel}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Doc: {g.doc} · Tel: {g.tel} · {g.mail}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${g.tel.replace(/\D/g, '')}`}
                            className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OBSERVADOR Y AGENDA */}
          {activeTab === 'agenda' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Historial del Observador Estudiantil
                  </h4>
                  <p className="text-xs text-slate-500">
                    Registro legal de anotaciones académicas, convivenciales y felicitaciones
                  </p>
                </div>

                {currentRole !== 'acudiente' && (
                  <button
                    onClick={() => setNewNoteOpen(!newNoteOpen)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Registrar Anotación</span>
                  </button>
                )}
              </div>

              {/* Form to add note */}
              {newNoteOpen && (
                <form
                  onSubmit={handleCreateNote}
                  className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3"
                >
                  <div className="text-xs font-bold text-emerald-900">
                    Nueva Anotación en Observador de {student.n}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Tipo de Anotación:
                      </label>
                      <select
                        value={newNoteCategory}
                        onChange={(e) => setNewNoteCategory(e.target.value as any)}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg font-medium"
                      >
                        <option value="tarea">Falta de Tarea o Material</option>
                        <option value="actitud">Actitud o Convivencia</option>
                        <option value="felic">Felicitación o Logro Académico</option>
                        <option value="citacion">Citación a Acudiente</option>
                        <option value="otro">Otra Novedad Institucional</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Título o Motivo:
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Compromiso pedagógico..."
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Descripción de los hechos:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Relate la situación ocurrida con claridad..."
                      value={newNoteDesc}
                      onChange={(e) => setNewNoteDesc(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setNewNoteOpen(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold"
                    >
                      Guardar Anotación
                    </button>
                  </div>
                </form>
              )}

              {/* Notes list */}
              <div className="space-y-3">
                {studentNotes.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    No registra anotaciones disciplinarias ni felicitaciones en el observador.
                  </p>
                ) : (
                  studentNotes.map((n) => {
                    const badge = getCategoryBadgeStyle(n.category);
                    return (
                      <div
                        key={n.id}
                        className="p-4 border border-slate-200 rounded-xl bg-white space-y-2 shadow-2xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold border ${badge.classes}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {n.createdAt}
                          </span>
                        </div>

                        <h5 className="font-bold text-xs text-slate-900">{n.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {n.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Registrado por: <strong>{n.teacherName}</strong></span>
                          <span>
                            {n.firmada ? (
                              <span className="text-emerald-700 font-semibold">
                                ✓ Firmado por {n.firmadaBy}
                              </span>
                            ) : (
                              <span className="text-amber-700 font-semibold">
                                Pendiente de firma
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ASISTENCIA NFC */}
          {activeTab === 'asistencia' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-emerald-950">
                    Control de Presencia Biométrico
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Carnet inteligente: {student.nfcCode}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg">
                  Puntualidad 96%
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Entrada</th>
                      <th className="p-3">Salida</th>
                      <th className="p-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentAttendance.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-slate-400">
                          No hay registros de torniquete recientes para este carnet.
                        </td>
                      </tr>
                    ) : (
                      studentAttendance.map((log) => (
                        <tr key={log.id}>
                          <td className="p-3 font-semibold text-slate-800">{log.dateStr}</td>
                          <td className="p-3 font-mono text-emerald-800 font-bold tabular-nums">
                            {log.entryTime}
                          </td>
                          <td className="p-3 font-mono text-blue-800 tabular-nums">
                            {log.exitTime}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                log.status === 'Retardo'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FINANCIERO & PENSIONES */}
          {activeTab === 'financiero' && (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-2xl border ${
                  student.paid
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-rose-50 border-rose-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Estado de Cuenta Institucional
                    </span>
                    <h4
                      className={`text-lg font-black mt-1 ${
                        student.paid ? 'text-emerald-900' : 'text-rose-900'
                      }`}
                    >
                      {student.paid
                        ? 'PAZ Y SALVO VIGENTE'
                        : `MORA: ${student.debt} MES(ES) PENDIENTES`}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {student.paid
                        ? 'Al corriente en pensiones hasta el mes de noviembre de 2026.'
                        : `Monto acumulado por concepto de pensión: ${formatCurrency(
                            student.debt * MONTHLY_TUITION_FEE
                          )} COP`}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      student.paid
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-rose-200 text-rose-900'
                    }`}
                  >
                    {student.paid ? 'Al Día' : 'En Mora'}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                  {student.paid ? (
                    <button
                      onClick={() => {
                        setSelectedStudentId(null);
                        setPazYSalvoStudentId(student.id);
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      Imprimir Certificado de Paz y Salvo
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        markPayment(student.id, MONTHLY_TUITION_FEE, 'Transferencia Bancaria');
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      Registrar Pago de Mensualidad ({formatCurrency(MONTHLY_TUITION_FEE)})
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Liceo Psicopedagógico Paola · Sistema de Información Académica</span>
          <button
            onClick={() => setSelectedStudentId(null)}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};

export default FichaEstudianteModal;
