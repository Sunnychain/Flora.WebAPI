import React, { useState, useEffect } from 'react';
import { useSubstrate } from '../../substrate-lib';
import Locations from './Locations';
import { Link } from 'react-router-dom';
import Account from '../../components/AccountSelector';
import { message, loader } from '../../middlewares/status';
import flora from '../../images/tree.png';
import './Description.scss';
function Details (props) {
  const [isLoading, setLoading] = useState(false);
  const [nft, setNft] = useState({});
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountSelected, setAccountSelected] = useState('');

  const { apiState, keyringState, apiError } = useSubstrate();
  const { api } = useSubstrate();

  useEffect(() => {
    const tokenId = props.match.params.id.replace(/\D+/g, '');
    async function getToken () {
      setLoading(false);
      setAccountSelected(accountAddress);
      try {
        const ownerInfoToken = await api.query.nftMarket.salesInfo(tokenId);
        const onwerInfoTokenHuman = await ownerInfoToken.toHuman();
        const ownerId = await onwerInfoTokenHuman.owner;
        const infoToken = await api.query.tokenNonFungible.ownedTokens(ownerId, tokenId);
        setNft(infoToken.toHuman());
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    }
    getToken();
  }, [api, props.match.params.id, accountAddress, accountSelected]);

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }

  return (
    <div className="bg-white">
      <nav className="border-b">
        <div className="container px-6 py-2 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div>
              <Link to="#" className="text-xl text-gray-800 font-semiblod md:text-3xl hover:text-gray-700">
                <img src={flora} alt="flora" width="200px" />
              </Link>
            </div>
            <div className="flex md:hidden">
              <button type="button" aria-label="toggle menu"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div className="items-center  md:flex">
            <div
              className="flex flex-col mt-4 space-y-8 md:flex-row md:items-center md:mt-0 md:space-y-0 md:space-x-16">
              <Link to="/market" className="block font-medium text-gray-700 hover:text-gray-900 hover:underline">Return Market</Link>

              {accountAddress !== ''
                ? <div

                  className="flex items-center px-5 py-3 font-medium tracking-wide text-center text-white capitalize bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  <Link to="/perfil" style={{ marginRight: '20px', fontSize: '20px' }}>Profile</Link>
                  <Account setAccountAddress={setAccountAddress} />
                </div>
                : ''}
            </div>
          </div>
        </div>
      </nav>

      {
        isLoading
          ? <div className="container px-6 py-10 mx-auto md:py-16">
            <div className="flex flex-col space-y-6 md:flex-row md:items-center md:space-x-6">
              <div className="w-full md:w-1/2">
                <div className="max-w-lg">
                  <h1 className="text-2xl font-medium tracking-wide text-gray-800 md:text-4xl">
                  {nft.name}
                  </h1>
                  <p className="mt-2 text-gray-600">
                    owner {nft.owner}
                  </p>
                  <div className="grid gap-6 mt-8 sm:grid-cols-2">
                    <div className="flex items-center space-x-6 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{nft.name}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Type: {nft.nft_type}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>co2 offset per year : {nft.co2_offset_per_year}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>
                        Tree Description : {nft.tree_description}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>
                      status : {nft.status}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>
                      Coordiates : {nft.gps_land_coordiates}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full md:w-1/2">
                <Locations />
              </div>
            </div>
          </div>

          : <div className="card-descrition">
            <div className="card-pic-wrap">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1145795/plant-4.png" alt="Some pointy plants" />
            </div>
            <div className="card-content-descrition">
              <h3>Ops..</h3>

              <p>Metadata is not Found</p>
              <p><Link to="/market">Return to Market</Link></p>
            </div>
          </div>

      }
<div className="footer-bg">

</div>
    </div>

  );
}

export default Details;
