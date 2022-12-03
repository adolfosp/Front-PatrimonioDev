import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { ButtonComponent } from './button/button.component';

@NgModule({
    providers: [],
    declarations: [ButtonComponent],
    imports: [
      CommonModule
    ],
    exports: [ButtonComponent]
})
export class SharedComponentModule { }
