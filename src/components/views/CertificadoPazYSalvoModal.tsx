import React from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import { X, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';

const crestImg = '/assets/aistudio/image_c40ec28d.png';
const sealImg = '/src/assets/images/official_school_seal_1794090728048.jpg';

export const CertificadoPazYSalvoModal: React.FC = () => {
  const { pazYSalvoStudentId, setPazYSalvoStudentId, students } = useSchool();

  if (pazYSalvoStudentId === null) return null;
  const student = students[pazYSalvoStudentId];
  if (!student) return null;

  const certNumber = `PYS-2026-${String(8800 + student.id).padStart(5, '0')}`;
  const verificationCode = `LPP-SEC-${student.doc.replace(/\D/g, '').slice(-4)}-2026`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8">
        {/* Top Control Bar (Hidden during print) */}
        <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certificado Oficial de Paz y Salvo Institucional</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={() => setPazYSalvoStudentId(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-12 bg-[#FCFAF6] border-8 border-double border-amber-900/20 text-slate-800 space-y-6 relative selection:bg-amber-100"
        >
          {/* Institutional Header */}
          <div className="text-center pb-6 border-b-2 border-emerald-900/40 space-y-2">
            <div className="w-24 h-24 mx-auto rounded-full p-1 bg-white border border-blue-600/30 shadow-xs mb-2">
              <img
                src={crestImg}
                alt="Liceo Paola Terranova - Jamundí"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h1 className="text-lg sm:text-xl font-serif font-black tracking-wide text-emerald-950 uppercase">
              Liceo Psicopedagógico Paola
            </h1>
            <p className="text-[11px] font-sans uppercase tracking-widest text-slate-600 font-semibold">
              Reconocimiento Oficial según Resolución No. 4143.0.21.3962 de Secretaría de Educación
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              NIT: 890.304.512-1 · DANE: 376001004128 · Terranova - Jamundí, Valle del Cauca, Colombia
            </p>
          </div>

          {/* Certificate Title */}
          <div className="text-center py-2 space-y-1">
            <span className="font-mono text-[10px] text-emerald-900 font-bold tracking-widest uppercase block">
              Folio Certificación: {certNumber}
            </span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 tracking-wider uppercase border-y border-amber-900/20 py-2 inline-block px-8">
              Certificado de Paz y Salvo
            </h2>
          </div>

          {/* Legal Text Body */}
          <div className="text-xs sm:text-sm leading-relaxed space-y-4 font-serif text-slate-800 text-justify">
            <p>
              El suscrito Rector y la Tesorería General del <strong>LICEO PSICOPEDAGÓGICO PAOLA</strong>, en uso de sus facultades legales e institucionales,
            </p>

            <p className="text-center font-sans font-bold text-sm tracking-widest text-emerald-900 py-1">
              CERTIFICAN QUE:
            </p>

            <p>
              El(la) estudiante <strong className="text-slate-950 uppercase text-sm">{student.n}</strong>, identificado(a) con documento de identidad No.{' '}
              <strong className="font-mono">{student.doc}</strong>, matriculado(a) regular y formalmente en el grado{' '}
              <strong className="text-emerald-950 uppercase">{student.g}</strong> para el año lectivo 2026:
            </p>

            <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-xl text-center space-y-1 font-sans">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Se encuentra a PAZ Y SALVO
              </span>
              <p className="text-xs text-emerald-800 font-medium">
                Por concepto de derechos académicos, matrícula, mensualidades de pensión escolar y demás obligaciones pecuniarias hasta el mes de{' '}
                <strong>noviembre de 2026</strong>.
              </p>
            </div>

            <p>
              Se expide la presente certificación a solicitud de la parte interesada, en constancia de su intachable cumplimiento financiero con la institución educativa.
            </p>
          </div>

          {/* Signatures & Seal Area */}
          <div className="pt-8 grid grid-cols-2 gap-8 items-end text-center">
            {/* Rector Signature */}
            <div className="space-y-2">
              <div className="border-b border-slate-700 w-3/4 mx-auto pb-1">
                <span className="font-serif italic text-base text-slate-800">
                  Hernán Campos Patiño
                </span>
              </div>
              <div className="text-[11px] font-sans font-bold text-slate-900 uppercase">
                Hernán Campos Patiño
              </div>
              <div className="text-[10px] text-slate-500">Rector Institucional</div>
            </div>

            {/* Official Seal Graphic */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={sealImg}
                  alt="Sello Oficial"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] font-mono text-slate-400">
                Sello Rectoral Verificado
              </span>
            </div>
          </div>

          {/* Footer Security Watermark */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-mono gap-2">
            <span>Código de Verificación Único: {verificationCode}</span>
            <span>Verificable en: liceo-paola.edu.co/validar</span>
          </div>
        </div>

        {/* Modal Close Action */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end print:hidden">
          <button
            onClick={() => setPazYSalvoStudentId(null)}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs"
          >
            Cerrar Vista Previa
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificadoPazYSalvoModal;
