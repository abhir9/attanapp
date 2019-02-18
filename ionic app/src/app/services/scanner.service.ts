import { Injectable } from '@angular/core';
import { BarcodeScanner  } from '@ionic-native/barcode-scanner/ngx';
@Injectable({
  providedIn: 'root'
})
export class ScanService {
  constructor(private barcodeScanner: BarcodeScanner) { }

  scan () {
      return this.barcodeScanner.scan().then((barcodeData) => {
          return (barcodeData.text.split('#'));
          });
  }
}
