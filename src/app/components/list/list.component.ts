import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() tipo!: 'professor' | 'turma'; // Tipo de componente (professor ou turma)

  // Inputs para professor
  @Input() nomeCompleto?: string;
  @Input() matricula?: string;
  @Input() apelidosTurmas: string[] = [];

  // Inputs para turma
  @Input() apelidoTurma?: string;
  @Input() anoLetivo?: string;
  @Input() periodoLetivo?: string;
  @Input() ensino?: string;
}
