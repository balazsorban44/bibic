type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "button"


type TextAlignment = 
  | "left" 
  | "center" 
  | "right" 
  | "justify"

interface TextProps extends HTMLHeadingElement, HTMLParagraphElement {
  /**
   * Type of text element to use 
   * @default "p"
   */
  variant: TextVariant = "p"
  align: TextAlignment = "left"
}

declare function Text(props: TextProps) : React.ReactElement

export default React.forwardRef(Text)