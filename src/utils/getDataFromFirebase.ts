export const getAreasForSelectedCompanies = async (
  selectedCompanies: any = [],
  selectedAreas: any = [],
  setShipments?: (item: any) => void
) => {
  let company_areas: any = [];

  await fetch(
    "https://shipment-df1e4-default-rtdb.firebaseio.com/companyArea.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((company_area: any) => {
        selectedCompanies.forEach((selectedCompany: any) => {
          selectedAreas.forEach((selectedArea: any) => {
            if (
              company_area.areaId === selectedArea &&
              company_area.companyId === selectedCompany.id
            ) {
              company_areas.push({
                companyName: selectedCompany.companyName,
                companyId: selectedCompany.id,
                areaId: company_area.areaId,
                //area: selectedArea.label,
              });
            }
          });
        });
      });
    });
  if (company_areas.length > 0) {
    getShipments(company_areas).then((data) => {
      setShipments?.(data);
    });
  }
};

export const getShipments = async (company_areas: any) => {
  let result: any = [];
  await fetch(
    "https://shipment-df1e4-default-rtdb.firebaseio.com/shipments.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      company_areas.forEach((company_area: any, companyAreaIndex: number) => {
        let count: number = 0;

        data.forEach((shipment: any, shipmentIndex: number) => {
          if (
            company_area.companyId === shipment.companyId &&
            company_area.areaId === shipment.areaId
          ) {
            count++;
          }
          if (data.length - 1 === shipmentIndex) {
            company_areas[companyAreaIndex].count = count;
          }
        });
      });
    });
  result = company_areas.sort(
    (company_area1: any, company_area2: any) =>
      company_area2.count - company_area1.count
  );

  return result;
};
