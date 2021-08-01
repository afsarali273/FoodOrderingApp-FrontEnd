import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Details from "./screens/Details/Details";
import Checkout from "./screens/checkout/Checkout";
import Profile from "./screens/Profile/Profile";

class ApplicationRouter extends Component{

    render() {
        return <React.Fragment>
            <Router>
                <div>
                    {/* home */}
                    <Route exact path="/" render={(props) => <Home />} />

                     {/*Profile*/}
                    <Route exact path="/profile" render={(props) => <Profile />} />

                    {/* details */}
                    <Route exact path="/restaurant/:id" render={(props) => <Details  />} />

                    {/* checkout */}
                    <Route exact path="/checkout" render={(props) => <Checkout />} />
                </div>
            </Router>
        </React.Fragment>;
    }
}

export default ApplicationRouter;
