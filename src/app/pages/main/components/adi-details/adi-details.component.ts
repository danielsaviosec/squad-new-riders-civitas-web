import { Component, OnInit, HostListener } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/utils/shared-data.service';

@Component({
  selector: 'app-adi-details',
  templateUrl: './adi-details.component.html',
  styleUrls: ['./adi-details.component.scss'],
})
export class AdiDetailsComponent implements OnInit {
  chartOptions: any;
  idEstudante!: number;
  nomeDoEstudante!: string;
  apelidoTurma!: string;

  breadcrumbItems = [
    { label: 'Suas Turmas', link: '/main' },
    { label: '', link: '' }, // Nome da turma será dinâmico
    { label: '', link: '' }, // Nome do estudante será dinâmico
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {}

  icons: ISidebarIcons[] = [
    { name: 'Início', image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: 'Turmas', image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];

  ngOnInit(): void {
    this.idEstudante = +this.route.snapshot.paramMap.get('id')!;
    this.updateBreadcrumb();
    this.setChartOptions(); // Inicializa o gráfico com o tamanho correto
  }

  // Listener para monitorar alterações no tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setChartOptions();
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
        data: ['Ideal', 'Real'],
        bottom: '5%',
        textStyle: {
          fontSize: fontSize, // Dinamicamente alterado
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
          fontSize: fontSize, // Dinamicamente alterado
        },
        axisLabel: {
          show: true,
          fontSize: fontSize, // Dinamicamente alterado
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
              value: [3, 2, 4, 4, 5],
              name: 'Real',
              lineStyle: {
                color: '#9368e9',
              },
              areaStyle: {
                color: 'rgba(147, 104, 233, 0.2)',
              },
              symbol: 'circle',
              symbolSize: 6,
            },
            {
              value: [3, 3, 3, 3, 3],
              name: 'Ideal',
              lineStyle: {
                color: 'rgb(240,194,50)',
                type: 'dashed',
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
      if (index !== 4) { // Deixe o segundo raio visível
        indicator.axisLabel = {
          show: false, // Desativa a exibição dos números
        };
      }
    });
  }

  onVisualizarClick() {
    this.router.navigate([`/main/form-registration`]);
  }

  updateBreadcrumb() {
    const data = this.sharedDataService.getData();
    if (data) {
      this.apelidoTurma = data.apelidoTurma;
      this.nomeDoEstudante = data.nomeDoEstudante;
      this.breadcrumbItems[1].label = this.apelidoTurma || 'Turma C';
      this.breadcrumbItems[2].label = this.nomeDoEstudante || 'Estudante Desconhecido';
    }
  }
}
