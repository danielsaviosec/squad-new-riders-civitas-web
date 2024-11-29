import { Component, OnInit } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/service/classes/classes.service';
import { StudentService } from 'src/app/service/students/student.service';
import { AdiService } from 'src/app/service/adi/adi.service';
import { forkJoin } from 'rxjs';

import { IAdisReponse } from 'src/app/interface/response/IAdisResponse.interface';
import { IAdiResponse } from 'src/app/interface/response/IAdiResponse.interface';
@Component({
  selector: 'app-adi',
  templateUrl: './adi.component.html',
  styleUrls: ['./adi.component.scss'],
})
export class AdiComponent implements OnInit {
  chartOptions: any;
  idEstudante!: number;
  idTurma!: number;
  nomeDoEstudante!: string;
  apelidoTurma!: string;
  adiDate!: string;
  adisData!: IAdisReponse;
  isLoading: boolean = false;

  breadcrumbItems = [
    { label: 'Suas Turmas', link: '/main/class-list' },
    { label: '', link: '' },
    { label: '', link: '' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classesService: ClassService,
    private studentsService: StudentService,
    private adiService: AdiService
  ) {}

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTurma = +params['classId'];
      this.idEstudante = +params['studentId'];
      this.updateBreadcrumb();

      if (this.idTurma && this.idEstudante) {
        this.loadClassName();
        this.loadStudentName();
        this.loadAdisData(this.idEstudante);
      }

      /* Ativar com backend

      if (this.idTurma && this.idEstudante) {
        this.isLoading = true;

        forkJoin({
          className: this.classesService.getClass(this.idTurma),
          studentName: this.studentsService.getStudent(this.idEstudante),
          adiData: this.adiService.getAdis(this.idEstudante),
        }).subscribe({
          next: ({ className, studentName, adiData }) => {
            // Atualiza o nome da turma
            this.apelidoTurma = className.name;
            this.updateBreadcrumb();

            // Atualiza o nome do estudante
            this.nomeDoEstudante = studentName.fullName;
            this.updateBreadcrumb();

            // Atualiza os dados da ADI
            this.adisData = adiData;
            this.adiDate = adiData.latestEvaluation.date;
            this.setChartOptions();

            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar os dados:', err);
            this.isLoading = false;
          },
        });
      }

      */

    });
  }


  // Método para carregar o nome da turma (Temporário até API)
  loadClassName(): void {
    // Simulando resposta do backend com dados fictícios
    const mockResponse = { id: this.idTurma, name: `Turma ${this.idTurma}` };
    this.apelidoTurma = mockResponse.name;
    this.updateBreadcrumb();
  }

  // Método para carregar o nome do estudante (Temporário até API)
  loadStudentName(): void {
    // Simulando resposta do backend com dados fictícios
    const mockResponse = { id: this.idEstudante, fullName: `Estudante ${this.idEstudante}` };
    this.nomeDoEstudante = mockResponse.fullName;
    this.updateBreadcrumb();
  }

  // Método para carregar os dados da ADI (Temporário até API)
  loadAdisData(id: number): void {
    const mockResponse = {
        studentInfo: {
            fullName: "Carlos Eduardo",
            className: "2 ano"
        },
        evaluations: [
            {
                id: 6,
                date: "28/11/24",
                label: "PDI28_11_2024_10h45"
            },
            {
                id: 4,
                date: "24/11/24",
                label: "PDI24_11_2024_15h30"
            },
            {
                id: 2,
                date: "20/11/24",
                label: "PDI20_11_2024_09h15"
            },
            {
                id: 1,
                date: "15/11/24",
                label: "PDI15_11_2024_14h00"
            }
        ],
        latestEvaluation: {
            id: 6,
            date: "28/11/24",
            label: "PDI28_11_2024_10h45",
            reviews: {
                selfAwareness: 4,
                empathy: 3,
                communication: 5,
                teamwork: 5,
                autonomy: 3
            }
        }
    }

    this.adisData = mockResponse;
    this.adiDate = mockResponse.latestEvaluation.date;
    this.setChartOptions();
  }

  // Método para requisição de novos dados do gráfico
  onAdiClick(adiId: number): void {
    /* Ativar trecho de código quanto comunicar com API

    this.adiService.getAdi(adiId).subscribe({
      next: (response: IAdiResponse) => {
        const reviews = response.reviews;
        this.adiDate = response.date;
        this.updateChart(reviews);
      },
      error: (err) => {
        console.error('Erro ao carregar os dados do ADI:', err);
      }
    });

    ------------------------------------------------  */

    // Array de dados fictícios
    const fakeDataArray: IAdiResponse[] = [
      {
        id: 2,
        date: '23/11/24',
        student: {
          id: 2,
          fullName: 'Milla',
          studentClass: '1 ano C',
        },
        reviews: {
          selfAwareness: 4,
          empathy: 5,
          communication: 3,
          teamwork: 4,
          autonomy: 2,
        },
        teacherComments: 'O estudante apresentou bom progresso, mas precisa melhorar na comunicação e autonomia.',
      },
      {
        id: 4,
        date: '24/11/24',
        student: {
          id: 3,
          fullName: 'Lucas',
          studentClass: '2 ano B',
        },
        reviews: {
          selfAwareness: 5,
          empathy: 4,
          communication: 5,
          teamwork: 5,
          autonomy: 4,
        },
        teacherComments: 'Excelente desempenho em todas as áreas.',
      },
      {
        id: 6,
        date: '25/11/24',
        student: {
          id: 4,
          fullName: 'Sofia',
          studentClass: '3 ano A',
        },
        reviews: {
          selfAwareness: 3,
          empathy: 3,
          communication: 4,
          teamwork: 3,
          autonomy: 3,
        },
        teacherComments: 'Progresso regular, precisa de mais incentivo em autonomia.',
      },
    ];

    const selectedAdi = fakeDataArray.find((adi) => adi.id === adiId);
    const reviews = selectedAdi?.reviews;
    if(reviews) {
      this.adiDate = selectedAdi?.date;
      this.updateChart(reviews);
    }
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
        data: ['Ideal', 'Real'],
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
              name: 'Ideal',
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

  onRegisterNewAdi() {
    // Redirecionando para o cadastro de nova ADI
    this.router.navigate([`/main/form-registration/${this.idEstudante}`]);
  }

  onVisualizarClick() {
    // Redirecionando para a página do estudante
    this.router.navigate([`/main/adi-details/${this.adisData.latestEvaluation.id}`]);
  }

  // Atualizar o breadcrumb com os dados obtidos
  updateBreadcrumb(): void {
    this.breadcrumbItems[1].label = this.apelidoTurma || 'Turma Desconhecida';
    this.breadcrumbItems[2].label = this.nomeDoEstudante || 'Estudante Desconhecido';
    this.breadcrumbItems[1].link = `/main/student-class-list/${this.idTurma}`;
  }
}
