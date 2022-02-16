import FullNavbar from "../navbars/FullNavbar";
import Footer from "./Footer";


function Homepage() {
  return (
    <div className="homepage">
      <FullNavbar />

      <main>
        <section className="section is-large">
          <div className="columns centered-row-container">
            <div className="column">
              <h1 className="title">Meet the future of cryptocurrency</h1>
              <p>Quartz is a digital stablecoin that allows you too</p>
            </div>

            <div className="column">
              illustration
            </div>
          </div>
        </section>

        <section>
          <div className="columns centered-row-container">
            <div className="column">
              <h1 className="title">Data integrity</h1>
              <p>This is a paragraph.</p>
            </div>

            <div className="column">
              <h1 className="title">Blazing-fast queries</h1>
              <p>This is a paragraph.</p>
            </div>

            <div className="column">
              <h1 className="title">Cost efficiency</h1>
              <p>This is a paragraph.</p>
            </div>

            <div className="column">
              <h1 className="title">Scalability</h1>
              <p>This is a paragraph.</p>
            </div>

            <div className="column">
              <h1 className="title">Privacy</h1>
              <p>This is a paragraph.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="columns centered-row-container">
            <div className="column">
              illustration
            </div>

            <div className="column">
              <h1 className="title">The best of blockchains and databases</h1>
              <p>Quartz is a digital stablecoin that allows you too</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


export default Homepage;