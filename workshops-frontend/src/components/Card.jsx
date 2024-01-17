export default function Card(props) {
    return <div
        className={
            props.extraStyle + " "
            + (props.bgColor || "bg-white dark:bg-gray-800 ")
            + "p-4 m-2 overflow-hidden rounded-lg shadow-lg border-neutral-100 dark:border-none border-2 dark:bg-gray-800bg-blue-600"
        }
    >
        {props.children}
    </div>
}