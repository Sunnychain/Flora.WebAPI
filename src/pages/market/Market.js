import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import logo from '../../images/flora.svg';
import Account from '../../components/AccountSelector';
import { message, loader } from '../../middlewares/status';
import NftRender from './NftsReder';
import './market.scss';

function Market () {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyringState, apiError } = useSubstrate();

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }
  return (
    <div id="mainWrapper">
      <header>
        <div id="logo"><Link to="/app" ><img src={logo} alt="logo" /></Link></div>

        <nav>
          <ul className="nav justify-content-end" style={{ marginTop: '15px' }}>

            <li className="nav-item" style={{ textAlign: 'center', marginTop: '10px' }}>

              {
                accountAddress !== ''
                  ? <Link to="/perfil">Profile</Link>
                  : ''
              }
            </li>
            <li className="nav-item" style={{ marginLeft: '10px' }}> <Account setAccountAddress={setAccountAddress} /></li>

          </ul>

        </nav>
      </header>
      <section id="offer">
        <div className="semi"></div>
        <h2>All our nfts represent real trees</h2>
        <h4>you can buy nfts according to your rarities</h4>
      </section>
      <div id="content">
        <section className="sidebar">

          <input type="text" id="search" placeholder="search" />
          <div id="menubar">
            <nav className="menu">
              Types
              <br />
              <h2>Rare</h2>
              <hr />
              <ul>
                <li><Link to='#' title="Link">Ruis&nbsp;&nbsp;</Link></li>
                <li><Link to='#' title="Link">Fearn</Link></li>
                <li><Link to='#' title="Link">Paw</Link></li>
              </ul>
            </nav>
            <nav className="menu">
              <h2>Ultra Rare</h2>
              <hr />
              <ul>

                <li><Link to='#' title="Link">Coll</Link></li>
                <li><Link to='#' title="Link">Ngetal</Link></li>
                <li><Link to='#' title="Link">Quert</Link></li>
                <li className="notimp"></li>
              </ul>
            </nav>
            <nav className="menu">
              <h2>Legendary </h2>
              <hr />
              <ul>
                <li><Link to='#' title="Link">Uath</Link></li>
                <li><Link to='#' title="Link">Nion</Link></li>
                <li><Link to='#' title="Link">Tinned</Link></li>
              </ul>
            </nav>
          </div>
        </section>
        <section className="mainContent">

          {
            <NftRender accountAddress={accountAddress} />
          }

        </section>
      </div>
      <br />
      <footer className="nft-footer">
      </footer>
    </div>

  );
}

export default Market;
