import { take } from "rxjs/operators";

import { IDialogoConfirmacao } from "@nvs-models/interfaces/IDialogoConfirmacao";
import { ConfirmService } from "@nvs-services/componente/confirm.service";
import { AppModule } from "src/app/app.module";

export function Confirmable(options?: IDialogoConfirmacao) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;


    descriptor.value = function (...args: any[]) {
      const service = AppModule?.injector.get(ConfirmService);
      const dialogRef = service ? service.confirm(options) : null;
      if (dialogRef) {
        return dialogRef.pipe(take(1)).subscribe((confirmed: boolean) => {
          // eslint-disable-next-line no-extra-boolean-cast
          if (!!confirmed) {
            originalMethod.apply(this, [...args]);
          }
        });
      }
      return null;
    };
    return descriptor;
  };
}
