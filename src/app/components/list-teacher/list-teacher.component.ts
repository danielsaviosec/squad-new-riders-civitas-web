import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent {
  @Input() tipo!: 'turma' | 'estudante'; // Adicionando o tipo "estudante"

  // Inputs e Outputs para turma
  @Input() apelidoTurma?: string;
  @Input() anoLetivo?: string;
  @Input() periodoLetivo?: string;
  @Input() idTurma!: number;

  @Output() turmaSelecionada = new EventEmitter<{ idTurma: number; apelidoTurma?: string }>();

  // Inputs para estudante
  @Input() nomeDoEstudante?: string;
  @Input() matriculaDoEstudante?: string;

  // Funções
  onTurmaClick() {
    this.turmaSelecionada.emit({
      idTurma: this.idTurma,
      apelidoTurma: this.apelidoTurma
    })
  }
}
