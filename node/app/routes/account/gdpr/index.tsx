import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useActionData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import tables_stylesheet from "~/css/tables.css";
import { getSession, commitSession } from "~/sessions.tsx";
import { needs_password } from "~/needs_password.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - GDPR View",
    };
};

export const links: LinksFunction = () => {
    return [
        {
            href: stylesheet,
            rel: "stylesheet"
        },
        {
            href: tables_stylesheet,
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


async function lookup(password, session){
    var data = JSON.stringify({
        username: session.username,
        password: password
    });
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigentrust.net:31415/gdpr_view",
        {method: "POST", headers: headers, body: data}
    );
    if(response.status != 200){
        return {error: await response.text()};
    }
    const response_data = await response.json();
    return response_data;
}


export async function action({ request }){
    const body = await request.formData();
    var session = await getSession(request.headers.get("Cookie"));
    session = session.data;
    const password = body.get("pass");
    return lookup(password, session);
}

export function toggleJSON(){
    const json = document.getElementById("json");
    const togg = document.getElementById("togg");
    if(json.style.display == "none"){
        json.style.display = "inherit";
        togg.innerHTML = "Hide JSON";
    }else{
        json.style.display = "none";
        togg.innerHTML = "View JSON";
    }
}


function format_results(request){
    if(request == null){
        return (<></>);
    }

    if(Object.keys(request).length == 0){
        return (<></>);
    }

    if("error" in request){
        return (
            <span id="notice">
                {request.error}
            </span>
        )
    }

    return (
        <>
            <button className="btn btn-secondary" id="togg" onClick={toggleJSON}>
                View JSON
            </button><br/>
            <div id="json" style={{display: "none"}}><br/>
                {JSON.stringify(request)}
            </div>
            {add_tables(request)}
        </>
    );
}

export function add_tables(request){
    var output = document.getElementById("output");
    var raw_data = request;
    var tables = {};
    for(let row of raw_data){
        let key = String(Object.keys(row));
        if(key in tables){
            let html_row = document.createElement("tr");
            for(let col of Object.keys(row)){
                let cell = document.createElement("td");
                let cont = document.createTextNode(row[col]);
                cell.appendChild(cont);
                html_row.appendChild(cell);
            }
            tables[key].appendChild(html_row);
        }else{
            tables[key] = document.createElement("table");
            let html_row = document.createElement("tr");
            for(let col of Object.keys(row)){
                let cell = document.createElement("th");
                let cont = document.createTextNode(col);
                cell.appendChild(cont);
                html_row.append(cell);
            }
            tables[key].appendChild(html_row);
            let html_row2 = document.createElement("tr");
            for(let col of Object.keys(row)){
                let cell = document.createElement("td");
                let cont = document.createTextNode(row[col]);
                cell.appendChild(cont);
                html_row2.append(cell);
            }
            tables[key].appendChild(html_row2);
        }
    }
    console.log(tables)
    // Clear output div, one of those things where if you delete it, it doesn't
    // work correctly. (Tables show up twice so I assume this is called twice.)
    output.innerHTML = ""; 
    for(let table of Object.keys(tables)){
        output.appendChild(document.createElement("br"));
        output.appendChild(tables[table]);
    }
    return;
}


function password_prompt(){
    return (
        <>
            Please enter your password:<br/>
            <input type="password" name="pass"/><br/>
        </>
    );
}

export default function GDPR(){
    const session = useLoaderData().data;
    const request = useActionData();
    return (
        <div className="container">
            <h1>GDPR View</h1>
            <br/>
            <Form method="POST">
                {password_prompt()}
                <button style={{margin: "5px"}} className="btn btn-primary">
                    Get GDPR Report
                </button><br/>
                {format_results(request)}
            </Form>
            <div id="output">
            </div>
            <br/>
        </div>
    )
}
