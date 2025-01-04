import express from "express"
import { EnvironmentVariablesReader } from "./environment-variables-reader"

async function run()
{
    const environmentVariables: {[key: string]: any} = {}

    try {
        const environmentVariablesReader = new EnvironmentVariablesReader()
        environmentVariables.STRING_VALUE = environmentVariablesReader.stringValue
        environmentVariables.NUMBER_VALUE = environmentVariablesReader.numberValue
        environmentVariables.BOOLEAN_VALUE = environmentVariablesReader.booleanValue
    } catch (error: any) {
        console.error(error.message)
    }

    const app = express()
    
    app.get("/", (_req, res) => {
        res.send({environmentVariables})
    })

    const port = environmentVariables.port || 8000

    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}

run().catch(console.error)