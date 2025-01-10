import React, {useState, useEffect} from "react";
import "./XStates.css";
import Box from '@mui/material/Box';

const XStates = () => {

    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");

    const [apiData, setAPIData] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [loading, setLoading] = useState(false);

    const ctryURL = " https://crio-location-selector.onrender.com/countries";
    const stateURL = `https://crio-location-selector.onrender.com/country=${encodeURIComponent(countryName)}/states`;
    const cityURL = `https://crio-location-selector.onrender.com/country=${encodeURIComponent(countryName)}/state=${encodeURIComponent(stateName)}/cities`;

    useEffect(() => {
        setStateName("");
        setCityName("");

        const fetchData = async () => {
            try{
                setLoading(true);
                const response = await fetch(ctryURL);
                const result = await response.json();
                // console.log(result);
                setAPIData(result);
            }catch(error){
                console.log("Error fetching API data", error);

            }finally{
                setLoading(false);
            }
        }

        fetchData();
    },[])

    useEffect(()=>{
        // console.log(`stateURL is : ${stateURL}`);

        const fetchStates = async () => {
            try{
                setLoading(true);
                const response = await fetch(stateURL);
                const states = await response.json();
                setStateList(states);
            }
            catch(error){
                console.log("Error fetching State API data", error);
            }
            finally{
                setLoading(false);
            }
        }

        if(countryName){
            fetchStates();
            setStateName(""); // Reset stateName when countryName changes 
            setCityName("");
        }

    },[countryName]);

    useEffect(()=>{
        console.log(`cityURL is : ${cityURL}`);
        console.log(`State Name : ${stateName}`);

        const fetchCities = async () => {
            try{
                setLoading(true);
                const response = await fetch(cityURL);
                const cities = await response.json();
                setCityList(cities);
            }
            catch(error){
                console.log("Error fetching State API data", error);
            }
            finally{
                setLoading(false);
            }
        }

        if(stateName){
            fetchCities(); 
            setCityName("");
        }

    },[stateName]);    

    return(
        <>
        <div className="dropdown-container">
            <Box sx={{margin: "5px"}}>
                <select defaultValue="Select Country" onChange={(e)=>{
                    setCountryName(e.target.value); 
                    console.log(e.target.value);
                    setStateName("");
                    setCityName("");
                }}>
                    <option value = "Select Country" disabled>Select Country</option>
                    {apiData.map((country,idx) => (
                        <option value = {country} key={idx}>{country}</option>
                    ))}
                </select>
            </Box>
            <Box sx={{margin: "5px"}}>
                <select value={stateName} onChange={(e) => {setStateName(e.target.value);console.log(e.target.value)}}>
                    <option value = "" disabled>Select State</option>
                    {stateList.map((state,idx)=>(
                        <option value={state} key={idx}>{state}</option>
                    ))}
                </select>
            </Box>

            <Box sx={{margin: "5px"}}>
                <select value={cityName} onChange={(e) => {setCityName(e.target.value); console.log(e.target.value)}}>
                    <option value = "" disabled>Select City</option>
                    {cityList.map((city,idx)=>(
                        <option value = {city} key={idx}>{city}</option>
                    ))}
                </select>
            </Box>
            <br />
        </div>
        {cityName? (<p>
                <span className="introTxt">You selected </span><span className="cityName">{cityName},</span><span className="stateCtry">{stateName},{countryName}</span></p>)
            :null}
        </>
    )

}

export default XStates;