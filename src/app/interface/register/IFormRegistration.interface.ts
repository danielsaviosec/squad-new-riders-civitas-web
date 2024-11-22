export interface IQuestionOption {
    value: string;
    text: string;
}

export interface IQuestion {
    id: string;
    title: string;
    description: string;
}

export interface IFormData {
    autoconhecimento: string;
    empatia: string;
    comunicacao: string;
    trabalhoEquipe: string;
    autonomia: string;
    textTeacher: string;
}