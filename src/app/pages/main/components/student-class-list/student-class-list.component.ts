import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../service/students/student.service';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';
import { SharedDataService } from 'src/app/service/utils/shared-data.service';

@Component({
  selector: 'app-student-class-list',
  templateUrl: './student-class-list.component.html',
  styleUrls: ['./student-class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentClassListComponent implements OnInit {
  students: IStudentResponse[] = [];
  isLoading = true;
  icons = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];
  turma: { id?: number; name?: string } = {};

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    const classId = this.route.snapshot.paramMap.get('id');

    // Recupera o apelido da turma do serviço compartilhado
    this.turma.name = this.sharedDataService.getData()?.apelidoTurma;

    if (classId) {
      this.fetchStudentsByClassId(classId);
    }
  }

  fetchStudentsByClassId(classId: string): void {
    this.isLoading = true;
    this.studentService.getStudentsByClassId(classId).subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar alunos da turma:', err);
        this.isLoading = false;
      }
    });
  }
}

