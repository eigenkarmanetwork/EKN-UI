import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import favicon from "~/../public/images/logo.png"
import Nav from "~/nav.tsx"

export const meta: MetaFunction = () => ({
    title: "EigenTrust Network",
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <meta charSet="utf-8" />
                <link rel="icon" type="image/png" href={favicon} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            </head>
            <body>
                <Nav />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary({ error }) {
    console.error(error);
    return (
        <html lang="en">
            <head>
                <title>EigenTrust Network - Error</title>
                <link rel="icon" type="image/png" href={favicon} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
                <Meta />
                <Links />
            </head>
            <body>
                <Nav />
                <div className="container">
                    <p>Sorry! We have had an error!  Please <a href="mailto:hello@alignment.dev">send us an email</a> with the following error:</p>
                    <p style={{color:"red"}}>{error.toString()}</p>
                </div>
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
