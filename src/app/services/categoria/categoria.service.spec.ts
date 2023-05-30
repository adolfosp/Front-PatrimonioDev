import { TestBed } from "@angular/core/testing";
import { CategoriaService } from "./categoria.service";
import { DadosRequisicao } from "@nvs-models/requisicoes/DadosRequisicao";
import { of } from "rxjs";
import { ApiService } from "@nvs-services/api/api.service";
import { environment } from "src/environments/environment";
import { Categoria } from "@nvs-models/Categoria";




describe("CategoriaService", () => {
  let serviceMock: CategoriaService;
  let apiServiceMock: ApiService;
  const apiServiceSpy = jasmine.createSpyObj("ApiService", ["post"]);

  beforeEach(() => {
    const providers = [CategoriaService, { provide: ApiService, useValue: apiServiceSpy }];

    TestBed.configureTestingModule({
        providers: [
            ...providers
        ]
    });
    serviceMock = TestBed.inject(CategoriaService);
    apiServiceMock = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

  });

  it("should be created", () => {
    expect(serviceMock).toBeTruthy();
  });

  it("test_cadastro_sucesso", () => {
    //Arrange
    const dados: DadosRequisicao = { data: "", httpStatus: 200, sucesso: true, mensagem: "" };
    apiServiceSpy.post.and.callFake(() => {
        of(dados);
    });
    const categoriaService = new CategoriaService(apiServiceMock);
    const categoria: Categoria = {
        descricao: "Descricao",
        codigoCategoria: 0
    };

    //PIPE UNDEFINED, VERIFICAR SE FOI CHAMADO PARA EVITAR LEAK
    //Act
    const result$ = categoriaService.cadastrar(categoria);

    //Assert
    result$.subscribe((result) => {
      expect(apiServiceMock.post).toHaveBeenCalledWith(`${environment.apiUrl}categorias`, { categoria });
      expect(result.sucesso).toBe(true);
    });
  });
});
