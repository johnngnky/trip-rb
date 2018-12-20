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
        const slot = Tripetto.assert(this.slot("email"));
        const email = Tripetto.assert(this.value<string>(slot));

        return (
            <div className="form-group">
                {h.name(slot.required, this.key())}
                {h.description}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">@</span>
                    </div>
                    <input
                        key={this.key()}
                        id={this.key()}
                        type="email"
                        required={slot.required}
                        defaultValue={email.value}
                        placeholder={h.placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (email.value = e.target.value)}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = email.string)}
                        className="form-control"
                        aria-describedby={this.node.explanation && this.key("explanation")}
                    />
                </div>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
