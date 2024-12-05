import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { ISelectOption } from 'src/app/interface/IClassRegistration.interface';
import { ClassesResponse } from 'src/app/interface/response/ClassesResponse.interface';
import { ClassService } from 'src/app/service/classes/classes.service';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth/auth.service';
import { SharedDataService } from 'src/app/service/utils/shared-data.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClassListComponent implements OnInit {

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Psicólogos", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  anoLetivo: ISelectOption[] = [
    { value: '1-ano', label: '1º ano', backName: '1st year' },
    { value: '2-ano', label: '2º ano', backName: '2nd year' },
    { value: '3-ano', label: '3º ano', backName: '3rd year' },
    { value: '4-ano', label: '4º ano', backName: '4th year' },
    { value: '5-ano', label: '5º ano', backName: '5th year' },
    { value: '6-ano', label: '6º ano', backName: '6th year' }
  ];

  periodoLetivo: ISelectOption[] = [
    { value: 'manha', label: 'Manhã', backName: 'Morning' },
    { value: 'tarde', label: 'Tarde', backName: 'Afternoon' },
    { value: 'noite', label: 'Noite', backName: 'Night' },
  ];

  ensino: ISelectOption[] = [
    { value: 'maternal', label: 'Maternal', backName: 'Nursery' },
    { value: 'preEscola', label: 'Pré-escola', backName: 'Preschool' },
    { value: 'ensinoFundamental', label: 'Ensino Fundamental 1', backName: 'Elementary school 1' },
  ];

  turmaOptions: ClassesResponse[] = []; // Variável turmaOptions tem o tipo Turma
  isLoading: boolean = false;
  userRole: string | null = null;
  searchTerm$ = new Subject<string>(); // Subject para controlar a busca

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.isLoading = true; // Define isLoading como true antes da requisição

    this.userRole = this.authService.getRole();

    // Filtra os ícones com base no papel do usuário
    if (this.userRole !== "admin") {
        this.icons = this.icons.filter(icon =>
            icon.name === "Início" || icon.name === "Turmas"
        );
    }

    // Chama o serviço para obter as turmas
    if(this.userRole === "admin") {
      this.searchTerm$
      .pipe(
        debounceTime(300), // Aguarda 300ms após o último evento
        distinctUntilChanged(), // Evita requisições repetidas
        switchMap(term =>
          this.classService.getClasses(term).pipe(
            catchError(err => {
              console.error('Erro ao buscar turmas:', err);
              this.turmaOptions = []; // Limpa resultados anteriores
              this.isLoading = false; // Atualiza o estado de carregamento
              return of([]); // Continua emitindo um array vazio para que a busca prossiga
            })
          )
        )
      )
      .subscribe({
        next: (data: ClassesResponse[]) => {
          this.turmaOptions = data.map((turma) => ({
            ...turma,
            schoolYear: this.translateAnoLetivo(turma.schoolYear),
            schoolShift: this.translatePeriodoLetivo(turma.schoolShift),
            educationType: this.translateEnsino(turma.educationType)
          }));
          this.isLoading = false;
        },
        error: () => {
          this.turmaOptions = [];
          this.isLoading = false;
        }
      });

      // Disparar busca inicial
      this.searchTerm$.next('');
    } else if(this.userRole === "teacher") {
      this.classService.getClassesTeacher().subscribe(
        (data: ClassesResponse[]) => {
          this.turmaOptions = data.map((turma: ClassesResponse) => {
            return {
              ...turma,
              schoolYear: this.translateAnoLetivo(turma.schoolYear), // Traduz anoLetivo
              schoolShift: this.translatePeriodoLetivo(turma.schoolShift), // Traduz periodoLetivo
              educationType: this.translateEnsino(turma.educationType) // Traduz ensino
            };
          });

          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao buscar turmas:', error);
          this.isLoading = false;
        }
      );
    }
  }

  onSearch(term: string): void {
    // TODO: Carregamento de pesquisa...
    this.searchTerm$.next(term);
  }

  onNavigateToUpdateClass(id: number): void {
    this.router.navigate([`/main/update-class/${id}`]);
  }

  onNavigateToStudentClassList(turma: { idTurma: number; apelidoTurma?: string }): void {
    // Armazena o apelido da turma no serviço compartilhado
    this.sharedDataService.setData({ apelidoTurma: turma.apelidoTurma });

    // Navega para a página de estudantes
    this.router.navigate([`/main/student-class-list/${turma.idTurma}`]);
  }

  // Método para traduzir o ano letivo (backName -> label)
  translateAnoLetivo(backName: string): string {
    const option = this.anoLetivo.find(option => option.backName === backName);
    return option ? option.label : backName; // Retorna o label ou o backName se não encontrar
  }

  // Método para traduzir o período letivo (backName -> label)
  translatePeriodoLetivo(backName: string): string {
    const option = this.periodoLetivo.find(option => option.backName === backName);
    return option ? option.label : backName; // Retorna o label ou o backName se não encontrar
  }

  // Método para traduzir o tipo de ensino (backName -> label)
  translateEnsino(backName: string): string {
    const option = this.ensino.find(option => option.backName === backName);
    return option ? option.label : backName; // Retorna o label ou o backName se não encontrar
  }
}
