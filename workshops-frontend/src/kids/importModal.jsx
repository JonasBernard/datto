import { Modal } from "flowbite-react";
import { useState } from "react";
import Button from "../components/Button";
import FileDropzone from "../components/FileDropzone";
import Badge from "../components/Badge";
import { importExcel } from "./importExcel";

export default function ImportModalWithButton(props) {
  const [openModal, setOpenModal] = useState(false);
  const [importableKids, setImportableKids] = useState([]);

  const ImportNow = () => {
    props.onImportKids(importableKids);
    setImportableKids([]);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const removeKid = (id) => {
    setImportableKids(importableKids.filter(k => k.id !== id));
}

  const onDropFile = (event) => {
    event.preventDefault();
    event.dataTransfer && (event.dataTransfer.dropEffect = 'copy');
    
    // See https://stackoverflow.com/questions/11573710/event-datatransfer-files-is-empty-when-ondrop-is-fired
    if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        onSelectFile(event.dataTransfer.items[0].getAsFile(), () => {});
    } else if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        onSelectFile(event.dataTransfer.files[0], () => {});
    } else if (event.originalEvent && event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.items && event.originalEvent.dataTransfer.items.length > 0) {
        onSelectFile(event.originalEvent.dataTransfer.items[0].getAsFile(), () => {});
    } else if (event.originalEvent && event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.files && event.originalEvent.dataTransfer.files.length > 0) {
        onSelectFile(event.originalEvent.dataTransfer.files[0], () => {});
    } else {
        setErrorMessage("Fehler beim Lesen der Datei. Versuche es mit einem Klick auf das Upload-Feld oder einem anderen Brwoser.");
    }
  }

  const onChangeFile = (event) => {
    if (
        !event ||
        !event.target ||
        !event.target.files ||
        !event.target.files[0]
    ) {
        setErrorMessage("Fehler beim Lesen der Datei.");
        event.target.value = "";
        return;
    }

    onSelectFile(event.target.files[0], () => event.target.value = "");
  }

  const onSelectFile = async (file, resetTargetForm) => {
    if (!file.name.endsWith(".xlsx")) {
      setErrorMessage(
        "Es wurde keine Excel-Datei ausgewählt. Es können nur Excel-Dateien importiert werden."
      );
      resetTargetForm();
      return;
    }

    try {
      const [importedKids, sheetNames] = await importExcel(
        file,
        props.maxWishCount
      );

      if (sheetNames.length === 1) {
        setSuccessMessage([
          "Es wurde folgende Datei geladen: " +
            file.name +
            ". ",
          "Die Datei enthält ein Tabellenblatt: " +
            sheetNames.join(", ") +
            ". Dieses Blatt wird importiert.",
          "Es wurde" +
            (importedKids.length > 1 ? "n" : "") +
            " " +
            importedKids.length +
            " Teilnehmer gefunden.",
        ]);
      } else {
        setSuccessMessage([
          "Es wurde folgende Datei geladen: " +
            file.name +
            ". ",
          "Die Datei enthält folgende Tabellenblätter: " +
            sheetNames.join(", ") +
            ".",
          "Nur das erste Tabellenblatt (" +
            sheetNames[0] +
            ") wird importiert.",
          "Es wurde" +
            (importedKids.length > 1 ? "n" : "") +
            " " +
            importedKids.length +
            " Teilnehmer gefunden.",
        ]);
      }

      setImportableKids(importedKids);

      resetTargetForm();
    } catch (e) {
      setErrorMessage("Fehler beim Lesen der Datei: " + e);
      resetTargetForm();
      return;
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
        bgColor="bg-green-800 focus:ring-green-200"
      >
        {props.children}
      </Button>

      <Modal dismissible size="6xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Importieren</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Es kann eine einzelne Excel-Datei (.xlsx) ausgewählt werden, um
              daraus Teilnehmer zu importieren. Dabei wird nur das erste
              Tabellenblatt beachtet und in diesem müssen die Teilnehmer
              zeilenweise aufgelistet werden. Die erste Zeile muss bereits der
              erste Teilnehmer sein. Die Spalte A muss die Namen enthalten, die
              Spalten B, C, D, usw. die Wünsche. Alle weiteren Spalten werden ignoriert.
            </p>

            <Badge
              message={errorMessage}
              setMessage={setErrorMessage}
              className="bg-rose-600 text-stone-100"
            ></Badge>
            <Badge
              message={successMessage}
              setMessage={setSuccessMessage}
              className="bg-indigo-400"
            ></Badge>

            {!errorMessage && !successMessage && (
              <FileDropzone
                fileTypes="Excel-Datei (.xlsx)"
                fileFilter=".xlsx"
                onChange={onChangeFile}
                onDrop={onDropFile}
              ></FileDropzone>
            )}

            {importableKids.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Erst-Wunsch
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Zweit-Wunsch
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Dritt-Wunsch
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Viert-Wunsch
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Fünft-Wunsch
                    </th>


                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-centertext-gray-500 dark:text-gray-400"
                    >
                      Sechst-Wunsch
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 px-2 text-sm whitespace-nowrap"
                    >
                      <span className="sr-only">Löschen</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 dark:bg-opacity-40">
                  {importableKids.map((k) => (
                    <tr key={k.id}>
                      <td className="px-2 py-2 text-sm font-medium whitespace-nowrap">
                        <h2 className="font-medium text-gray-800 dark:text-white text-center">
                          {k.name}
                        </h2>
                      </td>
                      {[...Array(props.maxWishCount)].map((x, i) => {
                        return (
                          <td className={"px-2 py-2 text-sm whitespace-nowrap dark:text-stone-100 text-center"}>
                            <span
                              className={
                                props.workshopNames.includes(k.wishes[i]) ||
                                k.wishes[i] === "" || k.wishes[i] === null || k.wishes[i] === undefined
                                  ? ""
                                  : "px-4 py-1 rounded-xl bg-yellow-500 text-black"
                              }
                            >
                              {k.wishes[i]}
                            </span>
                          </td>
                        );
                      })}

                      <td className="px-2 py-2 text-sm whitespace-nowrap">
                        <Button
                          bgColor="bg-red-500 dark:bg-rose-600 dark:text-stone-100 p-2"
                          onClick={() => removeKid(k.id)}
                        >
                          Nicht importieren
                        </Button>
                      </td>
                    </tr>
                  ))}

                  
                <tr className="text-gray-500 dark:text-gray-400 text-sm">
                    <td className="p-1 text-center">
                    <span>Anzahl Teilnehmer: {importableKids.length}</span>
                    </td>
                    {[...Array(props.maxWishCount)].map((x, i) => {
                    return (
                        <td className="p-1 text-center" key={i}>
                        <span>
                            Anzahl gesetzer Wünsche in dieser Spalte:{" "}
                            {importableKids.reduce(
                              (a, b) => (b.wishes[i] !== ""? a + 1 : a),
                            0
                            )}
                        </span>
                        </td>
                    );
                    })}
                    <td></td>
                </tr>
                </tbody>
              </table>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-end">
            <Button
              disabled={
                errorMessage !== "" ||
                importableKids.length === 0
              }
              onClick={() => {
                ImportNow();
                setOpenModal(false);
              }}
            >
              Importieren
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
