import { Progress, Table } from "flowbite-react";

export default function SummaryView(props) {
    if (props.kids.length === 0 || props.workshops.length === 0) {
        return (<></>);
    }

    let countWishesPerWorkshop = {};
    props.workshops.forEach(w => countWishesPerWorkshop[w.name] = 0);
    props.kids.forEach(kid => {
        kid.wishes.forEach(wish => {
            if (countWishesPerWorkshop[wish] !== undefined) {
                countWishesPerWorkshop[wish]++;
            }
        })
    });

    return (
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg md:rounded-bl-none">
            <Table className="divide-y divide-gray-200 dark:divide-gray-700" hoverable={true}>
                <thead>
                    <tr>
                        <td className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">Workshop</td>
                        {props.settings.numberOfWishesPerKid > 0 && Array.from({ length: props.settings.numberOfWishesPerKid }, (_, i) => (
                            <td className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">Anzahl {i + 1}. Wünsche</td>
                        ))}
                        <td className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">Kapazität</td>
                        <td className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">Auslastung</td>
                    </tr>
                </thead>
                <Table.Body>
                    {props.workshops.map(workshop => (
                        <Table.Row key={workshop.id}>
                            <Table.Cell className="px-2 py-2 text-center text-sm whitespace-nowrap text-gray-900 dark:text-white">
                                {workshop.name}
                            </Table.Cell>
                            {props.settings.numberOfWishesPerKid > 0 && Array.from({ length: props.settings.numberOfWishesPerKid }, (_, i) => (
                                <Table.Cell className="px-2 py-2 text-center text-sm whitespace-nowrap" key={i}>{props.kids.filter(kid => kid.wishes[i] === workshop.name).length}</Table.Cell>
                            ))}
                            <Table.Cell className="px-2 py-2 text-center text-sm whitespace-nowrap">
                                {workshop.capacity}
                            </Table.Cell>
                            <Table.Cell className="px-2 py-2 text-center text-sm whitespace-nowrap">
                                <Progress size="md" color="indigo"
                                    progress={100 * (countWishesPerWorkshop[workshop.name] || 0) / (workshop.capacity * props.settings.numberOfWishesPerKid)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
    </div>
    );
}
