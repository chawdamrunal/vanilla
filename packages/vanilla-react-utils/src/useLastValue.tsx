/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */
import { useRef } from "react";

/**
 * Keep a reference to the previous value of something. (during the previous render).
 *
 * @param value
 */
export function useLastValue<T>(value: T): T {
    const ref = useRef<T>();
    const toReturn = ref.current!;
    ref.current = value;
    return toReturn;
}
