import { Editor, IDefinition } from "tripetto";
import "./index.scss";
import "tripetto-block-checkbox";
import "tripetto-block-checkboxes";
import "tripetto-block-dropdown";
import "tripetto-block-email";
import "tripetto-block-number";
import "tripetto-block-password";
import "tripetto-block-radiobuttons";
import "tripetto-block-text";
import "tripetto-block-textarea";
import "tripetto-block-url";

export const render = (editorElement: HTMLElement | null, definition?: IDefinition) =>
    Editor.open(definition, {
        controls: "right",
        element: editorElement,
        disableLogo: false,
        disableSaveButton: true,
        disableRestoreButton: true,
        disableClearButton: false,
        disableEditButton: true,
        disableCloseButton: true,
        disableTutorialButton: false,
        disableOpenCloseAnimation: true,
        disableZoombar: false,
        supportURL: false,
        showTutorial: false,
        zoom: "fit-horizontal"
    });
