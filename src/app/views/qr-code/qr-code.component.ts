import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BarcodeFormat, Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.sass']
})
export class QrCodeComponent implements AfterViewInit {
    constructor(private title: Title){
        this.title.setTitle("Leitor de qr-code")
    }

  ngAfterViewInit(): void {
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;


  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  public obterDispositivos(a: MediaDeviceInfo[]) {
    this.hasDevices = true;
    this.availableDevices = a;
  }

  onDeviceSelectChange(selectedValue: string) {
    for (const device of this.availableDevices) {
      if (device.deviceId === selectedValue) {
        this.currentDevice = device;
        return;
      }
    }
  }

  stateToEmoji(state: boolean): string {

    const states = {
      undefined: '❔',
      null: '⭕',
      true: '✔',
      false: '❌'
    };

    return states['' + state];
  }

  public abrirUrl() {
    window.open(this.qrResultString, "_self");
  }
}
