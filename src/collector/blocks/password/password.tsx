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
        const slot = Tripetto.assert(this.slot("password"));
        const password = Tripetto.assert(this.value<string>(slot));

        return (
            <div className="form-group">
                {h.name(slot.required, this.key())}
                {h.description}
                <input
                    key={this.key()}
                    id={this.key()}
                    type="password"
                    required={slot.required}
                    defaultValue={password.value}
                    placeholder={h.placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (password.value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = password.string)}
                    className="form-control"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                />
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
