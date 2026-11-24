import React from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext.tsx';
import Header from './components/layout/Header.tsx';
import InicioAsistenciaView from './components/views/InicioAsistenciaView.tsx';
import DireccionDashboardView from './components/views/DireccionDashboardView.tsx';
import AuditoriaDirectorioView from './components/views/AuditoriaDirectorioView.tsx';
import PensionesView from './components/views/PensionesView.tsx';
import AgendaObservadorView from './components/views/AgendaObservadorView.tsx';
import ComunicadosView from './components/views/ComunicadosView.tsx';
import HorariosView from './components/views/HorariosView.tsx';
import ManualConvivenciaView from './components/views/ManualConvivenciaView.tsx';
import WhatsAppHubView from './components/views/WhatsAppHubView.tsx';
import NotificacionesView from './components/views/NotificacionesView.tsx';
import FichaEstudianteModal from './components/views/FichaEstudianteModal.tsx';
import CertificadoPazYSalvoModal from './components/views/CertificadoPazYSalvoModal.tsx';
import CommandSearch from './components/common/CommandSearch.tsx';

const crestImg = '/assets/aistudio/image_c40ec28d.png';

const MainContent: React.FC = () => {
  const { activeTab } = useSchool();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'inicio':
        return <InicioAsistenciaView />;
      case 'direccion':
        return <DireccionDashboardView />;
      case 'auditoria':
        return <AuditoriaDirectorioView />;
      case 'pensiones':
        return <PensionesView />;
      case 'agenda':
        return <AgendaObservadorView />;
      case 'comunicados':
        return <ComunicadosView />;
      case 'horarios':
        return <HorariosView />;
      case 'manual':
        return <ManualConvivenciaView />;
      case 'whatsapp':
        return <WhatsAppHubView />;
      case 'notif':
        return <NotificacionesView />;
      default:
        return <InicioAsistenciaView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderCurrentView()}
      </main>

      {/* Global Modals */}
      <FichaEstudianteModal />
      <CertificadoPazYSalvoModal />
      <CommandSearch />

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-600/30 shrink-0">
              <img
                src={crestImg}
                alt="Liceo Paola"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                Liceo Psicopedagógico Paola
              </p>
              <p className="text-[11px] text-slate-400">
                Sistema Integral de Gestión Escolar (SGE) · Licencia Oficial No. 4143.0.21.3962
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <span>NIT: 890.304.512-1</span>
            <span aria-hidden="true">·</span>
            <span>Tel: 316 376 2170</span>
            <span aria-hidden="true">·</span>
            <span>Jornada Diaria: 07:00 a 14:00</span>
            <span aria-hidden="true">·</span>
            <span>Terranova - Jamundí, Valle del Cauca</span>
          </div>

          <div className="text-[11px] text-slate-400 text-center md:text-right">
            © {new Date().getFullYear()} Liceo Paola. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <MainContent />
    </SchoolProvider>
  );
}
