export interface ICollectorSettings {
    /** Specifies if block enumerators (question numbers) should be displayed. */
    enumerators: boolean;

    /** Specifies if the page indicators should be displayed (only available in paginated mode). */
    pages: boolean;

    /** Specifies the display mode of the navigation buttons. */
    buttons: "inline" | "sticky";

    /** Specifies if the progressbar should be displayed. */
    progressbar: boolean;
}
