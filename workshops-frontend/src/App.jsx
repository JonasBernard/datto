import { useState } from "react";
import "./App.css";
import KidsList from "./kids/Kidslist";
import Workshoplist from "./workshops/WorkshopList";
import ResultView from "./ResultView";
import Button from "./components/Button";
import NavBar from "./Navbar";
import Card from "./components/Card";

function App() {
  const [kids, setKids] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [result, setRequestResult] = useState(null);

  const [currentTab, setTab] = useState(0);

  const sendData = () => {
    setErrorMessage("");
    setWarningMessage("");
    setRequestResult(null);

    const kidsOrig = kids;
    const workshopsOrig = workshops;

    if (kidsOrig.map(k=>k.name).length > [...new Set(kidsOrig.map(k=>k.name))].length) {
      setWarningMessage("Es gibt mehrere Teilnehmer mit dem gleichem Namen. Das kann zu Problemen führen.");
    }

    if (kidsOrig.filter(k => k.name == "").length > 0) {
      setWarningMessage("Es gibt einen Teilnehmer mit leerem Namen. Das kann zu Problemen führen.")
    }
    
    if (workshopsOrig.filter(w => w.name == "").length > 0) {
      setErrorMessage("Es gibt einen Workshop mit leerem Namen. Das muss behoben werden bevor eine Lösung gefunden werden kann.")
      return;
    }

    if (workshopsOrig.filter(w => w.capacity == 0).length > 0) {
      setErrorMessage("Es gibt einen Workshop mit Kapazität null. Dieser muss gelöscht werden bevor eine Lösung gefunden werden kann.")
      return;
    }


    fetch("/api/weighted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kids: kidsOrig,
        workshops: workshopsOrig,
      }),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to parse JSON: " + err.message);
      })
      .then((actualData) => {
        const result = {
          ...actualData,
          kids: kidsOrig,
          workshops: workshopsOrig,
        }
        setRequestResult(result);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="App dark:bg-slate-700 dark:text-stone-100 h-screen">
      <div className="dark:bg-slate-700 dark:text-stone-100 h-100">
        <NavBar></NavBar>
        <div className="flex justify-center">

          <Card extraStyle="container">
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                <button onClick={() => setTab(0)} 
                  className={
                    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base " 
                    + (
                      currentTab === 0
                      ? "text-blue-600 border-blue-500 dark:border-blue-400 dark:text-blue-300 "
                      : "text-gray-700 border-transparent dark:text-white focus:outline-none hover:border-gray-400 ")
                    + "whitespace-nowrap focus:outline-none"}>
                    Workshops
                </button>

                <button onClick={() => setTab(1)} className={
                    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base " 
                    + (
                      currentTab === 1
                      ? "text-blue-600 border-blue-500 dark:border-blue-400 dark:text-blue-300 "
                      : "text-gray-700 border-transparent dark:text-white focus:outline-none hover:border-gray-400 ")
                    + "whitespace-nowrap focus:outline-none"}>
                    Teilnehmer
                </button>

                <button onClick={() => setTab(2)} className={
                    "inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base " 
                    + (
                      currentTab === 2
                      ? "text-blue-600 border-blue-500 dark:border-blue-400 dark:text-blue-300 "
                      : "text-gray-700 border-transparent dark:text-white focus:outline-none hover:border-gray-400 ")
                    + "whitespace-nowrap focus:outline-none"}>
                    Ergebnis
                </button>
            </div>


            {currentTab === 0 && <div className="pt-3">
              <Workshoplist workshops={workshops} setWorkshops={setWorkshops} />
            </div>}
            {currentTab === 1 && <div className="pt-3">
              <KidsList kids={kids} setKids={setKids} workshopNames={workshops.map(w => w.name)} />
            </div>}

            {currentTab === 2 && <div className="pt-3">
              <div>
                <Button onClick={sendData}>Lösung finden...</Button>
              </div>
              <div className="m-4">
                {errorMessage && (
                  <div className="rounded-full bg-pink-400 text-black p-4">
                    {errorMessage}
                    <span
                      onClick={() => setErrorMessage("")}
                      className="m-4 text-black cursor-pointer"
                    >
                      x
                    </span>
                  </div>
                )}
              </div>
               <div className="m-4">
                {warningMessage && (
                  <div className="rounded-full bg-yellow-400 text-black p-4">
                    {warningMessage}
                    <span
                      onClick={() => setWarningMessage("")}
                      className="m-4 text-black cursor-pointer"
                    >
                      x
                    </span>
                  </div>
                )}
              </div>
              <ResultView result={result} />
            </div>}

          </Card>
          
        </div>
      </div>
    </div>
  );
}

export default App;
