export interface CustomPropertyFunction {
  (): Promise<void>
}

export type CustomProperty = unknown | CustomPropertyFunction | CustomPropertyObject

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPropertyObject extends Record<string, CustomProperty> {}
