import React from 'react';
import './css/styles.css';
import './js/scripts';
import logoFlora from './img/logo-flora.png';
import idap from './assets/img/ipad.png';
import roadmap from './img/RoadMap.png';
import demoImage from './assets/img/demo-image-01.jpg';
import demoImage2 from './assets/img/demo-image-02.jpg';
function WebSite () {
  return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content />
        <meta name="author" content />
        <title>Grayscale - Start Bootstrap Theme</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        {/* Font Awesome icons (free version) */}
        {/* Google fonts */}
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
        {/* Core theme CSS (includes Bootstrap) */}
        <link type="text/css" href="css/styles.css" rel="stylesheet" />
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg fixed-top navbar-light" id="mainNav">
          <div className="container px-4 px-lg-5">
            <img src={logoFlora} width={200} height={70} alt="" /><a className="navbar-brand" href="#page-top">&nbsp;</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="#flora">Flora Finance</a></li>
                <li className="nav-item"><a className="nav-link" href="#ogham">Ogham Game</a></li>
                <li className="nav-item"><a className="nav-link" href="#nftmarket">NFT Market</a></li>
                <li className="nav-item"><a className="nav-link" href="#signup">Contact</a></li>
                <a className="btn btn-primary" href="/app" style ={{ textAlign: 'center', height: '50px', marginLeft: '50px', marginTop: '5px' }}>Launch APP</a>
              </ul>
            </div>
          </div>
        </nav>
        {/* Masthead */}
        <header className="masthead" id="flora">
          <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h1 className="mx-auto my-0 text-uppercase">FLORA<br />
                  Finance</h1>
                <h2 className="text-white-70 mx-auto mt-2 mb-4">Earth&nbsp; |&nbsp; People&nbsp; | Open | Fair</h2>
                <a className="btn btn-primary" href="#about">Get Started</a>
              </div>
            </div>
          </div>
        </header>
        <section className="about-section text-center" id="about">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-8">
                <h2 className="text-white mb-4">Who are we</h2>
                <p className="text-white-70">
                  We are a group of developers, game designers, sound FX, artists, landscape engineers, and food forest designers who propose a set of blockchain and gamification tools to help to solve environmental problems and disasters by creating games that link the real world to the virtual one / through gamification of the relationships between the real and virtual world.
                </p>
              </div>
              <div className="col-lg-8">
                <h2 className="text-white mb-4">Vision</h2>
                <p className="text-white-70"> Create a technological framework where the earth can be the owner of itself, of the forests, the bushes, and every flora surrounding. Create and develop tools that are bound with climate change. </p>
              </div>
              <div className="col-lg-8">
                <h2 className="text-white mb-4">Mission</h2>
                <p className="text-white-70"> Our mission is to build a trustworthy and transparent ecosystem where people and institutions across the globe can cooperate to regenerate damaged ecosystems through the creation of games and technological tools. We want to encourage the creation of proposals to address environmental issues encouraging their mapping, tracking, monitoring, ranking the global flora and man-made damage. </p>
              </div>
              <div className="col-lg-8">
                <h2 className="text-white mb-4">Goals</h2>
                <p className="text-white-70">
                  Plant <strong>trees</strong> and promote <strong>regenerative</strong> land-use regenerative practices. <br />
                  <strong> Promote environmental education. <br />
                  </strong> Restore ecosystems to address reverse climate change at local and global levels. <br />
                  Develop a framework to offer a Green Game Launchpad that through mechanisms incentives aims to create an agenda on the most urgent and impactful in the environment. <br />
                  Connect carbon emissions from real-life to digital, reforestation to online game-action. <br />
                  A decentralized platform to crowdfund green projects. <br />
                  Help to build&nbsp; a gamer's of community around the conservation and regeneration of a global natural flora.</p>
              </div>
            </div>
          </div>
        </section>
        {/* About */}
        <section className="about-section text-center ogham-section" id="ogham">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-8">
                <h2 className="text-white mb-4">Ogham Game</h2>
                <p className="text-white-50">
                  Grayscale is a free Bootstrap astheme created by Start Bootstrap. It can be yours right now, simply download the template on
                  <a href="https://startbootstrap.com/theme/grayscale/">the preview page.</a>
                  The theme is open source asa&nbsp; , and you can use it for any purpose, personal or commercial. </p>
              </div>
            </div>
            <img className="img-fluid" src={idap} alt="..." />
          </div>
        </section>
        {/* Projects */}
        <section className="projects-section bg-light" id="nftmarket">
          <div className="container px-4 px-lg-5">
            {/* Featured Project Row */}
            <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
              <div className="col-xl-8 col-lg-7"><img src={roadmap} alt="..." width={1000} className="img-fluid mb-3" /></div>
              <div className="col-xl-4 col-lg-5">
                <div className="featured-text text-center text-lg-left">
                  <h4>Roadmap&nbsp;</h4>
                  <p className="text-black-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
                </div>
              </div>
            </div>
            {/* Project One Row */}
            <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
              <div className="col-lg-6"><img className="img-fluid" src={demoImage} alt="..." /></div>
              <div className="col-lg-6">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-left">
                      <h4 className="text-white">Misty</h4>
                      <p className="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                      <hr className="d-none d-lg-block mb-0 ms-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Project Two Row */}
            <div className="row gx-0 justify-content-center">
              <div className="col-lg-6"><img className="img-fluid" src={demoImage2} alt="..." /></div>
              <div className="col-lg-6 order-lg-first">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-right">
                      <h4 className="text-white">Mountains</h4>
                      <p className="mb-0 text-white-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                      <hr className="d-none d-lg-block mb-0 me-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Signup */}
        <section className="signup-section" id="signup">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5">
              <div className="col-md-10 col-lg-8 mx-auto text-center">
                <i className="far fa-paper-plane fa-2x mb-2 text-white" />
                <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
                {/* * * * * * * * * * * * * * * **/}
                {/* * * SB Forms Contact Form * **/}
                {/* * * * * * * * * * * * * * * **/}
                {/* This form is pre-integrated with SB Forms. */}
                {/* To make this form functional, sign up at */}
                {/* https://startbootstrap.com/solution/contact-forms */}
                {/* to get an API token! */}
                <form className="form-signup" id="contactForm" data-sb-form-api-token="API_TOKEN">
                  {/* Email address input */}
                  <div className="row input-group-newsletter">
                    <div className="col"><input className="form-control" id="emailAddress" type="email" placeholder="Enter email address..." aria-label="Enter email address..." data-sb-validations="required,email" /></div>
                    <div className="col-auto"><button className="btn btn-primary disabled" id="submitButton" type="submit">Notify Me!</button></div>
                  </div>
                  <div className="invalid-feedback mt-2" data-sb-feedback="emailAddress:required">An email is required.</div>
                  <div className="invalid-feedback mt-2" data-sb-feedback="emailAddress:email">Email is not valid.</div>
                  {/* Submit success message */}
                  {/**/}
                  {/* This is what your users will see when the form */}
                  {/* has successfully submitted */}
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3 mt-2 text-white">
                      <div className="fw-bolder">Form submission successful!</div>
                      To activate this form, sign up at
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                    </div>
                  </div>
                  {/* Submit error message */}
                  {/**/}
                  {/* This is what your users will see when there is */}
                  {/* an error submitting the form */}
                  <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3 mt-2">Error sending message!</div></div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Contact */}
        <section className="contact-section bg-black">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-map-marked-alt text-primary mb-2" />
                    <h4 className="text-uppercase m-0">Address</h4>
                    <hr className="my-4 mx-auto" />
                    <div className="small text-black-50">4923 Market Street, Orlando FL</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-envelope text-primary mb-2" />
                    <h4 className="text-uppercase m-0">Email</h4>
                    <hr className="my-4 mx-auto" />
                    <div className="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card py-4 h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-mobile-alt text-primary mb-2" />
                    <h4 className="text-uppercase m-0">Phone</h4>
                    <hr className="my-4 mx-auto" />
                    <div className="small text-black-50">+1 (555) 902-8832</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="social d-flex justify-content-center">
              <a className="mx-2" href="#!"><i className="fab fa-twitter" /></a>
              <a className="mx-2" href="#!"><i className="fab fa-facebook-f" /></a>
              <a className="mx-2" href="#!"><i className="fab fa-github" /></a>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="footer bg-black small text-center text-white-50"><div className="container px-4 px-lg-5">Copyright © Your Website 2021</div></footer>

      </div>
  );
}

export default WebSite;
