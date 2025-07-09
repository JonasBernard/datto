import * as XLSX from 'xlsx/xlsx.mjs';

export const exportExcel = (result, unassignedKids) => {
    let workbook = worksheetAllKids(result, unassignedKids);
    
    let workshops = [...new Set(result.map(edge => edge.Right.name))].sort();
    for (let workshop of workshops) {
        let data = result.filter(edge => edge.Right.name === workshop).map(edge => { return {Name: edge.Left.name}});
        let worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, workshop, true);
    }

    XLSX.writeFile(workbook, "Workshopeinteilung.xlsx", { compression: false });
}

const worksheetAllKids = (result, unassignedKids) => {
    if (!result || result.length === 0) {
        return XLSX.utils.book_new();
    }

    const dataSorted = result.sort((e1, e2) => e1.Left.name.localeCompare(e2.Left.name)).map(edge => {
        const wishNr = edge.Left.wishes.indexOf(edge.Right.name) + 1;
        return {name: edge.Left.name, workshop: edge.Right.name, correspondingWish: wishNr};
    });

    let dataAsCSV = formatCSV(dataSorted);

    if (unassignedKids.length > 0)
        dataAsCSV += "\n" + ["Nicht eingeteilt", unassignedKids.join(", ")].join(SEP) + "\n";

    let workbook = XLSX.read(dataAsCSV, { type: "binary" });
    return workbook;
}

const SEP = ",";

const formatCSV = (data) => {
    let newData = ["Name","Workshop","entspricht Wunsch Nr."].join(SEP) + "\n";

    data.forEach(e => {
        newData += [e.name, e.workshop, e.correspondingWish > 0 ? e.correspondingWish.toString() : "wurde nicht gewünscht"].join(SEP) + "\n";
    });
    
    return newData;
}