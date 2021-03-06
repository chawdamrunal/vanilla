/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license Proprietary
 */

import React from "react";
import { t } from "@library/utility/appUtils";
import SmartLink from "@library/routing/links/SmartLink";
import { subcommunityTileClasses } from "@library/features/subcommunities/subcommunityTitleStyles";
import Paragraph from "@library/layout/Paragraph";
import classNames from "classnames";

interface IProps {
    icon: string;
    iconAltText?: string; // If you want alternative alt text, title is passed in
    title: string;
    description: string;
    url: string;
    className?: string;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    fallbackIcon?: React.ReactNode;
}

/**
 * Render a subcommunity tile
 */
export default class SubcommunityTile extends React.Component<IProps> {
    public static defaultProps = {
        headingLevel: 3,
    };
    public render() {
        const { icon, title, description, url, className, iconAltText, headingLevel } = this.props;
        const H = `h${headingLevel}` as "h1";
        const alt = iconAltText ? iconAltText : `${t("Icon for: ")} ${this.props.title}`;
        const classes = subcommunityTileClasses();
        return (
            <div className={classNames("subcommunityTile", className, classes.root)}>
                <SmartLink className={classNames("subcommunityTile-link", classes.link)} to={url}>
                    <div className={classNames("subcommunityTile-iconFrame", classes.frame)}>
                        {icon && (
                            <img className={classNames("subcommunityTile-icon", classes.icon)} src={icon} alt={alt} />
                        )}
                        {!icon && (this.props.fallbackIcon ? this.props.fallbackIcon : "")}
                    </div>
                    <H className={classNames("subcommunityTile-title", classes.title)}>{title}</H>
                    {description && (
                        <Paragraph className={classNames("subcommunityTile-description", classes.description)}>
                            {description}
                        </Paragraph>
                    )}
                </SmartLink>
            </div>
        );
    }
}
