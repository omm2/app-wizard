export const SET_CITY = 'SET_CITY'
export const SET_INFO = 'SET_INFO'

export function setCity(city) {
    return {
        type: SET_CITY,
        payload: { city },
    }
}

export function setInfo(info) {
    return {
        type: SET_INFO,
        payload: { info },
    }
}

export function confirm() {
    return (dispatch, getState) => {
        const {
            wizard: {
                info: {
                    email,
                    tel,
                },
                city,
            },
        } = getState()

        const json = {
            email, tel, city,
        }
        return fetch('/test/json/', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: 'json=' + encodeURIComponent(JSON.stringify(json))
        })
        .then(function (response) {
            return response.json()
        })
        .catch (function (error) {
            console.log('Request failed', error)
        })
    }
}
