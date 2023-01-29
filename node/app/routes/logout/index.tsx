import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import { getSession, destroySession } from "~/sessions.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Logout",
    };
};

export const links: LinksFunction = () => {
    return [
        {
            href: stylesheet,
            rel: "stylesheet"
        }
    ]
}

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/", {headers: {
        "Set-Cookie": await destroySession(session)
    }});
};

export default function Logout(){
    return redirect("/");
}
