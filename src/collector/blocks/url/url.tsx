import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { URL } from "tripetto-block-url/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-url"
})
export class URLBlock extends URL implements IBlockRenderer {
    render(h: IBlockHelper): JSX.Element {
        const slot = Tripetto.assert(this.slot("url"));
        const url = Tripetto.assert(this.value<string>(slot));

        return (
            <div className="form-group">
                {h.name(slot.required, this.key())}
                {h.description}
                <input
                    key={this.key()}
                    id={this.key()}
                    type="url"
                    required={slot.required}
                    defaultValue={url.value}
                    placeholder={h.placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (url.value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = url.string)}
                    className="form-control"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                />
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
