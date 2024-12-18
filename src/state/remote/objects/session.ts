import Ajv, {JSONSchemaType} from "ajv"
import {Session} from '../../types'

const ajv = new Ajv()
const schema: JSONSchemaType<Session> = {
  type: "object",
  properties: {
    id: {type: "number"},
    name: {type: "string"},
    sessions: {type: "object", nullable: true},
  },
  required: ["bggId", "name"],
  additionalProperties: false,
}

const validator = ajv.compile(schema)

export function buildCampaign(data: any) {
  const isValid = validator(data)
  if(!isValid) {
    console.log('Validation error', 'game', validator.errors)
    throw new Error('Validation error')
  }
  return data
}