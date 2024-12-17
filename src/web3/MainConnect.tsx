import { useEffect } from "react";

import Timer from "../components/Timer";
import { ToastContainer } from "react-toastify";
import { useInfoContext } from "../hook/ContextHook"
import saleLogo from '../assetsDao/logo.svg';
import eth from '../assetsDao/eth-logo.png';
import bnb from '../assetsDao/bnb-logo.png';
import base from '../assetsDao/base-logo.png';
import arb from '../assetsDao/arbitrum-logo.png';
import matic from '../assetsDao/matic-logo.png';
import presaleImage from '../assetsDao/presale.webp';
const MainConnect = () => {
  const {
    dxePrice,
    setAmountSender,
    selectedCoin,
    setSelectedCoin,
    setAmount,
    coins,
    amount,
    min,
    myPurchase,
    sendCoinRef,
usdPrice 
  } = useInfoContext();

  
  const handleSelectCoin = (selectedName: string) => {
    const coin = coins.find(({ name }) => name === selectedName);
    if (coin) {
      setSelectedCoin(coin);
    } else {
      console.log("coin find error");
    }
  };

  const updateDXE = () => {
    if (selectedCoin.price && dxePrice && sendCoinRef.current) {
      const val =
        typeof sendCoinRef.current.value === "string"
          ? parseFloat(sendCoinRef.current.value) || 0
          : sendCoinRef.current.value || 0;

      const amountInUSD = val * selectedCoin.price;

      const newAmountDxe = amountInUSD * dxePrice;

      setAmount(
        newAmountDxe.toString().length > 8
          ? parseFloat(newAmountDxe.toFixed(8))
          : newAmountDxe
      );
      setAmountSender(val);
    }
  };

  useEffect(() => {
    updateDXE();
  }, [selectedCoin]);

  // const format = (am: number) => {
  //   return Number(am).toFixed(2);
  // };
  function performStatusCheck() {
    const statusDisplay = document.getElementById("status");
    (statusDisplay as HTMLElement).textContent = "Verifying...";
    setTimeout(() => {
      (statusDisplay as HTMLElement).textContent = "Allowed ✅";
    }, 3000); // Simulated 3-second delay
  }
useEffect(()=>{
  performStatusCheck();
},[])

  return (
    <>
      <ToastContainer></ToastContainer>
      <section className="hero-info-section">
      <div className="hero-card">
        <div className="left-content">
          <img src={presaleImage} alt="MetaVirus" className="hero-image" />
        </div>
        <div className="right-content">
          <div className="tabs">
            <button className="tab">Offerings</button>
            <button className="tab">Key Metrics</button>
            <button className="tab">Unlocks</button>
          </div>
          <div className="countdown">
            <p>Nexade IDO ends in:</p>
            
             <div className="countdown-timer">
            <Timer></Timer>
             </div>
            <button onClick={()=>{
             
          
            document.getElementById("modalBuy12")?.classList.remove("hidden");
             
           
               
            }} className="join-button">Join IDO</button>
          </div>

          {myPurchase > 0 &&<div className="countdown">
            <p>My purchased tokens</p>
            
             <div className="countdown-timer">
          <div>{myPurchase} Nexade</div>
             </div>
          
          </div>
}

        </div>
      </div>
    </section>

      <div id="modalBuy12" className="i-modal-overlay hidden">
      <div className="i-modal-content">
        <div className="i-close-modal-container">
          <button className="i-close-modal" onClick={()=>document.getElementById("modalBuy12")?.classList.add("hidden")}>X</button>
        </div>

        {/* Sale Ticket Section */}
        <div className="i-sale-ticket">
          <div className="i-logo-container">
            <img src={saleLogo} alt="Logo" className="i-sale-logo" />
          </div>
          <h2 className="i-h2">Refundable IDO</h2>

          {/* Status Row */}
          <div className="i-ticket-item">
            <span>Status:</span>
            <span id="status" className="i-status-right">Verifying</span>
          </div>

          <hr className="i-separator" />

          {/* Price Row */}
          <div className="i-ticket-item">
            <span>Private Price:</span>
            <span id="private-price">${usdPrice}</span>
          </div>
          <hr className="i-separator" />

          <div className="i-ticket-item">
            <span>Listing Price:</span>
            <span><span className="i-highlight"></span> <span id="listing-price">$0.07</span></span>
          </div>
          <hr className="i-separator" />

          <div className="i-ticket-item">
            <span>Individual Allocation:</span>
            <span><span className="i-highlight">max</span> <span id="individual-allocation">$122,930</span></span>
          </div>
          <hr className="i-separator" />

          <div className="i-ticket-item">
            <span>Blockchain Network:</span>
            <span>
            {coins.map(({icon}) => (
      <>
           <img src={icon} alt="ETH Logo" className="i-token-logo" />
         
           </>
      ))}
            </span>
          </div>
          <hr className="i-separator" />

          <div className="i-ticket-item">
            <span>Nexade IDO ends in</span>
            <Timer></Timer>
          </div>
          <hr className="i-separator" />

          <div className="i-ticket-item">
            <span>Minimal Alocation:</span>
            <div style={{display:"flex",gap:"1px",justifyContent:"end"}}>
            {coins.map(({icon,name}) => (
      <>
           <img src={icon} alt="ETH Logo" className="i-token-logo" /> {min[name]}
         
           </>
      ))}
             
             
              
            </div>
          </div>
        </div>

        {/* ETH/BNB Dropdown and Amount Input */}

        <div className="i-amount-input-container">
          <label className="i-label" htmlFor="donation-amount">From:</label>
          <div className="i-input-with-dropdown">
            
            <div className="network-dropdown">
              <div className="network-dropdown_box">
                <button className="network-button">
                  <img
                    src={selectedCoin.icon}
                   
                    className="network-icon"
                  />
                  
                </button>
                <div className="network-options">
                  <div onClick={() => handleSelectCoin("ETH")} className="network-option">
                    <img src={eth} alt="Ethereum" className="network-icon network-option_image" />  ETH
                  </div>
                  <div onClick={() => handleSelectCoin("BNB")} className="network-option">
                    <img src={bnb} alt="Binance" className="network-icon network-option_image" />  BSC
                  </div>
                  <div onClick={() => handleSelectCoin("BASE")} className="network-option">
                    <img src={base} alt="Base" className="network-icon network-option_image" />  BASE
                  </div>
                  <div onClick={() => handleSelectCoin("ARB")} className="network-option">
                    <img src={arb} alt="Arbitrum" className="network-icon network-option_image" />  ARB
                  </div>
                  <div onClick={() => handleSelectCoin("MATIC")} className="network-option">
                    <img src={matic} alt="Polygon" className="network-icon network-option_image" />  MATIC
                  </div>

                </div>
              </div>
            </div>
            <input id="donation-amount" className="i-input" type="number" placeholder="Enter amount"  onChange={updateDXE}
                ref={sendCoinRef}/>
          </div>
        </div>

        {/* MVT Amount Section */}
        <div className="i-amount-input-container">
          <label className="i-label" htmlFor="mvt-amount">To:</label>
          <div className="i-input-with-output">
            <input className="i-input" type="text" id="mvt-amount" name="mvt-amount" placeholder="MVT amount" disabled value={amount} />
          </div>
        </div>

        <div>{selectedCoin?.wallet}</div>
      
      </div>
    </div>
    </>
  );
};

export default MainConnect;
