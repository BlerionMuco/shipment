import { useEffect, useState } from "react";
import { ICompanies } from "../Model/CompaniesModel";

const useGetCompanies_Country = () => {
  const [companies, setCompanies] = useState<ICompanies[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://shipment-df1e4-default-rtdb.firebaseio.com/companies.json")
      .then((response) => {
        return response.json();
      })
      .then((data: ICompanies[]) => {
        const unique: string[] = [
          //@ts-ignore
          ...new Set(data.map((item: Companies) => item.country)),
        ];

        const countryArray: string[] = [...unique, "All"];
        setCountries(countryArray);
        setCompanies(data);
      });
  }, []);
  return { companies, countries };
};

export default useGetCompanies_Country;
