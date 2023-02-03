import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useActionData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import { getSession, commitSession } from "~/sessions.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Security Settings",
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

async function level(password, session, security){
    var data = JSON.stringify({
        username: session.username,
        password: password,
        security: security,
    });
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigenkarma.net:31415/change_security",
        {method: "POST", headers: headers, body: data}
    );
    if(response.status != 200){
        return {for: "level", error: await response.text()};
    }
    const response_data = await response.text();
    return redirect("/logout");
}

async function change_password(password, session, new_password){
    var data = JSON.stringify({
        username: session.username,
        password: password,
        new_password: new_password,
    });
    console.log(data);
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigenkarma.net:31415/change_password",
        {method: "POST", headers: headers, body: data}
    );
    console.log(response.status);
    if(response.status != 200){
        return {for: "password", error: await response.text()};
    }
    const response_data = await response.text();
    return redirect("/logout");
}

export async function action({ request }){
    const body = await request.formData();
    var session = await getSession(request.headers.get("Cookie"));
    session = session.data;
    const action = body.get("action");
    if(action == "level"){
        console.log("Change security level");
        const security = body.get("security");
        const password = body.get("password");
        return await level(password, session, security);
    }else if(action == "password"){
        console.log("Change password");
        const password = body.get("password");
        const new_password = body.get("new_password");
        const confirm = body.get("confirm");
        if(new_password != confirm){
            console.log(new_password + " != " + confirm);
            return {for: "password", error: "Passwords did not match!"}
        }
        return await change_password(password, session, new_password);
    }
    return {};
}


export default function Security(){
    const session = useLoaderData().data;
    const request = useActionData();
    return (
        <div className="container">
            <h1>Security Settings</h1>
            <br/>
            <Form method="POST">
                <input type="hidden" value="level" name="action"/>
                <h4>Change Security Level</h4>
                <p>
                    There are three security settings with EKN.<br/>
                    The lowest security setting rquires you to sign in to make a new connection.<br/>
                    The medium security setting requires you to sign in once a day to be able to vote.<br/>
                    The higest security setting requires you to sign in every time you want to vote.
                </p>
                <br/>
                <label>
                    Please select your prefered security setting:<br/>
                    <select name="security">
                        <option value="0">Lowest</option>
                        <option value="1">Medium</option>
                        <option value="2">Highest</option>
                    </select>
                </label><br/>
                <label>
                    Please enter your password:<br/>
                    <input type="password" name="password"/>
                </label><br/>
                <button style={{margin: "5px"}} className="btn btn-danger">
                    Change Security Level
                </button><br/>
                {(request != undefined && "for" in request && request.for == "level" ? <span style={{color: "red"}}>{request.error}</span> : "")}
            </Form>
            <br/>
            <Form method="POST">
                <input type="hidden" value="password" name="action"/>
                <h4>Change Password</h4>
                <label>
                    Please enter your current password:<br/>
                    <input type="password" name="password"/>
                </label><br/>
                <label>
                    Please enter your new password:<br/>
                    <input type="password" name="new_password"/>
                </label><br/>
                <label>
                    Please confirm your new password:<br/>
                    <input type="password" name="confirm"/>
                </label><br/>
                <button style={{margin: "5px"}} className="btn btn-danger">
                    Change Password
                </button><br/>
                {(request != undefined && "for" in request && request.for == "password" ? <span style={{color: "red"}}>{request.error}</span> : "")}
            </Form>
        </div>
    )
}
