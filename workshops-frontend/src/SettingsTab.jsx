import { useEffect, useState } from "react";
import Checkbox from "./components/Checkbox";

export default function SettingsTab(props) {
    const setSettings = props.setSettings;
    const initialSettings = props.initialSettings;

    const [useWeighted, setUseWeighted] = useState(initialSettings.useWeighted !== undefined ? initialSettings.useWeighted : true);
    const [allowAssignmentToNonWishedWorkshop, setallowAssignmentToNonWishedWorkshop] = useState(initialSettings.allowAssignmentToNonWishedWorkshop !== undefined ? initialSettings.allowAssignmentToNonWishedWorkshop : false);

    useEffect(() => {
        setSettings(oldSettings => { return {
            useWeighted: useWeighted,
            allowAssignmentToNonWishedWorkshop: allowAssignmentToNonWishedWorkshop,
            numberOfWishesPerKid: oldSettings.numberOfWishesPerKid
        }})
    }, [useWeighted, allowAssignmentToNonWishedWorkshop, setSettings]);

    return (
    <div className="flex flex-col items-center p-8">
        <div className="flex flex-col items-start gap-5">
        <Checkbox title="Wünsche als gewichtet betrachten"
            details="Wenn diese Option gesetzt ist, werden die Wünsche der Teilnehmer gewichtet. Die Gewichtung 
            erfolgt klassisch über Erstwunsch, Zweitwunsch, Drittwunsch.
            Wenn die Option nicht gesetzt wird, werden alle drei Wünsch gleich behandelt."
            checked={useWeighted}
            onChange={(e) => setUseWeighted(e.target.checked)}></Checkbox>
        <Checkbox title="Einteilung in nicht gewünschte Workshops zulassen" 
            details="Wenn diese Option gesetzt ist, können Teilnehmer vom Algorithmus in Workshops eingeteilt werden, die sie überhaupt nicht
            gewählt haben. Das wird allerdings erst gemacht, wenn es unbedingt notwendig ist. Wenn die Option nicht gesetzt ist, werden
            die Teilnehmer in einem solchen Fall überhaupt nicht zugeteilt."
            checked={allowAssignmentToNonWishedWorkshop}
            onChange={(e) => setallowAssignmentToNonWishedWorkshop(e.target.checked)}></Checkbox>
        </div>
    </div>);
}