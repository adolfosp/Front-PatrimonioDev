import { Component, OnInit } from '@angular/core';
import Componente from '@nvs-models/Componente';
import { EstatisticaService } from '@nvs-services/estatistica/estatistica.service';
import { NgxSpinnerService } from 'ngx-spinner';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';

type EquipamentoInformacao = {
  nomeCategoria: string;
  quantidadeEquipamento: number;
};

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.sass'],
})
export class GraficoComponent extends Componente implements OnInit {
  panelOpenState = false;
  options: any;

  private _estatisticaCategoria: EquipamentoInformacao[];

  public quantidadeDeEquipamentos: number;
  public quantidadeTotalDePatrimonios: number;
  public quantidadeTotalDePatrimoniosDisponiveis: number;
  public quantidadeMovimentacoes: number;
  public mediaEquipamento: number;

  constructor(
    private estatisticaService: EstatisticaService,
    private spinner: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.obterEstatisticas();

    const dataAxis = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
    ];
    const data = [
      220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133,
      334, 198, 123, 125, 220,
    ];
    const yMax = 500;
    const dataShadow = [];

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.options = {
      title: {
        text: 'Check Console for Events',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#999',
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)',
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data,
        },
      ],
    };
  }

  private obterEstatisticas(): void {
    this.spinner.show('graficoLinha');

    //REFATORAR: Refatorar junto com a parte do back
    this.estatisticaService
      .obterEstatisticas()
      .subscribe({
        next: (listaDeResposta) => {
          this._estatisticaCategoria = listaDeResposta[0].data;

          const quantidadeEquipamentoPorCategoria = this._estatisticaCategoria.map(
            (valorAtual) => {return valorAtual.quantidadeEquipamento; });

          this.calcularQuantidadeDeEquipamentos(quantidadeEquipamentoPorCategoria);

          this.quantidadeDeEquipamentos = this.quantidadeDeEquipamentos || 0;

          for (let i = 0; i < quantidadeEquipamentoPorCategoria.length; i++) {
            this.quantidadeDeEquipamentos += +quantidadeEquipamentoPorCategoria[i];
          }

          this.mediaEquipamento = +(
            listaDeResposta[1].data[0].quantidadeTotalDeEquipamento /
            listaDeResposta[1].data[0].quantidadeTotalFuncionario
          ).toFixed(2);

          this.mediaEquipamento = this.mediaEquipamento || 0;

          this.quantidadeTotalDePatrimonios =
            +listaDeResposta[2].data[0].quantidadeTotalPatrimonio;
          this.quantidadeTotalDePatrimoniosDisponiveis =
            +listaDeResposta[2].data[0].quantidadePatrimonioDisponivel;
          this.quantidadeMovimentacoes =
            +listaDeResposta[3].data.quantidadeMovimentacao;
        },
        // eslint-disable-next-line rxjs/no-implicit-any-catch
        error: (error: any) => {
          this.mostrarAvisoErro(error, "Houve um erro ao carregar as informações do Dashboard.");
        },
      })
      .add(() => this.spinner.hide('graficoLinha'));
  }

  private calcularQuantidadeDeEquipamentos(quantidadeEquipamento: number[]) {
    for (let i = 0; i < quantidadeEquipamento.length; i++) {
      this.quantidadeDeEquipamentos += +quantidadeEquipamento[i];
    }
  }
}
