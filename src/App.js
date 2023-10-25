import './App.css';
import Login from "./components/login/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import MyTable from "./components/MyTable/MyTable";
import MyTable2 from './components/MyTable/MyTable2'

const theme = createTheme({
    palette: {
        primary: {
            main: '#717273',

        },
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>

            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/table' component={MyTable}/>

                    </Switch>
                </Router>

            </div>
        </ThemeProvider>
    );
}

export default App;
