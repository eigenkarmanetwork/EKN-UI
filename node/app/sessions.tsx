import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } = 
    createCookieSessionStorage({
        cookie: {
            name: "__session__",
            path: "/",
            // maxAge: 600,
            secure: true,
            secrets: [process.env.ETN_COOKIE_SIGNATURE],
        }
    });

export { getSession, commitSession, destroySession };
