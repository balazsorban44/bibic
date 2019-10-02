type ButtonColor =
  | "default"
  | "accent-dark"
  | "accent-2"
  | "accent-3"
  | "accent-4"
  | "accent-5"
  | "success"
  | "warning"
  | "destructive"
  | "room-1"
  | "room-2"
  | "room-3"
  | "room-4"
  | "room-5"
  | "room-6"
  | 'none'

type ButtonSize =
  | "small"
  | "medium"
  | "large"
  | "xl"

interface ButtonProps extends React.ReactElement {
  /** Color of the button. */
  color: ButtonColor = "default"
  /** Changes the padding and font size. */
  size: ButtonSize = "medium"
  /** Spread horizontally to fill up available place. */
  fullWidth: boolean = false
  /** Wheteher the button should have full rounded borders or not. */
  circle: boolean = false
}

declare function Button(props: ButtonProps) : React.ReactElement

export default React.forwardRef(Button)