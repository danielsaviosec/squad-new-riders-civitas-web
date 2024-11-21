import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() tipo!: 'professor' | 'turma' | 'estudante'; // Adicionando o tipo "estudante"

  // Inputs para professor
  @Input() nomeCompleto?: string;
  @Input() matricula?: string;
  @Input() apelidosTurmas: string[] = [];

  // Inputs para turma
  @Input() apelidoTurma?: string;
  @Input() anoLetivo?: string;
  @Input() periodoLetivo?: string;
  @Input() ensino?: string;

  // Inputs para estudante
  @Input() nomeDoEstudante?: string;
  @Input() matriculaDoEstudante?: string;
  @Input() apelidoTurmaEstudante?: string;
  @Input() rgCpfDoEstudante?: string;
  @Input() cpfResponsavel?: string;
}
