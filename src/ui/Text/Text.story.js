import React from "react"
import {storiesOf} from "@storybook/react"
import Text from "./Text"
import colors from "ui/utils/colors"

storiesOf("Text", module)
  .add("variants", () =>
    <div style={{background: colors.accentColorDark, padding: 16}}>
      <div>
        <Text variant="h1">heading 1</Text>
        <Text variant="h2">heading 2</Text>
        <Text variant="h3">heading 3</Text>
        <Text variant="h4">heading 4</Text>
        <Text variant="h5">heading 5</Text>
        <Text variant="h6">heading 6</Text>
      </div>
      <div>
        <br/>>
        <Text variant="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Text variant="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </div>
    </div>
  )
  .add("alignments", () =>
    <div style={{margin: "0 auto", maxWidth: 460, background: colors.accentColorDark, padding: 16}}>
      <Text variant="h1">Left</Text>
      <Text align="center" variant="h2">Center</Text>
      <Text align="right" variant="h6">Right</Text>
      <Text align="justify" variant="p">This is justify aligned text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
    </div>
  )