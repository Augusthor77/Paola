export const formatCurrency = (amount: number): string => {
  return '$' + amount.toLocaleString('es-CO');
};

export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const getWhatsAppUrl = (phone: string, message: string): string => {
  const digits = cleanPhoneNumber(phone);
  const internationalNumber = digits.length === 10 ? `57${digits}` : digits;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
};

export const generateInitials = (name: string): string => {
  if (!name) return 'LP';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-emerald-600 text-white',
    'bg-blue-600 text-white',
    'bg-amber-600 text-white',
    'bg-indigo-600 text-white',
    'bg-rose-600 text-white',
    'bg-teal-600 text-white',
    'bg-cyan-600 text-white',
    'bg-violet-600 text-white',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

/**
 * Web Audio API synthesize a realistic high-tech chime for NFC turnstile scan
 */
export const playNfcSound = (type: 'success' | 'warning' | 'error' = 'success') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'success') {
      // Pleasant double beep (880Hz then 1320Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      osc2.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.08);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.28);
    } else if (type === 'warning') {
      // Lower warning tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(330, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // Audio might be blocked by browser autoplay policy until user gesture
  }
};

export const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case 'tarea':
      return {
        label: 'Tarea o Actividad',
        classes: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'actitud':
      return {
        label: 'Actitud o Convivencia',
        classes: 'bg-rose-50 text-rose-800 border-rose-200',
        dot: 'bg-rose-500',
      };
    case 'felic':
      return {
        label: 'Felicitación y Logro',
        classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'citacion':
      return {
        label: 'Citación a Acudiente',
        classes: 'bg-blue-50 text-blue-800 border-blue-200',
        dot: 'bg-blue-500',
      };
    default:
      return {
        label: 'Otra Observación',
        classes: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
      };
  }
};
