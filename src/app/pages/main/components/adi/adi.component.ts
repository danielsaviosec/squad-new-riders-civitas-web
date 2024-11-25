import { Component, OnInit } from '@angular/core';
import { ISidebarIcons } from 'src/app/interface';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/service/utils/shared-data.service';

@Component({
  selector: 'app-adi',
  templateUrl: './adi.component.html',
  styleUrls: ['./adi.component.scss'],
})
export class AdiComponent implements OnInit {
  chartOptions: any;
  idEstudante!: number;
  nomeDoEstudante!: string;
  apelidoTurma!: string;

  breadcrumbItems = [
    { label: 'Suas Turmas', link: '/main' },
    { label: '', link: '' },  // Nome da turma será dinâmico
    { label: '', link: '' }   // Nome do estudante será dinâmico
  ];

  constructor(private route: ActivatedRoute, private sharedDataService: SharedDataService) {}

  icons: ISidebarIcons[] = [
    { name: "Início", image: 'assets/icons-sidebar/inicio.svg', route: 'main' },
    { name: "Turmas", image: 'assets/icons-sidebar/turmas.svg', route: 'main/class-list' },
  ];

  ngOnInit(): void {
    this.idEstudante = +this.route.snapshot.paramMap.get('id')!;  // Obtém o id do estudante
    this.updateBreadcrumb();


    this.chartOptions = {
      title: {
        text: 'Mínimo e real',
        left: 'center',
      },
      tooltip: {},
      legend: {
        data: ['Ideal', 'Real'],
        bottom: 0,
        textStyle: {
          fontSize: 12,
        },
      },
      radar: {
        indicator: [
          { name: 'Colaboração e trabalho em equipe', max: 5 },
          { name: 'Empatia', max: 5 },
          { name: 'Competência', max: 5 },
        ],
        shape: 'circle',
        splitNumber: 5,
        name: {
          textStyle: {
            color: '#000', // Cor dos textos (opcional)
            fontSize: 12,  // Tamanho da fonte (opcional)
          },
        },
        axisLabel: {
          show: true, // Ativa os rótulos nas linhas do gráfico
          formatter: (value: any) => `${value}`, // Exibe os valores diretamente
          textStyle: {
            fontSize: 12, // Tamanho do texto
            color: '#000', // Cor do texto
          },
        },
        splitLine: {
          lineStyle: {
            color: '#ccc', // Cor das linhas de divisão
          },
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(255, 255, 255, 0.1)', // Cor das áreas entre as linhas
          },
        },
      },
      series: [
        {
          name: 'Mínimo e real',
          type: 'radar',
          data: [
            {
              value: [3, 2, 4], // Dados reais
              name: 'Real',
              lineStyle: {
                color: '#9368e9',
              },
              areaStyle: {
                color: 'rgba(147, 104, 233, 0.2)', // Preenchimento
              },
              symbol: 'circle',
              symbolSize: 6,
            },
            {
              value: [4, 4, 5], // Dados ideais
              name: 'Ideal',
              lineStyle: {
                color: '#f3b63a',
                type: 'dashed',
              },
              areaStyle: {
                opacity: 0, // Sem preenchimento
              },
              symbol: 'circle',
              symbolSize: 6,
            },
          ],
        },
      ],
    };

    // Altere o valor 'show' do axisLabel para `false` nos raios que você não quer mostrar
    // Exemplo para desabilitar para o primeiro e terceiro raio, mas manter o segundo visível:
    this.chartOptions.radar.indicator.forEach((indicator: any, index: number) => {
      if (index !== 1) { // Deixe o segundo raio visível
        indicator.axisLabel = {
          show: false, // Desativa a exibição dos números
        };
      }
    });

  }

  updateBreadcrumb() {
    // Obtendo os dados armazenados no SharedDataService
    const data = this.sharedDataService.getData();

    if (data) {
      this.apelidoTurma = data.apelidoTurma;
      this.nomeDoEstudante = data.nomeDoEstudante;

      // Atualizando o breadcrumb com as informações
      this.breadcrumbItems[1].label = this.apelidoTurma || 'Turma Desconhecida';
      this.breadcrumbItems[2].label = this.nomeDoEstudante || 'Estudante Desconhecido';
    }
  }
}
