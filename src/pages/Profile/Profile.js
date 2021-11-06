import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountSelector from '../../components/AccountSelector';
import Modal from 'react-bootstrap/Modal';
import { web3FromSource } from '@polkadot/extension-dapp';
import Button from 'react-bootstrap/Button';
import { Render } from './RenderNFts';
import { useSubstrate } from '../../substrate-lib';
import { message, loader } from '../../middlewares/status';
import Logo from '../../images/tree-rem.png';
import 'tailwindcss/tailwind.css';

function Profile (props) {
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountSelected, setAccountSelected] = useState('');
  const [value, setValue] = useState('');
  const [nft, setNft] = useState([]);
  const [targetValue, setTargetValue] = useState('');
  const [nftId, setNftId] = useState('');
  const [status, setStatus] = useState('');
  const [showAuction, setShowAuction] = useState(false);
  const { api, apiState, keyringState, apiError, keyring } = useSubstrate();

  useEffect(() => {
    setAccountSelected(accountAddress);
    async function getTokens () {
      const MyArray = [];
      if (accountSelected && accountSelected !== '') {
        try {
          const number = await api.query.tokenNonFungible.nextTokenId();
          const numberLooop = number.toJSON();
          const dale = parseInt(numberLooop);

          for (let a = 0; a <= dale - 1; a += 1) {
            const token = await api.query.tokenNonFungible.ownedTokens(
              accountSelected,
              a
            );
            const changeAgain = token.toHuman();
            MyArray.push(changeAgain);
          }

          const filterArr = MyArray.filter(function (val) {
            return Boolean(val);
          });

          setNft(filterArr);
        } catch (e) {
          console.log(e);
        }
      }
      return null;
    }
    getTokens();
  }, [accountAddress, api, accountSelected]);

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected }
    } = accountPair;
    let fromAcct;

    // signer is from Polkadot-js browser extension
    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      api.setSigner(injected.signer);
    } else {
      fromAcct = accountPair;
    }

    return fromAcct;
  };
  const txResHandler = ({ status }) => {
    if (status.isFinalized) {
      setStatus(status.type);
    }
    setStatus(status.type);
  };

  async function saleNft () {
    const fromAcct = await getFromAcct();
    const extr = await api.tx.nftMarket.addSale(nftId, targetValue);
    const saleExists = await api.query.nftMarket.salesInfo(nftId);
    const response = await saleExists.toHuman();

    try {
      if (
        (await response) === 'undefined' ||
        response === 'null' ||
        response === null
      ) {
        const sign = await extr.signAndSend(fromAcct, txResHandler);

        return sign;
      } else {
        alert('esta nft ja esta a venda');
        return 1;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleCloseNew = () => {
    setShowAuction(false);
  };
  const handleShowSet = (e) => {
    setShowAuction(true);
  };
  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }
  function getValue (e) {
    console.log('carreguei', value);
    setValue(e.target.value);
  }
  function getValueToSale (e) {
    const value = e.target.value;
    setNftId(value.replace(/\D+/g, ''));
  }

  function handleChange (e) {
    setTargetValue(e.target.value);
  }

  return (
    <main className="body-profile">
      <div>
        <div className="flex h-screen bg-gray-200">
          <div className="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden" />
          <div className="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center">
                <svg
                  className="h-12 w-12"
                  viewBox="0 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                    fill="#4C51BF"
                    stroke="#4C51BF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                    fill="white"
                  />
                </svg>

                <img src={Logo} alt="logo" />
              </div>
            </div>
            <nav className="mt-10">
              <Link
              to="/auctions"
                className="flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-100"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                <span className="mx-3">Auctions</span>
              </Link>
              <Link
                className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                to="/market"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="mx-3">NFT MARKET</span>
              </Link>
              <Link
              to="/App"
                className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                <span className="mx-3">Home</span>
              </Link>
              <Link
              to="#"
                className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <span className="mx-3" onClick={handleShowSet}>
                  Create Order
                </span>
              </Link>
            </nav>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
              <div className="flex items-center">
                <div className="relative mx-4 lg:mx-0">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center"></span>
                </div>
              </div>
              <div className="flex items-center">
                <div x-data="{ dropdownOpen: false }" className="relative">
                  <AccountSelector setAccountAddress={setAccountAddress} />
                  <div
                    x-show="dropdownOpen"
                    onClick="dropdownOpen = false"
                    className="fixed inset-0 h-full w-full z-10"
                    style={{ display: 'none' }}
                  />

                </div>
              </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium">Profile</h3>
                <Render accountAddress={accountAddress} />
              </div>
            </main>
          </div>
        </div>
      </div>
      <Modal
        show={showAuction}
        onHide={handleCloseNew}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          select what you want to create
          <br />
          <select
            onClick={getValue}
            className="flex justify-center w-full h-20 text-center bg-green"
          > <option value="5" selected disabled hidden>Open</option>
            <option value="1" >Add Sale</option>
            <option value="2">Create Auction</option>
          </select>
          <hr />
          {value === '1'
            ? (
            <div>
              <p>Select NFT FOR SALE</p>
              <select
                className="flex justify-center w-full h-20 text-center bg-green"
                onClick={getValueToSale}
              >
                        <option selected disabled hidden>Open</option>
                {nft.map((val) => (

                  <option key={val.token_id} value={val.token_id}>
                    {val.name}
                  </option>

                ))}
              </select>
              <input
                onChange={handleChange}
                placeholder="Write the value"
                className="flex w-full h-10 my-2"
                style={{ backgroundColor: 'white', border: 'solid 3px' }}
                type="number"
                required
              />

                 <Button className="w-full my-2" onClick={saleNft}>
                Send
              </Button>
                   <h2>
shipping status: {status}</h2>

            </div>
              )
            : ''
            }
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </main>
  );
}

export default Profile;
