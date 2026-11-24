import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Search,
  Printer,
  DollarSign,
  Download,
  Filter,
} from 'lucide-react';
import {
  formatCurrency,
  getWhatsAppUrl,
  cleanPhoneNumber,
  normalizeText,
} from '../../utils/helpers.ts';
import { MONTHLY_TUITION_FEE } from '../../data/schoolData.ts';

export const PensionesView: React.FC = () => {
  const {
    currentRole,
    currentStudent,
    students,
    guardians,
    setPazYSalvoStudentId,
    markPayment,
    setSelectedStudentId,
    receipts,
  } = useSchool();

  const [paymentModalStudentId, setPaymentModalStudentId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Transferencia Bancaria' | 'PSE' | 'Efectivo' | 'Datafono'>('Transferencia Bancaria');
  const [searchMora, setSearchMora] = useState('');
  const [filterDebt, setFilterDebt] = useState<'all' | '1m' | '2m'>('all');

  // Compute portfolio metrics
  const totalStudents = students.length;
  const inMoraStudents = students.filter((s) => !s.paid);
  const alDiaStudents = students.filter((s) => s.paid);
  const totalArrearsMonths = inMoraStudents.reduce((acc, s) => acc + s.debt, 0);
  const totalArrearsAmount = totalArrearsMonths * MONTHLY_TUITION_FEE;
  const collectionRate = Math.round((alDiaStudents.length / totalStudents) * 100);

  // Filtered mora list
  const filteredMora = inMoraStudents.filter((s) => {
    if (filterDebt === '1m' && s.debt !== 1) return false;
    if (filterDebt === '2m' && s.debt !== 2) return false;
    if (!searchMora.trim()) return true;
    const guardian = guardians[s.ac[0]];
    const text = `${s.n} ${s.g} ${guardian?.n || ''}`;
    return normalizeText(text).includes(normalizeText(searchMora.trim()));
  });

  const handleRegisterPayment = (studentId: number) => {
    markPayment(studentId, MONTHLY_TUITION_FEE, paymentMethod);
    setPaymentModalStudentId(null);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-800" />
            <span>Gestión de Pensiones y Cartera Escolar</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Control de cobros mensuales ($280.000 COP), paz y salvos y recordatorios de pago
          </p>
        </div>

        {currentRole === 'acudiente' && currentStudent && currentStudent.paid && (
          <button
            onClick={() => setPazYSalvoStudentId(currentStudent.id)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar Certificado Oficial</span>
          </button>
        )}
      </div>

      {/* For Acudiente: Individual Student Tuition Summary */}
      {currentRole === 'acudiente' && currentStudent && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border bg-slate-50">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Estudiante en Consulta
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {currentStudent.n}
              </h3>
              <p className="text-xs text-slate-600">
                {currentStudent.g} · Documento: {currentStudent.doc} · Carnet: {currentStudent.nfcCode}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  currentStudent.paid
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                {currentStudent.paid ? 'PAZ Y SALVO ACTIVO' : 'PAGO PENDIENTE EN MORA'}
              </span>
            </div>
          </div>

          {currentStudent.paid ? (
            <div className="p-6 border-2 border-emerald-300 bg-emerald-50/60 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-base text-emerald-950">
                ¡Felicidades! Su estudiante se encuentra al día
              </h4>
              <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed">
                El Liceo Psicopedagógico Paola certifica que no registra deudas por concepto de pensión
                mensual hasta el mes de <strong>noviembre de 2026</strong>.
              </p>
              <button
                onClick={() => setPazYSalvoStudentId(currentStudent.id)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Generar Certificado Oficial de Paz y Salvo</span>
              </button>
            </div>
          ) : (
            <div className="p-6 border-2 border-rose-300 bg-rose-50/60 rounded-2xl space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-rose-950">
                    Registra {currentStudent.debt} mes(es) pendientes de pensión
                  </h4>
                  <p className="text-xs text-rose-800 mt-1">
                    Valor pendiente: <strong>{formatCurrency(currentStudent.debt * MONTHLY_TUITION_FEE)} COP</strong>.
                    Por favor acérquese a tesorería o utilice nuestros canales virtuales de recaudo.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-rose-200 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-900 text-xs">
                  Canales de Pago Autorizados:
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>Cuenta de Ahorros Bancolombia:</strong> No. 450-291823-91 a nombre del Liceo Paola</li>
                  <li><strong>Llave Daviplata / Nequi:</strong> 316 376 2170 (Referencia: Nombre y Grado del alumno)</li>
                  <li><strong>Tesorería Institucional:</strong> Efectivo o Datafono de Lunes a Viernes de 7:00 AM a 2:30 PM</li>
                </ul>
              </div>

              <button
                onClick={() => handleRegisterPayment(currentStudent.id)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                Simular Reporte de Pago en Línea ({formatCurrency(MONTHLY_TUITION_FEE)})
              </button>
            </div>
          )}
        </div>
      )}

      {/* For Admin / Staff: Portfolio Overview & Arrears Management */}
      {currentRole !== 'acudiente' && (
        <div className="space-y-6">
          {/* Institutional KPI strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Alumnos Matriculados</div>
              <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
                {totalStudents}
              </div>
              <div className="text-[11px] text-slate-400">Población total 2026</div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs">
              <div className="text-xs text-emerald-800 font-semibold">Tasa de Recaudo</div>
              <div className="text-2xl font-black text-emerald-900 tabular-nums font-mono">
                {collectionRate}%
              </div>
              <div className="text-[11px] text-emerald-700">{alDiaStudents.length} estudiantes al día</div>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl shadow-xs">
              <div className="text-xs text-rose-800 font-semibold">Estudiantes en Mora</div>
              <div className="text-2xl font-black text-rose-900 tabular-nums font-mono">
                {inMoraStudents.length}
              </div>
              <div className="text-[11px] text-rose-700">Requieren gestión de cobro</div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div className="text-xs text-slate-500 font-semibold">Cartera Total Pendiente</div>
              <div className="text-xl sm:text-2xl font-black text-rose-700 tabular-nums font-mono">
                {formatCurrency(totalArrearsAmount)}
              </div>
              <div className="text-[11px] text-slate-400">Cuota: {formatCurrency(MONTHLY_TUITION_FEE)}</div>
            </div>
          </div>

          {/* Arrears Ledger Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Estudiantes con Mensualidades Pendientes ({inMoraStudents.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Envío directo de avisos por WhatsApp y registro de comprobantes de pago
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Filtrar por estudiante o grado..."
                    value={searchMora}
                    onChange={(e) => setSearchMora(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-emerald-600 w-44"
                  />
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setFilterDebt('all')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      filterDebt === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterDebt('1m')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      filterDebt === '1m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    1 Mes
                  </button>
                  <button
                    onClick={() => setFilterDebt('2m')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      filterDebt === '2m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    2 Meses
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <th className="p-3.5">Estudiante & Grado</th>
                    <th className="p-3.5">Acudiente</th>
                    <th className="p-3.5">Meses en Mora</th>
                    <th className="p-3.5">Valor Total</th>
                    <th className="p-3.5">Teléfono Acudiente</th>
                    <th className="p-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMora.map((st) => {
                    const guardian = guardians[st.ac[0]];
                    const debtAmount = st.debt * MONTHLY_TUITION_FEE;
                    const waText = `Liceo Psicopedagógico Paola: le recordamos cordialmente que su acudido ${st.n} (${st.g}) registra ${st.debt} mes(es) de pensión pendiente (${formatCurrency(debtAmount)}). Agradecemos ponerse al día con tesorería.`;
                    const waUrl = guardian ? getWhatsAppUrl(guardian.tel, waText) : '#';

                    return (
                      <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <button
                            onClick={() => setSelectedStudentId(st.id)}
                            className="font-bold text-slate-900 hover:text-emerald-800 text-left underline"
                          >
                            {st.n}
                          </button>
                          <div className="text-[11px] text-slate-400">{st.g} · {st.doc}</div>
                        </td>
                        <td className="p-3.5">
                          {guardian ? (
                            <div>
                              <div className="font-semibold text-slate-800">{guardian.n}</div>
                              <div className="text-[11px] text-slate-400">{guardian.rel}</div>
                            </div>
                          ) : (
                            <span className="text-slate-400">Sin acudiente</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold text-[11px]">
                            {st.debt} mes(es)
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-rose-700 font-mono tabular-nums">
                          {formatCurrency(debtAmount)}
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          {guardian?.tel || 'N/A'}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {guardian && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>Aviso WhatsApp</span>
                              </a>
                            )}
                            <button
                              onClick={() => setPaymentModalStudentId(st.id)}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold transition-colors"
                            >
                              Recibir Pago
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payment Registrar Modal */}
      {paymentModalStudentId !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Registrar Recaudo de Mensualidad
            </h3>
            <p className="text-xs text-slate-500">
              Estudiante: <strong>{students[paymentModalStudentId]?.n}</strong> ({students[paymentModalStudentId]?.g})
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Monto a Pagar:
                </label>
                <div className="p-3 bg-slate-50 border rounded-xl font-mono font-bold text-slate-900 text-base">
                  {formatCurrency(MONTHLY_TUITION_FEE)} COP
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Método de Pago:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full text-xs p-2.5 border rounded-xl bg-white font-medium"
                >
                  <option value="Transferencia Bancaria">Transferencia Bancolombia / Daviplata</option>
                  <option value="PSE">Botón de Pago PSE</option>
                  <option value="Efectivo">Efectivo en Tesorería Escolar</option>
                  <option value="Datafono">Datafono / Tarjeta Débito</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setPaymentModalStudentId(null)}
                className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleRegisterPayment(paymentModalStudentId)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Confirmar y Emitir Recibo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PensionesView;
