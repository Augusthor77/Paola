export type UserRole = 'admin' | 'profesor' | 'acudiente';

export interface CurrentUser {
  role: UserRole;
  name: string;
  title: string;
  email: string;
  teacherIndex?: number;
  guardianIndex?: number;
  kidIndex?: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: number;
  studentName: string;
  grade: string;
  dateStr: string;
  entryTime: string;
  exitTime: string;
  status: 'Puntual' | 'Retardo' | 'Completo' | 'Salida Temprana' | 'Inasistencia';
  gate: string;
}

export type AgendaCategory = 'tarea' | 'actitud' | 'felic' | 'citacion' | 'otro';

export interface NoteReplica {
  id: string;
  author: string;
  role: 'acudiente' | 'profesor' | 'admin';
  text: string;
  timestamp: string;
  readByDoc: boolean;
  readByAdmin: boolean;
}

export interface AgendaNote {
  id: string;
  studentId: number;
  studentName: string;
  grade: string;
  teacherId: number;
  teacherName: string;
  category: AgendaCategory;
  title: string;
  description: string;
  createdAt: string;
  firmada: boolean;
  firmadaAt?: string;
  firmadaBy?: string;
  replicas: NoteReplica[];
  leidaPorAdmin: boolean;
}

export interface OfficialCircular {
  id: string;
  numeroOficio: string;
  titulo: string;
  contenido: string;
  categoria: 'General' | 'Académico' | 'Convivencia' | 'Eventos' | 'Administrativo';
  audiencia: 'Todos' | 'Acudientes' | 'Docentes';
  prioridad: 'Normal' | 'Alta' | 'Urgente';
  fijado: boolean;
  fecha: string;
  autor: string;
}

export interface PaymentReceipt {
  id: string;
  receiptNumber: string;
  studentId: number;
  studentName: string;
  amount: number;
  month: string;
  date: string;
  paymentMethod: 'Efectivo' | 'Transferencia Bancaria' | 'PSE' | 'Datafono';
  registeredBy: string;
}
