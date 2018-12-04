import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockRenderer } from "./interfaces/renderer";

export const pages = (storyline: Tripetto.Storyline<IBlockRenderer>) => {
    const p = storyline.pages;

    return (
        p.length > 0 && (
            <div className="col-md-auto">
                <ul className="pagination mb-0">
                    {p.map((page: Tripetto.IPage) => (
                        <li key={page.number} className={`page-item${page.active ? " active" : ""}`}>
                            <span className="page-link" onClick={() => page.activate()}>
                                {page.number}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};
