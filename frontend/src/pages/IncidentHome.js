import React, { useEffect, useState } from "react";
import {
  getAllIncidents,
  getLocations,
  getJob,
} from "src/mysql_db_api/hackathon_api";
import Table from "src/components/Table";
import { Chart } from "react-google-charts";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

export default function IncidentHome() {
  const TABLE_HEAD = [
    { id: "current_job", label: "current_job", alignRight: false },
    { id: "manager", label: "phone_number", alignRight: false },
    { id: "email", label: "email", alignRight: false },
    { id: "witness", label: "witness", alignRight: false },
    {
      id: "phone_number_witness",
      label: "phone_number_witness",
      alignRight: false,
    },
    { id: "incident_date", label: "Incident Date", alignRight: false },
    { id: "incident_date", label: "report_date", alignRight: false },
    // { id: "report_date", label: "report_date", alignRight: false },
    { id: "" },
  ];
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await getAllIncidents();
    console.log(res);
    setData(res);
  }, []);

  const [noOfLoc, setNoOfLoc] = useState({});

  useEffect(async () => {
    const res = await getLocations();
    console.log(res);
    setNoOfLoc(res);
  }, []);

  const [noOfjobs, setNoOfjobs] = useState({});

  useEffect(async () => {
    const res = await getJob();
    console.log(res);
    setNoOfjobs(res);
  }, []);

  return (
    <>
      <div>
        <h1>Incident Report Overview</h1>
        <div class="column">TOTAL INCIDENTS :{data.length}</div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={6}>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Locations of Incidents</div>}
              data={noOfLoc}
              options={{
                title: "Locations of Incidents",
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
              data={noOfjobs}
              options={{
                // Material design options
                chart: {
                  title: "Jobs",
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
      <h1>Incident Report History</h1>
      <Table files={data} TABLE_HEAD={TABLE_HEAD} />
    </>
  );
}
