export default function Badge(props) {
  return (
    <>
      {props.message && (
        <div
          className={
            props.className +
            " rounded-xl text-black p-4 flex justify-between items-center gap-2"
          }
        >
          {Array.isArray(props.message) ? (
            <div className="flex flex-col gap-2">
              {props.message.map((e) => {
                return <span key={e}>{e}</span>;
              })}
            </div>
          ) : (
            props.message
          )}
          <button
            type="button"
            onClick={() => props.setMessage("")}
            className="text-gray-900 bg-transparent hover:bg-opacity-25
                hover:bg-gray-200 hover:text-gray-900
                dark:hover:bg-gray-600 dark:hover:bg-opacity-25
                rounded-lg text-sm w-8 h-8 ms-auto
                inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Nachricht schließen</span>
          </button>
        </div>
      )}
    </>
  );
}
