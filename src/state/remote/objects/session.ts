import Ajv, {JSONSchemaType} from "ajv"
import {Session} from '../../types'

const schema: JSONSchemaType<Session> = {
  type: "object",
  properties: {
    id: {type: "string"},
    campaign: {type: "string"},
    date: {type: "number"},
    game: {type: "string"},
    sessionPlayers: {
      type: "array", 
      items: {
        type: "object", 
        properties: {
          "player": {type: "string"},
          "color": {type: "string"},
        },
        required: ["player", "color"],
        additionalProperties: false,
      },
    },
    events: {
      type: "array",
      nullable: true,
      items: {
        type: "object", 
        properties: {
          "who": {type: "string", nullable: true},
          "when": {type: "number"},
          "type": {type: "string"},
        },
        required: ["when", "type"],
        additionalProperties: false,
      },
    },
  },
  required: ["id", "campaign", "date", "game", "sessionPlayers"],
  additionalProperties: false,
}

const ajv = new Ajv()
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

export function generateShareCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}