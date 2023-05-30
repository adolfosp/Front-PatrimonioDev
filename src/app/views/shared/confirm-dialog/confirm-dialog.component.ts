import { Component, Inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { IConfirmDialogData } from "@nvs-models/interfaces/IConfirmDialogData";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.sass"],
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) {}
}
