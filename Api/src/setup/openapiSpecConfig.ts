import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import { cloneDeep } from 'lodash'

const ROUTE_PATH = path.join(__dirname, '../routes/**/*.ts')
const ENTITY_PATH = path.join(__dirname, '../entities/**/*.ts')

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'St Michel Website API',
      version: '0.1.0',
      // eslint-disable-next-line max-len
      description: 'St Michel Website Backend'
    },
    servers: [
      {
        url: '/api'
      }
    ],
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: 'Bearer <JWT token here>'
        }
      }
    }
  },
  apis: [ROUTE_PATH, ENTITY_PATH]
}

const generatedSwagger = swaggerJSDoc(options)

export const openAPISpecification: any = cloneDeep(generatedSwagger)

const tagOrder = [
  "Images",
  "Language",
  "Location",
  "Mass Times",
  "Recent Events",
  "Top News And Notices",
  "Users",
  "Parish History",
  "Priests",
  "Welcome Message",
  "Services"
];

openAPISpecification.tags.sort((a: any, b: any) => {
  const indexA = tagOrder.indexOf(a.name)
  const indexB = tagOrder.indexOf(b.name)
  if (indexA === -1) return 1
  if (indexB === -1) return -1
  return indexA - indexB
})

fs.writeFileSync(
  path.join(__dirname, '../docs/openapi-autogenerated.yaml'),
  yaml.dump(openAPISpecification)
)
