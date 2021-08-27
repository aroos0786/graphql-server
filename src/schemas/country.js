
export const typeDef = `

type Country {
    country_id: ID!
    country_name: String
    state: [State]!
}
type State {
    id: ID!
    name: String
    country_id: Country!
}
`;