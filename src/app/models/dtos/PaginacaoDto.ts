export default class PaginacaoDto{

  constructor(paginaAtual: number, quantidadePorPagina: number) {
    this.paginaAtual = paginaAtual;
    this.quantidadePorPagina = quantidadePorPagina;
  }

  public paginaAtual: number;
  public quantidadePorPagina: number;
}
