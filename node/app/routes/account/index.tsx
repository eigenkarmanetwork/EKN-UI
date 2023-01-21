import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import { getSession, commitSession } from "~/sessions.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Account",
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
    if(Object.keys(session.data).length == 0){
        return redirect("/login");
    }
    return json(session, {headers: {"Set-Cookie": await commitSession(session)}});
};

export default function Account(){
    const session = useLoaderData().data;
    return (
        <div className="container">
            <h1>Welcome {session.username}</h1>
            <h4>Trust</h4>
            <Link className="btn btn-secondary" to="/about">
                Test
            </Link>
            <h4>Settings</h4>
            <h4>GDPR</h4>
        </div>
    )
}
