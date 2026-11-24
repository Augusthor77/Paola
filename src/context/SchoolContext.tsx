import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STUDENTS,
  GUARDIANS,
  TEACHERS,
  ADMINS,
  Student,
  Guardian,
  Teacher,
  AdminStaff,
  MONTHLY_TUITION_FEE,
} from '../data/schoolData.ts';
import {
  UserRole,
  CurrentUser,
  AttendanceRecord,
  AgendaNote,
  NoteReplica,
  OfficialCircular,
  PaymentReceipt,
} from '../types/index.ts';
import { playNfcSound } from '../utils/helpers.ts';

const STORAGE_KEY_STUDENTS = 'lpp_students_v3';
const STORAGE_KEY_NOTES = 'lpp_notes_v3';
const STORAGE_KEY_CIRCULARS = 'lpp_circulars_v3';
const STORAGE_KEY_ATTENDANCE = 'lpp_attendance_v3';
const STORAGE_KEY_RECEIPTS = 'lpp_receipts_v3';

// Seed realistic agenda notes
const INITIAL_NOTES: AgendaNote[] = [
  {
    id: 'note-1',
    studentId: 0, // Alberto Jerónimo Osorio Trujillo
    studentName: 'Alberto Jerónimo Osorio Trujillo',
    grade: '1° Primaria',
    teacherId: 0, // Felipe Sandoval Ortiz
    teacherName: 'Prof. Felipe Sandoval',
    category: 'felic',
    title: 'Excelente desempeño en cálculo mental y sumas',
    description: 'El estudiante demostró gran agilidad y entusiasmo durante la sesión de matemáticas prácticas. Felicitaciones por su dedicación.',
    createdAt: '2026-11-06 09:40',
    firmada: true,
    firmadaAt: '2026-11-06 18:20',
    firmadaBy: 'Antonella Acosta García (Madre)',
    replicas: [
      {
        id: 'rep-1',
        author: 'Antonella Acosta García',
        role: 'acudiente',
        text: 'Muchas gracias profesor Felipe, en casa seguimos repasando con mucho amor.',
        timestamp: '2026-11-06 18:22',
        readByDoc: true,
        readByAdmin: true,
      },
    ],
    leidaPorAdmin: true,
  },
  {
    id: 'note-2',
    studentId: 4, // 5th student (late payment in demo)
    studentName: STUDENTS[4].n,
    grade: STUDENTS[4].g,
    teacherId: 1, // Diana Salazar
    teacherName: 'Prof. Diana Salazar',
    category: 'tarea',
    title: 'No presentó guía de comprensión lectora',
    description: 'El estudiante no trajo resuelta la guía de la fábula correspondiente a la página 34 del libro guía. Se concede plazo para mañana a primera hora.',
    createdAt: '2026-11-07 08:30',
    firmada: false,
    replicas: [],
    leidaPorAdmin: false,
  },
  {
    id: 'note-3',
    studentId: 11,
    studentName: STUDENTS[11].n,
    grade: STUDENTS[11].g,
    teacherId: 5,
    teacherName: TEACHERS[5].short,
    category: 'citacion',
    title: 'Citación presencial a entrega de plan de apoyo',
    description: 'Apreciado acudiente, solicitamos su presencia el próximo viernes a las 07:30 AM para socializar las metas de mejoramiento académico del periodo.',
    createdAt: '2026-11-05 11:15',
    firmada: true,
    firmadaAt: '2026-11-05 15:45',
    firmadaBy: 'Acudiente registrado',
    replicas: [
      {
        id: 'rep-2',
        author: 'Acudiente',
        role: 'acudiente',
        text: 'Confirmada la asistencia. Estaré puntual a las 7:30 AM.',
        timestamp: '2026-11-05 15:47',
        readByDoc: true,
        readByAdmin: true,
      },
    ],
    leidaPorAdmin: true,
  },
  {
    id: 'note-4',
    studentId: 22,
    studentName: STUDENTS[22].n,
    grade: STUDENTS[22].g,
    teacherId: 2,
    teacherName: TEACHERS[2].short,
    category: 'actitud',
    title: 'Llamado de atención por uso de dispositivo en clase',
    description: 'Se le recordó al estudiante el Artículo 42 del Manual de Convivencia respecto a la restricción del celular en horas de clase sin autorización pedagógica.',
    createdAt: '2026-11-07 10:10',
    firmada: false,
    replicas: [],
    leidaPorAdmin: false,
  },
];

