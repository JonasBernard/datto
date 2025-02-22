import { useEffect, useState } from "react";
import "./App.css";
import KidsList from "./kids/Kidslist";
import Workshoplist from "./workshops/WorkshopList";
import ResultView from "./ResultView";
import Button from "./components/Button";
import NavBar from "./Navbar";
import Card from "./components/Card";
import WelcomePage from "./Welcomepage";
import SettingsTab from "./SettingsTab";
import Badge from "./components/Badge";

const APIBASE = process.env.REACT_APP_API_BASEURL || "http://localhost:5000";

function saveData(kids, workshops, settings) {
  localStorage.dataV1 = JSON.stringify({
    kids: kids,
    workshops: workshops,
    settings: settings,
  })
}

function loadData() {
  if (localStorage.dataV1) {
    let data = JSON.parse(localStorage.dataV1);
    if (data.kids.length > 0 || data.workshops.length > 0)
      return [true, data.kids, data.workshops, data.settings]
  }
  return [false, [], []];
}

function App() {
  const [kids, setKids] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [settings, setSettings] = useState({});
  const [result, setRequestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentTab, setTab] = useState(3);

  useEffect(() => {
    let [loaded,k,w,s] = loadData();
    if (loaded) {
      
      setKids(k); setWorkshops(w); setTab(2);
      s && setSettings(s);

      setInfoMessage("Es wurden Daten aus deiner letzten Sitzung wiederhergestellt.");
    }
  }, []);

  useEffect(() => {
    saveData(kids, workshops, settings);
  }, [kids, workshops, settings]);

  const sendData = () => {
    setErrorMessage("");
    setWarningMessage("");
    setRequestResult(null);

    const kidsOrig = kids;
    const workshopsOrig = workshops;

    if (kidsOrig.map(k=>k.name).length > [...new Set(kidsOrig.map(k=>k.name))].length) {
      setWarningMessage("Es gibt mehrere Teilnehmer mit dem gleichem Namen. Das kann zu Problemen führen.");
    }

    if (kidsOrig.filter(k => k.name === "").length > 0) {
      setWarningMessage("Es gibt einen Teilnehmer mit leerem Namen. Das kann zu Problemen führen.");
    }

    const kidsWithDoubleWishes = kidsOrig.filter(k => {
      return k.wishes.filter(w => w !== "").length > [...new Set(k.wishes.filter(w => w !== ""))].length;
    });
    if (kidsWithDoubleWishes.length > 0) {
      setWarningMessage("Es gibt Teilnehmer die sich den gleichen Workshop mehrfach wünschen: " + kidsWithDoubleWishes.map(k => k.name).join(", ") + ".");
    }
    
    if (workshopsOrig.filter(w => w.name === "").length > 0) {
      setErrorMessage("Es gibt einen Workshop mit leerem Namen. Das muss behoben werden bevor eine Einteilung gefunden werden kann.")
      return;
    }

    if (workshopsOrig.filter(w => w.capacity === 0).length > 0) {
      setErrorMessage("Es gibt einen Workshop mit Kapazität null. Dieser muss gelöscht werden bevor eine Einteilung gefunden werden kann.")
      return;
    }

    saveData(kidsOrig, workshopsOrig);

    const path = settings.useWeighted ? "/weighted" : "/unweighted";

    setIsLoading(true);
    fetch(APIBASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kids: kidsOrig,
        workshops: workshopsOrig,
        settings: settings,
      }),
    })
      .then((response) => response.json())
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setErrorMessage("Failed to parse JSON: " + err.message);
      })
      .then((actualData) => {
        setIsLoading(false);
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
        <div className="flex flex-col items-center">

          <div className="m-4 absolute z-10">
            <Badge message={infoMessage} setMessage={setInfoMessage} className="bg-indigo-400"></Badge>
          </div>

          <Card extraStyle="container">
            <div className="flex justify-between overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                <div className="flex">
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
                      Einteilen
                  </button>
                </div>

                <div className="flex">
                  <button onClick={() => setTab(3)} className={
                      "inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base "
                      + (
                        currentTab === 3
                        ? "text-blue-600 border-blue-500 dark:border-blue-400 dark:text-blue-300 "
                        : "text-gray-700 border-transparent dark:text-white focus:outline-none hover:border-gray-400 ")
                      + "whitespace-nowrap focus:outline-none"}>
                      So funktioniert's
                  </button>
                </div>  
            </div>


            {currentTab === 0 && <div className="pt-3">
              <Workshoplist workshops={workshops} setWorkshops={setWorkshops} />
            </div>}
            {currentTab === 1 && <div className="pt-3">
              <KidsList
                kids={kids}
                setKids={setKids}
                workshopNames={workshops.map(w => w.name)}
                initialSettings={settings}
                setSettings={setSettings}
              />
            </div>}

            {currentTab === 2 && <div className="pt-3 flex flex-col">
              <SettingsTab initialSettings={settings} setSettings={setSettings}></SettingsTab>
              <div className="mt-12">
                <Button disabled={isLoading} disabledWithloading={isLoading} onClick={sendData}>
                  {!isLoading ? "Gruppen jetzt einteilen" : "Gruppen werden eingeteilt..."}
                </Button>
              </div>
              <div className="m-4">
                <Badge message={errorMessage} setMessage={setErrorMessage} className="bg-rose-600 text-stone-100"></Badge>
              </div>
               <div className="m-4">
                <Badge message={warningMessage} setMessage={setWarningMessage} className="bg-yellow-400"></Badge>
              </div>
              <ResultView result={result} />
            </div>}

            {currentTab === 3 && <div className="pt-3">
              <WelcomePage setTab={setTab}></WelcomePage>
            </div>}

          </Card>
          
        </div>
      </div>
    </div>
  );
}

export default App;
