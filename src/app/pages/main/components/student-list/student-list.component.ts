import { Component, ViewEncapsulation } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';
import { StudentService } from 'src/app/service/students/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['../class-list/class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentListComponent {

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Professores", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  students: IStudentResponse[] = [];
  isLoading = true;constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        this.isLoading = false;
      },
      (error) => {
        console.error("Erro ao carregar estudantes:", error);
        this.isLoading = false;
      }
    );
  }
}