// Seed realistic official circulars
const INITIAL_CIRCULARS: OfficialCircular[] = [
  {
    id: 'circ-1',
    numeroOficio: 'CIR-2026-042',
    titulo: 'Jornada Pedagógica y Entrega de Informes del Tercer Periodo',
    contenido: `Estimada Comunidad Liceísta:\n\nNos permitimos informar que el próximo viernes 20 de noviembre se llevará a cabo la jornada institucional de entrega de informes académicos del Tercer Periodo.\n\nLos horarios de atención personalizada con docentes directores de grupo serán de 07:00 AM a 12:30 PM. Agradecemos estar a paz y salvo por concepto de pensiones para la respectiva entrega de boletines.\n\nAtentamente,\nRectoría y Consejo Directivo.`,
    categoria: 'Académico',
    audiencia: 'Todos',
    prioridad: 'Alta',
    fijado: true,
    fecha: '05 de noviembre de 2026',
    autor: 'Rectoría — Hernán Campos Patiño',
  },
  {
    id: 'circ-2',
    numeroOficio: 'CIR-2026-041',
    titulo: 'Protocolo de Ingreso Biométrico y Carnet NFC Institucional',
    contenido: `A toda la comunidad de padres y estudiantes:\n\nRecordamos que el uso del Carnet Escolar NFC en el torniquete principal es obligatorio a partir de las 06:45 AM. Los estudiantes que lleguen después de las 07:10 AM registrarán 'Retardo' en el sistema con notificación automática vía mensaje a sus acudientes.\n\nCuidemos el porte impecable del uniforme de diario y educación física.`,
    categoria: 'Convivencia',
    audiencia: 'Acudientes',
    prioridad: 'Normal',
    fijado: true,
    fecha: '02 de noviembre de 2026',
    autor: 'Coordinación de Convivencia',
  },
  {
    id: 'circ-3',
    numeroOficio: 'CIR-2026-040',
    titulo: 'Apertura de Proceso de Matrículas y Renovación Año 2027',
    contenido: `Se informa a los padres de familia que se encuentra habilitada la reserva de cupo para el año lectivo 2027. Los formularios de actualización de datos se pueden gestionar directamente en secretaría académica o en tesorería institucional.\n\nCupos limitados para grados de transición y primero de primaria.`,
    categoria: 'Administrativo',
    audiencia: 'Todos',
    prioridad: 'Normal',
    fijado: false,
    fecha: '28 de octubre de 2026',
    autor: 'Secretaría General',
  },
];

// Seed attendance logs for turnstile
const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    studentId: 0,
    studentName: 'Alberto Jerónimo Osorio Trujillo',
    grade: '1° Primaria',
    dateStr: 'Hoy',
    entryTime: '06:52 AM',
    exitTime: '-- En clase --',
    status: 'Puntual',
    gate: 'Torniquete Principal A',
  },
  {
    id: 'att-2',
    studentId: 0,
    studentName: 'Alberto Jerónimo Osorio Trujillo',
    grade: '1° Primaria',
    dateStr: 'Ayer',
    entryTime: '06:55 AM',
    exitTime: '01:45 PM',
    status: 'Completo',
    gate: 'Torniquete Principal A',
  },
  {
    id: 'att-3',
    studentId: 0,
    studentName: 'Alberto Jerónimo Osorio Trujillo',
    grade: '1° Primaria',
    dateStr: 'Lunes',
    entryTime: '07:12 AM',
    exitTime: '01:45 PM',
    status: 'Retardo',
    gate: 'Torniquete Principal B',
  },
  {
    id: 'att-4',
    studentId: 1,
    studentName: STUDENTS[1].n,
    grade: STUDENTS[1].g,
    dateStr: 'Hoy',
    entryTime: '06:48 AM',
    exitTime: '-- En clase --',
    status: 'Puntual',
    gate: 'Torniquete Principal A',
  },
  {
    id: 'att-5',
    studentId: 2,
    studentName: STUDENTS[2].n,
    grade: STUDENTS[2].g,
    dateStr: 'Hoy',
    entryTime: '07:14 AM',
    exitTime: '-- En clase --',
    status: 'Retardo',
    gate: 'Torniquete Principal B',
  },
];

