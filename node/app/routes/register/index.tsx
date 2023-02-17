import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import stylesheet from "~/css/center.css";
import { getSession, commitSession } from "~/sessions.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Register",
        "og:title": "EigenKarma Network - Register",
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
    const confirm_password = body.get("confirm");
    if(password != confirm_password){
        return {error: "Password's do not match."};
    }
    if(password == ""){
        return {error: "Password cannot be blank."};
    }
    var data = JSON.stringify({username: username, password: password});
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Accept", "text/plain");
    var response = await fetch(
        "https://www.eigenkarma.net:31415/register_user",
        {method: "POST", headers: headers, body: data}
    );
    console.log(response);
    if(response.status != 200){
        return {error: await response.text()}
    }

    return redirect("/login");
}

export default function Register(){
    const request = useActionData();
    var error = "";
    if(request != undefined){
        error = request["error"];
    }
    return (
        <div className="container">
            <h1>Register</h1>
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
                        <tr>
                            <td>Confirm:</td>
                            <td><input name="confirm" type="password" /></td>
                        </tr>
                    </tbody>
                </table>
                <button style={{margin:"4px"}} className="btn btn-primary">
                    Register
                </button>
            </Form>
        </div>
    )
}
