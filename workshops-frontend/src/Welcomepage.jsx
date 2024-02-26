import { useState } from "react";

export default function WelcomePage(props) {
  const setTab = props.setTab;

  return (
    <>
      <h1 className="mt-10 text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
        Herzlich Wilkommen
      </h1>
      <h3 className="text-md">
        Das ist mein selbst entworfenes Gruppen-Tool, mit dem du Teilnehmer in
        Gruppen einteilen kannst.
      </h3>

      <hr className="dark:opacity-20 mt-4" />

      <div className="container px-6 py-6 mx-auto text-left">
        <div className="mt-8 space-y-8 lg:mt-12">
          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Wie lege ich die Gruppen und die Teilnehmer fest?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Unter dem Reiter{" "}
              <a className="cursor-pointer" onClick={() => setTab(0)}>
                Workshops
              </a>{" "}
              kannst du verschiedene Gruppen mit ihrem Namen und einer maximalen
              Anzahl an Teilnehmern angeben.
            </p>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Anschließend kannst du im daneben liegeneden Reiter{" "}
              <a className="cursor-pointer" onClick={() => setTab(1)}>
                Teilnehmer
              </a>{" "}
              einige Namen von Personen angeben, die in die Workshops eingeteilt
              werden sollen. Jeder kann (muss aber nicht) bis zu drei Wünsche
              abgeben.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Wie teile ich die Gruppen ein?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Unter dem Reiter{" "}
              <a className="cursor-pointer" onClick={() => setTab(2)}>
                Einteilen
              </a>{" "}
              kannst du deine Daten an den Server übermitteln und eine
              Einteilung anfordern. Es wird mittelhilfe eines mathmatischen
              Algorithmus eine Einteilung berechnet, die die maximalen
              Kapzitäten der Workshops berückslichtigt und dabei möglichst allen
              Teilnehmern ihre Wünsche erfüllt.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Was ist, wenn es mehrere Möglichkeiten gibt?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Wenn es verschiedene gleichwertige Einteilgungen gibt (d.h.
              Einteilgungen, bei denen gleich viele Teilnehmer ihren Erst- bzw.
              Zweit. bzw. Dritt-Wunsch erhalten), dann wird das Tool davon
              zufällig eine auswählen.
              <br />
              <br />
              Wenn du mehrfach auf den Button "Gruppen jetzt einteilen" klickst,
              kannst du verschiedene zufällig generierte Einteilgungen ansehen.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Werden meine Daten/Ergebnisse gespeichert?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Deine angegebenen Daten (Workshops und Teilnehmer) werden in
              deinem Browser gespeichert und wieder geladen, wenn du diese Seite
              zu einem späteren Zeitpunkt wieder aufrufst. Außerdem werden die
              Workshops und Teilnehmer an den Server geschickt, dort zur
              Verarbeitung kurzzeitig gespeichert und dann gelöscht. Deine
              Einteilgung wird nicht von selbst gespeichert. Du kannst aber eine
              Excel-Datei mit allen Namen abspeichern.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Wie funktioniert die Zuteilung genau?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Es sei zum Anfang gesagt: Es wird zu jedem Zeitpunkt
              sichergestellt, dass keiner der Workshops seine Kapazität
              überschreitet.
              <br />
              <br />
              Unter dieser Bedigung werden in zufälliger Reihnfolge Teilnehmer
              ihren Wünschen zugeordnet. Dabei werden Erst-Wünsche natürlich
              gegenüber Zweit-Wünschen und diese gegenüber Dritt-Wünschen
              priorisiert, sofern die entsprechende Einstellung aktiv ist.
              <br />
              <br />
              Dabei kann es passieren, dass bereits zutegeilte Teilnehmer,
              wieder aus der Gruppe herausgenommen werden, wenn das Platz für
              einen Teilnehmer schafft, der sich diese Gruppe mit höherer
              Priorität wünscht.
              <br />
              <br />
              Das passiert solange, bis alle Teilnehmer eingeteilt sind (oder
              das Tool merkt, dass die Kapazität der Workshops nicht für alle
              Teilnehmer ausreicht.)
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Was passiert, wenn ein Teilnehmer nirgends zugeordnet werden kann?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Es gibt zwei verschiedene Probleme, durch die das vorkommen kann.
              <br />
              <br />
              <span className="font-bold">1. Kapazität reicht nicht aus. </span>
              Wenn die Anzahl der Teilnehmer größer ist als die Summe der
              Kapazitäten der Workshops, wird es unweigerlich zum Fall kommen,
              dass Teilnehmer nicht zugeteilt werden können. In diesem Fall wird
              das Tool darauf mit einer Warnung hinweisen und eine Einteilung
              angeben, in der möglichst viele Teilnehmer zugeteilt wurden. In
              diese Einteilung werden diejenigen Teilnehmer aufgenommen, die am
              besten zu den verfügbaren Plätzen passen.
              <br />
              <br />
              <span className="font-bold">
                2. Der Teilnehmer kann keinen seiner drei Wünsche erhalten.{" "}
              </span>
              In diesem Fall kann es passieren, dass der Teilnehmer in einen
              Workshop eingeteilt wird, den er sich nicht wünscht. Das Tool
              versucht jedoch sehr stark, das zu vermeiden.
              Dieses verhalten kann abgeschaltet werden, indem die Option
              "Einteilung in nicht gewünschte Workshops zulassen" deaktiviert wird.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
