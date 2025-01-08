import Ajv, {JSONSchemaType} from "ajv"
import {Campaign} from '../../types'

const ajv = new Ajv()
const schema: JSONSchemaType<Campaign> = {
  type: "object",
  properties: {
    id: {type: "string"},
    name: {type: "string"}
  },
  required: ["id", "name"],
  additionalProperties: false,
}

const validator = ajv.compile(schema)

export function buildCampaign(id?: string, data: any = {}) {
  const {name} = data
  const builtObject = {id, name}
  const isValid = validator(builtObject)
  if(!isValid) {
    console.log('Validation error', 'campaign', validator.errors)
    throw new Error('Validation error')
  }
  return builtObject
}