export default function NumberSelector(props) {
    const increment = () => {
        props.setValue(oldValue => oldValue + 1);
    }

    const decrement = () => {
        props.setValue(oldValue => oldValue - 1);
    }

    const preventDefault = (e) => {
        e.preventDefault();
    }

    // From https://flowbite.com/docs/forms/number-input/#min-and-max-values
    return <form className="max-w-xs mx-auto flex items-center flex-col" onSubmit={preventDefault}>
        <div className="relative flex items-center max-w-[12rem]">
            <button type="button" id="decrement-button" onClick={decrement} className={
                    "bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border"
                    + " border-gray-300 rounded-s-lg p-3 h-9"
                    + " focus:ring-indigo-300 focus:ring-opacity-40 dark:focus:border-indigo-300 focus:ring-2 focus:outline-none"}>
                <svg className="w-2 h-2 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                </svg>
            </button>
            <input type="text" placeholder={props.placeholder} value={props.value} onChange={e => props.setValue((_) => e.target.value)} required aria-describedby="helper-text-explanation" 
                className={
                    "bg-gray-50 border-x-0 border-gray-300 h-9 text-center text-gray-900 text-sm"
                    + " focus:ring-indigo-300 focus:border-indigo-300 block w-full py-2.5 dark:bg-gray-800"
                    + " dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500"
                    + " dark:focus:border-indigo-300 focus:ring-opacity-40"} />
            <button type="button" id="increment-button" onClick={increment} 
                className={
                    "bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-600"
                    + " hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-9"
                    + " focus:ring-indigo-300 focus:ring-opacity-40 dark:focus:border-indigo-300 focus:ring-2 focus:outline-none"}>
                <svg className="w-2 h-2 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
            </button>
        </div>
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">{ props.text }</p>
    </form>
}