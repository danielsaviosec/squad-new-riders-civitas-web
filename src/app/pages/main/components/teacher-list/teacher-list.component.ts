import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { TeacherService } from '../../../../service/teachers/teachers.service';

import { Teacher } from 'src/app/interface/register/Teacher.interface';
import { Class } from 'src/app/interface/register/Class.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['../class-list/class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherListComponent implements OnInit {
  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Psicólogos", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  teachers: Teacher[] = [];
  teacherClassesNames: { [key: string]: string[] } = {};
  isLoading = true;

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;

        data.forEach((teacher) => {
          this.teacherClassesNames[teacher.registrationNumber] = teacher.classes.map((classItem: Class) => classItem.name);
        });
        this.isLoading = false;
      },
      (error) => {
        console.error("Erro ao carregar psicólogos:", error);
        this.isLoading = false;
      }
    );
  }

  onNavigateToUpdateTeacher(id: number) {
    this.router.navigate([`/main/update-teacher/${id}`]);
  }
}
