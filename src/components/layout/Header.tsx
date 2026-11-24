import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Bell,
  Search,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  CreditCard,
  Calendar,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Clock,
  Building,
} from 'lucide-react';
import RoleSwitcherModal from './RoleSwitcherModal.tsx';

const crestImg = '/assets/aistudio/image_c40ec28d.png';

export const Header: React.FC = () => {
  const {
    currentRole,
    currentUser,
    activeTab,
    setActiveTab,
    unreadCount,
    setGlobalSearchOpen,
    currentGuardian,
    selectedKidIndex,
    switchKid,
    students,
  } = useSchool();

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tab definitions based on role
  const getNavLinks = () => {
    switch (currentRole) {
      case 'admin':
        return [
          { id: 'inicio', label: 'Asistencia & NFC', icon: Clock },
          { id: 'direccion', label: 'Dashboard', icon: Building },
          { id: 'auditoria', label: 'Directorio 360°', icon: Search },
          { id: 'pensiones', label: 'Pensiones', icon: CreditCard },
          { id: 'agenda', label: 'Agenda & Observador', icon: BookOpen },
          { id: 'comunicados', label: 'Comunicados', icon: Bell },
          { id: 'horarios', label: 'Horarios', icon: Calendar },
          { id: 'manual', label: 'Manual', icon: ShieldCheck },
          { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare },
        ];
      case 'profesor':
        return [
          { id: 'inicio', label: 'Asistencia & NFC', icon: Clock },
          { id: 'agenda', label: 'Observador & Notas', icon: BookOpen },
          { id: 'horarios', label: 'Mi Horario', icon: Calendar },
          { id: 'comunicados', label: 'Comunicados', icon: Bell },
          { id: 'manual', label: 'Manual Convivencia', icon: ShieldCheck },
          { id: 'notif', label: 'Notificaciones', icon: Bell },
        ];
      case 'acudiente':
        return [
          { id: 'inicio', label: 'Asistencia Hoy', icon: Clock },
          { id: 'agenda', label: 'Agenda & Observador', icon: BookOpen },
          { id: 'pensiones', label: 'Paz y Salvo', icon: CreditCard },
          { id: 'horarios', label: 'Horario Escolar', icon: Calendar },
          { id: 'comunicados', label: 'Comunicados', icon: Bell },
          { id: 'manual', label: 'Manual Convivencia', icon: ShieldCheck },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        {/* Top 3-Zone Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('inicio')}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-600/30 bg-white shrink-0 shadow-xs p-0.5">
                  <img
                    src={crestImg}
                    alt="Liceo Paola - Terranova - Jamundí"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                    Liceo Paola
                  </span>
                  <span className="text-[10px] text-blue-900 font-bold tracking-wide uppercase">
                    Terranova · Jamundí
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
              {navLinks.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.id === 'notif' && unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] bg-rose-600 text-white rounded-full font-mono tabular-nums">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions & Role Profile */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Quick Search Shortcut */}
              <button
                onClick={() => setGlobalSearchOpen(true)}
                title="Búsqueda rápida (Ctrl+K)"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">⌘K</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setActiveTab('notif')}
                title="Notificaciones"
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-600 rounded-full" />
                )}
              </button>

              {/* Role Switcher Pill */}
              <button
                onClick={() => setRoleModalOpen(true)}
                className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors text-xs font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="hidden md:inline font-bold truncate max-w-[130px]">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-slate-500 capitalize">
                  ({currentRole})
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar for Acudiente with multiple kids */}
        {currentRole === 'acudiente' && currentGuardian && currentGuardian.kids.length > 1 && (
          <div className="bg-emerald-900 text-white px-4 py-2 text-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
              <span className="font-medium text-emerald-200">
                Seleccionar estudiante a consultar:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {currentGuardian.kids.map((kidId, idx) => {
                  const st = students[kidId];
                  const isSelected = idx === selectedKidIndex;
                  return (
                    <button
                      key={kidId}
                      onClick={() => switchKid(idx)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'bg-white text-emerald-900 shadow-sm'
                          : 'bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100'
                      }`}
                    >
                      {st ? `${st.n} (${st.g})` : `Hijo ${idx + 1}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg text-left ${
                    isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.id === 'notif' && unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] bg-rose-600 text-white rounded-full font-mono">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setRoleModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50/50 rounded-lg"
              >
                <UserCheck className="w-4 h-4" />
                <span>Cambiar de Rol / Usuario</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Role Switcher Modal */}
      {roleModalOpen && <RoleSwitcherModal onClose={() => setRoleModalOpen(false)} />}
    </>
  );
};

export default Header;
