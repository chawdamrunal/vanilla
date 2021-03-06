/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { globalVariables } from "@library/styles/globalStyleVars";
import {
    allButtonStates,
    colorOut,
    ColorValues,
    flexHelper,
    IFont,
    modifyColorBasedOnLightness,
    spinnerLoader,
    unit,
    userSelect,
} from "@library/styles/styleHelpers";
import { NestedCSSProperties } from "typestyle/lib/types";
import { DEBUG_STYLES, styleFactory, useThemeCache, variableFactory } from "@library/styles/styleUtils";
import { formElementsVariables } from "@library/forms/formElementStyles";
import { important, percent, px } from "csx";
import merge from "lodash/merge";
import generateButtonClass from "./styleHelperButtonGenerator";
import { IButtonType } from "@library/forms/styleHelperButtonInterface";

export const buttonGlobalVariables = useThemeCache(() => {
    // Fetch external global variables
    const globalVars = globalVariables();
    const formElVars = formElementsVariables();
    const makeThemeVars = variableFactory("button");

    const colors = makeThemeVars("colors", {
        fg: globalVars.mainColors.fg,
        bg: globalVars.mainColors.bg,
    });

    const font = makeThemeVars("font", {
        color: globalVars.mainColors.fg,
        size: globalVars.fonts.size.medium,
    });

    const padding = makeThemeVars("padding", {
        top: 2,
        bottom: 3,
        side: 12,
    });

    const sizing = makeThemeVars("sizing", {
        minHeight: formElVars.sizing.height,
        minWidth: 104,
        compactHeight: 24,
    });

    const border = makeThemeVars("border", globalVars.border);

    return {
        padding,
        sizing,
        border,
        font,
        colors,
    };
});

