import {create, enforce, only, test} from "vest";


const suite = create((data = {}, field) => {
    console.log('field', field)
    only(field);
    test('incidentId', 'incident id is required', () => {
        enforce(data.incidentId).isNotBlank();
    })

    test('newtype', 'type required', () => {
        if (data.radio === 1) {
            enforce(data.newtype).isNotBlank();
        }

    })
})

export default suite;