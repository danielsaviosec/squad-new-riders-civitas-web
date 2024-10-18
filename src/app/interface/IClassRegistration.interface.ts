export interface SelectOption {
    value: string;
    label: string;
  }
  
  export interface ClassRegistrationForm {
    anoLetivo: string;
    periodoLetivo: string;
    ensino: string;
    apelidoTurma: string;
  }
  
  export interface AnoLetivoOption extends SelectOption {}
  export interface PeriodoLetivoOption extends SelectOption {}
  export interface EnsinoOption extends SelectOption {}