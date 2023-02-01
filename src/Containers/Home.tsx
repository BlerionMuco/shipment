import React, { useState } from "react";
import useGetAreas from "../hooks/useGetAreas";
import useGetCompanies_Country from "../hooks/useGetCompanies_Country";
import MultipleSelect from "../Components/MultipleSelect";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { getAreasForSelectedCompanies } from "../utils/getDataFromFirebase";
import BasicCard from "../Components/BasicCard";
import "./style/Home.css";
import { IShipment } from "../Model/BasicCardModel";
import { ICompanies, ISelectedCompanies } from "../Model/CompaniesModel";
import { IArea } from "../Model/MultiSelectModel";
import { getSelectedCompanies } from "../utils/getSelectedCompanies";
import Grid from "@mui/material/Grid";
import MuiSkeleton from "../Components/MuiSkeleton";

const Home = () => {
  const areas = useGetAreas();
  const { companies, countries } = useGetCompanies_Country();
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [shipments, setShipments] = useState<IShipment[]>([]);

  const onSearch = async () => {
    let selectedCompanies: ISelectedCompanies[] = [];

    companies.forEach((company: ICompanies) => {
      if (selectedCountries.length === 1 && selectedCountries[0] === "All") {
        const companies = getSelectedCompanies(countries, company);
        if (companies && companies[0]?.id) {
          selectedCompanies = [...selectedCompanies, ...companies];
        }
      } else {
        const companies = getSelectedCompanies(selectedCountries, company);
        if (companies && companies[0]?.id) {
          selectedCompanies = [...selectedCompanies, ...companies];
        }
      }
    });

    if (selectedCompanies.length > 0) {
      if (selectedAreas.length === 1 && selectedAreas[0] === 9) {
        getAreasForSelectedCompanies(
          selectedCompanies,
          areas.map((area: IArea) => area.id),
          setShipments
        );
      } else {
        getAreasForSelectedCompanies(
          selectedCompanies,
          selectedAreas,
          setShipments
        );
      }
    }
  };

  const onClearFilters = () => {
    setSelectedAreas([]);
    setSelectedCountries([]);
    setShipments([]);
  };

  return (
    <div>
      <div className="home-title" style={{}}>
        Search Shipment
      </div>
      {areas.length > 0 && countries.length > 0 ? (
        <div className="home-multiSelect">
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: "882px", margin: "auto" }}
          >
            <Grid xs={12} sm={4} md={4} lg={4} sx={{ width: "100%" }} item>
              {" "}
              {areas.length > 0 && (
                <MultipleSelect
                  label="Areas"
                  options={areas}
                  selectedValues={selectedAreas}
                  setSelectedValues={setSelectedAreas}
                />
              )}
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3} sx={{ width: "100%" }} item>
              {" "}
              {countries.length > 0 && (
                <MultipleSelect
                  label="Country"
                  options={countries}
                  selectedValues={selectedCountries}
                  setSelectedValues={setSelectedCountries}
                />
              )}
            </Grid>
            <Grid
              xs={12}
              sm={2}
              md={2}
              lg={2}
              item
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              {" "}
              <div className="home-Button">
                {areas.length > 0 && (
                  <Button
                    startIcon={<SearchIcon />}
                    disabled={
                      selectedAreas.length > 0 && selectedCountries.length > 0
                        ? false
                        : true
                    }
                    variant="contained"
                    color="primary"
                    onClick={onSearch}
                  >
                    Search
                  </Button>
                )}
              </div>
            </Grid>
            <Grid
              xs={12}
              sm={3}
              md={3}
              lg={3}
              item
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              {" "}
              <div className="home-Button">
                {areas.length > 0 && (
                  <Button
                    startIcon={<ClearIcon />}
                    disabled={
                      selectedAreas.length > 0 && selectedCountries.length > 0
                        ? false
                        : true
                    }
                    variant="contained"
                    color="error"
                    onClick={onClearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <MuiSkeleton />
      )}

      <div className="home-card">
        {shipments.length > 0 &&
          shipments.map((shipment, index) => (
            <BasicCard key={index} shipment={shipment} />
          ))}
      </div>
    </div>
  );
};

export default Home;
