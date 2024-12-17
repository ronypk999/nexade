import {
  useAccount,
  useChainId,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";

import dexicon from "../../assetsDao/token.webp";
import { useBalance } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseEther } from "viem";
import axios from "axios";
import Success from "../../components/modal/Success";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useInfoContext } from "../../hook/ContextHook";
import { useTranslation } from "react-i18next";

export const WalletConnect = () => {
  const { t } = useTranslation();
  const {
    updateData,
    addressStore,
    setSelectedCoin,
    amountSender,
    amount,
    selectedCoin,
    coins,
    amountValidate,modal,redirect,setModal,handleAndroidTelegram
  } = useInfoContext();


  const [buyBtnTxt, setBuyBtnTxt] = useState(
    `${t("widget_buy")} ${selectedCoin.name}`
  );
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [openModal, setOpenModal] = useState(false);

  const {
    sendTransaction,
    data: SendTransactionData,
    error: SendTransactionErrorType,
  } = useSendTransaction();
  const balance = useBalance({
    address: address,
  });

  useEffect(() => {
    if (address) {
      addressStore(address);
      updateData();
    }
  }, [address]);

  const chainId = useChainId();
  const {
    switchChain,
    error: SwitchChainErrorType,
  } = useSwitchChain();

  useEffect(() => {
    if (SwitchChainErrorType) {
      toast.error(t("widget_cancelled"), {
        theme: "dark",
      });
    }
    console.log(SwitchChainErrorType);
  }, [SwitchChainErrorType]);

  const proceed = () => {
    const check = amountValidate(
      typeof balance?.data?.formatted === "string"
        ? parseFloat(balance.data.formatted)
        : balance?.data?.formatted || 0
    );

    if (check) {
      toast.error(check, { theme: "dark" });
    } else {
      setBuyBtnTxt("Processing");

      sendTransaction({
        to: `0x${selectedCoin.receiver.substring(2)}`,
        value: parseEther(amountSender.toString()),
        data: "0x",
      });
    }
  };
  // useEffect(() => {
  //   if (SwitchChainData) {
  //     setRunEffect(true);
  //   }
  // }, [SwitchChainData]);
  // useEffect(() => {

   
   
  //   if(runEffect){
  //     setRunEffect2(false);
  //     setRunEffect(true);
  //     console.log(selectedCoin.chainId,chainId)
  //     switchChain({ chainId: selectedCoin.chainId });

  //     setBuyBtnTxt(`Buy with ${selectedCoin.name}`);
  //     return;
  //   }

  //   if(runEffect2){
  //     const coin = coins.find(({ chainId:chainid }) => chainid === chainId);
  //     console.log(coin,"rony");
  //     if (coin) {
  //       setRunEffect(false);
  //       setRunEffect2(true);
  //       setSelectedCoin(coin);
  //     } else {
  //       console.log("coin find error");
  //     }
  //     console.log(runEffect,runEffect2)
  //    setBuyBtnTxt(`Buy with ${selectedCoin.name}`);
  //    return;
  //   }

 
  // }, [selectedCoin,chainId,runEffect,runEffect2]);



  useEffect(() => {
  
      if (
        isConnected &&
        selectedCoin.chainId &&
        selectedCoin.chainId !== chainId
      ) {
        const coin = coins.find((coin) => coin.chainId === chainId);
       if(coin){
        setSelectedCoin(coin);
        setBuyBtnTxt(`Buy with ${coin.name}`);
       
       }
      }

  }, [chainId, isConnected]);

  useEffect(() => {
  
    if (
      isConnected &&
      selectedCoin.chainId &&
      selectedCoin.chainId !== chainId
    ) {
      switchChain({ chainId: selectedCoin.chainId });
        setBuyBtnTxt(`Buy with ${selectedCoin.name}`);
    }

}, [selectedCoin, isConnected]);

  const buyWithBnb = () => {
    if (chainId === selectedCoin.chainId) {
      proceed();
    } else {
      switchChain({ chainId: selectedCoin.chainId });
    }
  };

  useEffect(() => {
    if (SendTransactionErrorType) {
      setBuyBtnTxt(`${t("widget_buy")} ${selectedCoin.name}`);
      toast.error(t("widget_failed"), {
        theme: "dark",
      });
    }
  }, [SendTransactionErrorType]);

  useEffect(() => {
    if (SendTransactionData) {
    
      setBuyBtnTxt(t("widget_success"));
      setOpenModal(true);
      const apiObj = JSON.stringify({
        coinAmount: amountSender,
        dxeAmount: amount,
        address: address,
        refId: localStorage.getItem("refId") || null,
        hash: SendTransactionData,
        receiver: selectedCoin.receiver,
        coinName: selectedCoin.name,
      });

      //send data to database
      axios
        .post(`${import.meta.env.VITE_API_URL}/api.php`, apiObj)
        .then(() => {
          setBuyBtnTxt(`${t("widget_buy_more")} ${selectedCoin.name}`);
          updateData();
        })
        .catch(() => {
          setBuyBtnTxt(`${t("widget_buy")} ${selectedCoin.name}`);
        });
    }
  }, [SendTransactionData]);

  useEffect(() => {
    updateData();
  }, [isConnected]);

  return (
    <>
      <Success
        purchase={{
          amountInBNB: amountSender,
          amountInDXE: amount,
          address: `${address}`,
          hash: `0x${SendTransactionData}`,
          dxeicon: dexicon,
          coin: selectedCoin,
        }}
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></Success>
       {modal && <div className="modal">
        <div className="modal-content">
            <p className="modal-text">This site is requesting to open a link in an external browser.</p>
            <div className="modal-buttons">
                <button onClick={redirect} className="allow-btn">Allow</button>
                <button onClick={()=>setModal(false)} className="deny-btn">Don't allow</button>
            </div>
        </div>
    </div>}
      <div>
        {isConnected ? (
          <div className="mtb">
            <button
              onClick={buyWithBnb}
              className="i-btn"
            >
              {buyBtnTxt}
              <img src={selectedCoin.icon} className="i-token-logo" />
            </button>
            <button
              onClick={() => {
                disconnect();
              }}
              className="i-btnd"
            >
              {t("widget_disconnect")}
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              if(!handleAndroidTelegram()){
                open({ view: "Connect" });
              }else{
                setModal(true);
              }
            }}
            className="i-btn"
          >
            {t("widget_connect")}
          </button>
        )}
      </div>
    </>
  );
};
