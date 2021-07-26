import React,{Component} from "react";
import './Details.css'
import axios from "axios";
import {Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRupeeSign, faStar} from "@fortawesome/free-solid-svg-icons";
import Header from "../../common/header/Header";

class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            locality:"",
            city:"",
            template: []
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.fetchRestaurantDetails();
    }

    //Fetch Restaurant details by Calling GET api call  '/restaurant/{restaurant_id}'
    fetchRestaurantDetails(){
        let $this = this;
        const restId = window.location.href.split("/")[4];

        let url = `http://localhost:8080/api/restaurant/${restId}`;
        let requestConfig = {
            url: url,
            method: "get",
            responseType: "json"
        };
        axios(requestConfig).then(function (response) {
            if (response.statusText === "OK" || response.status === 200) {
                $this.setState({data: response.data,
                    template: response.data,
                    locality: response.data.address.locality
                });
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

        var cat = this.state.data["categories"]
        console.log("Locality : "+JSON.stringify(cat))
        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className={"details-container"}>

                    <div className={"restaurant-info"}>

                        {/*Image of Restaurant*/}
                        <div>
                            <img src={this.state.data.photo_URL} style={{width:300,height:250}}/>
                        </div>

                        {/*Restaurant Info*/}
                        <div className={"details"}>

                            <div>
                               <Typography variant={"h4"} component={"h4"} >
                                   {this.state.data.restaurant_name}
                               </Typography>
                            </div>

                            {/*Locality*/}
                            <Typography style={{textTransform:"uppercase"}}>
                                {this.state.locality}
                            </Typography>

                            {/*Categories*/}

                            <div>
                               <ul className={"categories-list"}>
                                   {(this.state.data.categories || []).map((category, index) => {
                                           return (
                                               <li key={category.id}>
                                                   {category.category_name}
                                                   {index === this.state.data.categories.length - 1 ? null : ","}
                                                   &nbsp;&nbsp;
                                               </li>
                                           );
                                       }
                                   )}
                               </ul>
                            </div>

                            {/*Rating info*/}

                            <div style={{display:"flex" , justifyContent:"space-between"}}>
                                <div>
                                    <div style={{display:"flex"}}>
                                        <FontAwesomeIcon icon={faStar}
                                                         style={{color: 'black', padding: 5}}/>
                                        <Typography>
                                            {this.state.data.customer_rating}
                                        </Typography>

                                    </div>
                                    <Typography style={{marginRight: 5,marginTop:5}}>
                                        AVERAGE RATING BY
                                        <div>
                                            {this.state.data.number_customers_rated} CUSTOMERS
                                        </div>
                                    </Typography>
                                </div>

                                {/*Price info*/}
                                <div>
                                    <div style={{display:"flex"}}>
                                        <Typography>
                                            <FontAwesomeIcon icon={faRupeeSign}
                                                             style={{color: 'black', padding: 5}}/>
                                        </Typography>

                                        <Typography>
                                            {this.state.data.average_price}
                                        </Typography>

                                    </div>
                                    <Typography style={{marginRight: 5,marginTop:5}}>
                                        AVERAGE COST FOR
                                        <div>
                                            TWO PEOPLE
                                        </div>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default Details;