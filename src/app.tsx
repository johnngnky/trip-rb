import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Superagent from "superagent";
import { Collector, ICollectorSnapshot } from "tripetto-collector-standard-bootstrap";
import { Export, ISnapshot, Instance } from "tripetto-collector";
import { Header } from "./header/header";
import { Editor, IDefinition, IEditorChangeEvent, IEditorEditEvent, IEditorReadyEvent } from "tripetto";
import "./app.scss";

/**
 * The collector package also contains the editor implementation of the blocks.
 * We import them here, so the editor can use the blocks.
 */
import "tripetto-collector-standard-bootstrap/editor/es5";

// For this demo we use the local store to save the definition and snapshot.
// Here we try to retrieve that saved data.
const DEFINITION = "tripetto-example-react-bootstrap-definition";
const SNAPSHOT = "tripetto-example-react-bootstrap-snapshot";
const definition: IDefinition = JSON.parse(localStorage.getItem(DEFINITION) || "null") || undefined;
const snapshot: ISnapshot<ICollectorSnapshot> = JSON.parse(localStorage.getItem(SNAPSHOT) || "null") || undefined;
let demoDefinition: IDefinition;

// Fetch our demo form
Superagent.get("demo.json").end((error: {}, response: Superagent.Response) => {
    if (response.ok) {
        demoDefinition = JSON.parse(response.text);

        // If there was no definition found in the local store, use our demo definition.
        if (!definition) {
            editor.load(demoDefinition);
        }
    }
});

// Create the editor.
const editor = Editor.open(definition, {
    element: document.getElementById("editor"),
    fonts: "fonts/",
    disableSaveButton: true,
    disableRestoreButton: true,
    disableClearButton: false,
    disableCloseButton: true,
    supportURL: false,
    disableOpenCloseAnimation: true,
    showTutorial: true,
    zoom: "fit-horizontal"
});

// Wait until the editor is ready!
editor.hook("OnReady", "synchronous", (editorEvent: IEditorReadyEvent) => {
    const header = React.createRef<Header>();
    const collector = React.createRef<Collector>();

    // Render the collector component and feed the initial definition from the editor.
    ReactDOM.render(
        <Collector
            ref={collector}
            definition={editorEvent.definition}
            snapshot={snapshot}
            onChange={() => {
                if (header.current) {
                    header.current.forceUpdate();
                }
            }}
            onEditRequest={(nodeId: string) => editor.edit(nodeId)}
            onFinish={(i: Instance) => {
                // Output the collected data to the console for demo purposes.
                console.dir(Export.fields(i));

                // Output can also be exported as CSV for your convenience.
                console.dir(Export.CSV(i));
            }}
            onPaused={(s: ISnapshot<ICollectorSnapshot>) => {
                // Store the snapshot in the local store, so we can restore it on browser refresh.
                localStorage.setItem(SNAPSHOT, JSON.stringify(s));
            }}
        />,
        document.getElementById("collector")
    );

    // Render the header component.
    ReactDOM.render(
        <Header
            ref={header}
            editor={editor}
            collector={collector}
            reset={() => {
                localStorage.removeItem(DEFINITION);
                localStorage.removeItem(SNAPSHOT);

                editor.definition = demoDefinition;

                if (collector.current) {
                    collector.current.restart();
                }
            }}
        />,
        document.getElementById("header")
    );

    // Store the definition in the local store upon each editor change and reload the collector
    editor.hook("OnChange", "synchronous", (changeEvent: IEditorChangeEvent) => {
        // Store the definition in the persistent local store
        localStorage.setItem(DEFINITION, JSON.stringify(changeEvent.definition));

        // Reload the collector with the new definition
        if (collector.current) {
            collector.current.reload(changeEvent.definition);
        }
    });

    editor.hook("OnEdit", "synchronous", (editEvent: IEditorEditEvent) => {
        if (collector.current && collector.current.view !== "normal" && editEvent.type === "node" && editEvent.id) {
            collector.current.requestPreview(editEvent.id);
        }
    });

    const fnResize = () => {
        editor.resize();

        if (collector.current) {
            collector.current.resize();
        }
    };

    // When the host window resizes, we should notify the editor and collector component about that.
    window.addEventListener("resize", () => fnResize());
    window.addEventListener("orientationchange", () => fnResize());
});
