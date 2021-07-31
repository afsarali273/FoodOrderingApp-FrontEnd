import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Details from "./screens/Details/Details";

class ApplicationRouter extends Component{

    render() {
        return <React.Fragment>
            <Router>
                <div>
                    {/* home */}
                    <Route exact path="/" render={(props) => <Home />} />

                    {/* details */}
                    <Route exact path="/restaurant/:id" render={(props) => <Details  />} />

                    {/* checkout */}
                    {/*<Route exact path="/checkout" render={(props) => <Checkout />} />*/}
                </div>
            </Router>
        </React.Fragment>;
    }
}

export default ApplicationRouter;
