declare module '@portabletext/react' {
  import { PortableTextBlock } from '@portabletext/types'
  
  interface PortableTextProps {
    value: PortableTextBlock[]
    components?: {
      block?: React.ComponentType<any>
      marks?: {
        [key: string]: React.ComponentType<any>
      }
      list?: React.ComponentType<any>
      listItem?: React.ComponentType<any>
      types?: {
        [key: string]: React.ComponentType<any>
      }
    }
  }

  export const PortableText: React.FC<PortableTextProps>
} 