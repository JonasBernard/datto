import * as XLSX from 'xlsx/xlsx.mjs';

export const exportExcel = (result, unassignedKids) => {
    const dataSorted = result.sort((e1, e2) => e1.Left.name.localeCompare(e2.Left.name)).map(edge => {
        return {name: edge.Left.name, workshop: edge.Right.name}
    });

    let dataAsCSV = formatCSV(dataSorted);

    if (unassignedKids.length > 0)
        dataAsCSV += "\n" + ["Nicht eingeteilt", unassignedKids.join(", ")].join(SEP) + "\n";

    let workbook = XLSX.read(dataAsCSV, { type: "binary" });
    XLSX.writeFile(workbook, "Workshopeinteilung.xlsx", { compression: false });
}

const SEP = ",";

const formatCSV = (data) => {
    let newData = ["Name","Workshop"].join(SEP) + "\n";

    data.forEach(e => {
        newData += [e.name, e.workshop].join(SEP) + "\n";
    });
    
    return newData;
}