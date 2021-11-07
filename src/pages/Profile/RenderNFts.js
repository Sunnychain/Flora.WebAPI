import React, { useEffect, useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { web3FromSource } from '@polkadot/extension-dapp';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Token from '../../images/min_Flora-black.png';
import Owner from '../../images/profile.png';
export function Render (props) {
  const [nft, setNft] = useState([]);
  const [cont, setCont] = useState('');
  const [accountSelected, setAccountSelected] = useState('');
  const [selectNft, setSelectNft] = useState('');
  const [message, setMessage] = useState('');
  const [initial, setInitial] = useState(true);
  const [saleState, setSaleState] = useState(true);
  const [isRender, setIsRender] = useState(false);
  const [auctionCreate, setAuctionCreate] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [show, setShow] = useState(false);
  const [showAuction, setShowAuction] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const { api, keyring, keyringState } = useSubstrate();
  const { accountAddress } = props;

  const handleCloseNew = () => {
    setAuctionCreate(false);
    setShowAuction(false);
  };
  const handleShowSet = (e) => {
    setAuctionCreate(false);
    setSelectNft((window.idBotaoClicado = e.target.id));
    setShowAuction(true);
  };

  const handleClose = () => {
    setShow(false);
    setSaleState(true);
    setInitial(true);
  };
  const handleShow = (e) => {
    setShow(true);
    setSelectNft((window.idBotaoClicado = e.target.id));
  };
  const handleChange = (e) => {
    setMinPrice(e.target.value);
  };

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  useEffect(() => {
    if (accountAddress === '') {
      return null;
    }
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
          let contador = 0;

          const NumbersCont = filterArr.map((val) => {
            if (
              val.owner === accountSelected &&
              accountSelected === accountAddress
            ) {
              contador += 1;
            }
            return contador;
          });
          setCont(NumbersCont.length);
          setNft(filterArr);

          return setIsRender(true);
        } catch (e) {
          console.log(e);
        }
      }
      return null;
    }
    getTokens();
  }, [api.query.tokenNonFungible, accountAddress, api, accountSelected, nft]);

  function renderAll () {
    const myArray = [];
    nft.map((res) =>
      res.owner === accountAddress && res.owner !== 'undefined'
        ? myArray.push(res)
        : myArray.pop(res)
    );

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
      setIsCreate(false);
      setSaleState(false);
      if (status.isFinalized) {
        setSaleState(true);
        setIsCreate(true);
      }
      setMessage(status.type);
    };

    async function saleNft () {
      const fromAcct = await getFromAcct();
      const extr = await api.tx.nftMarket.addSale(selectNft, 1);
      const saleExists = await api.query.nftMarket.salesInfo(selectNft);
      const response = await saleExists.toHuman();
      try {
        if (
          (await response) === 'undefined' ||
          response === 'null' ||
          response === null
        ) {
          const sign = await extr.signAndSend(fromAcct, txResHandler);
          setInitial(false);
          return sign;
        } else {
          alert('esta nft ja esta a venda');
          setShow(!show);
          return 1;
        }
      } catch (e) {
        console.log(e);
      }
    }

    async function createAuction () {
      setAuctionCreate(false);
      const fromAcct = await getFromAcct();
      const getBlockNumber = await api.query.system.number();
      const isNumber = await getBlockNumber.toHuman();
      const send = await api.tx.nftMarket.createAuction(
        selectNft,
        minPrice,
        isNumber
      );
      try {
        const sign = await send.signAndSend(fromAcct, txResHandler);
        setIsCreate(false);
        setAuctionCreate(true);
        return sign;
      } catch (e) {
        console.log(e);
      }
    }
    return (
      <>
        <tbody className="bg-white">
          {myArray.map((rs) => (
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img src={Owner} alt="exmp img" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      {rs.owner}
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      owner address
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900" key={rs.name}>
                  {rs.name}{' '}
                </div>
                <div
                  className="text-sm leading-5 text-gray-500"
                  key={rs.nft_type}
                >
                  {rs.nft_type}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                key={rs.co2_offset_per_year}
              >
                Co2 Offset /year: <b>{rs.co2_offset_per_year}</b>
              </td>

              <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                <Link
                  to="#"
                  className="text-indigo-600 hover:text-indigo-900"
                  id={rs.token_id}
                  onClick={handleShow}
                  key={rs.token_id}
                >
                  Sale
                </Link>
                <Link
                  to="#"
                  className="mx-5 text-indigo-600 hover:text-indigo-900"
                  key="show"
                  id={rs.token_id}
                  onClick={handleShowSet}
                >
                  new Auction
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

        <Modal show={show} onHide={handleClose}>
          {saleState && initial
            ? (
            <div className={initial ? 'end' : ''}>
              <Modal.Header closeButton>
                <Modal.Title>Sale NFT</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {' '}
                you are about to <strong>SELL</strong> this NFT, do you want to
                continue?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={saleNft}>
                  Sale
                </Button>
              </Modal.Footer>
            </div>
              )
            : (
            <div>
              {message === 'Finalized'
                ? (
                <div
                  className="alert alert-success "
                  role="alert"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <p style={{ textAlign: 'center' }}>successful sale</p>
                  <button
                    type="button"
                    className="btn btn-success center"
                    onClick={handleClose}
                  >
                    Return
                  </button>
                </div>
                  )
                : (
                <div
                  className="alert alert-success "
                  role="alert"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <p style={{ textAlign: 'center' }}>
                    Await your status: {message}
                  </p>
                </div>
                  )}
            </div>
              )}
        </Modal>
        <Modal
          show={showAuction}
          onHide={handleCloseNew}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>

          {isCreate
            ? (
            <div>
              {auctionCreate
                ? (
                <div>
                  <Modal.Body>Auction Created</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNew}>
                      Close
                    </Button>
                    <Link
                      to={`auctions/${selectNft}`}
                      style={{ color: 'black' }}
                    >
                      <Button variant="primary">Go to Auction</Button>
                    </Link>
                  </Modal.Footer>
                </div>
                  )
                : (
                <div>
                  <Modal.Body>
                    are you sure you create auction this nft?
                    <InputGroup size="lg">
                      <InputGroup.Text id="inputGroup-sizing-lg">
                        Price
                      </InputGroup.Text>
                      <FormControl
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNew}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={createAuction}>
                      Create Auction
                    </Button>
                  </Modal.Footer>
                </div>
                  )}
            </div>
              )
            : (
            <h2 className="flex justify-center">Send Status: {message}</h2>
              )}
        </Modal>
      </>
    );
  }

  return isRender
    ? (
    <>
      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
              <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"
                  />
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="mx-5 ">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {accountAddress !== '' ? cont : ''}
                </h4>
                <div className="text-gray-500">Orders</div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
            <div className="flex items-center px-8 py-1 shadow-sm rounded-md bg-white">
              <div className="p-3 rounded-full bg-white-200 bg-opacity-75">
                <img src={Token} style={{ width: '120px' }} alt="token" />
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">
                  {accountAddress !== '' ? cont : ''}
                </h4>
                <div className="text-gray-500">Tokens</div>
              </div>
            </div>
          </div>
          <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center px-5 py-2 shadow-sm rounded-md bg-white">
              <div className="p-3 rounded-full  bg-opacity-75">
                <img
                  style={{ width: '60px' }}
                  src="https://i.imgur.com/wYT7bZq.png"
                  alt="flora"
                />
              </div>
              <div className="mx-5">
                <h4 className="text-2xl font-semibold text-gray-700">12</h4>
                <div className="text-gray-500">Rank</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Contribuition
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                </tr>
              </thead>
              {renderAll()}
            </table>
          </div>
        </div>
      </div>
    </>
      )
    : (
        ''
      );
}
