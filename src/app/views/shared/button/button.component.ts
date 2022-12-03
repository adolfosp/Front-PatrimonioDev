import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {

  @Input() classeBotao: string;
  @Output() Click = new EventEmitter<any>();

  clickBotao() {
    this.Click.emit();
  }
}
