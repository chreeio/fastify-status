export interface CustomPropertyFunction {
  (): Promise<void>
}

export type CustomProperty = unknown | CustomPropertyFunction | CustomPropertyObject

export type CustomPropertyObject = Record<string, CustomProperty>
