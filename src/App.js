import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import createFleekTheme from './theme';
import './styles.css';

const theme = createFleekTheme();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Typography variant="h6">Variant h6</Typography>
        <Typography variant="body1">Variant body1</Typography>
        <Typography variant="body2">Variant body2</Typography>
        <Typography variant="caption">Variant caption</Typography>
        <br />
        <Typography variant="button">Variant button</Typography>
        <br/>
        <Button>Button</Button>
        <Button variant="contained">Button</Button>
        <Button variant="outlined">Button</Button>
        <br />
        <Button color="primary">Button</Button>
        <Button variant="contained" color="primary">Button</Button>
        <Button variant="outlined" color="primary">Button</Button>
        <br />
        <TextField value="value" />
      </ThemeProvider>
    </>
  );
}

export default App;
