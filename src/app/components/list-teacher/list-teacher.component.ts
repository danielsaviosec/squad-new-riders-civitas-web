import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent {
  @Input() tipo!: 'turma' | 'estudante'; // Adicionando o tipo "estudante"

  // Inputs para turma
  @Input() apelidoTurma?: string;
  @Input() anoLetivo?: string;
  @Input() periodoLetivo?: string;

  // Inputs para estudante
  @Input() nomeDoEstudante?: string;
  @Input() matriculaDoEstudante?: string;
}
