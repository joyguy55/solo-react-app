import { useState, useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { InfoBox, Select, Table } from "./components";
import useAxios from "./utils/useAxios";
import states from "./utils/states.json";

import "./App.css";

export interface representativeInterface {
  name: string;
  party: string;
  state: string;
  district: string;
  phone: string;
  office: string;
  link: string;
}

const defaultRepresentative = {
  name: "",
  party: "",
  state: "",
  district: "",
  phone: "",
  office: "",
  link: "",
};

function App() {
  // TODO: geoLocation API for state defaults
  const [state, setState] = useState("UT");
  const [type, setType] = useState("senators");
  const [results, setResults] = useState([]);
  const [representative, setRepresentative] = useState(defaultRepresentative);

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  let stateList = [];

  for (const [key, value] of Object.entries(states)) {
    stateList.push({ label: value, value: key });
  }

  const { fetchData } = useAxios();

  useEffect(() => {
    fetchData(
      {
        method: "GET",
        url: `/${type}/${state}`,
        headers: {
          accept: "*/*",
        },
      },
      (data) => {
        setResults(data.results);
      }
    );
  }, [type, state]);

  return (
    <div className="App">
      <Typography variant="h3" sx={{ textAlign: "left", marginBottom: "20px" }}>
        {" "}
        Who is my Representative{" "}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Select
            label="State"
            value={state}
            options={stateList}
            callBack={handleStateChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            label="Senator or Representative"
            value={type}
            options={[
              { value: "senators", label: "Senator" },
              { value: "representatives", label: "Representative" },
            ]}
            callBack={handleTypeChange}
          />
          {/* Note: I took the liberty of excluding the submit button. I would consult with design on this */}
        </Grid>
        <Grid item xs={8}>
          <Table
            rows={results}
            callBack={(selectionName: string) => {
              const current = results.find(({ name }) => {
                return name === selectionName;
              });
              setRepresentative(current || defaultRepresentative);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoBox info={representative} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
