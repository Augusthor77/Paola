import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  User,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { MONTHLY_TUITION_FEE } from '../../data/schoolData.ts';
import { formatCurrency } from '../../utils/helpers.ts';

const campusImg = '/src/assets/images/campus_hero_students_1794090728600.jpg';
const crestImg = '/assets/aistudio/image_c40ec28d.png';

export const InicioAsistenciaView: React.FC = () => {
  const {
    currentRole,
    currentStudent,
    attendanceLogs,
    simulateNfcScan,
    setActiveTab,
    setPazYSalvoStudentId,
    students,
  } = useSchool();

  const [scanFeedback, setScanFeedback] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState<'todos' | 'hoy' | 'retardos'>('todos');

  const handleSimulate = (type: 'entrada' | 'salida') => {
    setIsScanning(true);
    const result = simulateNfcScan(
      type,
      currentRole === 'acudiente' && currentStudent ? currentStudent.id : undefined
    );
    setTimeout(() => {
      setIsScanning(false);
      setScanFeedback(result.message);
      setTimeout(() => setScanFeedback(null), 4000);
    }, 450);
  };

  // Filtered attendance records
  const filteredLogs = attendanceLogs.filter((log) => {
    if (currentRole === 'acudiente' && currentStudent) {
      if (log.studentId !== currentStudent.id) return false;
    }
    if (filterPeriod === 'hoy') return log.dateStr === 'Hoy';
    if (filterPeriod === 'retardos') return log.status === 'Retardo';
    return true;
  });

  // Calculate quick metrics
  const todayLogs = attendanceLogs.filter((l) => l.dateStr === 'Hoy');
  const punctualCount = todayLogs.filter((l) => l.status === 'Puntual').length;
  const lateCount = todayLogs.filter((l) => l.status === 'Retardo').length;
  const punctualRate = todayLogs.length > 0 ? Math.round((punctualCount / todayLogs.length) * 100) : 94;

  return (
    <div className="space-y-6">
      {/* Editorial Welcome Header */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
        <div className="absolute inset-0 z-0">
          <img
            src={campusImg}
            alt="Campus Liceo Paola"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-slate-900/60" />
        </div>

        <div className="relative z-10 p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Sistema de Control Biométrico & Torniquetes NFC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Control Escolar y Asistencia en Tiempo Real
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Monitoreo automático de ingresos y salidas con carnets escolares inteligentes.
              Notificación inmediata a acudientes y registro permanente en el observador estudiantil.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {currentRole === 'acudiente' && currentStudent && (
              <button
                onClick={() => setPazYSalvoStudentId(currentStudent.id)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>Certificado Paz y Salvo</span>
              </button>
            )}
            {currentRole === 'admin' && (
              <button
                onClick={() => setActiveTab('direccion')}
                className="px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Ver Dashboard de Dirección
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Acudiente Student Specific Financial & Attendance Banner */}
      {currentRole === 'acudiente' && currentStudent && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Digital Student ID Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-5 border border-emerald-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full border border-white/60 p-0.5 bg-white shrink-0 shadow-xs">
                  <img
                    src={crestImg}
                    alt="Liceo Paola Terranova"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-amber-300 font-bold tracking-wider uppercase">
                    Carnet Inteligente NFC
                  </div>
                  <div className="font-extrabold text-sm">{currentStudent.n}</div>
                </div>
              </div>
              <span className="text-[11px] font-mono bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200">
                {currentStudent.nfcCode}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800/60 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-emerald-300 text-[10px] block">Grado Académico</span>
                <span className="font-bold">{currentStudent.g}</span>
              </div>
              <div>
                <span className="text-emerald-300 text-[10px] block">Documento</span>
                <span className="font-bold">{currentStudent.doc}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-200/80">
              <span>Jornada Diaria: 07:00 - 14:00</span>
              <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Chip Activo
              </span>
            </div>
          </div>

          {/* Today's Status Banner */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[10px]">
                  Estado del Estudiante Hoy
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> En Aula de Clases
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 mt-1">
                Ingreso: 06:52 AM
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Torniquete Principal A · Verificación biométrica exitosa. Asistencia puntual registrada.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Salida estimada:</span>
              <span className="font-bold text-slate-800">02:00 PM</span>
            </div>
          </div>

          {/* Financial Good-Standing (Paz y Salvo) */}
          <div
            className={`rounded-2xl p-5 border shadow-xs flex flex-col justify-between ${
              currentStudent.paid
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500">
                  Estado de Cuenta · Pensiones
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    currentStudent.paid
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {currentStudent.paid ? 'PAZ Y SALVO' : 'EN MORA'}
                </span>
              </div>

              <div
                className={`text-xl font-extrabold ${
                  currentStudent.paid ? 'text-emerald-800' : 'text-rose-800'
                }`}
              >
                {currentStudent.paid
                  ? 'Al Día — Noviembre 2026'
                  : `${currentStudent.debt} mes(es) pendientes`}
              </div>

              <p className="text-xs text-slate-600 mt-1">
                {currentStudent.paid
                  ? 'Certificado oficial expedido por Rectoría disponible para descarga o impresión.'
                  : `Total adeudado: ${formatCurrency(
                      currentStudent.debt * MONTHLY_TUITION_FEE
                    )}. Comuníquese con tesorería.`}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
              <button
                onClick={() => {
                  if (currentStudent.paid) {
                    setPazYSalvoStudentId(currentStudent.id);
                  } else {
                    setActiveTab('pensiones');
                  }
                }}
                className={`text-xs font-bold underline ${
                  currentStudent.paid ? 'text-emerald-800' : 'text-rose-800'
                }`}
              >
                {currentStudent.paid ? 'Descargar Paz y Salvo Oficial' : 'Ver detalle de cartera'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Torniquete Simulation Control Panel (Visible for Admin and Teacher) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>Simulador del Lector NFC / Torniquete Escolar</span>
            </h3>
            <p className="text-xs text-slate-500">
              Prueba en tiempo real el registro con sonido de torniquete y cálculo automático de puntualidad
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={isScanning}
              onClick={() => handleSimulate('entrada')}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>Registrar Entrada (07:00 AM)</span>
            </button>
            <button
              disabled={isScanning}
              onClick={() => handleSimulate('salida')}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Registrar Salida (02:00 PM)</span>
            </button>
          </div>
        </div>

        {/* Scan feedback toast */}
        {scanFeedback && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{scanFeedback}</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-mono">Torniquete A · Validado</span>
          </div>
        )}

        {/* Daily Institution Metrics Bar (Admin & Teacher) */}
        {currentRole !== 'acudiente' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="text-[11px] text-slate-500 font-medium">Total Alumnos Matriculados</div>
              <div className="text-lg font-bold text-slate-900 tabular-nums font-mono">
                {students.length}
              </div>
              <div className="text-[10px] text-slate-400">1° a 11° grado</div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div className="text-[11px] text-emerald-800 font-medium">Tasa de Puntualidad</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums font-mono">
                {punctualRate}%
              </div>
              <div className="text-[10px] text-emerald-700">Objetivo institucional $\ge 90\%$</div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="text-[11px] text-amber-800 font-medium">Retardos Registrados Hoy</div>
              <div className="text-lg font-bold text-amber-900 tabular-nums font-mono">
                {lateCount}
              </div>
              <div className="text-[10px] text-amber-700">Notificación enviada a acudiente</div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="text-[11px] text-blue-800 font-medium">Torniquetes Operativos</div>
              <div className="text-lg font-bold text-blue-900">2 Pasos NFC</div>
              <div className="text-[10px] text-blue-700">Principal A & B en línea</div>
            </div>
          </div>
        )}
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Registro Cronológico de Marcaciones</span>
            </h3>
            <p className="text-xs text-slate-500">
              {currentRole === 'acudiente'
                ? `Historial de entradas y salidas de ${currentStudent?.n}`
                : 'Últimos movimientos detectados en los accesos escolares'}
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setFilterPeriod('todos')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterPeriod === 'todos'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({attendanceLogs.length})
            </button>
            <button
              onClick={() => setFilterPeriod('hoy')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterPeriod === 'hoy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => setFilterPeriod('retardos')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterPeriod === 'retardos'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Retardos
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
                <th className="p-3.5 font-semibold">Fecha / Día</th>
                {currentRole !== 'acudiente' && (
                  <th className="p-3.5 font-semibold">Estudiante & Grado</th>
                )}
                <th className="p-3.5 font-semibold">Hora de Entrada</th>
                <th className="p-3.5 font-semibold">Hora de Salida</th>
                <th className="p-3.5 font-semibold">Punto de Control</th>
                <th className="p-3.5 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-bold text-slate-800 whitespace-nowrap">
                    {log.dateStr}
                  </td>
                  {currentRole !== 'acudiente' && (
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{log.studentName}</div>
                      <div className="text-[11px] text-slate-500">{log.grade}</div>
                    </td>
                  )}
                  <td className="p-3.5 font-mono text-emerald-800 font-bold tabular-nums">
                    {log.entryTime}
                  </td>
                  <td className="p-3.5 font-mono text-blue-800 font-medium tabular-nums">
                    {log.exitTime}
                  </td>
                  <td className="p-3.5 text-slate-500 text-[11px]">{log.gate}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                        log.status === 'Retardo'
                          ? 'bg-amber-100 text-amber-800'
                          : log.status === 'Puntual'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InicioAsistenciaView;
