import Ajv, {JSONSchemaType} from "ajv"
import {Session} from '../../types'

const ajv = new Ajv()
const schema: JSONSchemaType<Session> = {
  type: "object",
  properties: {
    id: {type: "string"},
    campaign: {type: "string"},
    date: {type: "number"},
    game: {type: "string"},
    sessionPlayers: {type: "array"},
    events: {type: "array"},
  },
  required: ["id", "campaign", "date", "game", "sessionPlayers"],
  additionalProperties: false,
}

const validator = ajv.compile(schema)

export function buildSession(id?: string, data: any = {}) {
  const {campaign, date, game, sessionPlayers, events} = data
  const builtObject = {id, campaign, date: date.toDate().getTime(), game, sessionPlayers, events}
  const isValid = validator(builtObject)
  if(!isValid) {
    console.log('Validation error', 'session', validator.errors, id, data)
    throw new Error('Validation error')
  }
  return builtObject
}