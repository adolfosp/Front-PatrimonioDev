import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ApiService } from '@nvs-services/api/api.service';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ListagemCategoriaComponent } from './listagem-categoria.component';

fdescribe('ListagemCategoriaComponent', () => {
  let component: ListagemCategoriaComponent;
  let fixture: ComponentFixture<ListagemCategoriaComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemCategoriaComponent ],
      imports: [
        ToastrModule.forRoot(),
        HttpClientModule,
        JwtModule.forRoot({
        })
      ],
      providers: [
                  ApiService,
                  CategoriaService,
                  NgxSpinnerService,
                  BsModalService,
                  JwtHelperService,
                  ChangeDetectorRef
                  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemCategoriaComponent);
    component = fixture.componentInstance;
    localStorage.setItem("Valor","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzb2VzIjoiW3tcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiQ2F0ZWdvcmlhRXF1aXBhbWVudG9cIixcIlBlcm1pc3NvZXNcIjpcIiBBbHRlcmFyLCBBZGljaW9uYXIsIExpc3RhciwgRXhjbHVpciwgRGVzYXRpdmFyXCIsXCJUb2tlblwiOm51bGx9LHtcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiRW1wcmVzYVwiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJFcXVpcGFtZW50b1wiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJGYWJyaWNhbnRlXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIkZ1bmNpb25hcmlvXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIk1vdmltZW50YWNhb1wiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJQYXRyaW1vbmlvXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIlBlcmRhXCIsXCJQZXJtaXNzb2VzXCI6XCIgQWx0ZXJhciwgQWRpY2lvbmFyLCBMaXN0YXIsIEV4Y2x1aXIsIERlc2F0aXZhclwiLFwiVG9rZW5cIjpudWxsfSx7XCJDb2RpZ29Vc3VhcmlvXCI6MSxcIk5vbWVcIjpcIkFET0xGT1wiLFwiRGVzY3JpY2FvQ29udGV4dG9cIjpcIlBlcmZpbFwiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH0se1wiQ29kaWdvVXN1YXJpb1wiOjEsXCJOb21lXCI6XCJBRE9MRk9cIixcIkRlc2NyaWNhb0NvbnRleHRvXCI6XCJQZXJtaXNzYW9cIixcIlBlcm1pc3NvZXNcIjpcIiBBbHRlcmFyLCBBZGljaW9uYXIsIExpc3RhciwgRXhjbHVpciwgRGVzYXRpdmFyXCIsXCJUb2tlblwiOm51bGx9LHtcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiU2V0b3JcIixcIlBlcm1pc3NvZXNcIjpcIiBBbHRlcmFyLCBBZGljaW9uYXIsIExpc3RhciwgRXhjbHVpciwgRGVzYXRpdmFyXCIsXCJUb2tlblwiOm51bGx9LHtcIkNvZGlnb1VzdWFyaW9cIjoxLFwiTm9tZVwiOlwiQURPTEZPXCIsXCJEZXNjcmljYW9Db250ZXh0b1wiOlwiVXN1YXJpb1wiLFwiUGVybWlzc29lc1wiOlwiIEFsdGVyYXIsIEFkaWNpb25hciwgTGlzdGFyLCBFeGNsdWlyLCBEZXNhdGl2YXJcIixcIlRva2VuXCI6bnVsbH1dIiwiY29kaWdvVXN1YXJpbyI6IjEiLCJub21lVXN1YXJpbyI6IkFET0xGTyIsImV4cCI6MTY2ODEzMTUxMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODAiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MCJ9.sIZaY52tVYP97YeG88nHo_VzSeuC7o1D4DgGb3hPBfQ");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
