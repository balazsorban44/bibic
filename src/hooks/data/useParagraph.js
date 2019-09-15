import useSubscription from "../useSubscription"

const useParagraph = type => {
  const [paragraphs, loading] = useSubscription({ref: "paragraphs", initialState: {}})
  return (loading || !paragraphs[type]) ? [{}, true] : [paragraphs[type], loading]
}

export default useParagraph