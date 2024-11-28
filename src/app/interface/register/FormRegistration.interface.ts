export interface QuestionOption {
    value: string;
    text: string;
}

export interface Question {
    id: string;
    title: string;
    description: string;
}

export interface FormData {
    autoconhecimento: string;
    empatia: string;
    comunicacao: string;
    trabalhoEquipe: string;
    autonomia: string;
    textTeacher: string;
}