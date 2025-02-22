import * as XLSX from 'xlsx/xlsx.mjs';
import { v4 as uuidv4 } from 'uuid';

export const importExcel = async (file, wishCount) => {
    const workbook = XLSX.read(await file.arrayBuffer());

    const sheetNames = workbook.SheetNames;

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    const dataAsArrayOfArrays = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    const finalData = dataAsArrayOfArrays.flatMap((lineInSheet) => {
        if (!Array.isArray(lineInSheet) || lineInSheet.length === 0) return [];
        if (!lineInSheet[0]) lineInSheet[0] = "Unbenannt";
        const w = lineInSheet.slice(1, Math.min(lineInSheet.length, wishCount+1));
        while (w.length < wishCount+1) {
            w.push("");
        }
        return [{"id": uuidv4(), "name": lineInSheet[0], "wishes": w}];
    });

    return [finalData, sheetNames];
}
