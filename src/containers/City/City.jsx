import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import { setCity } from '../../state/actions/wizard'

import './City.css'

let autocomplete

function initAutocomplete({ onPlaceChange }) {
    autocomplete = new window.google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        { types: ['geocode'] })

    autocomplete.addListener('place_changed', onPlaceChange)
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function(position) {
            const geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            const circle = new window.google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy,
            })
            autocomplete.setBounds(circle.getBounds())
        })
    }
}
export class City extends React.Component {
    static propTypes = {
        city: PropTypes.string.isRequired,

        setCity: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.onPlaceChange = this.onPlaceChange.bind(this)
    }
    componentDidMount() {
        initAutocomplete({ onPlaceChange: this.onPlaceChange })
    }
    onPlaceChange() {
        const place = autocomplete.getPlace()
        this.props.setCity(place.formatted_address)
    }
    render() {
        const isNextDisabled = (this.props.city === '')
        const nextProps = {
            label: 'Next',
            disabled: isNextDisabled,
            href: isNextDisabled ? '#' : '/info',
            backgroundColor: isNextDisabled ? '#e1e2e1' : '#4fc3f7',
            style: { color: '#fff' },
        }
        return (
            <div className='container'>
                <h1>{'Step 1. City.'}</h1>
                {
                    this.props.city &&
                    <div>{`Your city is: ${this.props.city}`}</div>
                }
                {
                    !this.props.city &&
                    <div>{'Please choose your city'}</div>
                }
                <div id='locationField'>
                  <input id='autocomplete' placeholder='Enter your city'
                         onFocus={geolocate()} type='text'/>
                </div>

                <RaisedButton {...nextProps} />
            </div>
        )
    }
}

export const mapStateToProps = ({ wizard }) => {
    const {
        city,
    } = wizard

    return {
        city,
    }
}

const mapDispatchToProps = {
    setCity,
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
