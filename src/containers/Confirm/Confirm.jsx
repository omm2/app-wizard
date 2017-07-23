import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

import { confirm } from '../../state/actions/wizard'

import './Confirm.css'

export class Confirm extends React.Component {
    static propTypes = {
        city: PropTypes.string.isRequired,
        info: PropTypes.object.isRequired,

        confirm: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='container'>
                <h1>{'Step 3. Confirm.'}</h1>
                <div>
                    <strong>{'Your city is: '}</strong> {this.props.city}
                </div>
                <div>
                    <strong>{'Your email is: '}</strong> {this.props.info.email}
                </div>
                <div>
                    <strong>{'Your telephone is: '}</strong> {this.props.info.tel}
                </div>
                <Link to='/info'>{'Back'}</Link>
                <RaisedButton label='Confirm' onClick={this.props.confirm} />
            </div>
        )
    }
}

export const mapStateToProps = ({ wizard }) => {
    const {
        city,
        info,
    } = wizard

    return {
        city,
        info,
    }
}

const mapDispatchToProps = {
    confirm,
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
