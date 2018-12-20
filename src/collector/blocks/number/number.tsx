import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Number } from "tripetto-block-number/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-number"
})
export class NumberBlock extends Number implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name(this.required, this.key())}
                {h.description}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">#</span>
                    </div>
                    <input
                        key={this.key()}
                        id={this.key()}
                        type="text"
                        required={this.required}
                        defaultValue={this.value}
                        placeholder={h.placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            this.value = e.target.value;
                        }}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                            const el = e.target;

                            this.focus();

                            // Switch to number type when focus is gained.
                            el.value = this.value;
                            el.type = "number";
                            el.step = this.stepSize;
                            el.classList.remove("is-invalid");
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            const el = e.target;

                            this.blur();

                            // Switch to text type to allow number prefix and suffix.
                            el.type = "text";
                            el.value = this.value;
                            el.classList.toggle("is-invalid", this.isFailed);
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
