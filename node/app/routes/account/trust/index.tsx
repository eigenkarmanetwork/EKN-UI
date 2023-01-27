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

async function lookup(username, password, session){
    if(password == null){
        var data = JSON.stringify({
            service_name: "ETN",
            service_key: process.env.ETN_SERVICE_KEY,
            for: username,
            from: session.username,
            password: session.key,
            password_type: session.type,
            flavor: "general"
        });
        return __lookup(data);
    }
    var data = JSON.stringify({
        service_name: "ETN",
        service_key: process.env.ETN_SERVICE_KEY,
        for: username,
        from: session.username,
        password: password,
        flavor: "general"
    });
    return __lookup(data);
}

async function __lookup(data){
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigentrust.net:31415/get_vote_count",
        {method: "POST", headers: headers, body: data}
    );
    if(response.status != 200){
        return {error: await response.text()};
    }
    const response_data = await response.json();
    return response_data;
}

async function vote(username, password, session, amount){
    if(password == null){
        var data = JSON.stringify({
            service_name: "ETN",
            service_key: process.env.ETN_SERVICE_KEY,
            to: username,
            from: session.username,
            password: session.key,
            password_type: session.type,
            amount: amount,
        });
        return __vote(data);
    }
    var data = JSON.stringify({
        service_name: "ETN",
        service_key: process.env.ETN_SERVICE_KEY,
        to: username,
        from: session.username,
        password: password,
        amount: amount
    });
    return __vote(data);
}

async function __vote(data){
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigentrust.net:31415/vote",
        {method: "POST", headers: headers, body: data}
    );
    if(response.status != 200){
        return {error: await response.text()};
    }
    const response_data = await response.text();
    return {success: "Success!"};
}


export async function action({ request }){
    const body = await request.formData();
    var session = await getSession(request.headers.get("Cookie"));
    session = session.data;
    const username = body.get("lookup");
    const password = body.get("pass");
    if(body.get("action")){
        console.log("Voting!");
        const general_w = body.get("general"); // General Wanted
        const general_h = (await lookup(username, password, session)).votes;
        if(general_w < 0){
            return {error: "You cannot vote for someone negative times!"};
        }
        // console.log(general_w - general_h);
        const amount = general_w - general_h;
        return vote(username, password, session, amount);
    }
    return lookup(username, password, session);
}


function format_results(request){
    if(request == null){
        return (<></>);
    }

    if(Object.keys(request).length == 0){
        return (<></>);
    }

    if("error" in request){
        switch(request.error){
            case "'to' is not connected to this service.":
            case "'for' is not connected to this service.":
                request.error = "Username does not exist.";
                break;
            case "User cannot view themselves.":
                request.error = "You cannot lookup yourself.";
                break;
        }
        return (
            <span id="notice">
                {request.error}
            </span>
        )
    }

    if("success" in request){
        return (<span style={{color: "green"}}>{request.success}</span>);
    }

    return (
        <>
            <input type="text" name="action" value="vote" hidden readOnly/>
            Current votes for {request.for} by flavor:<br/>
            <strong>General:</strong>{" "}
            <input type="number" name="general" min="0" defaultValue={request.votes}/><br/>
            <button style={{margin: "5px"}} className="btn btn-primary">
                Submit Votes
            </button>
        </>
    );
}

function username_prompt(request, session){
    if(request == undefined
       || request == null
       || "error" in request
       || "success" in request
      ){
        return (
            <>
                <input type="text" name="lookup"/><br/>
                {(needs_password(session) ? password_prompt() : "")}
                <button style={{margin: "5px"}} className="btn btn-primary">
                    Lookup User
                </button>
            </>
        );
    }
    return (
        <>
            <input type="text" name="lookup" readOnly/><br/>
            {(needs_password(session) ? password_prompt() : "")}
        </>
    );
}

function password_prompt(){
    return (
        <>
            Please enter your password:<br/>
            <input type="password" name="pass"/><br/>
        </>
    );
}

export default function Trust(){
    const session = useLoaderData().data;
    const request = useActionData();
    return (
        <div className="container">
            <h1>Manage Votes for User</h1>
            <br/>
            <Form method="POST">
                Please enter an EKN username:<br/>
                {username_prompt(request, session)}
                <p>{format_results(request)}</p>
            </Form>
        </div>
    )
}
