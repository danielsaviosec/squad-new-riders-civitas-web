import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { StudentService } from 'src/app/service/students/student.service';
import { TeacherService } from 'src/app/service/teachers/teachers.service';
import { DialogService } from 'src/app/service/utils/dialog.service';

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
  @Input() idTurma!: number;

  // Inputs para estudante
  @Input() nomeDoEstudante?: string;
  @Input() matriculaDoEstudante?: string;
  @Input() apelidoTurmaEstudante?: string;
  @Input() rgCpfDoEstudante?: string;
  @Input() cpfResponsavel?: string;

  // Update
  @Output() selecionado = new EventEmitter<number>();
  @Input() id!: number;

  constructor(
    private dialogService: DialogService,
    private classService: ClassService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}

  onUpdateClick() {
    this.selecionado.emit(this.id);
  }

  onDeleteClick() {
    const title = `Tem certeza que deseja realizar a exclusão de ${this.tipo}?`
    const content =
      this.tipo === 'turma'
        ? `Ao excluir <strong>${this.apelidoTurma}</strong>, não será possível resgatar informações.`
        : this.tipo === 'professor'
        ? `Ao excluir <strong>${this.nomeCompleto}</strong>, não será possível resgatar informações.`
        : `Ao excluir <strong>${this.nomeDoEstudante}</strong>, não será possível resgatar informações.`;

    const dialogRef = this.dialogService.openDeleteDialog(title, content);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed) {
        switch(this.tipo) {
          case 'turma':
            this.classService.deleteClass(this.id).subscribe({
              next: () => this.handleSuccess(),
              error: (err) => this.onDeleteError(err, 'turma'),
            });
            break;
          case 'estudante':
            this.studentService.deleteStudent(this.id).subscribe({
              next: () => this.handleSuccess(),
              error: (data) => this.onDeleteError(data.error.message, 'estudante'),
            })
            break;
          case 'professor':
            this.teacherService.deleteTeacher(this.id).subscribe({
              next: () => this.handleSuccess(),
              error: (data) => this.onDeleteError(data.error.message, 'professor'),
            })
        }
      }
    })
  }

  private handleSuccess() {
    this._snackBar.open(`${this.tipo} excluido com sucesso.`, '', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });

    setTimeout(() => {
      location.reload();
    }, 1500);
  }

  // TODO: Corrigir any
  onDeleteError(error: string, tipo: string) {
    const hasError = true;
    const errorMessage =
      error || `Erro ao excluir ${tipo}. Tente novamente.`;
    const title = 'Não foi possível excluir';
    this.dialogService.openDeleteDialog(title, errorMessage, hasError);
  }

}
