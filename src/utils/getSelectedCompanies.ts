import { ICompanies, ISelectedCompanies } from "../Model/CompaniesModel";

export const getSelectedCompanies = (
  countries: string[],
  company: ICompanies
) => {
  let selectedCompanies: ISelectedCompanies[] = [];
  countries.forEach((selectedCountry) => {
    if (company.country === selectedCountry) {
      selectedCompanies.push({
        id: company.companyId,
        companyName: company.name,
      });
    }
  });
  if (selectedCompanies[0]?.id) {
    return selectedCompanies;
  }
};
