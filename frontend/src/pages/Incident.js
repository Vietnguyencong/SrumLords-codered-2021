import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IncidentDatePicker from "src/components/calendar/IncidentDatePicker.js";
import { Chart } from "react-google-charts";
//mport IncidentDatePicker from 'codered_frontend/codered_frontend/src/components/calendar/InspectionDatePicker.js';
import { useAuth } from "src/authentication/AuthContext.js";
import "../style.css";
import { addNewIncident } from "src/mysql_db_api/hackathon_api.js";
export default function Incident() {
  const [name, setName] = useState("");
  const [current_job, setCurrentJob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [incidentName, setIncidentName] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidentDesc, setIncidentDesc] = useState("");
  const [incident_date, setIncident_date] = useState("");
  const [date_reported, setDate_reported] = useState("");

  const { setLoading, displayErrMess } = useAuth();
  async function onSubmit() {
    console.log(incident_date, date_reported);
    const new_incident = {
      witness: name,
      current_job: current_job,
      phone_number_witness: phoneNumber,
      email: email,
      manager: incidentName,
      incident_date: incident_date,
      report_date: date_reported,
      incident_description: incidentDesc,
      location: incidentLocation,
      phone_number: phoneNumber,
      user_id: "1",
    };
    const res = await addNewIncident(new_incident);
    // console.log(res);
    if (res) {
      setLoading(true);
      displayErrMess("Successfully added a incident report", "success");
      setCurrentJob("");
      setPhoneNumber("");
      setEmail("");
      setIncidentName("");
      setIncidentLocation("");
      setIncidentDesc("");
      setIncident_date("");
      setDate_reported("");
      setLoading(false);
    }
  }
  return (
    <div>
      <h1 class="heading">Incident Report</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0.75 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h3>Contact Info</h3>
          <p>
            <TextField
              required
              id="outlined-required"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "40%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Job Position"
              value={current_job}
              onChange={(e) => setCurrentJob(e.target.value)}
              style={{ width: "40%" }}
            />
            <TextField
              required
              type="number"
              id="outlined-required"
              label="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "40%" }}
            />
            <TextField
              required
              type="text"
              id="outlined-required"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "40%" }}
            />
          </p>
          <h3>Incident Details</h3>
          <p>
            <TextField
              required
              id="outlined-required"
              label="Incident Name"
              value={incidentName}
              onChange={(e) => setIncidentName(e.target.value)}
              style={{ width: "81%" }}
            />
          </p>
          <p>
            <TextField
              required
              id="outlined-required"
              label="Incident Location"
              value={setIncidentLocation}
              onChange={(e) => setIncidentLocation(e.target.value)}
              style={{ width: "81%" }}
            />
          </p>
          <p>
            <TextField
              multiline
              required
              id="outlined-required"
              rows={3}
              value={incidentDesc}
              onChange={(e) => setIncidentDesc(e.target.value)}
              rowsMax={100}
              style={{ width: "81%" }}
              label="Incident Description"
            />
          </p>
          <div>
            <IncidentDatePicker
              setIncident_date={setIncident_date}
              setDate_reported={setDate_reported}
            />
          </div>
          <TextField
            required
            id="outlined-required"
            label="Attachments"
            style={{ width: "81%" }}
          />
          <span style={{ position: "relative", top: "1.5ch" }}>
            <Button
              variant="text"
              style={{ position: "absolute", width: "100%", left: "-18ch" }}
            >
              Browse
            </Button>
            <Button
              variant="outlined"
              style={{ position: "absolute", width: "100%", left: "-10ch" }}
            >
              Upload
            </Button>
          </span>
          <div style={{ position: "relative", top: "15px" }}>
            <Button
              variant="contained"
              style={{ width: "81%", height: "4ch", fontSize: "large" }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
