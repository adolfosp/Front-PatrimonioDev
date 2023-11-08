import { Injectable } from "@angular/core";
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";
import { IDialogoConfirmacao } from "@nvs-models/interfaces/IDialogoConfirmacao";
import { EMPTY, Observable } from "rxjs";
import { ConfirmDialogComponent } from "src/app/views/shared/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  public confirm(data: IDialogoConfirmacao = {}): Observable<boolean> {
    data.title = data.title || "Confirmação";
    data.message = data.message || "Você tem certeza desta operação?";
    data.showCancel = data.showCancel || true;
    data.showIcon = data.showIcon || true;

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    if (!this.dialog) {
      return EMPTY;
    }
    // eslint-disable-next-line prefer-const
    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "480px",
      disableClose: true,
      data,
      backdropClass: "confirm-backdrop-class",
      panelClass: "confirm-panel-class",
    });
    return dialogRef.afterClosed();
  }
}
