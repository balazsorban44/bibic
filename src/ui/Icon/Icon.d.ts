interface IconProps extends React.ReactElement, HTMLImageElement {}

declare function Icon(props: IconProps) : React.ReactElement

export default React.forwardRef(Icon)