export const buttonVariables = useThemeCache(() => {
    const globalVars = globalVariables();
    const makeThemeVars = variableFactory("button");

    const standard: IButtonType = makeThemeVars("basic", {
        name: ButtonTypes.STANDARD,
        spinnerColor: globalVars.mainColors.fg,
        colors: {
            bg: globalVars.mainColors.bg,
        },
        borders: {
            color: globalVars.mixBgAndFg(0.24),
            radius: globalVars.border.radius,
        },
        fonts: {
            color: globalVars.mainColors.fg,
        },
        hover: {
            colors: {
                bg: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
            fonts: {
                color: globalVars.mainColors.bg,
            },
        },
        active: {
            colors: {
                bg: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
            fonts: {
                color: globalVars.mainColors.bg,
            },
        },
        focus: {
            colors: {
                bg: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
            fonts: {
                color: globalVars.mainColors.bg,
            },
        },
        focusAccessible: {
            colors: {
                bg: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
            fonts: {
                color: globalVars.mainColors.bg,
            },
        },
    });

    const compact: IButtonType = makeThemeVars("compact", {
        name: ButtonTypes.COMPACT,
        colors: {
            bg: globalVars.mainColors.bg,
        },
        borders: {
            color: globalVars.elementaryColors.transparent,
            radius: globalVars.border.radius,
        },
        sizing: {
            minHeight: 24,
        },
        hover: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
        },
        active: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
        },
        focus: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
        },
        focusAccessible: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
        },
    });

    const compactPrimary: IButtonType = makeThemeVars("compactPrimary", {
        name: ButtonTypes.COMPACT_PRIMARY,
        colors: {
            bg: globalVars.mainColors.bg,
        },
        fonts: {
            color: globalVars.mainColors.primary.fade(0.7),
        },
        sizing: {
            minHeight: 24,
        },
        borders: {
            color: globalVars.elementaryColors.transparent,
            radius: globalVars.border.radius,
        },
        hover: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
        },
        active: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
        },
        focus: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
        },
        focusAccessible: {
            fonts: {
                color: globalVars.mainColors.primary,
            },
            borders: {
                color: globalVars.mainColors.primary,
            },
        },
    });

    const primary: IButtonType = makeThemeVars("primary", {
        name: ButtonTypes.PRIMARY,
        colors: {
            bg: globalVars.mainColors.primary,
        },
        fonts: {
            color: globalVars.mainColors.bg,
        },
        spinnerColor: globalVars.mainColors.bg,
        border: {
            color: globalVars.mainColors.primary,
            radius: globalVars.border.radius,
        },
        hover: {
            fonts: {
                color: globalVars.mainColors.bg,
            },
            colors: {
                bg: globalVars.mainColors.secondary,
            },
        },
        active: {
            fonts: {
                color: globalVars.mainColors.bg,
            },
            colors: {
                bg: globalVars.mainColors.secondary,
            },
        },
        focus: {
            fonts: {
                color: globalVars.mainColors.bg,
            },
            colors: {
                bg: globalVars.mainColors.secondary,
            },
        },
        focusAccessible: {
            fonts: {
                color: globalVars.mainColors.bg,
            },
            colors: {
                bg: globalVars.mainColors.secondary,
            },
        },
    });

    const transparent: IButtonType = makeThemeVars("transparent", {
        name: ButtonTypes.TRANSPARENT,
        colors: {
            bg: globalVars.elementaryColors.transparent,
        },
        fonts: {
            color: globalVars.mainColors.fg,
        },
        border: {
            color: modifyColorBasedOnLightness(globalVars.mainColors.fg, 1, true),
            radius: globalVars.border.radius,
        },
        hover: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.fg, 0.9),
            },
        },
        active: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.fg, 0.9),
            },
        },
        focus: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.fg, 0.9),
            },
        },
        focusAccessible: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.fg, 0.9),
            },
        },
    });

    const translucid: IButtonType = makeThemeVars("translucid", {
        name: ButtonTypes.TRANSLUCID,
        colors: {
            bg: modifyColorBasedOnLightness(globalVars.mainColors.bg, 1).fade(0.1),
        },
        fonts: {
            color: globalVars.mainColors.bg,
        },
        spinnerColor: globalVars.mainColors.bg,
        border: {
            color: globalVars.mainColors.bg,
            radius: globalVars.border.radius,
        },
        hover: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.bg, 1).fade(0.2),
            },
            border: {
                color: globalVars.mainColors.bg,
            },
        },
        active: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.bg, 1).fade(0.2),
            },
            border: {
                color: globalVars.mainColors.bg,
            },
        },
        focus: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.bg, 1).fade(0.2),
            },
            border: {
                color: globalVars.mainColors.bg,
            },
        },
        focusAccessible: {
            colors: {
                bg: modifyColorBasedOnLightness(globalVars.mainColors.bg, 1).fade(0.2),
            },
            border: {
                color: globalVars.mainColors.bg,
            },
        },
    });

    const inverted: IButtonType = makeThemeVars("inverted", {
        name: ButtonTypes.INVERTED,
        colors: {
            bg: globalVars.mainColors.fg,
        },
        fonts: {
            color: globalVars.mainColors.primary,
        },
        spinnerColor: globalVars.elementaryColors.white,
        border: {
            color: globalVars.mainColors.fg,
            radius: globalVars.border.radius,
        },
        hover: {
            colors: {
                bg: globalVars.mainColors.fg.fade(0.9),
            },
        },
        active: {
            colors: {
                bg: globalVars.mainColors.fg.fade(0.9),
            },
        },
        focus: {
            colors: {
                bg: globalVars.mainColors.fg.fade(0.9),
            },
        },
        focusAccessible: {
            colors: {
                bg: globalVars.mainColors.fg.fade(0.9),
            },
        },
    });

    return {
        standard,
        primary,
        transparent,
        compact,
        compactPrimary,
        translucid,
        inverted,
    };
});

export const buttonSizing = (height, minWidth, fontSize, paddingHorizontal, formElementVars) => {
    const borderWidth = formElementVars.borders ? formElementVars.borders : buttonGlobalVariables().border.width;
    return {
        minHeight: unit(formElementVars.sizing.minHeight),
        fontSize: unit(fontSize),
        padding: `${unit(0)} ${px(paddingHorizontal)}`,
        lineHeight: unit(formElementVars.sizing.height - borderWidth * 2),
    };
};

export const buttonResetMixin = (): NestedCSSProperties => ({
    ...userSelect(),
    "-webkit-appearance": "none",
    appearance: "none",
    border: 0,
    background: "none",
    cursor: "pointer",
    color: "inherit",
    font: "inherit",
});

export const overwriteButtonClass = (
    buttonTypeVars: IButtonType,
    overwriteVars: IButtonType,
    setZIndexOnState = false,
) => {
    const buttonVars = merge(buttonTypeVars, overwriteVars);
    // append names for debugging purposes
    buttonVars.name = `${buttonTypeVars.name}-${overwriteVars.name}`;
    return generateButtonClass(buttonVars, setZIndexOnState);
};

