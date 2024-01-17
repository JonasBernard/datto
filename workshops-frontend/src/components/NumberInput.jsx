export default function NumberInput(props) {
    return <input
        type="number"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        className={
            props.extraStyle
        + " block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 "
        + "rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 "
        + "focus:ring-indigo-300 focus:ring-opacity-40 dark:focus:border-indigo-300 focus:outline-none focus:ring"}
    />
}