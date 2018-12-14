import { Editor, IDefinition } from "tripetto";
import "./blocks";
import "./editor.scss";

export const render = (editorElement: HTMLElement | null, definition?: IDefinition) =>
    Editor.open(definition, {
        element: editorElement,
        disableSaveButton: true,
        disableRestoreButton: true,
        disableClearButton: false,
        disableCloseButton: true,
        supportURL: false,
        disableOpenCloseAnimation: true,
        showTutorial: true,
        zoom: "fit-horizontal"
    });
