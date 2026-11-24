import React from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Bell,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  AlertCircle,
  FileSignature,
} from 'lucide-react';
import { getCategoryBadgeStyle } from '../../utils/helpers.ts';

export const NotificacionesView: React.FC = () => {
  const {
    currentRole,
    currentUser,
    currentGuardian,
    notes,
    unreadCount,
    markAllNotificationsRead,
    setSelectedStudentId,
    setActiveTab,
  } = useSchool();

  // Acudiente notes or staff notes
  const relevantNotes = notes.filter((n) => {
    if (currentRole === 'acudiente' && currentGuardian) {
      return currentGuardian.kids.includes(n.studentId);
    }
    return true;
  });

  const unsignedNotes = relevantNotes.filter((n) => !n.firmada);
  const notesWithReplicas = relevantNotes.filter((n) => n.replicas.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-800" />
            <span>Centro de Notificaciones y Novedades</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Avisos de observador, réplicas registradas y recordatorios institucionales
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs self-start sm:self-auto"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Unsigned Notes Alert Card */}
      {unsignedNotes.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-sm text-amber-950">
              Anotaciones Pendientes de Firma ({unsignedNotes.length})
            </h3>
          </div>
          <p className="text-xs text-amber-800">
            {currentRole === 'acudiente'
              ? 'Tiene anotaciones en la agenda escolar que requieren su firma digital como acudiente responsable.'
              : 'Estudiantes con anotaciones pendientes por firmar por parte de sus acudientes.'}
          </p>

          <div className="space-y-2 pt-1">
            {unsignedNotes.map((n) => (
              <div
                key={n.id}
                className="p-3 bg-white border border-amber-200 rounded-xl flex items-center justify-between gap-2 text-xs"
              >
                <div>
                  <button
                    onClick={() => setSelectedStudentId(n.studentId)}
                    className="font-bold text-slate-900 hover:text-emerald-800 underline text-left"
                  >
                    {n.studentName} ({n.grade})
                  </button>
                  <p className="text-slate-600 mt-0.5">{n.title}</p>
                </div>

                <button
                  onClick={() => setActiveTab('agenda')}
                  className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] shrink-0"
                >
                  Ver en Agenda
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Replicas & Descargos Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <span>Réplicas y Descargos de Acudientes ({notesWithReplicas.length})</span>
        </h3>
        <p className="text-xs text-slate-500">
          Respuestas formales enviadas por los padres de familia a las anotaciones del observador
        </p>

        <div className="space-y-2.5 pt-1">
          {notesWithReplicas.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">
              No hay réplicas pendientes de acudientes.
            </p>
          ) : (
            notesWithReplicas.map((n) => (
              <div
                key={n.id}
                className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900">{n.studentName} ({n.grade})</strong>
                  <span className="text-[11px] text-slate-400">{n.createdAt}</span>
                </div>
                <p className="text-slate-600 font-medium">Asunto: {n.title}</p>

                {n.replicas.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-2.5 bg-white border-l-2 border-emerald-600 rounded-r-lg text-slate-700 italic text-[11px]"
                  >
                    &ldquo;{rep.text}&rdquo; —{' '}
                    <span className="font-bold text-slate-900">{rep.author}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificacionesView;
