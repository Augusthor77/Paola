import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  FileSignature,
  Filter,
  Send,
  User,
  ArrowRight,
} from 'lucide-react';
import {
  getCategoryBadgeStyle,
  getWhatsAppUrl,
  cleanPhoneNumber,
  normalizeText,
} from '../../utils/helpers.ts';
import { AgendaCategory } from '../../types/index.ts';

export const AgendaObservadorView: React.FC = () => {
  const {
    currentRole,
    currentUser,
    currentStudent,
    currentGuardian,
    students,
    guardians,
    notes,
    addAgendaNote,
    signAgendaNote,
    addNoteReplica,
    setSelectedStudentId,
  } = useSchool();

  // New Note Form States
  const [formOpen, setFormOpen] = useState(false);
  const [targetStudentId, setTargetStudentId] = useState<number>(0);
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AgendaCategory>('tarea');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDesc, setNoteDesc] = useState('');
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);

  // Filter States
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [signatureFilter, setSignatureFilter] = useState<'todos' | 'firmadas' | 'sin_firmar'>('todos');

  // Replica Form State
  const [replicaNoteId, setReplicaNoteId] = useState<string | null>(null);
  const [replicaText, setReplicaText] = useState('');

  // Filter notes according to role
  const filteredNotes = notes.filter((n) => {
    // If acudiente, only show notes for their children
    if (currentRole === 'acudiente' && currentGuardian) {
      if (!currentGuardian.kids.includes(n.studentId)) return false;
    }
    // Filter by category
    if (categoryFilter !== 'todos' && n.category !== categoryFilter) return false;
    // Filter by signature
    if (signatureFilter === 'firmadas' && !n.firmada) return false;
    if (signatureFilter === 'sin_firmar' && n.firmada) return false;

    return true;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteDesc.trim()) return;

    addAgendaNote({
      studentId: targetStudentId,
      category: selectedCategory,
      title: noteTitle.trim(),
      description: noteDesc.trim(),
    });

    const targetStudent = students[targetStudentId];
    if (notifyWhatsApp && targetStudent) {
      const guardian = guardians[targetStudent.ac[0]];
      if (guardian) {
        const text = `Liceo Psicopedagógico Paola - Observador: Se ha registrado una anotación para su acudido ${targetStudent.n} (${targetStudent.g}). Motivo: "${noteTitle}". Ingrese a la plataforma para firmar como leído.`;
        const url = getWhatsAppUrl(guardian.tel, text);
        window.open(url, '_blank');
      }
    }

    setNoteTitle('');
    setNoteDesc('');
    setFormOpen(false);
  };

  const handleSendReplica = (noteId: string) => {
    if (!replicaText.trim()) return;
    addNoteReplica(noteId, replicaText.trim());
    setReplicaText('');
    setReplicaNoteId(null);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-800" />
            <span>Agenda Digital & Observador del Alumno</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Seguimiento integral de compromisos escolares, convivencia, felicitaciones y réplicas
          </p>
        </div>

        {currentRole !== 'acudiente' && (
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Anotación</span>
          </button>
        )}
      </div>

      {/* New Note Creator Form */}
      {formOpen && currentRole !== 'acudiente' && (
        <form
          onSubmit={handleCreateNote}
          className="bg-white rounded-2xl border-2 border-emerald-600/30 p-5 shadow-sm space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-sm text-slate-900">
              Registrar Nueva Anotación en Observador
            </h3>
            <span className="text-xs text-slate-500">
              Docente actuante: <strong>{currentUser.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Target student selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Seleccionar Estudiante:
              </label>
              <select
                value={targetStudentId}
                onChange={(e) => setTargetStudentId(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.n} ({st.g})
                  </option>
                ))}
              </select>
            </div>

            {/* Category selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Categoría de la Observación:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as AgendaCategory)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="tarea">No llevó tarea o actividad</option>
                <option value="actitud">Actitud o indisciplina</option>
                <option value="felic">Felicitación o logro académico</option>
                <option value="citacion">Citación presencial a acudiente</option>
                <option value="otro">Otra situación pedagógica</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Título / Asunto Principal:
            </label>
            <input
              type="text"
              placeholder="Ej: Compromiso académico en ciencias, llamado de atención por..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-emerald-600"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Descripción Detallada de los Hechos:
            </label>
            <textarea
              rows={3}
              placeholder="Describa puntualmente lo sucedido conforme al debido proceso del Manual de Convivencia..."
              value={noteDesc}
              onChange={(e) => setNoteDesc(e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-emerald-600"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyWhatsApp}
                onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Abrir WhatsApp para notificar de inmediato al acudiente</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                Guardar y Notificar
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filtrar:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800"
          >
            <option value="todos">Todas las categorías</option>
            <option value="tarea">Tareas y Actividades</option>
            <option value="actitud">Actitud y Convivencia</option>
            <option value="felic">Felicitaciones</option>
            <option value="citacion">Citaciones</option>
            <option value="otro">Otras</option>
          </select>

          <select
            value={signatureFilter}
            onChange={(e) => setSignatureFilter(e.target.value as any)}
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800"
          >
            <option value="todos">Todas las firmas</option>
            <option value="firmadas">Firmadas como leído</option>
            <option value="sin_firmar">Pendientes de firma</option>
          </select>
        </div>

        <span className="text-xs text-slate-500">
          Registros encontrados: <strong>{filteredNotes.length}</strong>
        </span>
      </div>

      {/* Observador Notes Feed */}
      <div className="space-y-4">
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-700" />
            <p className="text-xs font-semibold text-slate-700">
              No se encontraron anotaciones en la agenda
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {currentRole === 'acudiente'
                ? 'Su estudiante tiene una excelente trayectoria sin faltas registradas.'
                : 'Usa el botón "Crear Anotación" para registrar novedades.'}
            </p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const badge = getCategoryBadgeStyle(note.category);
            const targetStudent = students[note.studentId];
            const isAcudienteOfNote =
              currentRole === 'acudiente' &&
              currentGuardian &&
              currentGuardian.kids.includes(note.studentId);

            return (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                {/* Note Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold border ${badge.classes}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>

                    <button
                      onClick={() => setSelectedStudentId(note.studentId)}
                      className="font-bold text-xs text-slate-900 hover:text-emerald-800 underline"
                    >
                      {note.studentName} ({note.grade})
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {note.createdAt}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{note.title}</h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed whitespace-pre-line">
                    {note.description}
                  </p>
                </div>

                {/* Teacher attribution & Parent signature status */}
                <div className="p-3 bg-slate-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-600">
                    Docente responsable: <strong>{note.teacherName}</strong>
                  </div>

                  <div>
                    {note.firmada ? (
                      <span className="text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Firmado digitalmente: {note.firmadaBy} ({note.firmadaAt})</span>
                      </span>
                    ) : (
                      <span className="text-amber-800 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Sin firma de acudiente</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Parent Action: Sign as read */}
                {isAcudienteOfNote && !note.firmada && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="text-xs text-amber-900">
                      <strong>Requisito institucional:</strong> Debe firmar digitalmente esta
                      anotación como constancia de notificación.
                    </div>
                    <button
                      onClick={() => signAgendaNote(note.id)}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                    >
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>Firmar como Leído</span>
                    </button>
                  </div>
                )}

                {/* Replies / Descargos Trail */}
                {note.replicas.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Réplicas y Descargos Registrados:
                    </div>
                    {note.replicas.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-3 bg-slate-50 border-l-2 border-emerald-600 rounded-r-xl text-xs space-y-1"
                      >
                        <div className="flex justify-between text-[11px]">
                          <strong className="text-slate-900">{rep.author} ({rep.role})</strong>
                          <span className="text-slate-400">{rep.timestamp}</span>
                        </div>
                        <p className="text-slate-700 italic">&ldquo;{rep.text}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Replica Box */}
                <div className="pt-1 flex items-center justify-between">
                  {replicaNoteId === note.id ? (
                    <div className="w-full space-y-2 pt-2">
                      <textarea
                        rows={2}
                        placeholder="Escriba su réplica, aclaración o descargo..."
                        value={replicaText}
                        onChange={(e) => setReplicaText(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-xl"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setReplicaNoteId(null)}
                          className="px-3 py-1 text-xs text-slate-500 font-medium"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSendReplica(note.id)}
                          className="px-3 py-1 bg-emerald-700 text-white font-bold text-xs rounded-lg"
                        >
                          Enviar Réplica
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplicaNoteId(note.id)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>+ Responder / Agregar Descargo</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AgendaObservadorView;
