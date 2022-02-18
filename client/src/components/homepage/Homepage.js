import FullNavbar from "../navbars/FullNavbar";
import Footer from "./Footer";


function Homepage() {
  return (
    <div className="homepage">
      <FullNavbar />

      <main>
        <section className="row-container">
            <div className="column">
              <h1 className="title">Meet the future of banking</h1>
              <p>Quartz is a decentralized banking system that allows anyone to make fast secure transactions. 
                <br />While it is built like a blockchain, Quartz stores its data on a graph database that's distributed among all users.
                <br />No need to download a whole copy of the blockchain. 
                <br />Every user stores part of the data on their own cloud database and can validate and mine blocks if they want to. 

By combining the power of modern databases with the integrity of blockchains, Quartz offers a way to securely store data while still providing easy ways to query the data from the transactions.
Those hybrids are called blockchain databases and try to use the best of both worlds to create a secure and immutable chain of easily queryable blocks that offers excellent performance.
Centralized ledger: MongoDB can be used to store all the information about the blocks. This information is stored with cryptographic evidence to avoid any tampering with the data.
Revolutionary Blockchain technology meets MongoDB’s empowering backend service and Database for modern applications to create next generation solutions. Using Stitch platform will allow us to design and build the next decentralize, trusted and fraud free applications utilizing its newest features.
              </p>
            </div>

            <div className="column">
              illustration
            </div>
        </section>

        <section>
          <div className="row-container">
            <div className="column">
              <h2>Data integrity</h2>
              <p>Quartz’s Merkle tree structure makes it virtually impossible for someone to change the data without breaking the chain.</p>
            </div>

            <div className="column">
              <h2>Blazing-fast queries</h2>
              <p>On-chain data are stored in a realtime, decentralized, offline-first, graph database engine.
              <br/>Hence querying blocks is as fast as in any other modern database.</p>
            </div>

            <div className="column">
              <h2>Cost efficiency</h2>
              <p>Distributing data among users means less physical storage.
              <br/>No disk space is required. Each client is a lightweight node.</p>
            </div>

            <div className="column">
              <h2>Privacy & Transparency</h2>
              <p>While on-chain data is accessible to anyone, they are encrypted to preserve anonymity and secured with public/private key cryptography.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="columns">
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