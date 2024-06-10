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
              Namen von Personen angeben, die in die Workshops eingeteilt
              werden sollen. Jeder kann bis zu drei Wünsche
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
              Einteilung anfordern. Das Tool berechnet mit Hilfe eines mathmatischen
              Algorithmus eine Einteilung, die die maximalen
              Kapzitäten der Workshops berückslichtigt und dabei möglichst vielen
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
              deinem Browser gespeichert und erneut in die Tabellen gefüllt, wenn du diese Seite
              zu einem späteren Zeitpunkt wieder aufrufst. Außerdem werden die
              Workshops und Teilnehmer, sobald du auf "Gruppen jetzt einteilen" klickst, an einen Server geschickt, dort zur
              Verarbeitung kurzzeitig gespeichert und dann gelöscht. Deine dabei entstandene
              Einteilgung wird nicht gespeichert. Du kannst aber eine
              Excel-Datei mit allen Namen und ihren Workshop herunterladen und abspeichern.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Wie funktioniert die Einteilung genau?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              Es wird zu jedem Zeitpunkt
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
              Es kann passieren, dass es einen Teilnehmer gibt, der keinen seiner Wünsche erfüllt
              bekommen kann. 
              Je nach Einstellung der Option "Einteilung in nicht gewünschte Workshops zulassen"
              wird ein solcher Teilnehmer einem noch freien Workshop zugeteilt, oder überheupt nicht
              zugeteilt.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900 dark:bg-opacity-40">
            <h1 className="font-semibold text-gray-700 dark:text-white">
              Wie funktioniert die Einteilung mathematisch nun wirklich ganz ganz genau?
            </h1>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              <span className="font-bold">Modellierung. </span>
              Das Problem wird mathematisch als (nicht-gerichteter, einfacher)
              kanten-gewichteter Graph modelliert.
              Für jeden Teilnehmer und jeden Workshop gibt es jeweils einen Knoten
              in diesem Graphen. Jeder Teilnehmer wird genau mit den Workshops durch
              eine Kante verbunden, die er sich wünscht, und mit der entstandenen
              Kante wird ein Kostenwert (ein Gewicht) assoziiert.
              Dieser Kostenwert hängt davon ab, mit welcher Priorität sich der Teilnehmer den Workshop gewünscht hat.
              Wenn die Wünsche als ungewichtet betrachtet werden, ist der Wert in jedem Fall eins.
              Bei gewichteten Wünschen kostet ein 1.-Wunsch eine, ein 2.-Wunsch vier und ein 3.-Wunsch
              neun Kosteneinheiten.
              Falls die Option "Einteilung in nicht gewünschte Workshops zulassen" gesetzt ist,
              werden alle noch nicht verbundenen Teilnehmer-Workshop-Paare durch eine Kante mit Kosten
              16 verbunden.
              <br />
              <br />
              <span className="font-bold">Problemstellung. </span>
              Als Einteilung (Matching) versteht man (in diesem Kontext) eine Auswahl einiger Kanten aus dem Graphen,
              die so erfolgt, dass jeder Teilnehmer mit genau einem Workshop verbunden ist,
              und jeder Workshop mit maximal so vielen Teilnehmern verbunden ist, wie
              seine Kapazität es erlaubt.
              Da die Wünsche der Teilnehmer (mitunter) als gewichtet betrachtet werden,
              ist es nicht nur das Ziel, ein irgendein Matching zu finden, sondern unter allen Matchings
              die es gibt, eines zu finden, welches minimale Gesamtkosten realisiert.
              Die Gesamtkosten ergibt sich dabei aus der Summe aller Kosten der am Matching beteiligten Kanten.
              <br />
              <br />
              <span className="font-bold">Lösungsansatz. </span>
              Um ein günstiges (auch minimales) Matching zu finden, wird das
              Problem in ein Maximaler Flusswert-Problem (Maximum network flow problem) umformuliert.
              Alle Kanten im Graphen erhalten einen weiteren Wert: eine Kapazität.
              Die Kapazität einer Kante entspricht der gesetzten Kapazität des Workshops, der an einem Ende der Kante liegt.
              Es werden außerdem 2 Knoten in den Graphen hinzugefügt: Ein Quelle (Source), die 
              mit allen Teilnehmer-Knoten verbunden wird,
              und eine Senke (Sink), die mit allen Workshop-Knoten verbunden wird.
              Alle so entstandenen Kanten bekommen beliebige, aber uniforme Kosten- und Kapazitätenwerte,
              in dieser Implementierung "eins".
              
              Nun ist das gesetzt Ziel wie folgt formuliert:
              Wenn wir uns vorstellen, aus der Quelle entspringt Wasser, welches entlang der Kanten
              zur Senke fließt, wie viel Wasser kommt pro Zeiteinheit an der Senke an, wenn pro Zeiteinheit
              nur so viel Wasser entlang der Kanten fließen kann, wie es die Kapazitäten angeben?
            
              Die Angaben, wie viel Wasser wo fließt, wird als Funktion in den Kanten
              dargestellt und als Fluss (Flow) bezeichnet.
              Da die Wünsche der Teilnehmer weiterhin als gewichtet betrachtet werden,
              ist es nicht nur das Ziel, ein irgendeinen Flow zu finden, sondern unter allen Flows
              die es gibt, eines zu finden, welches minimale Gesamtkosten realisiert. Ein Flow kann kann
              in ein Matching überführt werden.
              <br/>
              <br/>
              <span className="font-bold">Min-Cost-Max-Flow. </span>
              Für das genennate Problem gibt es Algorithmen. Eine Methode zum Lösen des Problems
              ist ein sogenannter "Successive Shortest Path"-Algorithmus. Hier wird ein anfänglicher
              Null-Fluss schrittweise entland eines (bezüglich der Kosten) kürzesten (günstigsten)
              Pfades in Richtung eines maxiamlen Flusses erhöht.
              Zum finden der kürzesten Pfade wird in diesem Tool
              eine Implementierung des Bellman-Ford-Moore-Algorithmus verwendet.

              Der Quellcode für die algorithmischen Teile des Tools befinden sich
              hier: https://github.com/JonasBernard/min-cost-max-flow.

              Der Quellcode für die Webseite befindet sich hier: https://github.com/JonasBernard/datto.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
