import React, { Component } from 'react'
import axios from 'axios';
import './Weather.css';
const APIkey = '7cf38191ebbd1532800b87c1487ba32e';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday']
const date_ob = new Date();
const day = date_ob.getDay();
const dayTr = days[day];


export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherSet: [],
            forecast: [],
            city: 'Toronto'
        }
    }
    

    componentDidMount = () => {
        this.getWeatherData(this.state.city)
    }

    getWeatherData = (city) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${APIkey}&units=metric `)
            .then(res => {
                console.log(res.data)
                this.setState
                    ({
                        weatherSet: res.data.weather,
                        info: res.data
                    })
            })
            .catch(e => console.log(e))
    }

    readUserCity = e => {
        this.setState({ ...this.state, city: e.target.value })
    }
    getWeatherByCity = () => {
        this.getWeatherData(this.state.city)
    }


    render() {
        return (
            <>

                {
                    this.state.weatherSet.map(w => (
                        <>
                            <div classNamename="page-content page-container" id="page-content">
                                <div classNameName="padding">
                                    <div className="row container d-flex justify-content-center">
                                        <div className="col-lg-8 grid-margin stretch-card">
                                            <div className="input-group mb-3">
                                                <input onChange={this.readUserCity} type="text" className="form-control input-text" placeholder="Enter city...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button onClick={this.getWeatherByCity} className="btn btn-outline-warning" type="button"><i className="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        
                                            <div className="card card-weather">
                                                <div className="card-body">
                                                    <div className="weather-date-location">
                                                        <h3>{dayTr}</h3>
                                                        <span className="text-gray">
                                                            <span className="weather-location">{this.state.info.name}</span><br />
                                                            <span className="weather-date">{date_ob.toLocaleDateString()} </span><br />
                                                            <span className="weather-location">{date_ob.toLocaleTimeString()}</span>
                                                            <h4 className="display-3">{this.state.info.main.temp.toFixed()}
                                                            <span className="symbol">&deg;</span>C</h4>
                                                            <img src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`} alt="weather" />
                                                            <p className="description">{w.description.toUpperCase()}</p>
                                                        </span>
                                                    </div>
                                                    <div className="weather-data d-flex">
                                                        <div className="mr-auto">
                                                            
                                                            <p className="display-5">
                                                                Feels like: {this.state.info.main.temp.toFixed()}&deg;C
                                                            </p>
                                                            <p className="display-5">
                                                                Min: {this.state.info.main.temp_min.toFixed()}&deg;C
                                                            </p>
                                                            <p className="display-5">
                                                                Max: {this.state.info.main.temp_max.toFixed()}&deg;C
                                                            </p>
                                                            <p className="display-5">
                                                                Wind: {this.state.info.wind.speed}m/s
                                                            </p>
                                                        </div>
                                                        <div className="mr-auto">
                                                            <p className="display-5">
                                                                Visibility: {this.state.info.visibility / 1000} km
                                                            </p>
                                                            <p className="display-5">
                                                                Humidity: {this.state.info.main.humidity}%
                                                            </p>
                                                            <p className="display-5">
                                                                Sunrise: {new Date(this.state.info.sys.sunrise*1000).toLocaleTimeString('en-US')}
                                                            </p>
                                                            <p className="display-5">
                                                                Sunset: {new Date(this.state.info.sys.sunset*1000).toLocaleTimeString('en-US')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </>
                    ))
                }
            </>

        )
    }
}
