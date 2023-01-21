import { Link, useLoaderData } from "@remix-run/react";

export default function Nav() {
    const session = useLoaderData().data;
    console.log("In Nav:");
    console.log(session);
    if(Object.keys(session) == 0){
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container-fluid">
                    <Link to="" className="navbar-brand">
                        <img src="images/logo.png" alt="EKN Logo" style={{width:"40px"}} className="rounded-pill" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav">
                            <li key="home" className="nav-item">
                                <Link to="" className="nav-link">Home</Link>
                            </li>
                            <li key="about" className="nav-item">
                                <Link to="/about" className="nav-link">About Us</Link>
                            </li>
                            <li key="login" className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li key="register" className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }else{
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container-fluid">
                    <Link to="" className="navbar-brand">
                        <img src="images/logo.png" alt="EKN Logo" style={{width:"40px"}} className="rounded-pill" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav">
                            <li key="home" className="nav-item">
                                <Link to="" className="nav-link">Home</Link>
                            </li>
                            <li key="about" className="nav-item">
                                <Link to="/about" className="nav-link">About Us</Link>
                            </li>
                            <li key="account" className="nav-item">
                                <Link to="/account" className="nav-link">Account</Link>
                            </li>
                            <li key="logout" className="nav-item">
                                <Link to="/logout" className="nav-link">Account</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
