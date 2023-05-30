import { IConfirmDialogData } from "@nvs-models/interfaces/IConfirmDialogData";
import { DialogService } from "@nvs-services/componente/dialog.service";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";

const defaultConfirmData = {
  title: "Confirmation",
  message: "Are you sure you want to perform this action?",
};

export function needConfirmation(confirmData: IConfirmDialogData = defaultConfirmData) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      DialogService.getInstance()
        ?.openDialog(confirmData, ConfirmDialogComponent)
        .subscribe((validation) => {
          if (validation) {
            originalMethod.apply(this, args);
          }
        });
    };

    return descriptor;
  };
}
