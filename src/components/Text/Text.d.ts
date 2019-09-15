type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "button"

interface TextProps extends HTMLHeadingElement, HTMLParagraphElement {
  variant: TextVariant = "paragraph"
  align: "left" | "center" | "right" | "justify"
}

declare function Text(props: TextProps) : React.ReactElement

export default Text