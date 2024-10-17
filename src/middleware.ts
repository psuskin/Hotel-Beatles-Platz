/* eslint-disable import/no-anonymous-default-export */
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['de', 'en'];
const defaultLocale = 'de';

const middleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

export default function (req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Check if the pathname starts with a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        // If no locale is present, redirect to the default locale
        const newUrl = new URL(`/${defaultLocale}${pathname}`, req.url);
        return Response.redirect(newUrl);
    }

    return middleware(req);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
