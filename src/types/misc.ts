import type { LANGUAGES } from "~/constant/misc";

export type TLanguage = (typeof LANGUAGES)[keyof typeof LANGUAGES];
