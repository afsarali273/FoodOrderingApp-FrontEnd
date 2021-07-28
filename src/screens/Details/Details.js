import React, {Component} from "react";
import './Details.css'
import axios from "axios";
import {
    Badge,
    Card,
    CardContent,
    Divider,
    Grid, IconButton, Snackbar, SvgIcon,
    Typography
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faRupeeSign, faShoppingCart, faStar} from "@fortawesome/free-solid-svg-icons";
import Header from "../../common/header/Header";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";



class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            locality: "",
            city: "",
            template: [],
            snackBarOpen: false,
            cartItems: {
                restaurant: null,
                itemList: [],
                totalPrice: 0,
                totalItemCount: 0,
            },
        }
    }




    componentWillMount() {
        this.fetchRestaurantDetails();
    }

    //Add items to cart from the Category wise list
    addToCart = (item, category) => {
        //Calling snack bar to display message
        this.snackBarHandler("Item added to cart!");
        const myCartItem = this.state.cartItems || {
            restaurant: this.state.data,
            itemList: [],
            totalPrice: 0,
            totalItemCount: 0,
        };
        let findIndex = null;
        //If the item is new, not already added into the list, then insert newly
        let findItem = myCartItem.itemList.find((cartItem, index) => {
            if (cartItem.item.id === item.id) {
                findIndex = index;
                return cartItem;
            }
            return undefined;
        });
        // If item already exists, only increment item quantiyt and price
        if (findItem !== undefined) {
            findItem.quantity = findItem.quantity + 1;
            findItem.totalItemPrice = findItem.totalItemPrice + item.price;
            myCartItem.itemList[findIndex] = findItem;
            findIndex = null;
            myCartItem.totalPrice = myCartItem.totalPrice + item.price;
            myCartItem.totalItemCount = myCartItem.totalItemCount + 1;
        } else {
            // If not already added then creating temp object and doing other calculations
            const cartItem = {
                quantity: 1,
                categoryName: category.category_name,
                categoryId: category.id,
                item: item,
                totalItemPrice: item.price,
            };
            myCartItem.totalPrice = myCartItem.totalPrice + item.price;
            myCartItem.totalItemCount = myCartItem.totalItemCount + 1;
            // Push items to cart
            myCartItem.itemList.push(cartItem);
        }

        console.log("new Cart items : "+JSON.stringify(myCartItem));
        // Finally updating our myCartItem state
        this.setState({ cartItems: myCartItem });
    };

    //SnackBar handler both open and close function
    snackBarHandler = (message) => {
        this.setState({ snackBarOpen: false });
        this.setState({ snackBarMessage: message });
        this.setState({ snackBarOpen: true });
    };

    //Fetch Restaurant details by Calling GET api call  '/restaurant/{restaurant_id}'
    fetchRestaurantDetails() {
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
                $this.setState({
                    data: response.data,
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

        return (
            <div>
                <div>
                    <Header/>
                </div>

                {/*Main Details Section*/}
                <div className={"details-container"}>

                    <div className={"restaurant-info"}>

                        {/*Image of Restaurant*/}
                        <div>
                            <img src={this.state.data.photo_URL} style={{width: 300, height: 250}}/>
                        </div>

                        {/*Restaurant Info*/}
                        <div className={"details"}>

                            <div>
                                <Typography variant={"h4"} component={"h4"}>
                                    {this.state.data.restaurant_name}
                                </Typography>
                            </div>

                            {/*Locality*/}
                            <Typography style={{textTransform: "uppercase"}}>
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
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    <div style={{display: "flex"}}>
                                        <FontAwesomeIcon icon={faStar}
                                                         style={{color: 'black', padding: 5}}/>
                                        <Typography>
                                            {this.state.data.customer_rating}
                                        </Typography>

                                    </div>
                                    <Typography style={{marginRight: 5, marginTop: 5}}>
                                        AVERAGE RATING BY
                                        <div>
                                            {this.state.data.number_customers_rated} CUSTOMERS
                                        </div>
                                    </Typography>
                                </div>

                                {/*Price info*/}
                                <div>
                                    <div style={{display: "flex"}}>
                                        <Typography>
                                            <FontAwesomeIcon icon={faRupeeSign}
                                                             style={{color: 'black', padding: 5}}/>
                                        </Typography>

                                        <Typography>
                                            {this.state.data.average_price}
                                        </Typography>

                                    </div>
                                    <Typography style={{marginRight: 5, marginTop: 5}}>
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

                {/*Food Menu and Checkout Section*/}
                <div className={"menu-container"}>
                    {/*Food Menu Section  */}
                    <div className={"foodmenu-section"}>

                        {(this.state.data.categories || []).map((category, index) => {
                                return (
                                    <div className={"foodmenu-section"}>
                                        <Typography variant={"h6"} component={"h6"}
                                                    style={{textTransform: "uppercase", fontWeight: "lighter"}}>
                                            {category.category_name}
                                        </Typography>
                                        <Divider/>

                                        {(category.item_list || []).map((item, index) => {

                                                return (
                                                    <div className={"row-list"}  key={item.id}>
                                                        <Grid container>
                                                            <Grid item xs justifyContent={"center"} style={{minWidth: "45%"}}>
                                                                <div>
                                                                    <FontAwesomeIcon icon={faCircle}
                                                                                     style={item.item_type === 'NON_VEG' ? {
                                                                                         color: 'red',
                                                                                         padding: 2
                                                                                     } : {color: 'green', padding: 2}}/>
                                                                    <Typography
                                                                        className={"item-name"}> {item.item_name}</Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs>
                                                                <div>
                                                                    <Typography>
                                                                        <FontAwesomeIcon icon={faRupeeSign}
                                                                                         style={{color: 'black'}}/>
                                                                    </Typography>
                                                                    <Typography>
                                                                        {item.price}.00
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs>

                                                                <div className="add">
                                                                    <IconButton
                                                                        className="addButton"
                                                                        onClick={this.addToCart.bind(
                                                                            this,
                                                                            item,
                                                                            category
                                                                        )}
                                                                    >
                                                                        <Add />
                                                                    </IconButton>
                                                                </div>

                                                            </Grid>

                                                        </Grid>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                );
                            }
                        )}

                    </div>

                    {/*Checkout section */}
                    <div className={"checkout"}>
                        <Card sx={{maxWidth: 345}}>

                            <CardContent style={{margin: 2}}>
                                <div style={{display: "flex", padding: "10px"}}>
                                    <Badge badgeContent={this.state.cartItems.itemList.length === 0 ? '0' : this.state.cartItems.itemList.length } color={"primary"}>

                                        <FontAwesomeIcon icon={faShoppingCart}
                                                         style={{color: 'black'}}/>
                                    </Badge>

                                    <Typography gutterBottom variant="h5" component="h5" style={{marginLeft:"20px" }}>
                                        My Cart
                                    </Typography>
                                </div>

                                <div>
                                    {(this.state.cartItems.itemList || []).map((itemList, index) => {
                                        return(
                                            <div className={"row-list"} key={itemList.id}>
                                                <Grid container>
                                                    <Grid item xs justifyContent={"center"} style={{minWidth: "45%"}}>
                                                        <div>
                                                            <FontAwesomeIcon icon={faCircle}
                                                                             style={itemList.item.item_type === "NON_VEG"?{color: 'red', padding: 2}:{color: 'green', padding: 2}}/>
                                                            <Typography className={"item-name"}> {itemList.item.item_name}</Typography>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <div>
                                                            <Typography>
                                                                <FontAwesomeIcon icon={faRupeeSign}
                                                                                 style={{color: 'black'}}/>
                                                            </Typography>
                                                            <Typography>
                                                                {itemList.item.price}.00
                                                            </Typography>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography >
                                                            <SvgIcon className={"plus-btn"} >
                                                                <Add/>
                                                            </SvgIcon>
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div>
                                    <Typography style={{fontWeight: "bold", margin: "20px", fontSize: "medium"}}
                                                component={"div"}>
                                        TOTAL AMOUNT
                                    </Typography>
                                </div>

                                <Button color={"primary"} style={{marginTop: "30px"}} fullWidth
                                        variant="contained">CHECKOUT</Button>

                            </CardContent>
                        </Card>
                    </div>

                    {/*End of Cart Section*/}


                </div>

            </div>

        )
    }
}

export default Details;
