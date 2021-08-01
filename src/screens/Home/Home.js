import React, {Component} from "react";
import { Link } from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import './Home.css';
import {Grid, Row, Col} from 'react-material-responsive-grid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faRupeeSign} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import Header from "../../common/header/Header";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 200,
    },
    columns: {
        margin: 50,
    },
});


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            template: [],
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    componentDidMount() {
        this.fetchRestaurants()
    }

    /* fetches the restaurant data before the app is loaded and rendered */
    fetchRestaurants() {
        let $this = this;
        let url = "http://localhost:8080/api/restaurant";
        let requestConfig = {
            url: url,
            method: "get",
            responseType: "json"
        };
        axios(requestConfig).then(function (response) {
            if (response.statusText === "OK" || response.status === 200) {
                $this.setState({data: response.data.restaurants, template: response.data.restaurants});
            }
        })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    <Header {...this.props} loggedIn={true} showMyAccount={true}
                                showSearch={true} handleChange={this.handleChange}/>
                </div>
                <Grid container spacing={2}>
                    <Row className={classes.columns}>
                        {
                            this.state.data.map(function (obj, index) {
                                return (
                                    <Col sm={6} lg={3} key={obj.id} style={{marginBottom: 30}}>
                                        <Card className={"details-card"}>
                                            <Link to={"/restaurant/" + obj.id} style={{ color: "#000000", textDecoration: "none" }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={obj.photo_URL}
                                                    title={obj.restaurant_name}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h5">
                                                        {obj.restaurant_name}
                                                    </Typography>

                                                    <Typography variant="h6" color="textSecondary" component="h6">
                                                        {obj.categories}
                                                    </Typography>
                                                </CardContent>

                                                {/*Rating section*/}
                                                <div style={{display: "flex",justifyContent:"space-between"}}>
                                                    <div className={"rating"}>
                                                        <Typography style={{marginRight: 6}}>
                                                            <FontAwesomeIcon icon={faStar}
                                                                             style={{color: 'white', padding: 5}}/>
                                                        </Typography>
                                                        <Typography style={{marginRight: 5, color: 'white',marginTop:5}}>
                                                            {obj.customer_rating} ({obj.number_customers_rated})
                                                        </Typography>
                                                    </div>
                                                    {/*Price Section*/}
                                                    <div style={{display: "flex"}}>
                                                        <div className={"price"}>
                                                            <Typography>
                                                                <FontAwesomeIcon icon={faRupeeSign}
                                                                                 style={{color: 'black', padding: 5}}/>
                                                            </Typography>
                                                            <Typography>
                                                                {obj.average_price} for two
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                </div>
                                            </CardActionArea>
                                            </Link>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Grid>

            </div>
        )
    }

}

export default withStyles(styles)(Home);
