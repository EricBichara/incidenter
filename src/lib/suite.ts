import {create, enforce, test} from "vest";


const suite = create((data = {}) => {
    test('incidentId', 'incident id is required', () => {
        enforce(data.incidentId).isNotBlank();
    })

    test('newtype', 'type required', () => {
        console.log('checking newtype');
        if (data.radio === 1) {
            enforce(data.newtype).isNotBlank();
        }

    })
})

export default suite;