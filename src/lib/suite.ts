import {create, enforce, omitWhen, only, test} from "vest";


const suite = create((data = {}, field) => {
    only(field);

    test('incidentId', 'Incident id is required', () => {
        enforce(data.incidentId).isNotBlank();
    })

    omitWhen(data.radio === 0, () => {
        test('newtype', 'Type required', () => {
            enforce(data.newtype).isNotBlank();
        })
    })
})

export default suite;