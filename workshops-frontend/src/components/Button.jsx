export default function Button(props) {
    return <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={
            (props.bgColor || "bg-indigo-700 hover:bg-indigo-500 focus:ring-indigo-300")
            + " px-6 py-2 font-medium tracking-wide text-white transition-colors "
            + "duration-300 transform rounded-lg "
            + "focus:outline-none focus:ring focus:ring-opacity-80 "
            + "disabled:bg-indigo-300 disabled:cursor-not-allowed "
            + "inline-flex items-center"
        }
        >
            {props.disabledWithloading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
            {props.children}
    </button>
}