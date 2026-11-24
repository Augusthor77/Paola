import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Bell,
  Pin,
  Plus,
  Printer,
  Calendar,
  AlertCircle,
  FileText,
  X,
  CheckCircle2,
} from 'lucide-react';
import { OfficialCircular } from '../../types/index.ts';

const crestImg = '/assets/aistudio/image_c40ec28d.png';

export const ComunicadosView: React.FC = () => {
  const { currentRole, currentUser, circulars, addCircular, togglePinCircular } = useSchool();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCircForPrint, setSelectedCircForPrint] = useState<OfficialCircular | null>(null);

  // New circular form fields
  const [circTitle, setCircTitle] = useState('');
  const [circContent, setCircContent] = useState('');
  const [circCategory, setCircCategory] = useState<OfficialCircular['categoria']>('General');
  const [circAudience, setCircAudience] = useState<OfficialCircular['audiencia']>('Todos');
  const [circPriority, setCircPriority] = useState<OfficialCircular['prioridad']>('Normal');
  const [circPinned, setCircPinned] = useState(false);

  // Filter
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  const filteredCirculars = circulars.filter((c) => {
    if (categoryFilter !== 'todos' && c.categoria !== categoryFilter) return false;
    return true;
  });

  const handleCreateCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circTitle.trim() || !circContent.trim()) return;

    addCircular({
      titulo: circTitle.trim(),
      contenido: circContent.trim(),
      categoria: circCategory,
      audiencia: circAudience,
      prioridad: circPriority,
      fijado: circPinned,
      autor: `${currentUser.name} — ${currentUser.title}`,
    });

    setCircTitle('');
    setCircContent('');
    setCircPinned(false);
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-800" />
            <span>Circulares e Informes Oficiales</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Comunicaciones formales expedidas por Rectoría, Consejo Directivo y Coordinación
          </p>
        </div>

        {currentRole === 'admin' && (
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Redactar Circular</span>
          </button>
        )}
      </div>

      {/* Creator Form (Admin) */}
      {formOpen && currentRole === 'admin' && (
        <form
          onSubmit={handleCreateCircular}
          className="bg-white rounded-2xl border-2 border-emerald-600/30 p-5 shadow-sm space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-sm text-slate-900">
              Emitir Nueva Circular o Comunicado Oficial
            </h3>
            <span className="text-xs text-slate-500">
              Expedido por: <strong>{currentUser.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Categoría:
              </label>
              <select
                value={circCategory}
                onChange={(e) => setCircCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="General">General</option>
                <option value="Académico">Académico</option>
                <option value="Convivencia">Convivencia</option>
                <option value="Eventos">Eventos</option>
                <option value="Administrativo">Administrativo</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Audiencia Objetivo:
              </label>
              <select
                value={circAudience}
                onChange={(e) => setCircAudience(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="Todos">Toda la Comunidad</option>
                <option value="Acudientes">Solo Padres / Acudientes</option>
                <option value="Docentes">Solo Planta Docente</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nivel de Prioridad:
              </label>
              <select
                value={circPriority}
                onChange={(e) => setCircPriority(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              >
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Título de la Circular:
            </label>
            <input
              type="text"
              placeholder="Ej: Fechas de evaluación institucional, protocolo de salida..."
              value={circTitle}
              onChange={(e) => setCircTitle(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-emerald-600"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Texto del Comunicado Oficial:
            </label>
            <textarea
              rows={5}
              placeholder="Escriba el contenido institucional con las disposiciones correspondientes..."
              value={circContent}
              onChange={(e) => setCircContent(e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-emerald-600 leading-relaxed font-sans"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={circPinned}
                onChange={(e) => setCircPinned(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Fijar en la parte superior del tablero de anuncios</span>
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
                Publicar Circular
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          {['todos', 'General', 'Académico', 'Convivencia', 'Administrativo'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors capitalize ${
                categoryFilter === cat
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">
          Total publicadas: <strong>{filteredCirculars.length}</strong>
        </span>
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredCirculars.map((circ) => {
          return (
            <div
              key={circ.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition-colors ${
                circ.fijado
                  ? 'border-emerald-300 ring-1 ring-emerald-200/50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    {circ.numeroOficio}
                  </span>

                  {circ.fijado && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      <Pin className="w-3 h-3 text-amber-600" />
                      <span>Fijado</span>
                    </span>
                  )}

                  <span className="text-xs font-semibold text-slate-600">
                    {circ.categoria}
                  </span>

                  <span className="text-slate-400">·</span>

                  <span className="text-[11px] text-slate-500">
                    Para: <strong>{circ.audiencia}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{circ.fecha}</span>
                  </span>

                  {currentRole === 'admin' && (
                    <button
                      onClick={() => togglePinCircular(circ.id)}
                      title={circ.fijado ? 'Desfijar' : 'Fijar al inicio'}
                      className="p-1 hover:text-slate-700 rounded"
                    >
                      <Pin className={`w-3.5 h-3.5 ${circ.fijado ? 'text-amber-600' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-black text-base text-slate-900">{circ.titulo}</h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                  {circ.contenido}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <span>Expedido por: <strong>{circ.autor}</strong></span>

                <button
                  onClick={() => setSelectedCircForPrint(circ)}
                  className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold underline"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Ver en Membrete Oficial / Imprimir</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Circular Letterhead Preview Modal */}
      {selectedCircForPrint && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold print:hidden">
              <span>Formato de Circular Institucional con Membrete</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
                <button
                  onClick={() => setSelectedCircForPrint(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 sm:p-12 space-y-6 text-slate-800 font-serif">
              <div className="border-b-2 border-emerald-900 pb-4 text-center space-y-1">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden p-0.5 border border-blue-600/30 bg-white mb-1 shadow-xs">
                  <img src={crestImg} alt="Liceo Paola Terranova - Jamundí" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-base font-bold text-emerald-950 uppercase tracking-widest font-sans">
                  Liceo Psicopedagógico Paola
                </h2>
                <p className="text-[10px] text-slate-500 font-sans uppercase">
                  Sede Terranova — Jamundí · NIT: 890.304.512-1
                </p>
              </div>

              <div className="flex justify-between items-center text-xs font-sans text-slate-600 border-b pb-2">
                <span className="font-mono font-bold text-emerald-900">
                  {selectedCircForPrint.numeroOficio}
                </span>
                <span>{selectedCircForPrint.fecha}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-sans text-slate-950 mb-4">
                  {selectedCircForPrint.titulo}
                </h3>
                <div className="text-xs sm:text-sm leading-relaxed text-justify space-y-3 whitespace-pre-line">
                  {selectedCircForPrint.contenido}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-6 text-center font-sans text-xs">
                <div>
                  <div className="border-b border-slate-700 w-3/4 mx-auto pb-1 italic font-serif">
                    Hernán Campos Patiño
                  </div>
                  <div className="font-bold text-slate-900 mt-1 uppercase text-[10px]">
                    Rectoría General
                  </div>
                </div>
                <div>
                  <div className="border-b border-slate-700 w-3/4 mx-auto pb-1 italic font-serif">
                    Consejo Directivo
                  </div>
                  <div className="font-bold text-slate-900 mt-1 uppercase text-[10px]">
                    Secretaría Académica
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t flex justify-end print:hidden">
              <button
                onClick={() => setSelectedCircForPrint(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComunicadosView;
