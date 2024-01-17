import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Card from "../components/Card";

export default function KidsList(props) {
    const kids = props.kids;
    const setKids = props.setKids;
    const workshopNames = props.workshopNames;

    const wishCount = 3;

    const [newName, setNewName] = useState('');
    const [newWishList, setNewWishList] = useState([...Array(wishCount).fill('')]);

    const nameInputRef = useRef(null);

    const addKid = () => {
        let wishes = newWishList
        while (wishes.length < wishCount) {
            wishes.push("");
        }
        while (wishes.length > wishCount) {
            wishes.pop();
        }

        setKids([
            ...kids,
            {"id": uuidv4(), "name": newName, "wishes": wishes}
        ]);
        setNewWishList([...Array(wishCount).fill('')]);
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
                {/* <h2 className="text-lg font-medium text-gray-800 dark:text-white">Kinder</h2> */}

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Füge die Teilnehmer und ihre Wünsche hinzu.
                    
                    Workshops, die es in der Workshopliste nicht gibt, werden
                    <span className="mx-1 px-2 py-1 rounded-xl bg-yellow-500 text-black">
                        in gelb
                    </span>
                    markiert.
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
                                                Erst-Wunsch
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Zweit-Wunsch
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Dritt-Wunsch
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Löschen</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {kids.map(k => (
                                        <tr key={k.id}>
                                            <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                                                <h2 className="font-medium text-gray-800 dark:text-white ">{k.name}</h2>
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
                                                    bgColor="bg-red-500 p-2"
                                                    onClick={() => removeKid(k.id)}>
                                                    Löschen
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td className="p-0">
                                            <TextInput extraStyle="rounded-none" placeholder="Name des Teilnehmers" ref={nameInputRef} value={newName} onChange={e => setNewName(e.target.value)}/>
                                        </td>
                                        {[...Array(wishCount)].map((x, i) => {
                                            return <td className="p-0" key={i}>
                                                <TextInput
                                                    key={i}
                                                    extraStyle="rounded-none" placeholder={i+1 + ". Wunsch"} 
                                                    value={newWishList[i]} onChange={e => updateWish(i, e.target.value)}
                                                    onKeyDown={(e) => (i === wishCount-1 && (e.key === 'Enter')) && (e.preventDefault() || addKid())}
                                                    autocomplete={workshopNames}
                                                    autocompleteSetValue={value => updateWish(i, value)}
                                                />
                                            </td>
                                        })}
                                        <td className="px-2 py-0 text-sm whitespace-nowrap">
                                            <Button bgColor="bg-blue-800 p-2" onClick={() => addKid()}>
                                                Hinzufügen
                                            </Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}