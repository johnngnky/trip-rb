import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { IRadiobutton, Radiobuttons } from "tripetto-block-radiobuttons/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-radiobuttons"
})
export class RadiobuttonsBlock extends Radiobuttons implements IBlockRenderer {
    private set(button: Tripetto.Value<string>, id: string | undefined): void {
        const selectedButton = Tripetto.findFirst(this.props.buttons, (radiobutton: IRadiobutton) => radiobutton.id === id);

        button.set(selectedButton && (selectedButton.value || selectedButton.name), id);
    }

    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name(this.required)}
                {h.description}
                {this.props.buttons.map(
                    (radiobutton: IRadiobutton) =>
                        radiobutton.name && (
                            <div key={this.key(radiobutton.id)} className="custom-control custom-radio">
                                <input
                                    type="radio"
                                    key={this.key(radiobutton.id)}
                                    id={this.key(radiobutton.id)}
                                    name={this.key()}
                                    defaultChecked={this.isSelected(radiobutton)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        this.select(radiobutton);
                                    }}
                                    className="custom-control-input"
                                    aria-describedby={this.node.explanation && this.key("explanation")}
                                />
                                <label htmlFor={this.key(radiobutton.id)} className="custom-control-label">
                                    {radiobutton.name}
                                </label>
                            </div>
                        )
                )}
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
