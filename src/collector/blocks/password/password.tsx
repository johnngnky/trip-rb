import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Password } from "tripetto-block-password/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-password"
})
export class PasswordBlock extends Password implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name(this.required, this.key())}
                {h.description}
                <input
                    key={this.key()}
                    id={this.key()}
                    type="password"
                    required={this.required}
                    defaultValue={this.passwordSlot.value}
                    placeholder={h.placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.passwordSlot.value = e.target.value;
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.classList.remove("is-invalid");
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        e.target.value = this.passwordSlot.string;
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
