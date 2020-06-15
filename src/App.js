import React, {Component} from 'react';
import NavigationBar from './component/NavigationBar'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./game/Home";
import PostForm from "./component/PostForm";
import FilterHome from "./SearchItems/FilterHome";

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Router>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route exact path={"/Home"} component={Home}/>
                        <Route exact path={"/PostForm"} component={PostForm}/>
                        <Route exact path={"/prova"} component={FilterHome}/>
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

export default App;
