import { GraphQLClient } from 'graphql-request'
import Cookies from 'js-cookie'
import { getSdk } from '~/generated/graphql'

const getAuthToken = () => {
  const name = `auth._token.oauth2`
  const authToken = Cookies.get(name)
  return authToken || ''
}

export default {
  fetchList({
    after,
    before,
    first,
    last,
  }: {
    after?: string | null
    before?: string | null
    first?: number | null
    last?: number | null
  }) {
    const headers = { Authorization: getAuthToken() }
    const client = new GraphQLClient(process.env.GRAPHQL_URL || '', { headers })
    const sdk = getSdk(client)
    const variables = { after, before, first, last }
    return sdk.Tasks(variables)
  },

  fetch({ id }: { id: string }) {
    const headers = { Authorization: getAuthToken() }
    const client = new GraphQLClient(process.env.GRAPHQL_URL || '', { headers })
    const sdk = getSdk(client)
    const variables = { id }
    return sdk.Task(variables)
  },
}
