import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { setInfo } from '../../state/actions/wizard'

import './Info.css'

export class Info extends React.Component {
    static propTypes = {
        info: PropTypes.object.isRequired,

        setInfo: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.state = { email: this.props.info.email, tel: this.props.info.tel }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleTelChange = this.handleTelChange.bind(this)
    }
    componentWillUnmount() {
        if (this.state.email !== '' && this.state.tel !== '') {
            this.props.setInfo(this.state)
        }
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    handleTelChange(event) {
        this.setState({ tel: event.target.value })
    }
    render() {
        const isNextDisabled = (this.state.email === '' || this.state.tel === '' )
        const nextProps = {
            to: isNextDisabled ? '#' : '/confirm',
        }
        return (
            <div className='container'>
                <h1>{'Step 2. Contact Info.'}</h1>
                <div>
                    <div className='emailBox'>
                        <label htmlFor='emailAddress'>{'Your email address'}</label><br/>
                        <input value={this.state.email} onChange={this.handleEmailChange} type='email' placeholder='sophie@example.com' size="64" maxLength="64" required />
                    </div>
                    <div className='telBox'>
                        <label htmlFor='telAddress'>{'Your telephone'}</label><br/>
                        <input value={this.state.tel} onChange={this.handleTelChange} type="tel" placeholder="+380951111111" size="64" maxLength="64" required />
                    </div>
                </div>
                <Link to='/'>{'Back'}</Link>
                {
                    isNextDisabled ?
                    '' :
                    <Link {...nextProps}>{'Next'}</Link>
                }
            </div>
        )
    }
}

export const mapStateToProps = ({ wizard }) => {
    const {
        info,
    } = wizard

    return {
        info,
    }
}

const mapDispatchToProps = {
    setInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