interface SchoolContextType {
  students: Student[];
  guardians: Guardian[];
  teachers: Teacher[];
  admins: AdminStaff[];
  currentRole: UserRole;
  currentUser: CurrentUser;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedGuardianIndex: number;
  selectedKidIndex: number;
  selectedTeacherIndex: number;
  setRole: (role: UserRole, teacherId?: number, guardianId?: number, kidId?: number) => void;
  switchKid: (kidIdx: number) => void;
  switchTeacher: (teacherIdx: number) => void;
  switchGuardian: (guardianIdx: number) => void;
  attendanceLogs: AttendanceRecord[];
  simulateNfcScan: (type: 'entrada' | 'salida', targetStudentId?: number) => { success: boolean; message: string; record: AttendanceRecord };
  notes: AgendaNote[];
  addAgendaNote: (data: { studentId: number; category: AgendaNote['category']; title: string; description: string; notifyWhatsApp?: boolean }) => void;
  signAgendaNote: (noteId: string) => void;
  addNoteReplica: (noteId: string, text: string) => void;
  circulars: OfficialCircular[];
  addCircular: (data: Omit<OfficialCircular, 'id' | 'numeroOficio' | 'fecha'>) => void;
  togglePinCircular: (circularId: string) => void;
  receipts: PaymentReceipt[];
  markPayment: (studentId: number, amount: number, method: PaymentReceipt['paymentMethod']) => void;
  selectedStudentId: number | null;
  setSelectedStudentId: (id: number | null) => void;
  pazYSalvoStudentId: number | null;
  setPazYSalvoStudentId: (id: number | null) => void;
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  currentStudent: Student | null;
  currentGuardian: Guardian | null;
  currentTeacher: Teacher | null;
  unreadCount: number;
  markAllNotificationsRead: () => void;
}

