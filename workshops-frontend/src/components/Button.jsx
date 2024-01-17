export default function Button(props) {
    return <button
        onClick={props.onClick}
        className={
            (props.bgColor || "bg-blue-600 hover:bg-blue-500 focus:ring-blue-300")
            + " px-6 py-2 font-medium tracking-wide text-white transition-colors "
            + "duration-300 transform rounded-lg "
            + "focus:outline-none focus:ring focus:ring-opacity-80"
        }
        >
            {props.children}
    </button>
}