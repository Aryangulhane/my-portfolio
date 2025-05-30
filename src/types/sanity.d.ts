declare module 'sanity' {
  export interface Rule {
    required(): Rule
    min(min: number): Rule
    max(max: number): Rule
    length(length: number): Rule
    regex(pattern: RegExp, options?: { name?: string; invert?: boolean }): Rule
    custom(fn: (value: any) => boolean | string): Rule
  }

  export interface Image {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }

  export function defineField(field: {
    name: string
    title: string
    type: string
    validation?: (rule: Rule) => Rule
    options?: any
  }): any

  export function defineType(type: {
    name: string
    title: string
    type: string
    fields?: any[]
    preview?: {
      select: {
        title?: string
        media?: string
      }
    }
  }): any
} 