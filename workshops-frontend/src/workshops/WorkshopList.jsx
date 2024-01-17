import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import Card from "../components/Card";

export default function Workshoplist(props) {
    const workshops = props.workshops;
    const setWorkshops = props.setWorkshops;

    const [newName, setNewName] = useState('');
    const [newCapa, setNewCapa] = useState(0);

    const nameInputRef = useRef(null);

    const addWorkshop = () => {
        setWorkshops([
            {id: uuidv4(), "name": newName, "capacity": newCapa},
            ...workshops
        ]);
        setNewCapa(0);
        setNewName('');

        nameInputRef.current.focus();
    }

    const removeWorkshop = (id) => {
        setWorkshops(workshops.filter(w => w.id !== id));
    }

    return (
            <section className="container px-4 mx-auto">
                {/* <h2 className="text-lg font-medium text-gray-800 dark:text-white">Workshops</h2> */}

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Füge die Workshops hinzu, die es gibt.
                </p>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg md:rounded-bl-none">

                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Name
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Kapazität
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Löschen</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 dark:bg-opacity-40">

                                    <tr>
                                        <td className="p-1">
                                            <TextInput extraStyle="rounded-none" placeholder="Name des Workshops" ref={nameInputRef} value={newName} onChange={e => setNewName(e.target.value)}/>
                                        </td>
                                        <td className="p-1">
                                            <NumberInput extraStyle="rounded-none" 
                                                placeholder="Wie viele Kinder kann der Workshop aufnehmen?" 
                                                value={newCapa} onChange={e => setNewCapa(e.target.value)}
                                                onKeyDown={(e) => (e.key === 'Tab' || e.key === 'Enter') && (e.preventDefault() || addWorkshop())} 
                                            />
                                        </td>
                                        <td className="p-2 text-sm whitespace-nowrap">
                                            <Button onClick={() => addWorkshop()}>
                                                Hinzufügen
                                            </Button>
                                        </td>
                                    </tr>

                                    {workshops.map(w => (
                                        <tr key={w.id}>
                                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{w.name}</h2>
                                            </td>
                                            <td className={"px-2 py-2 text-sm whitespace-nowrap"}>
                                                {w.capacity}
                                            </td>

                                            <td className="px-2 py-2 text-sm whitespace-nowrap">
                                                <Button
                                                    bgColor="bg-red-500 dark:bg-pink-400 dark:text-black p-2"
                                                    onClick={() => removeWorkshop(w.id)}>
                                                    Löschen
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                    {workshops.length > 0 && <tr className="text-gray-500 dark:text-gray-400 text-sm">
                                        <td className="p-1">
                                            <span>Anzahl Workshops: {workshops.length}</span>
                                        </td>
                                        <td className="p-1">
                                            <span>Gesamte Kapazität: {workshops.reduce((a,b) => a + Number(b.capacity), 0)}</span>
                                        </td>
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