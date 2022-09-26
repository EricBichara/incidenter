export interface Incident {
    created_at: Date,
    types: {
        title: string,
    },
    notes: string,
    incidentId: string
}