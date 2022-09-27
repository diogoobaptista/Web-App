import { Tooltip } from "@material-ui/core";
import React from "react";
import { Component } from "react";

export default class HeaderCreate extends Component {

    render() {
        const { name, description, closeRightSection } = this.props;
        return (
            <div className="header">
                <h1 className="header-text" title={name} data-testid="header">{name}</h1>
                <p data-testid="description-para">{description}</p>

                <Tooltip title="Close Section">
                    <div className="icon-close">
                        <i className="material-icons" onClick={() => closeRightSection()} data-testid="id">close</i>
                    </div>
                </Tooltip>
            </div>
        )
    }
};
