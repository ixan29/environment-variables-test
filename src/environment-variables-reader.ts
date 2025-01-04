function readEnvironmentVariables<EnvironmentVariableTypeMap>(environmentVariableTypeMap: EnvironmentVariableTypeMap): EnvironmentVariableTypeMap {
    const errors = []
    const environmentVariables: EnvironmentVariableTypeMap = {} as EnvironmentVariableTypeMap
    for (const environmentVariableName in environmentVariableTypeMap) {
        const environmentVariableValue = process.env[environmentVariableName]
        if (environmentVariableValue === undefined) {
            errors.push(`Environment variable ${environmentVariableName} is not set`)
            continue
        }
        const environmentVariableType = environmentVariableTypeMap[environmentVariableName]
        if (typeof environmentVariableType === 'string') {
            environmentVariables[environmentVariableName] = environmentVariableValue as any
        } else if (typeof environmentVariableType === 'number') {
            environmentVariables[environmentVariableName] = Number(environmentVariableValue) as any
        } else if (typeof environmentVariableType === 'boolean') {
            if (environmentVariableValue.toLowerCase() === 'true') {
                environmentVariables[environmentVariableName] = true as any
            }
            else if (environmentVariableValue.toLowerCase() === 'false') {
                environmentVariables[environmentVariableName] = false as any
            }
            else {
                errors.push(`Environment variable ${environmentVariableName} is not a boolean`)
            }
        } else {
            errors.push(`Environment variable ${environmentVariableName} has an unsupported type`)
        }
    }

    if (errors.length > 0) {
        throw new Error(`Errors reading environment variables: ${errors.join(', ')}`)
    }

    return environmentVariables
}

export class EnvironmentVariablesReader {

    public readonly stringValue: string
    public readonly numberValue: number
    public readonly booleanValue: boolean

    constructor()
    {
        const environmentVariableTypeMap = {
            STRING_VALUE: String(),
            NUMBER_VALUE: Number(),
            BOOLEAN_VALUE: Boolean()
        }

        const environmentVariables = readEnvironmentVariables(environmentVariableTypeMap)

        this.stringValue = environmentVariables.STRING_VALUE
        this.numberValue = environmentVariables.NUMBER_VALUE
        this.booleanValue = environmentVariables.BOOLEAN_VALUE
    }
}
