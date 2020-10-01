import React, { Component } from "react"
import axios from "axios";
import "../App.css"

class ZipSearch extends Component {
    constructor() {
        super();
        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
    }

    get initialState() {
        return {
            // variables that we will assign from API
            zipCode: "",
            stateName: "",
            cityName: "",
            locationText: "",
            latitude: "",
            longitude: "",
            population: "",
            wages: "",

            // showInfo is used in conditional rendering
            showInfo: false,
        };
    }

    // can be used to reset all variables to initial state
    resetState() {
        this.setState(this.initialState);
    }

    handleChange(event) {
        // changes state of zipCode according to user input
        this.setState({ zipCode: event.target.value });
    }

    componentDidUpdate() {
        if (this.state.zipCode.length !== 5) {
            // checks to see if the zip code is not using 5 numbers
            // sets the conditional rendering variable to false
            if (this.state.showInfo === true)
                this.setState({showInfo: false});
        } 
        else {    
            // when zipCode input is 5 characters, run the request
            axios.get("http://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode).then((response) => {
                const data = response.data;


                // object to hold all the new assignments from API
                const newZipSearchObj = {
                    stateName: data[0].State,
                    cityName: data[0].City,
                    locationText: data[0].LocationText,
                    latitude: data[0].Lat,
                    longitude: data[0].Long,
                    population: data[0].EstimatedPopulation,
                    wages: data[0].TotalWages,
                    showInfo: true,
                };

                // changing state of variables according to API data
                this.setState(newZipSearchObj);
                console.log(this.state.population);
            }).catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <> 
            <h2>Zip Search</h2>
                {/* User input box for zipcode. Each entry triggers a state change */}
                <input
                    className="zipcode_input"
                    type="text"
                    name="zipcode"
                    value={this.state.zipCode}
                    placeholder="Any zip here..."
                    onChange={this.handleChange.bind(this)}
                />

                <div className="locationInfo_container">
                   
                    {this.state.showInfo ?
                        <div className="locationInfo">
                            <h1>{this.state.locationText}</h1>

                            <ul>
                                <li>State: {this.state.stateName}</li>
                                <li>Location: ({this.state.latitude}, {this.state.longitude})</li>
                                {this.state.population ? <li>Population (estimated): {this.state.population}</li> : ""}
                                {this.state.wages ? <li>Total Wages: {this.state.wages}</li> : ""}
                            </ul>

                        </div>
                        // if no zip codes were added yet
                        : <p className="p_info">Empty</p>
                    }
                </div>

            </>
        );
    }
}

export default ZipSearch;