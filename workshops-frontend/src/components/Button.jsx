export default function Button(props) {
    return <button
        onClick={props.onClick}
        className={
            (props.bgColor || "bg-indigo-700 hover:bg-indigo-500 focus:ring-indigo-300")
            + " px-6 py-2 font-medium tracking-wide text-white transition-colors "
            + "duration-300 transform rounded-lg "
            + "focus:outline-none focus:ring focus:ring-opacity-80"
        }
        >
            {props.children}
    </button>
}