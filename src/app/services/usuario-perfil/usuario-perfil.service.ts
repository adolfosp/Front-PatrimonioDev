import { Injectable } from '@angular/core';
import { UsuarioPerfil } from '@nvs-models/UsuarioPerfil';
import { ApiService } from '@nvs-services/api/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPerfilService {

  private baseUrl = `${environment.apiUrl}perfils`

  constructor(private api: ApiService) { }

  public obterPerfilUsuario(codigoUsuario: number): Observable<UsuarioPerfil>{
    return this.api.get<UsuarioPerfil>(`${this.baseUrl}/${codigoUsuario}`).pipe(take(1));
  }

  public atualizarPerfilUsuario(perfil: UsuarioPerfil): Observable<number>{
    return this.api.put<number>(`${this.baseUrl}`, {perfilDto: perfil});
  }

  public inserirImagem(codigoUsuario: number, file: File): Observable<UsuarioPerfil>{
    const arquivoUpload = file;
    const formData = new FormData();
    formData.append('file', arquivoUpload);

    return this.api.postImage<UsuarioPerfil>(`${this.baseUrl}/upload-imagem/${codigoUsuario}`, formData);
  }

}
