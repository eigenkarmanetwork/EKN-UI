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
        <html>
            <head>
                <title>Oh no!</title>
                <Meta />
                <Links />
            </head>
            <body>
                <p style={{color:"red"}}>{error.toString()}</p>
                <Scripts />
            </body>
        </html>
    );
}
