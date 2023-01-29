import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { DashboardLoader } from "~/dashboard.tsx";
import Dashboard from "~/dashboard.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - About Us",
    };
};

export const loader: LoaderFunction = async () => {
    return await DashboardLoader();
};

export default function About(){
    return (
        <div className="container">
            <Dashboard />
            <h1>About the EigenKarma Network</h1>
            <p>Trust is powerful. Knowing who is capable, value aligned, or has done good work in the past is extremely valuable for all sorts of decisions, but currently it takes lots of effort to collect this information. Imagine if you could leverage your trust network’s collective knowledge to get a read of hundreds or thousands of times as many people, with minimal effort!</p>

            <p>That is what EigenKarma Network is creating. We use an algorithm similar to Google’s PageRank to model trust propagation, setting the subjective source of all trust to each individual. So that from your personal view of the network you can see how much of your trust has flowed to anyone else.</p>

            <h3>How to Contribute</h3>
            <p>Just by joining the EKN and marking someone as trustworthy or otherwise, you contribute to our trust ecosystem. However, if you would like to contribute in other ways, the EKN is an open source project on GitHub.  By clicking on the picture below, you will be taken to our organization page.  From there, the EKN repository is where the EKN API source code is.  Feel free to download it and use it as a sandbox!  You can contribute to this website which is in the EKN-UI repository.  If you're interested in working on our <a href="http://discord.eigentrust.net/">Discord Bot</a>, which brings the EKN to every server it is in, you can find that in the discord-bot repository.</p>
            <div style={{textAlign: "center"}}>
                <a href="https://www.github.com/eigentrustnetwork"><img src="images/GitHub-Mark-120px-plus.png" alt="GitHub logo" /></a>
            </div>
        </div>
    )
}
