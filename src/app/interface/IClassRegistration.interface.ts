export interface ISelectOption {
    value: string;
    label: string;
  }
  
  export interface IClassRegistrationForm {
    anoLetivo: string;
    periodoLetivo: string;
    ensino: string;
    apelidoTurma: string;
  }
  
  export interface AnoLetivoOption extends ISelectOption {}
  export interface PeriodoLetivoOption extends ISelectOption {}
  export interface EnsinoOption extends ISelectOption {}