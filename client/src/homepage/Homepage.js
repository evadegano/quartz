import FullNavbar from "../navbar/FullNavbar";
import Footer from "./Footer";


function Homepage() {
  return (
    <div className="Homepage">
      <FullNavbar />

      <main>
        <section className="section is-large">
          <div className="columns centered-row-container">
            <div className="column">
              <h1 className="title">Store your crypto-assets safely</h1>
            </div>
            <div className="column">
              Second column
            </div>
          </div>
        </section>

        <section>

        </section>

        <section>

        </section>
      </main>

      <Footer />
    </div>
  );
}


export default Homepage;