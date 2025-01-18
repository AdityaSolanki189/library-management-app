// Basic translations for zod errors
// https://github.com/aiji42/zod-i18n/blob/main/packages/core/locales/en/zod.json

import { z } from 'zod';
import { type Locale } from './constants';

type CustomZodErrorMap = (
    issue: z.ZodIssueOptionalMessage,
    _ctx: z.ErrorMapCtx,
) => {
    message: string;
};

const customErrorMap: CustomZodErrorMap = (issue, ctx) => {
    let err: string = ctx.defaultError;

    const t = (translations: Record<Locale, string>) => {
        return translations['en'];
    };

    if (issue.code === z.ZodIssueCode.invalid_arguments) {
        err = t({ en: 'Invalid arguments.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_date) {
        err = t({ en: 'Invalid date.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        err = t({ en: 'Invalid value.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_intersection_types) {
        err = t({ en: 'Invalid types.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_literal) {
        err = t({ en: 'Invalid literal.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_return_type) {
        err = t({ en: 'Invalid return type.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_type) {
        err = t({
            en: `${issue.expected} expected, received ${issue.received}`,
        });
    }

    if (issue.code === z.ZodIssueCode.invalid_union) {
        err = t({ en: 'Invalid input.' });
    }

    if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
        err = t({
            en: 'Invalid discriminator.',
        });
    }

    if (issue.code === z.ZodIssueCode.not_finite) {
        err = t({ en: 'Number must be finite.' });
    }

    if (issue.code === z.ZodIssueCode.not_multiple_of) {
        err = t({
            en: `Number must be a multiple of ${issue.multipleOf}.`,
        });
    }

    if (issue.code === z.ZodIssueCode.too_big) {
        if (issue.type === 'array') {
            if (issue.exact === true) {
                err = t({
                    en: `Array must contain exactly ${issue.maximum} element(s).`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `Array must contain at most ${issue.maximum} element(s).`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `Array must contain less than ${issue.maximum} element(s).`,
                });
            }
        }

        if (issue.type === 'string') {
            if (issue.exact === true) {
                err = t({
                    en: `This field must contain exactly ${issue.maximum} character(s).`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `This field must contain at most ${issue.maximum} character(s).`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `This field must contain less than ${issue.maximum} character(s).`,
                });
            }
        }

        if (issue.type === 'number') {
            if (issue.exact === true) {
                err = t({
                    en: `This must be exactly ${issue.maximum}.`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `This must be less than or equal to ${issue.maximum}.`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `This must be less than ${issue.maximum}.`,
                });
            }
        }

        if (issue.type === 'set') {
            err = 'Invalid input.';
        }

        if (issue.type === 'date') {
            if (issue.exact === true) {
                err = t({
                    en: `Date must be exactly ${issue.maximum}.`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `Date must be smaller than or equal to ${issue.maximum}.`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `Date must be smaller than ${issue.maximum}.`,
                });
            }
        }
    }

    if (issue.code === z.ZodIssueCode.too_small) {
        if (issue.type === 'array') {
            if (issue.exact === true) {
                err = t({
                    en: `Array must contain exactly ${issue.minimum} element(s).`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `Array must contain at least ${issue.minimum} element(s).`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `Array must contain more than ${issue.minimum} element(s).`,
                });
            }
        }

        if (issue.type === 'string') {
            if (issue.minimum === 1) {
                err = t({
                    en: 'This field is required.',
                });
            } else {
                if (issue.exact === true) {
                    err = t({
                        en: `This field must contain exactly ${issue.minimum} character(s).`,
                    });
                }

                if (issue.inclusive === true) {
                    err = t({
                        en: `This field must contain at least ${issue.minimum} character(s).`,
                    });
                }

                if (issue.inclusive === false) {
                    err = t({
                        en: `This field must contain more than ${issue.minimum} character(s).`,
                    });
                }
            }
        }

        if (issue.type === 'number') {
            if (issue.exact === true) {
                err = t({
                    en: `This must be exactly ${issue.minimum}.`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `This must be at least ${issue.minimum}.`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `This must be more than ${issue.minimum}.`,
                });
            }
        }

        if (issue.type === 'set') {
            err = 'Invalid input.';
        }

        if (issue.type === 'date') {
            if (issue.exact === true) {
                err = t({
                    en: `Date must be exactly ${issue.minimum}.`,
                });
            }

            if (issue.inclusive === true) {
                err = t({
                    en: `Date must be greater than or equal to ${issue.minimum}.`,
                });
            }

            if (issue.inclusive === false) {
                err = t({
                    en: `Date must be greater than ${issue.minimum}.`,
                });
            }
        }
    }

    if (issue.code === z.ZodIssueCode.unrecognized_keys) {
        err = t({ en: 'Unrecognized keys.' });
    }

    return { message: err };
};

export const zodT = (t: Locale) =>
    z.setErrorMap((issue, ctx) => customErrorMap(issue, ctx));
