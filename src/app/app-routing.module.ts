import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CustomPreloader } from './core/configs/custom-preload-strategy';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { GraficoComponent } from './views/grafico/grafico.component';
import { LoginComponent } from './views/login/login.component';
import { RegistrarComponent } from './views/login/registrar/registrar.component';
import { PerdaComponent } from './views/perda/perda.component';
import { QrCodeComponent } from './views/qr-code/qr-code.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'registrar',
    component: RegistrarComponent,
    data: {
      title: 'registrar'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: GraficoComponent,
        data: {
          title: 'gráficos'
        }
      },
      {
        path: 'qr-code',
        component: QrCodeComponent,
        data: {
          title: 'qr-code'
        }
      },
      {
        path: 'perda',
        canActivate: [AuthGuard],
        component: PerdaComponent,
        data: {
          title: 'perda'
        }
      },
      {
        path: 'empresa',
        loadChildren: () => import('../app/views/empresa/empresa.module').then(m => m.EmpresaModule),
      },
      {
        path: 'funcionario',
        loadChildren: () => import('../app/views/funcionario/funcionario.module').then(m => m.FuncionarioModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('../app/views/usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'setor',
        loadChildren: () => import('../app/views/setor/setor.module').then(m => m.SetorModule)
      },
      {
        path: 'fabricante',
        loadChildren: () => import('../app/views/fabricante/fabricante.module').then(m => m.FabricanteModule)
      },
      {
        path: 'permissao',
        loadChildren: () => import('../app/views/permissao/permissao.module').then(m => m.PermissaoModule)
      },
      {
        path: 'equipamento',
        loadChildren: () => import('../app/views/equipamento/equipamento.module').then(m => m.EquipamentoModule),
        data: {preload: true}
      },
      {
        path: 'categoria',
        loadChildren: () => import('../app/views/categoria/categoria.module').then(m => m.CategoriaModule)
      },
      {
        path: 'relatorio',
        loadChildren: () => import('../app/views/relatorios/relatorio.module').then(m => m.RelatorioModule)
      },
      {
        path: 'movimentacao',
        loadChildren: () => import('../app/views/movimentacao/movimentacao.module').then(m => m.MovimentacaoModule),
        data: {preload: true}
      },
      {
        path: 'patrimonio',
        loadChildren: () => import('../app/views/patrimonio/patrimonio.module').then(m => m.PatrimonioModule),
        data: {preload: true}
      },

    ],
    data: {
      title: 'dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloader})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export default routes;
