import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StudentService } from '../../../../service/students/student.service';
import { ClassService } from 'src/app/service/classes/classes.service';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';

@Component({
  selector: 'app-student-class-list',
  templateUrl: './student-class-list.component.html',
  styleUrls: ['./student-class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentClassListComponent implements OnInit {
  students: IStudentResponse[] = [];
  classId: number = 0;
  isLoading = true;
  icons = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];
  turma: { id?: number; name?: string } = {};

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private classService: ClassService,
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.classId) {
      this.fetchStudentsByClassId(this.classId);
    }
  }

  fetchStudentsByClassId(classId: number): void {
    this.isLoading = true;

    forkJoin({
      students: this.studentService.getStudentsByClassId(classId),
      classInfo: this.classService.getClass(classId)
    }).subscribe({
      next: ({ students, classInfo }) => {
        this.students = students;
        this.turma.name = classInfo.name; // Extraindo apenas o nome da turma
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
        this.isLoading = false;
      }
    });
  }
}

