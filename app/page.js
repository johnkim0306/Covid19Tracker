"use client";

import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card   } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { DataTable, Papers, Header, Sidebar, Contact, Charts, GraphCanada, InfoBox, LineGraph, Footer } from "../components";
import { sortData, prettyPrintStat } from "../constants/util";
import numeral from "numeral";
import axios from "axios";
import "./App.scss";
import dynamic from 'next/dynamic'

import "leaflet/dist/leaflet.css";

const Home = () => {

  const Map = dynamic(
    () => import('../components/Map/Map'),
    { loading: () => <p>loading...</p>,
    ssr: false }
  )

  // const { sortData, prettyPrintStat } = dynamic(() => import('../constants/util'), {
  //   loading: () => <p>loading...</p>,
  //   ssr: false
  // });

  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryName, setCountryName] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const worldData = await axios.get("https://disease.sh/v3/covid-19/all");
      const countriesData = await axios.get("https://disease.sh/v3/covid-19/countries");

      setCountryInfo(worldData.data);
      setCountries(countriesData.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      })));
      setMapCountries(countriesData.data);
      setTableData(sortData(countriesData.data));
      setLoading(false);
    };
    getData();
  }, []);

  const handleCountryChange = async (countryCode) => {
    try {
      setLoading(true);
      setInputCountry(countryCode);
      const data = await fetchCountryData(countryCode);
      setCountryInfo(data);
      setCountryName(data.country);
      setMapZoom(countryCode === "worldwide" ? 3 : 4);
      setMapCenter(
        countryCode === "worldwide"
          ? { lat: 34.80746, lng: -40.4796 }
          : { lat: data.countryInfo.lat, lng: data.countryInfo.long }
      );
      setLoading(false);      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountryData = async (countryCode) => {
    const url = countryCode === "worldwide"
      ? "http://disease.sh/v3/covid-19/all"
      : `http://disease.sh/v3/covid-19/countries/${countryCode}`;
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.error("AxiosError:", error);
      throw error; // Re-throw the error to propagate it to the caller.
    }
  };

  const activateCanada = () => handleCountryChange("CA");
  const activateWorldWide = () => handleCountryChange("worldwide");

  return (
    <div className="app">
      {/* <Header /> */}
      <Papers country={country} handleCountryChange={handleCountryChange} countries={countries} className="z-30"/>
      <div className="app__middle top-20">
        <div className="container">
          <Sidebar activateCanada={activateCanada} activateWorldWide={activateWorldWide}/>
        </div>
        <div className="app__body z-20">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
            <div className="app__body-map">
              <Card className="app__right">
                <CardContent>
                  <div className="app__information">
                    <h3>Live Cases by Country</h3>
                    <DataTable countries={tableData} />
                  </div>
                </CardContent>
              </Card>

              <Map
                countries={mapCountries}
                casesType={casesType}
                center={mapCenter}
                zoom={mapZoom}
              />
            </div>

            <div className="app__stats">
              <InfoBox
                onClick={(e) => setCasesType("cases")}
                title="Coronavirus Cases"
                isRed
                active={casesType === "cases"}
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={numeral(countryInfo.cases).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                active={casesType === "recovered"}
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={numeral(countryInfo.recovered).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                isRed
                active={casesType === "deaths"}
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={numeral(countryInfo.deaths).format("0.0a")}
              />
            </div>



            <div className="app__graph">
              <h3>
                {countryName} new {casesType}
              </h3>
              {countryName === "Canada" ? (
                <GraphCanada casesType={casesType} countryName={countryName} />
              ) : (
                <LineGraph casesType={casesType} countryName={countryName} />
              )}
              <div className="graph">
                <Charts
                  casesType={casesType}
                  recovered={countryInfo.todayRecovered}
                  deaths={countryInfo.todayDeaths}
                  cases={countryInfo.todayCases}
                />
              </div>
            </div>



            <Contact />
            </>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
