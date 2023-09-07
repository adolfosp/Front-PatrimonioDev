import { Injectable } from "@angular/core";
import LoginDto from "@nvs-models/dtos/loginDto";
import { ApiService } from "@nvs-services/api/api.service";
import { take } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = `${environment.apiUrl}auth`;

  constructor(private api: ApiService) {}

  public login(login: LoginDto) {
    return this.api.post<string>(`${this.baseUrl}`,  login ).pipe(take(1));
  }
}