export enum ButtonTypes {
    STANDARD = "standard",
    PRIMARY = "primary",
    TRANSPARENT = "transparent",
    COMPACT = "compact",
    COMPACT_PRIMARY = "compactPrimary",
    TRANSLUCID = "translucid",
    INVERTED = "inverted",
    CUSTOM = "custom",
    TEXT = "text",
    TEXT_PRIMARY = "textPrimary",
    ICON = "icon",
    ICON_COMPACT = "iconCompact",
}

export const buttonClasses = useThemeCache(() => {
    const vars = buttonVariables();
    return {
        primary: generateButtonClass(vars.primary),
        standard: generateButtonClass(vars.standard),
        transparent: generateButtonClass(vars.transparent),
        compact: generateButtonClass(vars.compact),
        compactPrimary: generateButtonClass(vars.compactPrimary),
        translucid: generateButtonClass(vars.translucid),
        inverted: generateButtonClass(vars.inverted),
        icon: buttonUtilityClasses().buttonIcon,
        iconCompact: buttonUtilityClasses().buttonIconCompact,
        text: buttonUtilityClasses().buttonAsText,
        textPrimary: buttonUtilityClasses().buttonAsTextPrimary,
        custom: "",
    };
});

export const buttonUtilityClasses = useThemeCache(() => {
    const vars = buttonGlobalVariables();
    const globalVars = globalVariables();
    const formElementVars = formElementsVariables();
    const style = styleFactory("buttonUtils");

    const pushLeft = style("pushLeft", {
        marginRight: important("auto"),
    });

    const pushRight = style("pushRight", {
        marginLeft: important("auto"),
    });

    const iconMixin = (dimension: number): NestedCSSProperties => ({
        ...buttonResetMixin(),
        alignItems: "center",
        display: "flex",
        height: unit(dimension),
        minWidth: unit(dimension),
        width: unit(dimension),
        justifyContent: "center",
        border: "none",
        padding: 0,
        ...allButtonStates({
            hover: {
                color: colorOut(globalVars.mainColors.primary),
            },
            focusNotKeyboard: {
                outline: 0,
                color: colorOut(globalVars.mainColors.secondary),
            },
            focus: {
                color: colorOut(globalVars.mainColors.secondary),
            },
            accessibleFocus: {
                color: colorOut(globalVars.mainColors.secondary),
            },
            active: {
                color: colorOut(globalVars.mainColors.secondary),
            },
        }),
    });

    const buttonIcon = style("icon", iconMixin(formElementVars.sizing.height));

    const buttonIconCompact = style("iconCompact", iconMixin(vars.sizing.compactHeight));

    const asTextStyles: NestedCSSProperties = {
        ...buttonResetMixin(),
        minWidth: important(0),
        padding: 0,
        overflow: "hidden",
        textAlign: "left",
        lineHeight: globalVars.lineHeights.base,
        fontWeight: globalVars.fonts.weights.semiBold,
    };

    const buttonAsText = style("asText", asTextStyles, {
        color: "inherit",
        $nest: {
            "&:not(.focus-visible)": {
                outline: 0,
            },
            "&:focus, &:active, &:hover": {
                color: colorOut(globalVars.mainColors.secondary),
            },
        },
    });

    const buttonAsTextPrimary = style("asTextPrimary", asTextStyles, {
        color: colorOut(globalVars.mainColors.primary),
        $nest: {
            "&:not(.focus-visible)": {
                outline: 0,
            },
            "&:hover, &:focus, &:active": {
                color: colorOut(globalVars.mainColors.secondary),
            },
        },
    });

    return {
        pushLeft,
        buttonAsText,
        buttonAsTextPrimary,
        pushRight,
        buttonIconCompact,
        buttonIcon,
    };
});

export const buttonLoaderClasses = (buttonType: ButtonTypes) => {
    const globalVars = globalVariables();
    const flexUtils = flexHelper();
    const style = styleFactory("buttonLoader");
    const buttonVars = buttonVariables();
    let typeVars;

    switch (buttonType) {
        case ButtonTypes.PRIMARY:
            typeVars = buttonVars.primary;
            break;
        default:
            typeVars = buttonVars.standard;
            break;
    }

    const root = style({
        ...flexUtils.middle(),
        padding: unit(4),
        height: percent(100),
        width: percent(100),
        $nest: {
            "&:after": spinnerLoader({
                color: typeVars.spinnerColor || (globalVars.mainColors.primary as any),
                dimensions: 20,
            }),
        },
    });
    return { root };
};