const SchoolContext = createContext<SchoolContextType | null>(null);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or use defaults
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return STUDENTS;
  });

  const [notes, setNotes] = useState<AgendaNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_NOTES;
  });

  const [circulars, setCirculars] = useState<OfficialCircular[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CIRCULARS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CIRCULARS;
  });

  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATTENDANCE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ATTENDANCE;
  });

  const [receipts, setReceipts] = useState<PaymentReceipt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECEIPTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Current session state
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [selectedGuardianIndex, setSelectedGuardianIndex] = useState<number>(0);
  const [selectedKidIndex, setSelectedKidIndex] = useState<number>(0);
  const [selectedTeacherIndex, setSelectedTeacherIndex] = useState<number>(0);

  // Modals
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [pazYSalvoStudentId, setPazYSalvoStudentId] = useState<number | null>(null);
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CIRCULARS, JSON.stringify(circulars));
  }, [circulars]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RECEIPTS, JSON.stringify(receipts));
  }, [receipts]);

  // Derived current user object
  const currentGuardian = GUARDIANS[selectedGuardianIndex] || GUARDIANS[0];
  const currentTeacher = TEACHERS[selectedTeacherIndex] || TEACHERS[0];
  const kidStudentIndex = currentGuardian?.kids[Math.min(selectedKidIndex, (currentGuardian?.kids.length || 1) - 1)] ?? 0;
  const currentStudent = students[kidStudentIndex] || students[0];

  const currentUser: CurrentUser = {
    role: currentRole,
    name:
      currentRole === 'admin'
        ? 'Augusto Ordóñez'
        : currentRole === 'profesor'
        ? currentTeacher.n
        : currentGuardian.n,
    title:
      currentRole === 'admin'
        ? 'Rectoría & Administración'
        : currentRole === 'profesor'
        ? `Docente · ${currentTeacher.asig}`
        : `Acudiente (${currentGuardian.rel})`,
    email:
      currentRole === 'admin'
        ? 'direccion@liceopaola.com'
        : currentRole === 'profesor'
        ? currentTeacher.mail
        : currentGuardian.mail,
    teacherIndex: selectedTeacherIndex,
    guardianIndex: selectedGuardianIndex,
    kidIndex: selectedKidIndex,
  };

  const setRole = (role: UserRole, teacherId?: number, guardianId?: number, kidId?: number) => {
    setCurrentRole(role);
    if (typeof teacherId === 'number') setSelectedTeacherIndex(teacherId);
    if (typeof guardianId === 'number') {
      setSelectedGuardianIndex(guardianId);
      setSelectedKidIndex(kidId ?? 0);
    }
  };

  const switchKid = (kidIdx: number) => {
    setSelectedKidIndex(kidIdx);
  };

  const switchTeacher = (teacherIdx: number) => {
    setSelectedTeacherIndex(teacherIdx);
  };

  const switchGuardian = (guardianIdx: number) => {
    setSelectedGuardianIndex(guardianIdx);
    setSelectedKidIndex(0);
  };

  // NFC Simulation
  const simulateNfcScan = (type: 'entrada' | 'salida', targetStudentId?: number) => {
    const studentToScan =
      typeof targetStudentId === 'number'
        ? students[targetStudentId]
        : currentRole === 'acudiente'
        ? currentStudent
        : students[Math.floor(Math.random() * students.length)];

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });

    let status: AttendanceRecord['status'] = 'Puntual';
    if (type === 'entrada') {
      // Simulate on-time vs late based on minutes
      const hours = now.getHours();
      const minutes = now.getMinutes();
      if (hours > 7 || (hours === 7 && minutes > 10)) {
        status = 'Retardo';
      } else {
        status = 'Puntual';
      }
    } else {
      status = 'Completo';
    }

    const newRecord: AttendanceRecord = {
      id: 'att-' + Date.now(),
      studentId: studentToScan.id,
      studentName: studentToScan.n,
      grade: studentToScan.g,
      dateStr: 'Hoy',
      entryTime: type === 'entrada' ? timeFormatted : '06:52 AM',
      exitTime: type === 'salida' ? timeFormatted : '-- En clase --',
      status: status,
      gate: 'Torniquete Principal A',
    };

    setAttendanceLogs((prev) => [newRecord, ...prev]);
    playNfcSound(status === 'Retardo' ? 'warning' : 'success');

    return {
      success: true,
      message: `${type === 'entrada' ? 'Entrada' : 'Salida'} registrada: ${studentToScan.n} (${studentToScan.g})`,
      record: newRecord,
    };
  };

  // Agenda Notes Handlers
  const addAgendaNote = (data: {
    studentId: number;
    category: AgendaNote['category'];
    title: string;
    description: string;
  }) => {
    const targetStudent = students[data.studentId] || students[0];
    const teacher = currentRole === 'profesor' ? currentTeacher : TEACHERS[0];

    const now = new Date();
    const dateFormatted = now.toISOString().slice(0, 10) + ' ' + now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });

    const newNote: AgendaNote = {
      id: 'note-' + Date.now(),
      studentId: targetStudent.id,
      studentName: targetStudent.n,
      grade: targetStudent.g,
      teacherId: teacher.id,
      teacherName: teacher.short,
      category: data.category,
      title: data.title,
      description: data.description,
      createdAt: dateFormatted,
      firmada: false,
      replicas: [],
      leidaPorAdmin: false,
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  const signAgendaNote = (noteId: string) => {
    const now = new Date();
    const dateFormatted = now.toISOString().slice(0, 10) + ' ' + now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            firmada: true,
            firmadaAt: dateFormatted,
            firmadaBy: `${currentGuardian.n} (${currentGuardian.rel})`,
          };
        }
        return n;
      })
    );
  };

  const addNoteReplica = (noteId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          const newReplica: NoteReplica = {
            id: 'rep-' + Date.now(),
            author: currentUser.name,
            role: currentRole,
            text,
            timestamp: `Hoy ${timeStr}`,
            readByDoc: currentRole === 'profesor',
            readByAdmin: currentRole === 'admin',
          };
          return {
            ...n,
            replicas: [...n.replicas, newReplica],
          };
        }
        return n;
      })
    );
  };

  // Circulars Handlers
  const addCircular = (data: Omit<OfficialCircular, 'id' | 'numeroOficio' | 'fecha'>) => {
    const nextNum = circulars.length + 43;
    const now = new Date();
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dateStr = `${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;

    const newCirc: OfficialCircular = {
      ...data,
      id: 'circ-' + Date.now(),
      numeroOficio: `CIR-2026-${String(nextNum).padStart(3, '0')}`,
      fecha: dateStr,
    };

    setCirculars((prev) => [newCirc, ...prev]);
  };

  const togglePinCircular = (circularId: string) => {
    setCirculars((prev) =>
      prev.map((c) => (c.id === circularId ? { ...c, fijado: !c.fijado } : c))
    );
  };

  // Tuition Payments
  const markPayment = (
    studentId: number,
    amount: number,
    method: PaymentReceipt['paymentMethod']
  ) => {
    const targetStudent = students[studentId];
    if (!targetStudent) return;

    const receiptNum = 'REC-2026-' + String(1000 + receipts.length + 1);
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-CO');

    const newReceipt: PaymentReceipt = {
      id: 'rec-' + Date.now(),
      receiptNumber: receiptNum,
      studentId,
      studentName: targetStudent.n,
      amount,
      month: 'Noviembre 2026',
      date: dateStr,
      paymentMethod: method,
      registeredBy: currentUser.name,
    };

    setReceipts((prev) => [newReceipt, ...prev]);

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newDebt = Math.max(0, s.debt - 1);
          return {
            ...s,
            debt: newDebt,
            paid: newDebt === 0,
          };
        }
        return s;
      })
    );
  };

  // Unread badge count
  const unreadCount =
    currentRole === 'admin'
      ? notes.filter((n) => !n.leidaPorAdmin).length +
        notes.reduce((acc, n) => acc + n.replicas.filter((r) => !r.readByAdmin).length, 0)
      : currentRole === 'profesor'
      ? notes
          .filter((n) => n.teacherId === selectedTeacherIndex)
          .reduce((acc, n) => acc + n.replicas.filter((r) => !r.readByDoc).length, 0)
      : notes.filter(
          (n) => currentGuardian.kids.includes(n.studentId) && !n.firmada
        ).length;

  const markAllNotificationsRead = () => {
    setNotes((prev) =>
      prev.map((n) => ({
        ...n,
        leidaPorAdmin: true,
        replicas: n.replicas.map((r) => ({
          ...r,
          readByAdmin: true,
          readByDoc: true,
        })),
      }))
    );
  };

  return (
    <SchoolContext.Provider
      value={{
        students,
        guardians: GUARDIANS,
        teachers: TEACHERS,
        admins: ADMINS,
        currentRole,
        currentUser,
        activeTab,
        setActiveTab,
        selectedGuardianIndex,
        selectedKidIndex,
        selectedTeacherIndex,
        setRole,
        switchKid,
        switchTeacher,
        switchGuardian,
        attendanceLogs,
        simulateNfcScan,
        notes,
        addAgendaNote,
        signAgendaNote,
        addNoteReplica,
        circulars,
        addCircular,
        togglePinCircular,
        receipts,
        markPayment,
        selectedStudentId,
        setSelectedStudentId,
        pazYSalvoStudentId,
        setPazYSalvoStudentId,
        globalSearchOpen,
        setGlobalSearchOpen,
        currentStudent,
        currentGuardian,
        currentTeacher,
        unreadCount,
        markAllNotificationsRead,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) throw new Error('useSchool must be used within SchoolProvider');
  return context;
};
