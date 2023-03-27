import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excelReader2';

  file: any;
  excelData: { sheetName: string, data: any[] }[] = [];
  headers: { [sheet: string]: string[] } = {};
  feuilles: string[] = [];
  selectedFeuille!: string;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.readExcelFile(this.file);
  }

  readExcelFile(file: any) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const bufferArray = reader.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      wb.SheetNames.forEach(sheetName => {
        const ws = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(ws);
        this.excelData.push({ sheetName, data });
        this.headers[sheetName] = Object.keys(data[0] as Record<string, unknown>);
        this.feuilles.push(sheetName);
      });
      console.log("excel data")
      console.log(this.excelData)
      console.log("headers")
      console.log(this.headers)
      console.log("feuilles")
      console.log(this.feuilles)
    }
  }

  onSelect(value: any) {
    //console.log("value")
    //console.log(value.target.value)
    this.selectedFeuille=value.target.value
  }
}
