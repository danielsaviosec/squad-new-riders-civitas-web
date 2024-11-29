import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/utils/shared-data.service';

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
  @Input() idEstudante!: number;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  // Funções
  onTurmaClick() {
    this.turmaSelecionada.emit({
      idTurma: this.idTurma,
      apelidoTurma: this.apelidoTurma
    })
  }

  onVisualizarClick() {
    // Setando apelidoTurma e nomeDoEstudante no SharedDataService
    this.sharedDataService.setData({
      apelidoTurma: this.apelidoTurma,
      nomeDoEstudante: this.nomeDoEstudante
    });

    // Redirecionando para a página do estudante
    this.router.navigate([`/main/adi/${this.idEstudante}`]);
  }
}
