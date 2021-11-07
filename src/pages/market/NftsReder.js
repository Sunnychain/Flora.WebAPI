import React, { useEffect, useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Link } from 'react-router-dom';
import { web3FromSource } from '@polkadot/extension-dapp';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NftRender (props) {
  const [nftSale, setNftSale] = useState({});

  const [show, setShow] = useState(false);
  const [isOnloadNft, setIsOnloadNFt] = useState(false);
  const [buyState, setBuyState] = useState(true);
  const [initial, setInitial] = useState(true);
  const [accountSelected, setAccountSelected] = useState('');
  const [message, setMessage] = useState('');
  const [priced, setPriced] = useState('');
  const [selecNft, setSelectNft] = useState('');

  const { api, keyring, keyringState } = useSubstrate();

  const { accountAddress } = props;

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  useEffect(() => {
    setAccountSelected(accountAddress);
    async function getAllNfts () {
      try {
        const MyArray = [];
        const number = await api.query.tokenNonFungible.nextTokenId();
        const numberLooop = number.toJSON();
        const dale = parseInt(numberLooop);

        for (let a = 0; a <= dale; a += 1) {
          const nftSale = await api.query.nftMarket.salesInfo(a);
          const nftSaleHuman = nftSale.toHuman();
          MyArray.push(nftSaleHuman);
          MyArray.push();
        }
        const filterArr = MyArray.filter(function (val) {
          return Boolean(val);
        });
        setNftSale(filterArr);
        setIsOnloadNFt(true);
        filterArr.map((a) => setPriced(a.price));
      } catch (e) {
        console.log(e);
      }
    }

    getAllNfts();
  }, [accountAddress, accountPair, accountSelected, api, nftSale, setNftSale]);

  const handleClose = () => {
    setShow(false);
    setBuyState(true);
    setInitial(true);
  };
  const handleShow = (e) => {
    setShow(true);
    setSelectNft((window.idBotaoClicado = e.target.id));
  };

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
    setBuyState(false);
    if (status.isFinalized) {
      setBuyState(true);
    }
    setMessage(status.type);
  };

  async function BuyNft (e) {
    const fromAcct = await getFromAcct();
    const extrinsic = await api.tx.nftMarket.offer(selecNft, priced + 1);
    try {
      const isOwner = await api.query.nftMarket.salesInfo(selecNft);
      const result = await isOwner.toHuman();
      if ((await result.owner) === accountSelected) {
        alert('você não pode comprar sua propia nft');
        setShow(!show);
        return 1;
      }
      const gruly = await extrinsic.signAndSend(fromAcct, txResHandler);
      setInitial(false);
      return gruly;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <header>
        <nav className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="pr-6 border-r-2 text-2xl font-bold text-gray-500">
              filter for type
            </h1>
            <div className="flex justify-between flex-grow">
              <div className="flex ml-6 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-4 cursor-pointer text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  className="outline-none text-sm flex-grow bg-gray-100"
                  type="text"
                  placeholder="Search nft..."
                />
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto h-96 rounded-md flex items-center bg-image">
          <div className="sm:ml-20 text-gray-50 text-center sm:text-left">
            <h1 className="mx-auto my-0 text-uppercase">
              FLORA
              <br />
              Finance
            </h1>
            <p className="text-lg inline-block sm:block">
              come join our community{' '}
            </p>
            <button className="mt-8 px-4 py-2 bg-gray-600 rounded">
              ABOUT
            </button>
          </div>
        </div>
      </header>
      <main className="py-16 container mx-auto px-6 md:px-0">
        <section>
          <h1 className="text-3xl font-bold text-gray-600 mb-10">
            Nfts for sale
          </h1>
          <div className="grid sm:grid-cols-3 gap-4 grid-cols-2">
            {isOnloadNft && nftSale.length >= 1
              ? nftSale.map((a) => (
                  <div>
                    <div className="bg-gray-300 h-44">
                      <img
                        alt="img"
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGBxMSExASExERExYTERMWGhEYERYYGRkWGBIZGBkWGRYaHysiGhwoHRYWIzQjKCwvMTExGSE3PDcxOyswMTABCwsLDw4PHRERHTEoIigwMDAwMC4wMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwEEBQYHAgj/xABBEAACAgECAgUJAwoFBQAAAAAAAQIDEQQhEjEFBkFRcQcTIjJhcoGRsaGzwTVCQ1JzgpLR0vAUMzRTkxYjYqLh/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAMEAQIFBv/EADQRAAIBAwEFBAgGAwAAAAAAAAABAgMEESESMUFRgSKR0fATM0JSYXGhwQUUgrHh8RUykv/aAAwDAQACEQMRAD8A68AAAAAAAAAAAAAAAAAAAAADxO2KaTlFOXJNpN+C7SsZp5SabTw0nyfc+4A9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGN6wdLrS1xsdcrMzUcJ45pvLeH3GspKKcnuRtCEqklCKy3uK9OdN16VVuyM5ccmkopdmMt5a70aR0r1outV8ONebnL0Uo8LUVLKWVvuks5MTqdRKbk3KbTk5elJvm+b9pEcOvezqaLRecnqrT8MpUUnLtS5/VY5El+tsaUnOTlXDEZN5ceFuSx4Nmv6Hpi+rzzrtnCVyxOcZNSl6XFniW6ec78933mZv9Wfuy+hrJrQk9dfOPDQmuYR0WF5ef31+Z0Dqx5RLFLS0XKDgk4z1Flj4vzmpt8sJYTzlvc6H0b0lVqIecpsjZDLXFHvXNPO6Z8+mzdSOtNumtpqd0IafzkpWJ1p5zHd5Scs7RSx7PadGjcPOJHGubGLW1T38ufnkjsoIdFq4XQhbVNThNZjNcmiYvnGAAAAAAAAAAAAAAAAAAAAAAAAABgumOt2no4N/OpzlGTrlGXDw44uLfnutvE1lOMVmTN6dKdSWzBZZnQc21flD1DjKMIwi/OZU1HPob+i1JvL9Xfx5EtPlGtU7JSrhKLguCC24Z5W8pdqa4n8iv8AnKXMv/4m6xnC718PPRnQ5PCbfJLJzLrN0or7Zyrna65KOIy2Swkto5xh4z8TY7OuVdtLVdkar3Up8MltF5XFBTksOWG8GkTk223zbzyS+xcinf11JKMXpv8AP3L/AOE2kqcpTqLDWiz/AF3MoADmHePF/qz92X0NZNmv9Wfuy+hrJPQ3MqXO9dQVKFSwVjqXkr6csurnRPzMY1RhGtLEZvm5Zi5NyXJuWOcn8N5OEdVekoabU1XWQnPgk8RhJJptOOcNeltJ7ZWe82zpLyrSaqdFKjiyXnIWelmCxwqMovZvMvBpcy/RrxUO0zjXVpJ1ewtH5/nqdLBx6flL1uLkpwzO1Srk64f9qGXmtLGJfm7vL2fftsHRXlThKyfnq+CqNScZRzKcrE4px4eWHmTW+yju9yRXFNleVnVjwydBBB0fq4XV121vMbK4Ti2sPhlHKyuzZk5OVQAAAAAAAAAAAAAAAAWHT3SK09Nlso2NRSXoY4lxPhzvssZzkw2kss2jFykorezXevHWt0t0UysrtrnByl5uLi4uGeFOWe+L5d+5zqc8tvbdt/N5JNVqJTlmU5zfJSlJyljO2W2yI4datKrLLPZ2dpG2p7K38X5x9QACItjJeaW/OzwsYS33ZZlYSw0+4xJZQMmCON0cJuUd9ufb3IkITU8X+rP3ZfQ1k2a/1Z+7L6GtE9Dcyrc70UDYPM2WCrJ4RRsoAbEIABkGb6q9ZLdHbKdarnKxV1t2ylwqCku1NY2xhvZLOx23o/X1aiCspshZBtrji8rKe68T53Oi+Sfp/DelssqhDGK6uHE52NuUnxdu2eb7scizbVMPZe4oXtBSjtrfxOlgAvHKAAAAAAAAAAAABpPlQ1/CqqlK2MmpS22rlF+i1J5WWsct+ftN2ObeU7UZvjWrZy4YxbpcWoQbz6Sed217Pj2Fa7likzofhcNu6jnhl93RmokFl7jLDWxOeZxTWGcdY4nrpptaMrGWd0VLVp1vK3RcV2KXL5Bo1hPLw956IFfiTTWCc8XVcS9veFjiZntYzH+zzr94R5bSa9u67fkZameYxffFP7DB+c9GUJLfbD7dny+plujJ5rj7Mr5M1qLskVOSc3jij3rocVdi74P6Gr6SW2O42u71Z+7L6GpV+jPHf+Jvb6xaIbrSUWXDImySRbTll4RYiipPeVjZl+wkKRjgqmZNAAAAZPqvrpUamqyEqYNS/wAy1Jwin60m+zbKyt9zGEuji3OCUa5PiWI2SUYP2SblFJfFGU8NM1mk4tM+ioSTSaaaaymnlNPk0ypb9HcXmqeOMIz81DihB5hGXCsqD/VT5ewuDrHnQAAAAAAAAAAAAc68qUX52vNkWnXlVcPpR3acm8bpv29nI6Kan5StE50RmnVFVy3c4+m84SjCWG1v2bZ23K91Fuk8F78NmoXMW/l39H9Nfic0BQt+Ob5LH997OMlk9fKeyXMsdpZWYTzFki0rfrSJYURXZnxMppEUoynwx11KU3KXsZKeLdHndbPu7zzp716s9nyz/Mw9dUYVfZ0lr8USy0nnE8Ldcn2P2Hroi9LNb2ecrP2rx2J65cOcduCHX0KeZx2lH7f/AKaZz2XuNXOLltR38uZf3+rP3ZfQ1LUrkzNV9KehJTTzwv0l27dqMFddlYSJ6EHFvJFczjLGCt12dkeYKXYXOnpwt+bJVEl20tEVHqWfmn2s9Qjgumi3vsiuW77gpN6GCjZ4lZnZFFBvnsSRjgzuAj7S46PolZZCEa5WuUv8qLac/wDxTXLxIDPdR+hv8TqaozrvnWprisq9FQaXFFznwvCyu9PfZmYrLSNJy2YuXn7HaejKI1001xg64wqhFVuXE4pRSUXLtxyz7C5AOseeAAAAAAAAAAAABBrdLG2Eq5whNSXqzipRz2NxfPDwTgBPGqOK9N9Gy0906pOEpRw5cOeFOS4sLZdjT2WNyyOv9ZursdZBR4lXLjjJ2KtSckk1wvdPG+efYct6T6Jtpfp1TgnKaTksN8L3a71ut+W5xbi3dN5W49fYX8biGHpLiufy8NccSyJa4HitbkxVbJ69T2UCLUadT9j7yUBPBVLGq6Vb4Zcv75d6L2Mk8NblLa1JYZYWRnVybw+3++02wpfMEGo/P/eLChZlHxL2zk/BljTLEky1DcyKZkDzOaXNkNmq7I7vvKV6dveT+Boo8zUju1Ley2RSqaX5uX4/gXigl2L5FTbbWMYBaytk/wA37GeYuXcXp4dTfE0m+GPFLC9WKaXE+5Za39oUuGDBHXByaillyaSXe28JbnXPJl1c/wAPU7p131XTThKuUljhjPKko4ys+3PbjmYXqV5PuPFuqhCddlVVkErLIzUniWJRWMbPDWXnY6YXrei12pHLvLlS7Eevn9wAC2c8AAAAAAAAAAAAAAAEGq0NVrg7K4WOEuKPFFS4Zd6zyJwN5lNrVHK+uHR0NPdKEK7IptzVkpcSkpJNqKS2SeVzb7+wwhmeucV/irmq7YZm88b9bs4obeo+zd/DkYY8/Wx6SWOZ6ag26UW3l4XneUsbSeFl42RbVa3sksPv7Pj3F0WurnX27v2c/maRw9MEpdJ5KSimmnyZjaJTWXFPHhlF3TrIvn6L+z5mXBrcDHWrHEu7KMcZG954n7xY6delHxLUHoRT4F1RTwr2koLZvNiXd/I0XaNS4BUoagG3+SuxLV481bNyrnHzkZehXH1m5xxvlxSTz28magbH5O5VrW08c7oycmoKtLhk+F7WPOeH4eOxLReKiIbhZpS+R2UAHYOAAAAAAAAAAAAAAAAAAAAAAcv6+VqOrsxKyTeG+NbLKTSi+2KMAb15TdLtTY7J4zwRq4cxzu3Pizs8bcnnCNFODdR2askejs57VGL6dxaXV2SbXKPj2fVnurRxXPd+3l8i4BFtPGCyC31OmUk2lh/UuCphPGqBhJ8n4Ms9N60f77C9vXrfvGOTxuXIaoinwMkWVVqTlJ9v8z1GE57t4X99hNXp4r2+JhYisM1PFVspNbbf32lwCho3kA2/yUxb1e10q2q5SdXC2rY4xhvOFhyi+Xh2monVPJT0e4aeV3nITha1wxUMSg4tqacnu98bcts9pNbRzURWu5bNJ/HQ3MAHWOGAAAAAAAAAAAAAAAAAAAAAW3Smkd1VtSm6/OQceNLLWTknSehlTZODU+GM5QU5QceLheMpfbz5NHZDDdZOr1eqipS4uOuFiguPEXKS2UtuWUuWCpd2/pUmt6LtndehliW5nKQX3SfQ1tE412R9KVfnOGL4sRTlnLW2yi28ciyOM04vDO9GSksxeShUo+WezvNj6D6n32ympqVHmpQ3nW3GWW88L5PGF3rc2hTlN4ismtSrGmtqbwaJqOc/GX4mPphlpf33mZ6cgo36mKSSjdeklySVkkkivk/00LekNJXZCM4SnYpQksprzNj3XikXKcddkjqyxHa+GS1B0Drf1AmndfR6fFOvg01dajwRwovtw0scklzNK13RdtNltc4PipUXZjdRUuHDb8ZxXxNJ0pQeqIqVeFRZiyzKk+n0Ns5wrhXKUrIuUIpbyilJ5iu31JfI2Tqv1Ht1HmbZxSplZJTjJuE1GO2Usb57H3ruMRpyk8JG06kYLMmYzqp0DPV3qEbJVNQdkbHU5L0ZL2r+W2DtlVailGKUUlskkl8EtkWnQXRNekphRW5uMHJ5m05Nyk5POElzfYi+OpQo+jj8WcW5r+ll8FuAAJiuAAAAAAAAAAAAAAAAAAAAAAAAebK1JNSSaaaaa5p814GLl1Y0v/axUl5qTlFJtLLafpb+lulz7jLA1lGMt6NozlH/AFeDG6Xq9pq1OMaa3Gc1NxkuNcS5YUs4Sy8Jd5kgEZjFR0SMSk5at5OBdYP9Rq/29/3siXybflPRe/P7iZF1g/1Gr/b3/eyJfJt+U9F78/uJnNpes6noa3qf0/Y7wR3URmpRnCMoyWJRlFNSXc0+aJAdM86Q16WuPA411pwjwxahFcMf1Y7bR9iJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMgIDBkwcC6wf6jV/t7/vZEvk2/Kei9+f3EyLrB/qNX+3v+9kSeTb8p6L35/cTOXT9Z1PRVvU/p+x3kDAwdM88AABkAAAAAAAAAAAAAAAAAAAAAAAAGG6c6xR08uDzcpycU+fDHD9vb8DMkd9EJrhnCM13SimvtI6kZyjiDw+eMklKUIyzNZXLODTr+uN79WNUP3W382/wLKzrHqZfpmvCMF9Ebbf1a00v0XD7spL7M4LSzqZQ/VndH4xf4HNnb3j9vPXHgjqU7myXsY+az4mrT6X1Eueot/5JL6MilrbHztsfjOT/ABNmn1JXZe141p/SRDLqTPsuh8a2vxKztbrk+/8AktRvLXg0uj8DWna3zk38WeTZH1Ks7Lav/ZfgRvqZf/uU/wAU/wCkj/J1/cf08SX87b++jm2s0VrlZiqx5lPHoPvfsIugdDbG+qUqrIpOWW4SSXoS5to6d/0Zf+vT/HP+gf8ARl/69P8AHP8AoJ1TuMY9H57zR3Vu3nbRr6PSsa5SfzZn11Mu/wByn+Kf9J7XUqzttq+Un+BArOv7j+nibO9t/fRgo62xcrZrwnJfiS19L6iPLUW/8kn9WZuPUqfbdD4Qb/Emh1Jj23t+FaX1kyRWt1ya6/yRyvLXi1/y/AwtfWTUx/St+MYP6ovaOuNy9aNU/wB1xfzT/AytfU2hc5XS+MV+BeUdWtND9Fxe9KUvsbwWYW94vbx1z9mValzZP2M9MeB46C6wR1DcPNyhJRy/zo497sfiZcjppjBcMIxiu6MUl8kSHTpqajiby+e45dRwcswWFyzn6gAG5GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q=="
                        width="100%"
                      />
                    </div>
                    <h3
                      className="text-lg font-semibold text-black-500 mt-2"
                      key={a.tree_name}
                    >
                      Name:{a.tree_name}{' '}
                    </h3>
                    <p className="productContent" key={a.tree_description}>
                      <b>Description:{a.tree_description} </b>{' '}
                    </p>
                    <h2 className="productContent" key={a.price}>
                      Price:{a.price}{' '}
                    </h2>
                    <Link
                        to={`/details/${a.nft_id}`}
                        style={{ color: 'white' }}
                      >
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 border border-blue-700 rounded"
                      id={a.nft_id}
                      key={a.nft_id}
                    >

                        View Details

                    </button>
                    </Link>
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 border border-blue-700 rounded"
                      onClick={handleShow}
                      id={a.nft_id}
                    >
                      Buy
                    </button>
                  </div>
              ))
              : ''}
          </div>
          <hr className="w-40 my-14 border-4 rounded-md sm:mx-0 mx-auto" />
        </section>
      </main>
      <Modal show={show} onHide={handleClose}>
        {buyState && initial
          ? (
          <div className={initial ? 'end' : ''}>
            <Modal.Header closeButton>
              <Modal.Title>Buy NFT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {' '}
              you are about to <strong>END</strong> the purchase, do you want to
              continue?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={BuyNft}>
                Buy
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
                <p style={{ textAlign: 'center' }}>Nft Buyed</p>
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
    </main>
  );
}

export default NftRender;
