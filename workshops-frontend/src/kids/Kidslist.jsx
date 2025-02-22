import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import ImportModalWithButton from "./importModal";
import NumberSelector from "../components/NumberSelector";

export default function KidsList(props) {
    const kids = props.kids;
    const setKids = props.setKids;
    const workshopNames = props.workshopNames;

    const setSettings = props.setSettings;
    const initialSettings = props.initialSettings;

    const MAX_WISH_COUNT = 4;
    const DEFAULT_WISH_COUNT = 3;

    const [wishCount, setWishCount] = useState(initialSettings.numberOfWishesPerKid !== undefined ? initialSettings.numberOfWishesPerKid : DEFAULT_WISH_COUNT);

    useEffect(() => {
        setSettings(oldSettings => { return {
            useWeighted: oldSettings.useWeighted,
            allowAssignmentToNonWishedWorkshop: oldSettings.allowAssignmentToNonWishedWorkshop,
            numberOfWishesPerKid: wishCount
        }})
    }, [wishCount, setSettings]);

    const [newName, setNewName] = useState('');
    const [newWishList, setNewWishList] = useState([...Array(MAX_WISH_COUNT).fill('')]);

    const nameInputRef = useRef(null);

    const addKid = () => {
        let wishes = newWishList; // Data from the form
        while (wishes.length < MAX_WISH_COUNT) {
            wishes.push("");
        }
        while (wishes.length > MAX_WISH_COUNT) {
            wishes.pop();
        }

        setKids([
            {"id": uuidv4(), "name": newName, "wishes": wishes},
            ...kids
        ]);
        setNewWishList([...Array(MAX_WISH_COUNT).fill('')]);
        setNewName('');

        nameInputRef.current.focus();
    }

    const removeKid = (id) => {
        setKids(kids.filter(k => k.id !== id));
    }

    const updateWish = (index, wish) => {
        const newlist = newWishList.map((a,j) => j === index ? wish : a);
        setNewWishList(newlist);
    }

    return (
            <section className="container px-4 mx-auto">
                {/* <h2 className="text-lg font-medium text-gray-800 dark:text-white">Teilnehmer</h2> */}

                <div className="flex justify-between items-center">
                    <p className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Füge die Teilnehmer und ihre Wünsche hinzu.
                    
                        Workshops, die es in der Workshopliste nicht gibt, werden
                        <span className="mx-1 px-2 py-1 rounded-xl bg-yellow-500 text-black">
                            in gelb
                        </span>
                        markiert.
                    </p>
                    <span>
                        <NumberSelector
                            text="Anzahl der Wünsche pro Teilnehmer"
                            placeholder="Festlegen der Wünsche pro Teilnehmer über Plus und Minus"
                            value={wishCount}
                            setValue={(valueFn) => {
                                const newVal = Number(valueFn(wishCount));
                                if (1 <= newVal && newVal <= MAX_WISH_COUNT) {
                                    setWishCount(newVal);
                                }
                            }}
                        ></NumberSelector>
                    </span>
                </div>

                <div className="flex flex-col mt-4">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg md:rounded-bl-none">

                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                Name
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                Erst-Wunsch
                                            </th>

                                            {wishCount >= 2 ? (<th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                Zweit-Wunsch
                                            </th>) : <></>}

                                            {wishCount >= 3 ? (<th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                Dritt-Wunsch
                                            </th>) : <></>}

                                            {wishCount >= 4 ? (<th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                Viert-Wunsch
                                            </th>) : <></>}

                                            <th scope="col" className="relative py-3.5 px-2 text-sm whitespace-nowrap">
                                                <ImportModalWithButton onImportKids={(data) => {
                                                    setKids([
                                                        ...data,
                                                        ...kids
                                                    ]);
                                                }}
                                                wishCount={wishCount}
                                                maxWishCount={MAX_WISH_COUNT}
                                                workshopNames={workshopNames}>
                                                    Aus Excel-Datei importieren
                                                </ImportModalWithButton>
                                                <span className="sr-only">Löschen</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 dark:bg-opacity-40">
                                    
                                    <tr>
                                        <td className="p-1">
                                            <TextInput extraStyle="rounded-none" placeholder="Name des Teilnehmers" ref={nameInputRef} value={newName} onChange={e => setNewName(e.target.value)}/>
                                        </td>
                                        {[...Array(wishCount)].map((x, i) => {
                                            return <td className="p-1" key={i}>
                                                <TextInput
                                                    key={i}
                                                    extraStyle="rounded-none" placeholder={i+1 + ". Wunsch"} 
                                                    value={newWishList[i]} onChange={e => updateWish(i, e.target.value)}
                                                    onKeyDown={(e, trAuoCom) => (i === wishCount-1 && (e.key === 'Enter') && !trAuoCom) && (e.preventDefault() || addKid())}
                                                    autocomplete={workshopNames}
                                                    autocompleteSetValue={value => updateWish(i, value)}
                                                />
                                            </td>
                                        })}
                                        <td className="p-2 text-sm whitespace-nowrap">
                                            <Button onClick={() => addKid()}>
                                                Hinzufügen
                                            </Button>
                                        </td>
                                    </tr>

                                    {kids.map(k => (
                                        <tr key={k.id}>
                                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                                <h2 className="font-medium text-gray-800 dark:text-white text-center">{k.name}</h2>
                                            </td>
                                            {[...Array(wishCount)].map((x, i) => {
                                                return <td className={"px-2 py-2 text-sm whitespace-nowrap"}>
                                                    <span className={((workshopNames.includes(k.wishes[i]) || k.wishes[i] === "") ? "" : "px-4 py-1 rounded-xl bg-yellow-500 text-black")}>
                                                        {k.wishes[i]}
                                                    </span>
                                                </td>
                                            })}

                                            <td className="px-2 py-2 text-sm whitespace-nowrap">
                                                <Button
                                                    bgColor="bg-red-500 dark:bg-rose-600 dark:text-stone-100 p-2"
                                                    onClick={() => removeKid(k.id)}>
                                                    Löschen
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                    {kids.length > 0 && <tr className="text-gray-500 dark:text-gray-400 text-sm">
                                        <td className="p-1">
                                            <span>Anzahl Teilnehmer: {kids.length}</span>
                                        </td>
                                        {[...Array(wishCount)].map((x, i) => {
                                        return <td className="p-1" key={i}>
                                            <span>Anzahl gesetzer Wünsche in dieser Spalte: {kids.reduce((a,b) => b.wishes[i] !== "" ? a + 1 : a, 0)}</span>
                                        </td>
                                        })}
                                        <td></td>
                                    </tr>}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}