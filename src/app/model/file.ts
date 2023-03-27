export interface FileDTO{
  excelData: { sheetName: string, data: any[] }[]
  headers: { [sheet: string]: string[] }
  feuilles: string[]
}
