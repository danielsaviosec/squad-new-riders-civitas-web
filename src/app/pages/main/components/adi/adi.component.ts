import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { StudentService } from 'src/app/service/students/student.service';
import { AdiService } from 'src/app/service/adi/adi.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { finalize, forkJoin, of, catchError } from 'rxjs';

import { IAdisReponse } from 'src/app/interface/response/IAdisResponse.interface';
import { IAdiResponse } from 'src/app/interface/response/IAdiResponse.interface';
@Component({
  selector: 'app-adi',
  templateUrl: './adi.component.html',
  styleUrls: ['./adi.component.scss'],
})
export class AdiComponent implements OnInit, AfterViewChecked {
  userRole: string | null = null;
  chartOptions: any;
  idEstudante!: number;
  idCurrentAdi!: number;
  idTurma!: number;
  nomeDoEstudante!: string;
  apelidoTurma!: string;
  adiDate!: string;
  adisData!: IAdisReponse;
  isLoading: boolean = false;
  isLoadingChart: boolean = false;

  breadcrumbItems = [
    { label: 'Turmas', link: '/main/class-list' },
    { label: '', link: '' },
    { label: '', link: '' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private classesService: ClassService,
    private studentsService: StudentService,
    private adiService: AdiService
  ) {}

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
    { name: "Professores", image: 'assets/icons-sidebar/professores.svg', route: 'main/teacher-list' },
    { name: "Estudantes", image: 'assets/icons-sidebar/estudantes.svg', route: 'main/student-list' }
  ];

  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    // Filtra os ícones com base no papel do usuário
    if (this.userRole === "guardian") { this.icons = [] }
    if (this.userRole === "teacher") {
        this.icons = this.icons.filter(icon =>
            icon.name === "Início" || icon.name === "Turmas"
        );
    }

    this.route.params.subscribe(params => {
      this.idTurma = +params['classId'];
      this.idEstudante = +params['studentId'];
      this.updateBreadcrumb();

      if (this.idTurma && this.idEstudante) {
        this.isLoading = true;

        forkJoin({
          adiData: this.adiService.getAdis(this.idEstudante).pipe(
            catchError((err) => {
              console.error('Erro ao carregar os dados da ADI:', err);
              return of(null);
            })
          )
        }).pipe(
          finalize(() => {
            this.isLoading = false; // Desativa o loading após todas as requisições
          })
        ).subscribe({
          next: ({ adiData }) => {
            if (adiData) {
              this.nomeDoEstudante = adiData.studentInfo.fullName;
              this.apelidoTurma = adiData.studentInfo.className;
              this.idCurrentAdi = adiData.latestEvaluation.id;
              this.adiDate = adiData.latestEvaluation.date;
              this.adisData = {
                ...adiData,
                evaluations: adiData.evaluations.map((adi: any) => ({
                  ...adi,
                  formattedLabel: this.formatAdiLabel(adi.label)
                }))
              };

              this.updateBreadcrumb();
              this.setChartOptions();
            }
          }
        });
      }

    });
  }

  formatAdiLabel(label: string): string {
    const regex = /PDI(\d{2})_(\d{2})_(\d{4})_(\d{2}h\d{2})/;
    const match = label.match(regex);

    if (match) {
      const [, day, month, year, time] = match;
      return `PDI ${day}/${month}/${year} às ${time.replace('h', ':')}`;
    }

    return label;
  }

  ngAfterViewChecked(): void {
    const section = document.querySelector('section.main');
    if (this.userRole === 'guardian' && section) {
      section.classList.add('guardian-layout');
    }
  }

  // Método para requisição de novos dados do gráfico
  onAdiClick(adiId: number): void {
   this.isLoadingChart = true;

    this.adiService.getAdi(adiId)
    .pipe(
      finalize(() => {
        this.isLoadingChart = false;
    }))
    .subscribe({
      next: (response: IAdiResponse) => {
        const reviews = response.reviews;
        this.adiDate = response.date;
        this.idCurrentAdi = response.id;
        this.updateChart(reviews);
      },
      error: (err) => {
        console.error('Erro ao carregar os dados do ADI:', err);
      }
    });
  }

  // Método para atualizar o gráfico
  updateChart(reviews: { selfAwareness: number, empathy: number, communication: number, teamwork: number, autonomy: number }): void {
    this.chartOptions.series[0].data[0].value = [
      reviews.teamwork,
      reviews.empathy,
      reviews.selfAwareness,
      reviews.communication,
      reviews.autonomy
    ];
    this.chartOptions = { ...this.chartOptions }; // Trigger change detection
  }

  // Configuração das opções do gráfico com base nos dados de avaliações mais recentes
  setChartOptions(): void {
    const fontSize = window.innerWidth < 820 ? 8 : 12;

    this.chartOptions = {
      title: {
        text: 'Mínimo e real',
        top: '5%',
        left: '5%',
      },
      legend: {
        data: ['Mínimo', 'Real'],
        bottom: '5%',
        textStyle: {
          fontSize: fontSize,
        },
      },
      radar: {
        radius: '50%',
        indicator: [
          { name: 'Trabalho em equipe', max: 5 },
          { name: 'Empatia', max: 5 },
          { name: 'Autoconhecimento', max: 5 },
          { name: 'Comunicação', max: 5 },
          { name: 'Autonomia', max: 5 },
        ],
        axisName: {
          color: '#000',
          fontSize: fontSize,
        },
        axisLabel: {
          show: true,
          fontSize: fontSize,
          color: '#000',
        },
      },
      series: [
        {
          name: 'Mínimo e real',
          type: 'radar',
          data: [
            {
              value: [
                this.adisData.latestEvaluation.reviews.teamwork,
                this.adisData.latestEvaluation.reviews.empathy,
                this.adisData.latestEvaluation.reviews.selfAwareness,
                this.adisData.latestEvaluation.reviews.communication,
                this.adisData.latestEvaluation.reviews.autonomy,
              ],
              name: 'Real',
              lineStyle: { color: '#9368e9' },
              itemStyle: { color: '#9368e9' },
              areaStyle: { color: 'rgba(147, 104, 233, 0.2)' },
            },
            {
              value: [3, 3, 3, 3, 3], // Valores ideais
              name: 'Mínimo',
              lineStyle: { color: 'rgb(240,194,50)', type: 'dashed' },
              itemStyle: { color: 'rgb(240,194,50)' }
            },
          ],
        },
      ],
    };

    this.chartOptions.radar.indicator.forEach((indicator: any, index: number) => {
      if (index !== 4) {
        indicator.axisLabel = {
          show: false,
        };
      }
    });

  }

  onRegisterNewAdi(): void {
    // Redirecionando para o cadastro de nova ADI
    this.router.navigate([`/main/form-registration/${this.idEstudante}`]);
  }

  onAdiDetailsClick(adiId: number) {
    this.router.navigate([`/main/adi-details/${adiId}`]);
  }

  onVisualizarClick(): void {
    // Redirecionando para a página do estudante
    this.router.navigate([`/main/adi-details/${this.idCurrentAdi}`]);
  }

  // Atualizar o breadcrumb com os dados obtidos
  updateBreadcrumb(): void {
    this.breadcrumbItems[1].label = this.apelidoTurma || 'Turma Desconhecida';
    this.breadcrumbItems[2].label = this.nomeDoEstudante || 'Estudante Desconhecido';
    this.breadcrumbItems[1].link = this.userRole === "admin" ? '' : `/main/student-class-list/${this.idTurma}`;
  }
}
