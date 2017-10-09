import "./providers";
import * as Superagent from "superagent";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Collector } from "./component";

// Fetch our form and render the collector component.
Superagent.get("form.json").end((error: {}, response: Superagent.Response) => {
    if (response.ok) {
        ReactDOM.render(<Collector definition={response.text} />, document.getElementById("app"));
    } else {
        alert("Bummer! Cannot load form definition. Does the file exists?");
    }
});
