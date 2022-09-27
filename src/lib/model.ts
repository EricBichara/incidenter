export interface Incident {
    created_at: Date,
    types: {
        title: string,
        id: number
    },
    notes: string,
    incidentId: string
}

export interface Type{
    created_at: Date,
    title: string,
    id: number
}