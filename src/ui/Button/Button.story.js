import React from "react"
import {storiesOf} from "@storybook/react"
import Button from "./Button"


storiesOf("Button", module)
  .add("shapes", () =>
    <div>
      <Button>default</Button>
      <Button circle>1</Button>
    </div>
  )
  .add("colors", () =>
    <div>
      <div>
        <Button>default</Button>
        <Button color="accent-dark">dark</Button>
      </div>
      <div>
        <Button color="accent-2">color 2</Button>
        <Button color="accent-3">color 3</Button>
        <Button color="accent-4">color 4</Button>
        <Button color="accent-5">color 5</Button>
      </div>
      <div>
        <Button color="success">success</Button>
        <Button color="warning">warning</Button>
        <Button color="destructive">destructive</Button>
      </div>
    </div>
  )
  .add("sizes", () =>
    <div>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
      <Button size="xl">xl</Button>
    </div>
  )