import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const App = () => {
  const [count, setCount] = useState({});
  const [name, setName] = useState(1);

  const handleinc = () => {
    const url = `https://counterapi.krischer.io/inc/?name=${name}`;
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setCount({ ...count, [name]: parseInt(text) });
      });
  };

  const handledec = () => {
    const url = `https://counterapi.krischer.io/dec/?name=${name}`;
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setCount({ ...count, [name]: parseInt(text) });
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const url = `https://counterapi.krischer.io/all`;
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setCount(json);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerstyle = {
    touchAction: "manipulation",
  };

  const counterstyle = {
    margin: "50px",
  };

  const buttonstyle = {
    margin: "50px",
  };

  const formstyle = {
    marginTop: "50px",
  };

  const selctStyle = {
    marginTop: "50px",
  };

  const names = [];
  for (let i = 1; i <= 100; i++) names.push(i);

  console.log(count);

  return (
    <div className="App" style={containerstyle}>
      <center>
        <Select
          style={selctStyle}
          value={name}
          label={"Counter"}
          onChange={(event) => setName(event.target.value)}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {`Counter ${name}:  (${
                count[name] !== undefined ? count[name] : 0
              })`}
            </MenuItem>
          ))}
        </Select>
        <div style={counterstyle}>
          <Typography variant="h5">
            {name === "default" ? "Counter: " : `Counter ${name}:`}{" "}
          </Typography>
          <Typography variant="h1">
            {count[name] !== undefined ? count[name] : 0}
          </Typography>
        </div>
        <Button variant="contained" onClick={handleinc} style={buttonstyle}>
          <Typography variant="h3">+</Typography>
        </Button>
        <Button variant="contained" onClick={handledec} style={buttonstyle}>
          <Typography variant="h3">-</Typography>
        </Button>
      </center>
    </div>
  );
};

export default App;
