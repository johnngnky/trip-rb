export interface ICollectorSettings {
    /** Specifies if block numerators (question numbers) should be displayed. */
    numerators: boolean;

    /** Specifies if the page indicators should be displayed (only available in paginated mode). */
    pages: boolean;

    /** Specifies the display mode of the navigation buttons. */
    buttons: "inline" | "sticky";

    /** Specifies if the progressbar should be displayed. */
    progressbar: boolean;
}
