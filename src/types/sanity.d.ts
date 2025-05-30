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

  export function defineConfig(config: {
    projectId: string;
    dataset: string;
    basePath?: string;
    plugins?: any[];
    schema?: {
      types: any[];
    };
  }): any;
}

declare module '@sanity/vision' {
  export function visionTool(): any;
}

declare module 'sanity/desk' {
  export function deskTool(): any;
}

declare module '@sanity/image-url' {
  import { SanityClient } from '@sanity/client'
  
  interface ImageUrlBuilder {
    image(source: any): {
      url(): string
      width(width: number): ImageUrlBuilder
      height(height: number): ImageUrlBuilder
      fit(fit: string): ImageUrlBuilder
      format(format: string): ImageUrlBuilder
      quality(quality: number): ImageUrlBuilder
      auto(format: string): ImageUrlBuilder
      blur(blur: number): ImageUrlBuilder
      crop(crop: { top: number; bottom: number; left: number; right: number }): ImageUrlBuilder
      rect(x: number, y: number, w: number, h: number): ImageUrlBuilder
      orientation(orientation: number): ImageUrlBuilder
      flipHorizontal(): ImageUrlBuilder
      flipVertical(): ImageUrlBuilder
      invert(): ImageUrlBuilder
      saturation(saturation: number): ImageUrlBuilder
      brightness(brightness: number): ImageUrlBuilder
      contrast(contrast: number): ImageUrlBuilder
      grayscale(): ImageUrlBuilder
      sepia(): ImageUrlBuilder
      sharpen(amount: number): ImageUrlBuilder
      blur(amount: number): ImageUrlBuilder
      dpr(dpr: number): ImageUrlBuilder
      bg(bg: string): ImageUrlBuilder
    }
  }

  export default function imageUrlBuilder(client: SanityClient): ImageUrlBuilder
} 