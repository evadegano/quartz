import React from "react";
import { gsap } from "gsap";
import FullNavbar from "../navbars/FullNavbar";
import Footer from "./Footer";


function Homepage() {
  // svg illustrations
  const ill1Path1 = React.useRef();
  const ill1Path2 = React.useRef();
  const ill1Path3 = React.useRef();
  const ill1Path4 = React.useRef();
  const ill1Path5 = React.useRef();
  const ill1Path6 = React.useRef();
  const ill1Circ1 = React.useRef();
  const ill1Line1 = React.useRef();

  // wait until DOM has been rendered
  React.useEffect(() => {
    gsap.to(ill1Circ1.current, { "stroke-dashoffset": 0, duration: 2});
    gsap.to(ill1Path1.current, { "stroke-dashoffset": 0, duration: 5});
    gsap.to(ill1Path2.current, { "stroke-dashoffset": 0, duration: 5 });
    gsap.to(ill1Path3.current, { "stroke-dashoffset": 0, duration: 5 });
    gsap.to(ill1Path4.current, { "stroke-dashoffset": 0, duration: 5 });
    gsap.to(ill1Path5.current, { "stroke-dashoffset": 0, duration: 5 });
    gsap.to(ill1Path6.current, { "stroke-dashoffset": 0, duration: 5 });
    
    gsap.to(ill1Line1.current, { "stroke-dashoffset": 0, duration: 5});

  });

  return (
    <div className="homepage">
      <FullNavbar />

      <main>
        <section className="header-container">
            <div className="column left-align">
              <h1 className="title">Meet the future of banking</h1>
              <p>Quartz is a decentralized banking system that allows anyone to make fast and secure transactions. 
                <br/>While it is built like a blockchain, Quartz stores its data on a graph database that is distributed among all users.
                <br/>No need to download a whole copy of the blockchain. Every user stores part of the data and can validate and mine blocks if they want to. 
                

                <br/><span className="text-highlight">By combining the power of modern databases with the integrity of blockchains, Quartz offers a way to securely make transactions while still providing easy ways to query the data.</span>
              </p>
            </div>

            <div className="column">
              <svg className="animated-svg" width="400" height="433" viewBox="0 0 560 433" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle ref={ill1Circ1} cx="278.5" cy="216.5" r="214" stroke="#222222" strokeWidth="3"/>
                <path ref={ill1Path1} d="M281 2C133.019 98.5499 114.584 318.027 281 431" stroke="#222222" strokeWidth="3"/>
                <path ref={ill1Path2} d="M281 2C428.981 98.5499 447.416 318.027 281 431" stroke="#222222" strokeWidth="3"/>
                <line ref={ill1Line1} x1="281.5" y1="1" x2="281.5" y2="432" stroke="#222222" strokeWidth="3"/>
                <path ref={ill1Path3} d="M129 62.8901C52.568 70.5525 2 83.8629 2 99.0001C2 122.748 126.465 142 280 142C433.535 142 558 122.748 558 99.0001C558 83.6004 505.663 70.0914 427 62.4966" stroke="#222222" strokeWidth="3"/>
                <path ref={ill1Path4} d="M129 62.8901C52.568 70.5525 2 83.8629 2 99.0001C2 122.748 126.465 142 280 142C433.535 142 558 122.748 558 99.0001C558 83.6004 505.663 70.0914 427 62.4966" stroke="#222222" strokeWidth="3"/>
                <path ref={ill1Path5} d="M65.5 189.644C25.8307 197.078 2 206.608 2 217C2 240.748 126.465 260 280 260C433.535 260 558 240.748 558 217C558 206.306 532.763 196.524 491 189.001" stroke="#222222" strokeWidth="3"/>
                <path ref={ill1Path6} d="M83 304.66C32.9413 312.436 2 323.159 2 335C2 358.748 126.465 378 280 378C433.535 378 558 358.748 558 335C558 322.925 525.82 312.012 474 304.201" stroke="#222222" strokeWidth="3"/>
              </svg>
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
            <p>Quartz is a digital stablecoin that allows you too</p>
            <p>Each user stores the subset of the data they need</p>
            <p>Data between users is sync using Web RTC</p>
            <p>Data is stored bu default on users' local storage. And backups are stored on relay servers.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


export default Homepage;