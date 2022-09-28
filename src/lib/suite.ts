import {create, enforce, test} from "vest";


const suite = create((data = {}) => {
    test('incidentId', 'incident id is required', () => {
        console.log('incident test', data);
        enforce(data.incidentId).isNotBlank();
    })


})

export default suite;