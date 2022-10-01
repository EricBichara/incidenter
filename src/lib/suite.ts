import {create, enforce, only, optional, test} from "vest";


const suite = create((data = {}, field) => {
    only(field);

    test('incidentId', 'incident id is required', () => {
        enforce(data.incidentId).isNotBlank();
    })

    test('newtype', 'type required', () => {
        if (data.radio === 1) {
            console.log('test newtype')
            enforce(data.newtype).isNotBlank();
        }else{
            return true;
        }
    })
})

export default suite;