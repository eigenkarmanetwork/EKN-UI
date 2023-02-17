import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import { getSession, commitSession } from "~/sessions.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Login",
        "og:title": "EigenKarma Network - Login",
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

export async function action({ request }){
    const body = await request.formData();
    const username = body.get("username");
    const password = body.get("password");
    var data = JSON.stringify({username: username, password: password});
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigenkarma.net:31415/verify_credentials",
        {method: "POST", headers: headers, body: data}
    );
    console.log(response);
    if(response.status != 200){
        return {error: "Invalid Username or Password."}
    }
    const login_data = await response.json();
    console.log(login_data);
    const session = await getSession(
        request.headers.get("Cookie")
    );

    session.set("username", username)
    session.set("key", login_data.password)
    session.set("type", login_data.password_type)
    session.set("expires", login_data.expires)

    return redirect("/account", {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    });
}

export default function Login(){
    const request = useActionData();
    var error = "";
    if(request != undefined){
        error = request["error"];
    }
    return (
        <div className="container">
            <h1>Login</h1>
            <span id="notice">{error}</span>
            <Form method="POST">
                <table>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input name="username" type="text" /></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input name="password" type="password" /></td>
                        </tr>
                    </tbody>
                </table>
                <button style={{margin:"4px"}} className="btn btn-primary">
                    Login
                </button>
            </Form>
        </div>
    )
}
