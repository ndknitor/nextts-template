import * as XLSX from 'xlsx';

export function readExcel<T>(file: File, header: number = 0, sheetIndex = 0): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result;
            if (data) {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[sheetIndex];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: header }) as T[];
                resolve(jsonData);
            } else {
                reject('Failed to read the file.');
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsBinaryString(file);
    });
}

export const nameof = <T>(name: keyof T) => name;