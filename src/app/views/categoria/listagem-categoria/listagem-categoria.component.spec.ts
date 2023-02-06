import { Location } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ChangeDetectorRef } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { Categoria } from "@nvs-models/Categoria";
import { CategoriaService } from "@nvs-services/categoria/categoria.service";
import { TokenService } from "@nvs-services/token/token.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { Observable, of } from "rxjs";
import routes from '../../../app-routing.module';
import { CategoriaModule } from "../categoria.module";
import { ListagemCategoriaComponent } from "./listagem-categoria.component";

let mockEstadosServiceData = null;

class MockEstadosService {
  obterTodasCategorias(): Observable<any[]> {
    return mockEstadosServiceData;
  }
}

class MockTokenService {
  ehUsuarioAdministrador(): boolean {
    return true;
  }
}

const importsModules = [
  CategoriaModule,
  BrowserAnimationsModule,
  RouterTestingModule,
  ToastrModule.forRoot(),
  HttpClientModule,
  JwtModule.forRoot({}),
];

const providers = [
  { provide: CategoriaService, useClass: MockEstadosService },
  { provide: TokenService, useClass: MockTokenService },
  NgxSpinnerService,
  BsModalService,
  JwtHelperService,
  ChangeDetectorRef,
]


describe("ListagemCategoriaComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemCategoriaComponent],
      imports: [
        ...importsModules
      ],
      providers: [
        ...providers
      ],
    }).compileComponents();
    localStorage.setItem(
      "Valor",
      "U2FsdGVkX18sD8WNhq+sB2vFHT7M/7frWEi9ErXRlPghZkAF1vYXsHCYlSSsslxr5KFc6gOxumsdaTlF4V+HMGagVOqv25jz1POQRru/GMgIFqIlQmmuXifN25CsflGPdlALet+pZk9lqQyofDJx4wSpGqOIBv1eIUCK2pEKo6ZxA7ibipmj8UqGOBTZEZX9WIM8MgIzOgQtvijdKZGa+rrTcBuYL0IDi+N8W2hM6fbwEcmtbEzvr9WptKhFie6wRBGsEj7D7JUKWFrfexTZVWbF9EjBwdes9oId/5z2ofPeSAVJSAocxvCRgKX6FuOF5Rj75DwpGouBR5+xX+ScSGAHGpWTVkTOnfB6WBgS38Fou6kY1WBxYQfgMkjqqVzjunh/8/wktxBSaKeAysL4wljgsTkIOnfyK4nnKPoYb0CoDTQEj2KsRT35J2uCgvn56lja93haYGIYr97yBzx6FpYhkiqLWNxx8WRBpCjZjftaGnNNEdb6no4WI3pkF5UgN8IHwTA8O+M4K3YnBVF4hyrV4Iq7jGx+7a4KOy/Nmfy/Ffo2m+CvL3qkA5MCt6QOKmhhtRAqlf3uB214EhdyTr5mWsocAtXJuIn9kRYDlSGfyTR3WhotvYFBqICBQE6rvtWDFk74CM11NQpjBY/Uo4DNVlyMg+lYO6fjp4Xh/pHEVkpKfZsZsX0ay0LBGWf42mcOl6lxZYbl5uHakHNqE+loGlZzaw17Xs8OcCeLXYGQHWuY5G3rWMf/Q/uqzvDCcZNVrYsuw2LBgjYoMj3chrhYtIPVihpyU/OJ5w0PoybNrR+0gBoLfr737r7pWV79UURUM7eRSlBIBRClIBdPHOFVgUun3iR1topzGw4LJRmQdnnuthRZsxnOI8vDC6eXwEPJmW1HQcLe0iPqJXG54Hz5Zjzxbc2cbGUS+a9MWFFj8VMBhsCl9Ma9CZPpJsoG5Eyirn0+M98z1JXinIdlLMGquEQO0YsOGL37oaln/QwdQ9BZHq7hOmJiR3ENcdhU0jaD91hH5MRxJtbQkvIbyeUDNIPkRthKOp+pAYmLE6bp6dYg9X8d1nCev5xDwRrgf8JBNlpuitHKnRtKJdZh2sdmiRb9QBsjXTXY9uphk4U4G1h14lD/SmaUW/QUQNvcUpAnO9DD6fLuHx0yrWYSGak8H1O4g8405aaud3U6dwTsoKVn5EDbSySPqbd1KT06koyACmgF6vbK/U7Pkg5O4KgSJRIk3R0KDYVf9wJDJ59T8sA3IEqB09DXrKc9pWjPptwqN9VcKSZgv/pwfzQRgjKncspvZb0oX1Xkz2cSHvnnN8gFUUM+8Gxb6RMs3HYJJvJnHJFpEZkb8ud/nX+TGapFwsc9jjx0FTDMksJqLHMIyY9XF3AaX68PKsKCRVJ4VnG2jCKMidp10wNxlqMDcQsfO3d83eyG0Fm9YLTjmP1DQFFDx5beYpocBkSJEp1ogE6iRg75S2vdCI2t8HxomXM5+YubsBcDKf5NEXni1tCWe9RiqOvRSsCjj3aIyme2WT2wSDi0zwxwvlumWCdF8aHg8QSzvYqSUt2YS4P6Ad33WJJi2KfBHZSgtxevfA5ZnoBXtLQ+MnZkQM0XbiahTYdIvLPg31aHOYM87l+H6EY1DruUW/M+sJaA+Thwkyh3V36k/Hheu1AOmQ+Bq8fIlpFTSuSL7tJTFrpq4DmpalXbofjz7zeMouTXZBfzxF0k3KDdLvE3JZNpiQk9Hgwh/JbBnJiPVpSVO+vUkVf7GenczvsvRxBepntgfJ+J66MeBCquQ1E1aHu3hoVM1KAYJsXKMouIk9lSSDLqKR9FnFVglrjxN1aH9dyS1RIHMnYeIcDr8siJwxWSw5z7ErPRYFHC6CZtEHE8zz5iQhUOehlL84eTV+q6tMS3VmV9KwkhAD5U19nTplt4FdUB8Oa8xGHfN7zA/5lrNxH6MkM/Y57cAKyge/ZsATfT9/N0wOPWlQsVI+s5D2lQq/YP1l0Eg5sA2EdPljKz7xJaV0qdOy5zDVns3UoJNnNax+hnWISay6wuSOxnso8Jpm7gL8cxRg3aA1ZoQttRqE0SHPwwEr4tgZ2HQkaU8WefrwLZ47IYaKPjBCnpmiRg0jLcQxQmMpxWXELWo9LJN7boDwUaAkYuq7zkiPLyoAB36f/v7WKrQtFaj83EyzSJkYfTFhrVZdVzMG2NtYuXneqV7/xdMbvIEC8P2ttYUqIN2yTCWBLWvt403K3CrIjg8ekLDJfN5hXsoYDuJ/1+s3uilq2xWFCQ7VFU7FIHkXguHOnWEldX3uxk+QU/OY+GAtA/JVjZ9Zqcirxq14PfVvnXjCBCZ82M2oibLpMvOREfargAr3VARmsSgfT1K+aUkuAuoIFG9Hz1ak+rc2f0vuqrKkV4G3+CuLgBT16W8FQRcsTP+zFLpevP/bnECiDp9DNzISSzK+CHm2IjgVee3qQdNr2Lnjb2qZn8iuEckzw1JlsIY/fDlmFUJANP7docKFNzolfJE14B4x/uKRpEDx1D7KBz5k1Mu1U+bkRPUCdNNyKQMG/qS1ihvfWEFRAW0xByXNJwX2Fxi6eQaj6+o2wAsDpS38nYWNOwfwh5m82UKgwrxr7mBAX4kopqfwsEF9GohpKOK5OKBDmaYds1mh6qScm3LH2NSttsPmGQjaRlRoPT3AglpGN0k9PoZMhTPoIQo3GCx95itutoAeCumTqebLna4o0F1FqRHUXvgBpjl6+DOTraT3U3i0ty03YYCBy5tx0h6T1Pbxwk3txPNahrduS9YsI+mbBzae5ReFU36cdOEK/TARbm+jPc2WuXPj7QZCznbPPXbeJD9hMeAOGbv0RSTlS25H7xGPPwm+hVkqnW454K29jGdoyImBW8KkcgbPUWaNBanYkauXiCk2NokIWUy39hzNGkdzBT8nBRVpfbZsiS1g7z0CRrP2/DDtlaZ0ts4O/BsG9oDLKwOTf9/imr2CGDf7nIaM0+A7caBnE4+99XUf/bAuu9ZFi6Lah8lHywMnZh1bQpwBVVBAkl5fw4ffjNqcIyPMFyApdN2W3bgAU+bq0O1haIJCRx1rFtdsg9NdVYByttKeA5NlQNVBgwznj6llbixGDl96CQmLAczp3PVZqUD+lModgAlx5xrNC+4ggFkEc9BQHvcWSQ3MLyOZrvZskk19QB0+NhKZr59DpfXizubleCsCLBpJuZbTvAx73pkL+iM7I2hOcigGFgNZTxf1GKQzRayZayGzQqYEkgWM7QLk8JPvK72YGmYnzOpU0pQ3Iw/HO4QzIPYbV86fi/PlMpB/a3LHW3bJ0f4B/H/HpFbO9qVkhNBYwIwnTpBpAF9JzZX1OFMWAjEdOHYVS8Bc0jHcfWPS/kQet9vLKzmWs9qVrApij06WjxBYTSRKzb+lC/sH7Wcm0U/ODGjGdy6LMrS46vYuFvsTz13Fhl6RL/dwqZk/4pHBwfSarz8gU9VvQtKwj3J38ihXPZAm5DJUiNjzTpHfiGxKjAEZ9YO4sFfukR+uvmh/4AwTKyUUyZJNM7oGHgagH12zp171Db9OHnpKfxWax2v3HBYQqLhwDy4l5fuuE5cyvB7wimJSpr0c7aggnLWdu+r+fq0qE3bpr9CLaL+DoXn7DRsAhdZPFa9XP3D4wGUrW5Ll5z5wrVlxmJYmsKflvUqblhPQc1/1BznNMQUH8u61FwjxAVubCkcvxz3oVTz/tNulvOdK8gAK2nehogG9KBMsrsNseExqb0/tEuikXGADL3Gcr73Fjc+qti+c72be7dgNNNwtMFJ32m/NnxuO+4gWWcAc5v/DpTZ54LU5yRas0kenC5DxX8yehlSAmv5+BVrv160ZYKOfeNEnSAF0xIQ4BU4YXMGqbGzcYccWAhmR2o4zePrfjXAQkA9MAinPUARPYCkVZbvc+8ScrajorEBnEkZrx4n88v8mH+E9/0uiZqs9Am/LMDaQkO+hhAyn/IEDxXXIX8USYkxdUFwmsDh3+Br3tq4wzkO+H6AlvANTmRquGxY9z48ZY0i6pXgF+H0IHr47Qw/gZ82P9nPoCBcU8bvwUovEgn/OdAhsEQsUGo3Iwv28CcmqClETRX2WOfyU6e2Z1MygmC7GqYr7mzfUHxv6Lv+TOecjHjch65uCNACAuPzAhB0Ir1qBPOxjfBi3TDh07M1kSzZnYIqjKP8drEbkcToTy7BpVX9d436zM1EKf64dg34xdH5odOvE6ZwrOv2vo58NqkMq95lhYgBXe72DTvk9zYWd/4wPojDxCbegGUCoEHGoClL06iJJRPNVv7K76a/coKdbhH80KS5sFSfSi5B2CvUpjpmRwa/ldXMSwo0BvnjQUtLp/Eig4HAF72Bor816Gih/tF5hwvJy9aC+Yh/y9OCvYhdMkZJA8xlml5LxfBLSScnkuqgF588EaNHGu8caGQb4wXK557bvBs6BJUzkq7H3mpu7Ttf/EWB2ns3ZuquH4vc1uyOuI4xtFsEyiMyAyxyT6g2ogjeZeU21iyvCwOB7G4Bs8iN+t+/gWJSgmfq8gcLwoH1+cdArRPJep5gsGTogkl4ebngc3UcJ4ACbhZhdT09CoZBew51cffNluj8p0MLGWuAgYautgkWs8vSN6o92lrogwPALSiIq6Xla9nVFU/6FPRxA249zZ+xM1eSRnxhFuzEP9c2BEOPA==",
    );
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(ListagemCategoriaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should render grid component", () => {
    //Arrange
    const fixture = TestBed.createComponent(ListagemCategoriaComponent);
    const dadosMockados: Categoria[] = [{ codigoCategoria: 1, descricao: "adolfo" }];
    mockEstadosServiceData = of(dadosMockados);

    //Act
    fixture.detectChanges();

    //Assert
    const celulasDaTabela = fixture.debugElement.queryAll(By.css("td"));
    expect(celulasDaTabela[0].nativeElement.innerText).toBe(dadosMockados[0].codigoCategoria.toString());
    expect(celulasDaTabela[1].nativeElement.innerText).toBe(dadosMockados[0].descricao);
  });
});

fdescribe("should open route correctly", () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<ListagemCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), ...importsModules],
      declarations: [ListagemCategoriaComponent],
      providers: [...providers],

    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();

  });

  it('when click button new should redirect to /dashboard/categoria', fakeAsync(() => {
    //Arrange
    fixture = TestBed.createComponent(ListagemCategoriaComponent);
    const button = fixture.debugElement.nativeElement.querySelector("#button-novo");

    //Act
    button.click();
    tick();

    //Assert
    expect(location.path()).toBe("/dashboard/categoria");
  }));

  it('should redirect to /dashboard/categoria/1 when to click button edit', fakeAsync(() => {
    //Arrange
    fixture = TestBed.createComponent(ListagemCategoriaComponent);
    const dadosMockados: Categoria[] = [{ codigoCategoria: 1, descricao: "adolfo" }];
    mockEstadosServiceData = of(dadosMockados);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.botao-alterar');

    //Act
    button.click();
    tick();

    //Assert
    expect(location.path()).toBe("/dashboard/categoria/1");
    flush();

  }));
});
