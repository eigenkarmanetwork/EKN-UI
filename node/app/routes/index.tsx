import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { DashboardLoader } from "~/dashboard.tsx";
import Dashboard from "~/dashboard.tsx";

export const meta: MetaFunction = () => {
    return {
        title: "EigenKarma Network - Home",
    };
};

export const loader: LoaderFunction = async () => {
    return await DashboardLoader();
};

export default function Index() {
  return (
    <div className="container">
        <h1>EigenKarma Network - Trust at Scale</h1>
        <p>Trust is powerful. Knowing who is capable, value aligned, or has done good work in the past is extremely valuable for all sorts of decisions, but currently it takes lots of effort to collect this information. Imagine if you could leverage your trust network's collective knowledge to get a read of hundreds or thousands of times as many people, with minimal effort!</p>
        <p>That is what EigenKarma Network is creating. We use an algorithm similar to Google's PageRank to model trust propagation, setting the subjective source of all trust to each individual. So that from your personal view of the network you can see how much of your trust has flowed to anyone else.</p>

        <p>We think this tool can empower humanity in many ways, and are particularly excited about its applications in grantmaking in the field our team is focused on; AI alignment.</p>
        <Dashboard />
    </div>
  );
}

