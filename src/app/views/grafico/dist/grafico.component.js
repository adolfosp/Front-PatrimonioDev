"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GraficoComponent = void 0;
var core_1 = require("@angular/core");
var MensagemRequisicaoHelper_1 = require("@nvs-helpers/MensagemRequisicaoHelper");
var LinearGradient_1 = require("zrender/lib/graphic/LinearGradient");
var GraficoComponent = /** @class */ (function () {
    function GraficoComponent(estatisticaService, toaster, spinner) {
        this.estatisticaService = estatisticaService;
        this.toaster = toaster;
        this.spinner = spinner;
        this.panelOpenState = false;
    }
    GraficoComponent.prototype.ngOnInit = function () {
        this.obterEstatisticas();
        var dataAxis = [
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
        var data = [
            220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133,
            334, 198, 123, 125, 220,
        ];
        var yMax = 500;
        var dataShadow = [];
        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        this.options = {
            title: {
                text: 'Check Console for Events'
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    color: '#fff'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#999'
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                },
            ],
            series: [
                {
                    // For shadow
                    type: 'bar',
                    itemStyle: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        color: new LinearGradient_1["default"](0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' },
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new LinearGradient_1["default"](0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' },
                            ])
                        }
                    },
                    data: data
                },
            ]
        };
    };
    GraficoComponent.prototype.obterEstatisticas = function () {
        var _this = this;
        this.spinner.show('graficoLinha');
        //REFATORAR: Refatorar junto com a parte do back
        this.estatisticaService
            .obterEstatisticas()
            .subscribe({
            next: function (listaDeResposta) {
                _this.estatisticaCategoria = listaDeResposta[0];
                var quantidadeEquipamentoPorCategoria = _this.estatisticaCategoria.map(function (valorAtual) { return valorAtual.quantidadeEquipamento; });
                _this.calcularQuantidadeDeEquipamentos(quantidadeEquipamentoPorCategoria);
                _this.quantidadeDeEquipamentos = _this.quantidadeDeEquipamentos || 0;
                _this.mediaEquipamento = _this.mediaEquipamento || 0;
                for (var i = 0; i < quantidadeEquipamentoPorCategoria.length; i++) {
                    _this.quantidadeDeEquipamentos += +quantidadeEquipamentoPorCategoria[i];
                }
                _this.mediaEquipamento = +(listaDeResposta[1][0].quantidadeTotalDeEquipamento /
                    listaDeResposta[1][0].quantidadeTotalFuncionario).toFixed(2);
                _this.quantidadeTotalDePatrimonios =
                    +listaDeResposta[2][0].quantidadeTotalPatrimonio;
                _this.quantidadeTotalDePatrimoniosDisponiveis =
                    +listaDeResposta[2][0].quantidadePatrimonioDisponivel;
                _this.quantidadeMovimentacoes =
                    +listaDeResposta[3].quantidadeMovimentacao;
            },
            error: function (error) {
                var template = MensagemRequisicaoHelper_1.MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
                _this.toaster[template.tipoMensagem]("Houve um erro ao carregar as informa\u00E7\u00F5es do Dashboard. Mensagem: " + template.mensagemErro, template.titulo);
            }
        })
            .add(function () { return _this.spinner.hide('graficoLinha'); });
    };
    GraficoComponent.prototype.calcularQuantidadeDeEquipamentos = function (quantidadeEquipamento) {
        for (var i = 0; i < quantidadeEquipamento.length; i++) {
            this.quantidadeDeEquipamentos += +quantidadeEquipamento[i];
        }
    };
    GraficoComponent = __decorate([
        core_1.Component({
            selector: 'app-grafico',
            templateUrl: './grafico.component.html',
            styleUrls: ['./grafico.component.sass']
        })
    ], GraficoComponent);
    return GraficoComponent;
}());
exports.GraficoComponent = GraficoComponent;
