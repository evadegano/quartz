import React from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import FullNavbar from "../navbars/FullNavbar";
import Footer from "./Footer";
import Illustration from "./Illustration";
gsap.registerPlugin(MotionPathPlugin);



function Homepage(props) {
  
  // wait until DOM has been rendered
  // React.useEffect(() => {
    
  // });

  return (
    <div className="homepage">
      <FullNavbar user={props.user} />

      <main>
        <section className="header-container">
          <div className="column left-align large-col">
            <h1 className="title">Meet the future of banking</h1>
            <p>Quartz is a decentralized cash system that allows anyone with a wifi connection to make fast and secure worldwide transactions. 
              <br/>While it is built like a blockchain, Quartz stores its data on a graph database that is distributed among all users.
              <br/>No need to download a whole copy of the blockchain. Every user stores part of the data and can validate and mine blocks if they want to. 
              

              <br/><span className="text-highlight">By combining the power of modern databases with the integrity of blockchains, Quartz offers a way to securely make transactions while still providing easy ways to query the data.</span>
            </p>
          </div>

          <div className="column large-col">

            <Illustration />

          </div>
        </section>

        <section>
          <div className="row-container">
            <div className="column">
              <h2>Data 
                <br/>integrity</h2>
              <p>Quartz’s Merkle tree structure makes it virtually impossible for someone to change the data without breaking the chain.</p>
            </div>

            <div className="column">
              <h2>Blazing-fast
                <br/>queries</h2>
              <p>On-chain data are stored in a realtime, decentralized, offline-first, graph database engine. So querying blocks is as fast as in any other modern database.</p>
            </div>

            <div className="column">
              <h2>Cost 
                <br/>efficiency</h2>
              <p>Distributing data among users means less physical storage.
              <br/>No disk space is required. Each client is a lightweight node.</p>
            </div>

            <div className="column">
              <h2>Privacy &
                <br/>Transparency</h2>
              <p>While on-chain data is accessible to anyone, they are encrypted to preserve anonymity and secured with public/private key cryptography.</p>
            </div>
          </div>
        </section>

        <section>
          <div>
            <h1 className="title">The best of blockchains and databases</h1>
            <img src="/illustrations/hp-illustration.png" alt="" width="70%" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


export default Homepage;