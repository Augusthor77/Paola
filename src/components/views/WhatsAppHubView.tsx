import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  MessageSquare,
  Send,
  AlertTriangle,
  CheckCircle2,
  Users,
  Search,
  ExternalLink,
} from 'lucide-react';
import {
  formatCurrency,
  getWhatsAppUrl,
  cleanPhoneNumber,
  normalizeText,
} from '../../utils/helpers.ts';
import { MONTHLY_TUITION_FEE } from '../../data/schoolData.ts';

export const WhatsAppHubView: React.FC = () => {
  const { students, guardians } = useSchool();

  const [activeTab, setActiveTab] = useState<'mora' | 'personalizado'>('mora');
  const [searchFilter, setSearchFilter] = useState('');

  // Custom message state
  const [customStudentId, setCustomStudentId] = useState<number>(0);
  const [customTemplate, setCustomTemplate] = useState<'pension' | 'citacion' | 'felic' | 'retardo'>('pension');
  const [customExtraText, setCustomExtraText] = useState('');

  // Filter students in mora
  const inMoraStudents = students.filter((s) => !s.paid);

  const filteredMora = inMoraStudents.filter((st) => {
    if (!searchFilter.trim()) return true;
    const guardian = guardians[st.ac[0]];
    const text = `${st.n} ${st.g} ${guardian?.n || ''}`;
    return normalizeText(text).includes(normalizeText(searchFilter.trim()));
  });

  // Selected student for custom message
  const targetStudent = students[customStudentId] || students[0];
  const targetGuardian = targetStudent ? guardians[targetStudent.ac[0]] : null;

  // Build custom text
  const getCustomMessageText = () => {
    if (!targetStudent || !targetGuardian) return '';
    switch (customTemplate) {
      case 'pension':
        return `Apreciado(a) ${targetGuardian.n}: Desde la Rectoría y Tesorería del Liceo Psicopedagógico Paola le recordamos amablemente que su acudido ${targetStudent.n} (${targetStudent.g}) registra ${targetStudent.debt} mes(es) de pensión pendiente (${formatCurrency(targetStudent.debt * MONTHLY_TUITION_FEE)} COP). Agradecemos ponerse al día para mantener vigente el Paz y Salvo. ${customExtraText}`;
      case 'citacion':
        return `Apreciado(a) ${targetGuardian.n}: Solicitamos cordialmente su presencia en las instalaciones del Liceo Psicopedagógico Paola para dialogar sobre el proceso académico y de convivencia de su acudido ${targetStudent.n} (${targetStudent.g}). ${customExtraText}`;
      case 'felic':
        return `¡Felicitaciones ${targetGuardian.n}! El Liceo Psicopedagógico Paola se complace en destacar el intachable desempeño académico y convivencial de ${targetStudent.n} (${targetStudent.g}). ¡Gracias por su valioso apoyo en el hogar! ${customExtraText}`;
      case 'retardo':
        return `Aviso Institucional: Se informa que su acudido ${targetStudent.n} (${targetStudent.g}) ha registrado un retardo al ingreso de la jornada escolar hoy. Recordamos que la puntualidad es formativa para nuestra comunidad liceísta. ${customExtraText}`;
    }
  };

  const previewMessage = getCustomMessageText();
  const customWhatsAppUrl = targetGuardian ? getWhatsAppUrl(targetGuardian.tel, previewMessage) : '#';

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-700" />
            <span>Centro de Notificaciones y Alertas por WhatsApp</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Envío directo de avisos de pensión, citaciones y comunicaciones con acudientes
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('mora')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'mora'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Cobranza Masiva ({inMoraStudents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('personalizado')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'personalizado'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-emerald-600" />
            <span>Redactar Notificación</span>
          </button>
        </div>
      </div>

      {/* MODE 1: MORA REMINDERS LIST */}
      {activeTab === 'mora' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Listado de Acudientes con Pensión Pendiente ({inMoraStudents.length})
              </h3>
              <p className="text-xs text-slate-500">
                Al hacer clic en &ldquo;Enviar WhatsApp&rdquo; se abrirá el chat con el mensaje oficial precargado
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Buscar acudiente o alumno..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-emerald-600 w-52"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredMora.map((st) => {
              const guardian = guardians[st.ac[0]];
              if (!guardian) return null;

              const totalAmount = st.debt * MONTHLY_TUITION_FEE;
              const text = `Liceo Paola: le recordamos que ${st.n} registra ${st.debt} mes(es) de pensión pendiente (${formatCurrency(totalAmount)}). Agradecemos comunicarse con tesorería.`;
              const waUrl = getWhatsAppUrl(guardian.tel, text);

              return (
                <div
                  key={st.id}
                  className="p-3.5 border border-slate-100 hover:border-slate-200 rounded-xl bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs truncate">
                        {st.n}
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                        {st.g}
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
                        {st.debt} mes(es) · {formatCurrency(totalAmount)}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Acudiente: <strong>{guardian.n}</strong> ({guardian.rel}) · Tel: {guardian.tel}
                    </div>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enviar WhatsApp</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: CUSTOM MESSAGE COMPOSER */}
      {activeTab === 'personalizado' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b pb-2">
              Configurar Notificación Directa
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Seleccionar Estudiante:
              </label>
              <select
                value={customStudentId}
                onChange={(e) => setCustomStudentId(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.n} ({st.g}) — {st.paid ? 'Al día' : 'En mora'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Plantilla Institucional:
              </label>
              <select
                value={customTemplate}
                onChange={(e) => setCustomTemplate(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="pension">Recordatorio de Pensión y Cartera</option>
                <option value="citacion">Citación a Rectoría / Docente</option>
                <option value="felic">Felicitación por Rendimiento Académico</option>
                <option value="retardo">Aviso de Retardo al Ingreso Escolar</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nota o Detalle Adicional:
              </label>
              <textarea
                rows={3}
                placeholder="Agregue detalles específicos como fecha, hora o instrucciones adicionales..."
                value={customExtraText}
                onChange={(e) => setCustomExtraText(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Live Preview & Send */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 border-b pb-2 flex items-center justify-between">
                <span>Vista Previa del Mensaje</span>
                <span className="text-xs text-emerald-700 font-mono">WhatsApp Web</span>
              </h3>

              <div className="mt-4 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-3">
                <div className="text-[11px] text-slate-500">
                  Destinatario:{' '}
                  <strong className="text-slate-900">
                    {targetGuardian ? `${targetGuardian.n} (${targetGuardian.rel})` : 'Sin contacto'}
                  </strong>{' '}
                  · Tel: <span className="font-mono">{targetGuardian?.tel}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-100 text-slate-800 leading-relaxed font-sans shadow-2xs whitespace-pre-line">
                  {previewMessage}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t">
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir Chat en WhatsApp con Mensaje Listo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppHubView;
