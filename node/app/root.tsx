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
    title: "EigenKarma Network",
    "og:title": "EigenKarma Network"
});

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions.tsx";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    return json(session);
};

export default function App() {
    return (
        <html lang="en" prefix="og: http://ogp.me/ns#">
            <head>
                <Meta />
                <Links />
                <meta charSet="utf-8" />
                <meta property="og:site_name" content="EigenKarma Network"/>
                <meta property="og:description" content="Trust is powerful. Knowing who is capable, value aligned, or has done good work in the past is extremely valuable for all sorts of decisions, but currently it takes lots of effort to collect this information. Imagine if you could leverage your trust network's collective knowledge to get a read of hundreds or thousands of times as many people, with minimal effort!"/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content={"https://www.eigenkarma.net" + favicon}/>
                <meta property="og:image:width" content="716"/>
                <meta property="og:image:height" content="716"/>
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
                <title>EigenKarma Network - Error</title>
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
