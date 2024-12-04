import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIcons } from 'src/app/interface';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';
import { StudentService } from 'src/app/service/students/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['../class-list/class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentListComponent implements OnInit {

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Psicólogos", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  students: IStudentResponse[] = [];
  isLoading: boolean = true;
  
  constructor(private studentService: StudentService, private router: Router) {}

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

  onNavigateToUpdateStudent(id: number): void {
    this.router.navigate([`/main/update-student/${id}`]);
  }
}
