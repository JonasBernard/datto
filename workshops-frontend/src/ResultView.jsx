import Button from "./components/Button";
import Card from "./components/Card";
import { exportExcel } from "./exportExcel";
import { Chart as ChartJS } from "chart.js/auto"; // This import is needed! 
import { Doughnut, Bar} from "react-chartjs-2";

function interpretStatus(status) {
    switch (status) {
        case "no-perfect-solution": return "Es ist keine vollständige Einteilung möglich. Die Gesamtkapazität der Workshops oder die Kapazität eines Workshops reichen nicht für alle Teilnehmer aus. Es wurden so viele Teilnehmer wie möglich zugeteilt."
        case "error-unknown": return "Es ist ein unbekannter Fehler aufgetreten. Es wurde eine Teillösung berechnet:"
        case "ok": return "Es wurde eine Einteilung gefunden. Falls es mehrere gleichwertige Einteilungen gab, wurde eine davon zufällig ausgewählt."
        case "unknown-status": return "Es wurde keine Nachricht zur Einteilung übermittelt."
        default: return ""
    }
}

export default function ResultView(props) {
    const result = props.result;

    if (!result) {
        return (<></>);
    }

    const problemSolution = result.solution || [];
    const status = result.status || "unknown-status";

    const asssignedKids = problemSolution.map((e1, e2) => e1.Left.name);
    const unassignedKids = result.kids.filter(kid => !(asssignedKids.includes(kid.name))).map(k => k.name);


    ChartJS.defaults.color = '#fff';

    const wishStats = {labels: [
            'Erfüllte Erstwünsche',
            'Erfüllte Zweitwünsche',
            'Erfüllte Drittwünsche',
            'Nicht erfüllte Wünsche'
        ],
        datasets: [{
            label: 'Erfüllung der Wünsche',
            data: [
                problemSolution.filter(e => e.Left.wishes.indexOf(e.Right.name) === 0).length,
                problemSolution.filter(e => e.Left.wishes.indexOf(e.Right.name) === 1).length,
                problemSolution.filter(e => e.Left.wishes.indexOf(e.Right.name) === 2).length,
                problemSolution.filter(e => e.Left.wishes.indexOf(e.Right.name) === -1).length
            ],
            backgroundColor: [
                '#6366f1',
                '#4338ca',
                '#312e81',
                '#1e1b4b',
            ],
            hoverOffset: 4
    }]};

    const workshops = [...new Set(problemSolution.map(e => e.Right.name))];

    const workshopStats = {
        labels: workshops,
        datasets: [{
          label: 'Verteilung der Teilnehmer',
          data: workshops.map(w => problemSolution.filter(e => e.Right.name === w).length),
          backgroundColor: ['#4338ca'],
          borderWidth: 0,
          borderRadius: 5,
        }]
      };

    return (
        <div>
            <span>{interpretStatus(status)}</span>
            <div className="mt-3 flex items-stretch">
                <Card className="rounded-xl bg-slate-100 dark:bg-gray-700 p-3 items-center justify-between mb-2">
                    <div className="flex items-center justify-between">
                        <span>Teilnehmer nach Alphabet sortiert:</span>
                        <span>
                            <Button 
                            onClick={() => exportExcel(result.solution, unassignedKids)}
                            bgColor="bg-green-800">Als Excel-Datei herunterladen</Button>
                        </span>
                    </div>
                    <div className="mt-2">
                    {problemSolution.sort((e1, e2) => e1.Left.name.localeCompare(e2.Left.name)).map(edge => {
                        let wishNr = edge.Left.wishes.indexOf(edge.Right.name) + 1;
                        return (<div key={edge.Left.id} className="rounded-xl even:bg-gray-200 odd:bg-gray-100 odd:dark:bg-gray-600 even:dark:bg-gray-700 p-3 flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <p className="text-xl">{edge.Left.name}</p>
                            </div>
                            <span className="flex flex-col items-end">
                                <p className="text-xl">{edge.Right.name}</p>
                                <p>({wishNr > 0 ? "entspricht " + wishNr + ". Wunsch" : "Wurde nicht gewünscht"})</p>
                            </span>
                        </div>
                    )})}
                    </div>
                    <div className="mt-2">
                        Zugeteilt wurden: {asssignedKids.join(", ") || "Niemand"} ({asssignedKids.length}) <br />
                        Nicht zugeteilt wurden: {unassignedKids.join(", ") || "Niemand"} ({unassignedKids.length})
                    </div>
                </Card>
                <Card>
                    <Doughnut data={wishStats} />
                    <Bar data={workshopStats}/>
                </Card>
            </div>
        </div>
    );
}