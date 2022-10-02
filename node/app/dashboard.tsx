import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const DashboardLoader: LoaderFunction = async () => {
    var total_users: number;
    var total_real_users: number;
    var total_temp_users: number;
    var total_votes: number;

    var data = await fetch("https://www.eigentrust.net:31415/get_total_users");
    total_users = await data.json()

    data = await fetch("https://www.eigentrust.net:31415/get_total_real_users");
    total_real_users = await data.json()

    data = await fetch("https://www.eigentrust.net:31415/get_total_temp_users");
    total_temp_users = await data.json()

    data = await fetch("https://www.eigentrust.net:31415/get_total_votes");
    total_votes = await data.json()

    return {
        total_users: total_users,
        total_real_users: total_real_users,
        total_temp_users: total_temp_users,
        total_votes: total_votes
    };
};

export default function Dashboard(){
    let data = useLoaderData<DashboardLoader>();
    let total_users = data["total_users"];
    let total_real_users = data["total_real_users"];
    let total_temp_users = data["total_temp_users"];
    let total_votes = data["total_votes"];
    return (
        <div className="alert alert-success" style={{textAlign: "center"}}>
            <strong>Current Users in the EKN: </strong>{total_users}{" "}
            ({total_real_users} real, {total_temp_users} temporary){" "}
            <strong>Current Votes in the EKN: </strong>{total_votes}
        </div>
    )
}
