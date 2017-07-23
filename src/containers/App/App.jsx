import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { City } from '../City/City.jsx'
import { Info } from '../Info/Info.jsx'
import { Confirm } from '../Confirm/Confirm.jsx'

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Switch>
                    <Route exact path={'/'} component={City} />
                    <Route path={'/info'} component={Info} />
                    <Route path={'/confirm'} component={Confirm} />
                </Switch>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(App)
