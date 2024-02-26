import { useId } from "react";

export default function Checkbox(props) {
    const checkbox = useId();
    const checkboxLabel = useId();

    return <>
       <div className="flex">
            <div className="flex items-center h-5">
                <input id={checkbox} aria-describedby={checkboxLabel} 
                checked={props.checked} onChange={props.onChange}
                type="checkbox" className="w-4 h-4 dark:text-indigo-700 text-indigo-700 bg-gray-100 border-gray-300 rounded focus:ring-indigo-300 dark:focus:ring-indigo-500 dark:ring-offset-gray-800 focus:ring-opacity-80 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="ms-2 text-sm text-left">
                <label htmlFor={checkbox} className="font-medium text-gray-900 dark:text-gray-300">{ props.title }</label>
                {props.details &&
                    <p id={checkboxLabel} className="text-xs font-normal text-gray-500 dark:text-gray-300">{ props.details }</p>
                }
            </div>
        </div>
    </>
}