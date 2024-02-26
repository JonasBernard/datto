import { forwardRef, useImperativeHandle, useRef } from "react";

const getAutocomplete = (input, stringlist) => {
    if (stringlist === null || stringlist === undefined) return "";

    if (input === "")  return "";

    const beginsWith = stringlist.filter(s => s.toLowerCase().startsWith(input.toLowerCase()));
    if (beginsWith.length > 0) {
        return beginsWith[0] === input ? "" : beginsWith[0];
    }

    const contains = stringlist.filter(s => s.toLowerCase().includes(input.toLowerCase()));
    if (contains.length > 0) {
        return contains[0] === input ? "" : contains[0];
    }

    return "";
}

const TextInput = forwardRef((props, forwardedRef) => {

    const ref = useRef(null);

    useImperativeHandle(forwardedRef, () => ref.current);

    const autocomplete = getAutocomplete(props.value, props.autocomplete);

    return <div className="relative">
        <input
            type="text"
            ref={ref}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            onKeyDown={(e) => {
                let triggeredAutocompletion = false;
                if ((props.autocomplete && props.autocompleteSetValue) && ((e.key === 'Tab' && !e.shiftKey) || e.key === 'Enter')) {
                    if (autocomplete !== "") {
                        props.autocompleteSetValue(autocomplete);
                        triggeredAutocompletion = true;
                    }
                }

                props.onKeyDown && props.onKeyDown(e, triggeredAutocompletion);
            }}
            className={
                props.extraStyle
            + " block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 "
            + "rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 "
            + "focus:ring-indigo-300 focus:ring-opacity-40 dark:focus:border-indigo-300 focus:outline-none focus:ring"}
        />
        {ref.current && ref.current.id === document.activeElement.id 
            && autocomplete !== "" 
            && <span className="absolute top-2 right-2 text-gray-500">
                <kbd className="invisible md:visible inline mr-2 px-3 py-1 text-sm font-normal text-gray-600 bg-gray-300 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-900">
                    Tab
                </kbd>
                {autocomplete}
            </span>}
    </div>
});

export default TextInput;