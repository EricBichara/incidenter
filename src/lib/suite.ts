import {create, enforce, test} from "vest";


const suite = create((data = {}) => {
    test('incidentId', 'incident id is required', () => {
        enforce(data.incidentId).isNotBlank();
    })

    test('newtype', 'type required', () => {
        if (data.radio === 1) {
            console.log('incident test', data);
            enforce(data.incidentId).isNotBlank();
        }

    })
})

export default suite;