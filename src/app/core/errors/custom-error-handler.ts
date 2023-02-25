import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private zone: NgZone, private injector: Injector) {
   }

  handleError(error: Error) {

    const toaster = this.injector.get(ToastrService);

    console.log(error)
    this.zone.run(() => {
    toaster.toastrConfig.closeButton = true;
    toaster.toastrConfig.tapToDismiss = true;

    toaster.error(
        error.message,
        'Close',
      );
    })
  }
}




