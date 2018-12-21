import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Email } from "tripetto-block-email/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-email"
})
export class EmailBlock extends Email implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name(this.required, this.key())}
                {h.description}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">@</span>
                    </div>
                    <input
                        key={this.key()}
                        id={this.key()}
                        type="email"
                        required={this.required}
                        defaultValue={this.emailSlot.value}
                        placeholder={h.placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            this.emailSlot.value = e.target.value;
                        }}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                            e.target.classList.remove("is-invalid");
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            e.target.value = this.emailSlot.string;
                            e.target.classList.toggle("is-invalid", this.isFailed);
                        }}
                        className="form-control"
                        aria-describedby={this.node.explanation && this.key("explanation")}
                    />
                </div>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
