import "styles/main.sass"
import Footer from "components/Footer"

function MyApp({Component, pageProps}) {
  return (
    <div className="wrapper">
      <main>
        <Component {...pageProps} />
      </main>
      <Footer/>
    </div>
  )
}

export default MyApp