import React, { useEffect, useState } from "react";
import {
  getAllInpection,
  getLocations,
  getJob,
} from "src/mysql_db_api/hackathon_api";
import Table from "src/components/Table";
import { Chart } from "react-google-charts";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import InspectionTable from "src/components/InspectionTable";
export default function InspectionHome() {
  const TABLE_HEAD = [
    { id: "inspector", label: "Inspector", alignRight: false },
    { id: "inspection_date", label: "Inspection Date", alignRight: false },
    { id: "completed_date", label: "Completed Date", alignRight: false },
  ];

  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await getAllInpection();
    console.log(res);
    setData(res[0].data);
  }, []);

  return (
    <>
      <div>
        <h1>Inspections Report Overview</h1>
        <div class="column">TOTAL INSPECTIONS :1</div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={6}>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Locations of Incidents</div>}
              data={[
                ["Task", "Hours per Day"],
                ["Work", 11],
                ["Eat", 2],
                ["Commute", 2],
                ["Watch TV", 2],
                ["Sleep", 7],
              ]}
              options={{
                title: "Locations of Inspections",
                is3D: true,
              }}
              rootProps={{ "data-testid": "2" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Year", "Sales", "Expenses", "Profit"],
                ["2014", 1000, 400, 200],
                ["2015", 1170, 460, 250],
                ["2016", 660, 1120, 300],
                ["2017", 1030, 540, 350],
              ]}
              options={{
                // Material design options
                chart: {
                  title: "Inspections",
                  subtitle: "Sales, Expenses, and Profit: 2014-2017",
                },
              }}
              // For tests
              rootProps={{ "data-testid": "2" }}
            />
          </Grid>
        </Grid>
        <Chart
          width={1000}
          height={250}
          chartType="Calendar"
          loader={<div>Loading Dates</div>}
          data={[
            [
              { type: "date", id: "Date" },
              { type: "number", id: "Won/Loss" },
            ],
            [new Date(2012, 3, 13), 37032],
            [new Date(2012, 3, 14), 38024],
            [new Date(2012, 3, 15), 38024],
            [new Date(2012, 3, 16), 38108],
            [new Date(2012, 3, 17), 38229],
          ]}
          options={{
            title: "Dates of Incidents",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      <h1>Inspections Report History</h1>
      <InspectionTable files={data} TABLE_HEAD={TABLE_HEAD} />
    </>
  );
}
