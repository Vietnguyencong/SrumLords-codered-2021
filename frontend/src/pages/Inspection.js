import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import InspectionDatePicker from "src/components/calendar/InspectionDatePicker";
import CheckboxList from "src/components/checklist/Checkbox";
import { useAuth } from "src/authentication/AuthContext";
import { addNewInspection } from "src/mysql_db_api/hackathon_api.js";
export default function InspectionPage() {
  const [inspector, setinspector] = useState("");
  const [job, setjpb] = useState("");
  const [inspectionDate, setInpsectionDate] = useState("");
  const [completeDate, setCompleteDate] = useState("");
  const [note, setNote] = useState("");
  const [checklist1, setchecklist1] = useState("");
  const [checklist2, setchecklist2] = useState("");
  const [checklist3, setchecklist3] = useState("");
  const { setLoading, displayErrMess } = useAuth();

  async function submitButton() {
    const new_information = {
      inspection_date: inspectionDate,
      completed_date: completeDate,
      inspector: inspector,
      inspection_note: note,
      inspection_question1: "",
      inspection_question2: "",
      inspection_question3: "",
      inspection_answer1: 1,
      inspection_answe2: 1,
      inspection_answer3: 1,
      user_id: "1",
    };
    setLoading(true);
    const res = await addNewInspection(new_information);
    if (res) {
      displayErrMess("Successfully added a new inspection!", "success");
    }
    console.log(res);
    setLoading(false);
  }
  return (
    <div>
      <h1> Inspection Page </h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0.75 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <p>
            <h4>Inspection Information</h4>
            <TextField
              required
              id="outlined-required"
              label="Inspector"
              style={{ width: "30%" }}
              /*placeholder="Who?"
          InputProps={{
            startAdornment: <outline-required position="center"></outline-required>,
          }}*/
            />
          </p>
        </div>

        <div>
          <TextField
            required
            id="outlined-required"
            label="Job"
            style={{ width: "30%" }}
            /*placeholder="Current Job"
          InputProps={{
            startAdornment: <outline-required position="center"></outline-required>,
          }}*/
          />
        </div>

        <p>
          <InspectionDatePicker />
        </p>

        <div>
          <h4>Inspection Note: </h4>
          <TextField
            multiline
            required
            id="outlined-required"
            rows={3}
            rowsMax={100}
            style={{ width: "81%" }}
            label="Inspection Description"
            placeholder="Description"
            /*label="Inspection Note:"
          variant="standard"
          InputProps={{
            startAdornment: <outline-required position="center"></outline-required>,
          }}*/
            size="large"
          />
        </div>
      </Box>

      <div>
        <h4>Inspection Checklist: </h4>
        <p>
          <CheckboxList />
        </p>
        {/* <ListItem>
        <ListItemText primary="First-Aid Kits are accessible and stocked for workers" />
        </ListItem>
        <ListItem>
        <ListItemText primary="Supervisory Safety Manual is on site along with accident report forms" />
        </ListItem>
        <ListItem>
        <ListItemText primary="Chemicals and containers are labelled according to Government Regulations" />
        </ListItem> */}
      </div>

      <div></div>
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
          onClick={submitButton}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
