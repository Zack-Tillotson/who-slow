import Ajv, {JSONSchemaType} from "ajv"
import {Game} from '../../types'

const ajv = new Ajv()
const schema: JSONSchemaType<Game> = {
  type: "object",
  properties: {
    id: {type: "string"},
    name: {type: "string"},
    yearPublished: {type: "integer", nullable: true},
    image: {type: "string", nullable: true},
  },
  required: ["id", "name"],
  additionalProperties: false,
}

const validator = ajv.compile(schema)

export function buildGame(id?: string, data: any = {}) {
  const {name, yearPublished, image} = data
  const builtObject = {id, name, yearPublished, image}
  const isValid = validator(builtObject)
  if(!isValid) {
    console.log('Validation error', 'campaign', validator.errors)
    throw new Error('Validation error')
  }
  return builtObject
}