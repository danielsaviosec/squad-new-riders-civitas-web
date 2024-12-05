import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ISidebarIcons } from 'src/app/interface';
import { IStudentResponse } from 'src/app/interface/response/IStudentsResponse.interface';
import { StudentService } from 'src/app/service/students/student.service';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap, finalize } from 'rxjs';

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
  isLoadingSearch: boolean = false;
  searchTerm$ = new Subject<string>(); // Subject para controlar a busca

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.searchTerm$
    .pipe(
      debounceTime(300), // Aguarda 300ms após o último evento
      distinctUntilChanged(), // Evita requisições repetidas
      switchMap(term => {
        this.isLoadingSearch = true;
        return this.studentService.getStudents(term).pipe(
          catchError(err => {
            console.error('Erro ao buscar estudantes:', err);
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
        this.students = data;
        this.isLoading = false;
      },
      error: () => {
        this.students = [];
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

  onNavigateToUpdateStudent(id: number): void {
    this.router.navigate([`/main/update-student/${id}`]);
  }

  onNavigateViewAdi(event: { id: number, classId: number }) {
    const { id, classId } = event;
    console.log(`/main/class/${classId}/student-adi/${id}`)
    this.router.navigate([`/main/class/${classId}/student-adi/${id}`]);
  }
}
