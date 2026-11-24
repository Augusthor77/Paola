import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext.tsx';
import {
  Calendar,
  Clock,
  GraduationCap,
  Users,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import {
  SCHEDULES,
  TIME_SLOTS,
  TEACHERS,
} from '../../data/schoolData.ts';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const HorariosView: React.FC = () => {
  const { currentRole, currentStudent, selectedTeacherIndex } = useSchool();

  // Mode: by grade or by teacher
  const [scheduleType, setScheduleType] = useState<'grado' | 'docente'>(
    currentRole === 'profesor' ? 'docente' : 'grado'
  );

  const [selectedGrade, setSelectedGrade] = useState<number>(
    currentRole === 'acudiente' && currentStudent ? currentStudent.gn : 1
  );

  const [selectedTeacher, setSelectedTeacher] = useState<number>(
    currentRole === 'profesor' ? selectedTeacherIndex : 0
  );

  // Compute teacher total weekly load
  const getTeacherWeeklyHours = (teacherId: number) => {
    let count = 0;
    for (let g = 1; g <= 11; g++) {
      const gSched = SCHEDULES[String(g)];
      if (!gSched) continue;
      gSched.forEach((day) => {
        day.forEach((slot) => {
          if (slot[1] === teacherId) count++;
        });
      });
    }
    return count;
  };

  const currentTeacherObj = TEACHERS[selectedTeacher];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-800" />
            <span>Malla Curricular y Horarios de Clases</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Jornada escolar matutina de 07:00 AM a 02:00 PM con 7 periodos académicos diarios
          </p>
        </div>

        {/* View Toggle (Grado vs Docente) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setScheduleType('grado')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              scheduleType === 'grado'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Por Grado (1° a 11°)</span>
          </button>
          <button
            onClick={() => setScheduleType('docente')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              scheduleType === 'docente'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Por Docente ({TEACHERS.length})</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {scheduleType === 'grado' ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Seleccionar Grado:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                    selectedGrade === g
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {g}° {g <= 5 ? 'Primaria' : 'Bach.'}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Seleccionar Docente:
            </span>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(Number(e.target.value))}
              className="text-xs font-semibold border border-slate-200 rounded-xl p-2 bg-white text-slate-900"
            >
              {TEACHERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.n} — {t.asig} ({t.coord})
                </option>
              ))}
            </select>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md">
              Carga total: {getTeacherWeeklyHours(selectedTeacher)} periodos semanales
            </span>
          </div>
        )}
      </div>

      {/* Timetable Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="font-bold text-sm text-slate-900">
            {scheduleType === 'grado'
              ? `Horario de Clases — Grado ${selectedGrade}° ${selectedGrade <= 5 ? 'Primaria' : 'Bachillerato'}`
              : `Horario del Docente: ${currentTeacherObj.n} (${currentTeacherObj.asig})`}
          </div>
          <span className="text-xs text-slate-500">
            Lunes a Viernes · 07:00 a 14:00
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-3 w-28 border-r border-slate-200 font-semibold text-center">
                  Hora / Bloque
                </th>
                {DAYS.map((day) => (
                  <th key={day} className="p-3 font-bold text-slate-800 border-r border-slate-200 min-w-[130px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {TIME_SLOTS.map(([label, start, end, periodIdx], rowIdx) => {
                // If this is a break / formation slot (periodIdx is null)
                if (periodIdx === null) {
                  return (
                    <tr
                      key={rowIdx}
                      className={
                        label.includes('Formación')
                          ? 'bg-amber-50/70 text-amber-900 font-bold'
                          : 'bg-emerald-50/50 text-emerald-900 font-semibold'
                      }
                    >
                      <td className="p-2.5 font-mono text-[11px] text-center border-r border-slate-200 whitespace-nowrap">
                        {start} - {end}
                      </td>
                      <td colSpan={5} className="p-2.5 text-center text-xs tracking-wider">
                        {label}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={rowIdx} className="hover:bg-slate-50/40">
                    <td className="p-2.5 font-mono text-[11px] text-slate-500 text-center border-r border-slate-200 bg-slate-50/60 whitespace-nowrap">
                      <div className="font-bold text-slate-800">{start} - {end}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{label}</div>
                    </td>

                    {/* 5 Days */}
                    {[0, 1, 2, 3, 4].map((dayIdx) => {
                      if (scheduleType === 'grado') {
                        const gradeSched = SCHEDULES[String(selectedGrade)];
                        const slot = gradeSched?.[dayIdx]?.[periodIdx];
                        if (!slot) {
                          return (
                            <td key={dayIdx} className="p-2.5 border-r border-slate-200 text-slate-300 italic">
                              Libre
                            </td>
                          );
                        }
                        const subjectName = slot[0];
                        const teacherId = slot[1];
                        const teacher = TEACHERS[teacherId];

                        const isHomeroom = subjectName === 'Dirección de Grupo';

                        return (
                          <td
                            key={dayIdx}
                            className={`p-2.5 border-r border-slate-200 align-top transition-colors ${
                              isHomeroom ? 'bg-amber-50/50' : ''
                            }`}
                          >
                            <div className="font-bold text-slate-900 text-xs leading-snug">
                              {subjectName}
                            </div>
                            <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                              {teacher ? teacher.short : 'Docente'}
                            </div>
                          </td>
                        );
                      } else {
                        // Searching which grade this teacher teaches during this day & period
                        let match: { grade: number; subject: string } | null = null;
                        for (let g = 1; g <= 11; g++) {
                          const slot = SCHEDULES[String(g)]?.[dayIdx]?.[periodIdx];
                          if (slot && slot[1] === selectedTeacher) {
                            match = { grade: g, subject: slot[0] };
                            break;
                          }
                        }

                        if (!match) {
                          return (
                            <td key={dayIdx} className="p-2.5 border-r border-slate-200 text-slate-300 italic">
                              Libre
                            </td>
                          );
                        }

                        return (
                          <td
                            key={dayIdx}
                            className="p-2.5 border-r border-slate-200 align-top bg-emerald-50/60"
                          >
                            <div className="font-bold text-emerald-950 text-xs">
                              {match.subject}
                            </div>
                            <div className="text-[11px] font-bold text-emerald-800 mt-0.5">
                              {match.grade}° {match.grade <= 5 ? 'Primaria' : 'Bach.'}
                            </div>
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HorariosView;
