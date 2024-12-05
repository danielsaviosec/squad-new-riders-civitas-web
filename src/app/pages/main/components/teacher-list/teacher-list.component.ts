import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { TeacherService } from '../../../../service/teachers/teachers.service';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap, finalize } from 'rxjs';

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
    { name: "Professores", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  teachers: Teacher[] = [];
  teacherClassesNames: { [key: string]: string[] } = {};
  isLoading = true;
  isLoadingSearch: boolean = false;
  searchTerm$ = new Subject<string>(); // Subject para controlar a busca

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit() {
      this.searchTerm$
      .pipe(
        debounceTime(300), // Aguarda 300ms após o último evento
        distinctUntilChanged(), // Evita requisições repetidas
        switchMap(term => {
          this.isLoadingSearch = true;
          return this.teacherService.getTeachers(term).pipe(
            catchError(err => {
              console.error('Erro ao buscar professores:', err);
              this.isLoadingSearch = false;
              return of([]);
            }),
            finalize(() => {
              this.isLoadingSearch = false; // Desativar spinner de busca
            })
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.teachers = data;

          data.forEach((teacher) => {
            this.teacherClassesNames[teacher.registrationNumber] = teacher.classes.map((classItem: Class) => classItem.name);
          });
          this.isLoading = false;
        },
        error: () => {
          this.teachers = [];
          this.isLoading = false;
        }
      });

      // Disparar busca inicial
      this.searchTerm$.next('');
  }

  onSearch(term: string): void {
    // TODO: Carregamento de pesquisa...
    this.searchTerm$.next(term);
  }

  onNavigateToUpdateTeacher(id: number) {
    this.router.navigate([`/main/update-teacher/${id}`]);
  }
}
