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
    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name(this.required, this.key())}
                {h.description}
                <input
                    key={this.key()}
                    id={this.key()}
                    type="url"
                    required={this.required}
                    defaultValue={this.urlSlot.value}
                    placeholder={h.placeholder || "https://"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.urlSlot.value = e.target.value;
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.classList.remove("is-invalid");
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.urlSlot.string;
                        e.target.classList.toggle("is-invalid", this.isFailed);
                    }}
                    className="form-control"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                />
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
