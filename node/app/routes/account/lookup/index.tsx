import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useActionData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import { getSession, commitSession } from "~/sessions.tsx";
import { needs_password } from "~/needs_password.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Lookup User",
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

async function lookup(session, lookup){
    session = session.data;
    var data = JSON.stringify({
        service_name: "ETN",
        service_key: process.env.ETN_SERVICE_KEY,
        for: lookup,
        from: session.username,
        password: session.key,
        password_type: session.type
    });
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigentrust.net:31415/get_score",
        {method: "POST", headers: headers, body: data}
    );
    if(response.status != 200){
        return {error: await response.text()};
    }
    var response_data = await response.json();
    var ret = {
        for: response_data.for,
        score: response_data.score,
        flavor: response_data.flavor
    }
    var response = await fetch(
        "https://www.eigentrust.net:31415/get_vote_count",
        {method: "POST", headers: headers, body: data}
    );
    response_data = await response.json();
    ret.votes = response_data.votes;
    console.log(ret);
    return ret;
}

async function lookup_wp(session, lookup, password){
    session = session.data;
    var data = JSON.stringify({
        service_name: "ETN",
        service_key: process.env.ETN_SERVICE_KEY,
        for: lookup,
        from: session.username,
        password: password
    });
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigentrust.net:31415/get_score",
        {method: "POST", headers: headers, body: data}
    );
    if(response.status != 200){
        return {error: await response.text()};
    }
    var response_data = await response.json();
    var ret = {
        for: response_data.for,
        score: response_data.score,
        flavor: response_data.flavor
    }
    var response = await fetch(
        "https://www.eigentrust.net:31415/get_vote_count",
        {method: "POST", headers: headers, body: data}
    );
    response_data = await response.json();
    ret.votes = response_data.votes;
    console.log(ret);
    return ret;
}

export async function action({ request }){
    const body = await request.formData();
    const session = await getSession(request.headers.get("Cookie"));
    console.log(body)
    const username = body.get("lookup");
    const password = body.get("pass");
    if(password == null){
        return lookup(session, username);
    }
    return lookup_wp(session, username, password);
}

function password_prompt(){
    return (
        <>
            Please enter your password:<br/>
            <input type="password" name="pass"/><br/>
        </>
    );
}

function format_results(request){
    if(request == null){
        return (<></>);
    }

    if(Object.keys(request).length == 0){
        return (<></>);
    }

    return (
        <>
            {request.for}'s {request.flavor} trust within your network is {request.score}.<br/>
            You have voted for {request.for} {request.votes} {(request.votes == 1 ? "time" : "times")}.
        </>
    );
}


export default function Account(){
    const session = useLoaderData().data;
    const request = useActionData();
    return (
        <div className="container">
            <h1>Lookup User</h1>
            <br/>
            <Form method="POST">
                Please enter an ETN username:<br/>
                <input type="text" name="lookup"/><br/>
                {(needs_password(session) ? password_prompt() : "")}
                <button style={{margin: "5px"}} className="btn btn-primary">
                    Lookup User
                </button>
            </Form>
            <p>{format_results(request)}</p>
        </div>
    )
}
