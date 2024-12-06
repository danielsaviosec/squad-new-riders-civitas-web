import { Component, OnInit, HostListener } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AdiService } from 'src/app/service/adi/adi.service';
import { AuthService } from 'src/app/service/auth/auth.service';

import { IAdiResponse, Reviews } from 'src/app/interface/response/IAdiResponse.interface';

@Component({
  selector: 'app-adi-details',
  templateUrl: './adi-details.component.html',
  styleUrls: ['./adi-details.component.scss'],
})
export class AdiDetailsComponent implements OnInit {
  userRole: string | null = null;
  chartOptions: any;
  idAdi!: number;
  idStudent!: number;
  nomeDoEstudante!: string;
  data!: string;
  formattedLabel!: string;
  apelidoTurma!: string;
  teacherComments!: string;
  reviews: Reviews = { teamwork: 0, empathy: 0, selfAwareness: 0, communication: 0, autonomy: 0 };
  isLoading: boolean = false;

  breadcrumbItems = [
    { label: 'Turmas', link: '/main' },
    { label: '', link: '' }, // Nome da turma será dinâmico
    { label: '', link: '' }, // Nome do estudante será dinâmico
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adiService: AdiService,
    private authService: AuthService
  ) {}

  icons: ISidebarIcons[] = [
    { name: 'Início', image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: 'Turmas', image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];

  ngOnInit(): void {
    this.userRole = this.authService.getRole();

    // Filtra os ícones com base no papel do usuário
    if (this.userRole === "guardian") { this.icons = [] }

    this.idAdi = +this.route.snapshot.paramMap.get('id')!;
    this.setChartOptions();
    this.loadAdiData(this.idAdi);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setChartOptions();
  }

  loadAdiData(id: number): void {
    this.isLoading = true;

    this.adiService.getAdi(id).subscribe({
      next: (data: IAdiResponse) => {
        this.nomeDoEstudante = data.student.fullName;
        this.apelidoTurma = data.student.studentClass;
        this.reviews = data.reviews;
        this.formattedLabel = this.formatAdiLabel(data.label)
        this.teacherComments = data.teacherComments;
        this.idStudent = data.student.id;
        this.setChartOptions();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
        this.isLoading = false; // Finaliza o carregamento em caso de erro
      },
    });
  }

  formatAdiLabel(label: string): string {
    const regex = /PDI(\d{2})_(\d{2})_(\d{4})_(\d{2}h\d{2})/;
    const match = label.match(regex);

    if (match) {
      const [, day, month, year, time] = match;
      return `${day}/${month}/${year} às ${time.replace('h', ':')}`;
    }

    return label;
  }

  setChartOptions(): void {
    const fontSize = window.innerWidth < 820 ? 8 : 12;

    this.chartOptions = {
      title: {
        text: 'Mínimo e real',
        top: '5%',
        left: '5%',
      },
      tooltip: {},
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
        splitLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      series: [
        {
          name: 'Mínimo e real',
          type: 'radar',
          data: [
            {
              value: [
                this.reviews.teamwork,
                this.reviews.empathy,
                this.reviews.selfAwareness,
                this.reviews.communication,
                this.reviews.autonomy,
              ],
              name: 'Real',
              lineStyle: {
                color: '#9368e9',
              },
              itemStyle: {
                color: '#9368e9'
              },
              areaStyle: {
                color: 'rgba(147, 104, 233, 0.2)',
              },
              symbol: 'circle',
              symbolSize: 6,
            },
            {
              value: [3, 3, 3, 3, 3],
              name: 'Mínimo',
              lineStyle: {
                color: 'rgb(240,194,50)',
                type: 'dashed',
              },
              itemStyle: {
                color: 'rgb(240,194,50)'
              },
              areaStyle: {
                opacity: 0,
              },
              symbol: 'circle',
              symbolSize: 6,
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

  onVisualizarClick(): void {
    // Redirecionando para a página do estudante
    this.router.navigate([`/main/form-registration/${this.idStudent}`]);
  }
}
