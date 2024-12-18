import Ajv, {JSONSchemaType} from "ajv"
import {Game} from '../../types'

const ajv = new Ajv()
const schema: JSONSchemaType<Game> = {
  type: "object",
  properties: {
    bggId: {type: "number"},
    name: {type: "string"},
    yearPublished: {type: "integer", nullable: true},
    image: {type: "string", nullable: true},
  },
  required: ["bggId", "name"],
  additionalProperties: false,
}

const validator = ajv.compile(schema)

export function buildGame(data: any) {
  const gameObject = validator(data)
  if(!gameObject) {
    console.log('Validation error', 'game', validator.errors)
    throw new Error('Validation error')
  }
  return data
}