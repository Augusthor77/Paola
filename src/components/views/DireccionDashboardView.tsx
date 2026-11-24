import React from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  GraduationCap,
  Briefcase,
  FileText,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Building,
} from 'lucide-react';
import { MONTHLY_TUITION_FEE } from '../../data/schoolData.ts';
import { formatCurrency } from '../../utils/helpers.ts';

export const DireccionDashboardView: React.FC = () => {
  const {
    students,
    teachers,
    guardians,
    admins,
    notes,
    circulars,
    setActiveTab,
    setSelectedStudentId,
  } = useSchool();

  // Compute analytics
  const totalStudents = students.length;
  const femaleStudents = students.filter((s) => s.sex === 'Femenino').length;
  const maleStudents = totalStudents - femaleStudents;

  const paidStudents = students.filter((s) => s.paid).length;
  const lateStudents = students.filter((s) => !s.paid);
  const totalArrearsMonths = lateStudents.reduce((acc, s) => acc + s.debt, 0);
  const totalArrearsAmount = totalArrearsMonths * MONTHLY_TUITION_FEE;
  const paidPercentage = Math.round((paidStudents / totalStudents) * 100);

  // Group students by grade
  const gradeDistribution: Record<
    number,
    { grade: string; count: number; inDebt: number }
  > = {};

  for (let g = 1; g <= 11; g++) {
    const sts = students.filter((s) => s.gn === g);
    const inDebt = sts.filter((s) => !s.paid).length;
    gradeDistribution[g] = {
      grade: `${g}° ${g <= 5 ? 'Primaria' : 'Bachillerato'}`,
      count: sts.length,
      inDebt,
    };
  }

  // Pending items requiring administrative attention
  const unsignedNotes = notes.filter((n) => !n.firmada);
  const notesWithReplicas = notes.filter((n) => n.replicas.length > 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-6 h-6 text-emerald-800" />
            <span>Dashboard Ejecutivo de Dirección</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Supervisión institucional, balance financiero de pensiones y convivencia escolar
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('comunicados')}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>+ Nuevo Comunicado</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Cobranza WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Students */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Estudiantes</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
            {totalStudents}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
            <span>{femaleStudents} niñas</span>
            <span>·</span>
            <span>{maleStudents} niños</span>
          </div>
        </div>

        {/* KPI 2: Attendance */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Asistencia Promedio</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 tabular-nums font-mono">
            94.8%
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Promedio mensual ponderado
          </div>
        </div>

        {/* KPI 3: Tuition Collection */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Pensiones al Día</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
            {paidPercentage}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {paidStudents} al día · <span className="text-rose-600 font-semibold">{lateStudents.length} en mora</span>
          </div>
        </div>

        {/* KPI 4: Overdue Portfolio */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Cartera por Recaudar</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700 tabular-nums font-mono">
            {formatCurrency(totalArrearsAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Tarifa mensual: {formatCurrency(MONTHLY_TUITION_FEE)}
          </div>
        </div>

        {/* KPI 5: Teachers */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Planta Docente</span>
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
            {teachers.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            100% licenciados especializados
          </div>
        </div>

        {/* KPI 6: Administrative Staff */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Personal Administrativo</span>
            <Briefcase className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
            {admins.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Rectoría, Tesorería y Coordinación
          </div>
        </div>

        {/* KPI 7: Guardians */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Acudientes Vinculados</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
            {guardians.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Padres, madres y tutores legales
          </div>
        </div>

        {/* KPI 8: Observador Notes */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Observaciones en Agenda</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
            {notes.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {unsignedNotes.length} pendientes de firma
          </div>
        </div>
      </div>

      {/* Grade-by-Grade Enrollment & Payment Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Distribución de Estudiantes y Estado de Cartera por Grado
            </h3>
            <p className="text-xs text-slate-500">
              Población estudiantil desde 1° de Primaria hasta 11° de Bachillerato
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
            11 Grados Académicos Activos
          </span>
        </div>

        <div className="space-y-2.5">
          {Object.entries(gradeDistribution).map(([gradeNum, data]) => {
            const pctPaid = Math.round(((data.count - data.inDebt) / data.count) * 100);
            return (
              <div
                key={gradeNum}
                className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{data.grade}</span>
                    <span className="font-normal text-slate-400">({data.count} alumnos)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500">
                      Al día: <strong className="text-emerald-700">{data.count - data.inDebt}</strong>
                    </span>
                    {data.inDebt > 0 && (
                      <span className="text-[11px] text-rose-600 font-bold">
                        En mora: {data.inDebt}
                      </span>
                    )}
                    <span className="font-mono text-slate-700 font-bold tabular-nums">
                      {pctPaid}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${pctPaid}%` }}
                    className="h-full bg-emerald-600 rounded-full"
                  />
                  {data.inDebt > 0 && (
                    <div
                      style={{ width: `${100 - pctPaid}%` }}
                      className="h-full bg-rose-400"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Oversight: Recent Disputes & Latest Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Observador Attention Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Réplicas de Acudientes y Convivencia</span>
            </h3>
            <button
              onClick={() => setActiveTab('agenda')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline"
            >
              Ver Agenda
            </button>
          </div>

          <div className="space-y-2">
            {notesWithReplicas.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No hay réplicas pendientes de acudientes.
              </p>
            ) : (
              notesWithReplicas.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                >
                  <div className="flex justify-between items-start mb-1">
                    <button
                      onClick={() => setSelectedStudentId(n.studentId)}
                      className="font-bold text-slate-900 hover:text-emerald-800 text-left underline"
                    >
                      {n.studentName} ({n.grade})
                    </button>
                    <span className="text-[10px] text-slate-400">{n.teacherName}</span>
                  </div>
                  <p className="text-slate-600 font-medium mb-1.5">{n.title}</p>
                  {n.replicas.map((rep) => (
                    <div
                      key={rep.id}
                      className="pl-2 border-l-2 border-amber-400 text-[11px] text-slate-700 italic bg-amber-50/50 p-1.5 rounded"
                    >
                      &ldquo;{rep.text}&rdquo; —{' '}
                      <span className="font-semibold text-slate-900">{rep.author}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Institutional Circulars */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Circulares e Informes Publicados</span>
            </h3>
            <button
              onClick={() => setActiveTab('comunicados')}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold underline"
            >
              Ver todas ({circulars.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {circulars.slice(0, 3).map((circ) => (
              <div
                key={circ.id}
                className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {circ.numeroOficio}
                  </span>
                  <span className="text-[11px] text-slate-400">{circ.fecha}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                  {circ.titulo}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {circ.contenido}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DireccionDashboardView;
