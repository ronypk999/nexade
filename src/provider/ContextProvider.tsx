import axios from "axios";
import React, { createContext, useState, ReactNode, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import ethImage from "../assetsDao/eth-logo.png";
import bnbImage from "../assetsDao/bnb-logo.png";
import maticImage from "../assetsDao/matic-logo.png";
import baseImage from "../assetsDao/base-logo.png";
import arbitrumImage from "../assetsDao/arbitrum-logo.png";
import { Web3ModalProvider } from "../web3/evm/WalletSetup";
import { useTranslation } from "react-i18next";
interface coinx {
  bnbPrice: number;
  ethPrice: number;
  maticPrice: number;
  arbPrice: number;
  basePrice: number;
  avaxPrice: number;
  dxePrice: number;
  usdPrice: number;
  collectedDXE: number;
  targetDXE: number;
  myPurchase: number;
  presaleEndTime?: number;
  min:Record<string,number>;
  erc20Address:string;
}

// interface min {
//   ETH: string | number,
//   BNB: string | number,
//   BASE: string | number,
//   ARB: string | number,
//   MATIC: string | number,
// }
interface Window {
  TelegramWebview?: object; // Add the TelegramWebview property to the Window interface
}

interface PurchaseData extends coinx {
  data: coinx;
}

interface Coin {
  name: string;
  icon: string;
  price?: number;
  wallet: ReactNode; // Or JSX.Element if you're sure it's a React component
  chainId: number;
  scanUrl: string;
  receiver: string;
}

interface ContextProps {
  children: ReactNode;
}

export interface ContextValue extends PurchaseData {
  updateData: () => void;
  coins: Coin[];
  setSelectedCoin: (coin: Coin) => void;
  selectedCoin: Coin;
  amount: number;
  amountSender: number;
  setAmountSender: (amount: number) => void;
  modal: boolean;
  setModal: (modal: boolean) => void;
  modal2: boolean;
  setModal2: (modal: boolean) => void;
  setAmount: (amount: number) => void;
  addressStore: (address?: string | null) => string[] | null;
  amountValidate: (balance: number) => string | false;
  sendCoinRef: React.MutableRefObject<HTMLInputElement | null>;
  handleAndroidTelegram: any;
  redirect:()=>void;
}

export const InfoContext = createContext<ContextValue | undefined>(undefined);

const ContextProvider = ({ children }: ContextProps) => {
  const { t } = useTranslation();
  const { data: datax } = useLoaderData() as PurchaseData; // Ensure type of loader data
  const [data, setData] = useState<coinx>(datax || {});
  const sendCoinRef = useRef<HTMLInputElement>(null);
  const addressStore = (address: string | null = null): string[] | null => {
    if (address) {
      const check = localStorage.getItem("addressArray") || "[]";
      const addresses = JSON.parse(check);
      if (!addresses.includes(address)) {
        const newAddresses = [...addresses, address];
        localStorage.setItem("addressArray", JSON.stringify(newAddresses));
      }
    }
    return JSON.parse(localStorage.getItem("addressArray") || "null");
  };

  const updateData = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api.php`, {
        info: 1,
        address: addressStore(),
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const coins: Coin[] = [
    {
      name: "BNB",
      icon: bnbImage,
      price: data?.bnbPrice,
      wallet: <Web3ModalProvider />,
      chainId: 56,
      scanUrl: "https://bscscan.com/tx/",
      receiver: data?.erc20Address || "0x715f3fEe7a3515D80283432ad227557b86A729E7",
    },
    {
      name: "ETH",
      icon: ethImage,
      price: data?.ethPrice,
      wallet: <Web3ModalProvider />,
      chainId: 1,
      scanUrl: "https://etherscan.io/tx/",
      receiver: data?.erc20Address || "0x715f3fEe7a3515D80283432ad227557b86A729E7",
    },
    {
      name: "BASE",
      icon: baseImage,
      price: data?.basePrice,
      wallet: <Web3ModalProvider />,
      chainId: 8453,
      scanUrl: "https://basescan.org/tx/",
      receiver: data?.erc20Address || "0x715f3fEe7a3515D80283432ad227557b86A729E7",
    },
    {
      name: "MATIC",
      icon: maticImage,
      price: data?.maticPrice,
      wallet: <Web3ModalProvider />,
      chainId: 137,
      scanUrl: "https://polygonscan.com/tx/",
      receiver: data?.erc20Address || "0x715f3fEe7a3515D80283432ad227557b86A729E7",
    },
    {
      name: "ARB",
      icon: arbitrumImage,
      price: data?.arbPrice,
      wallet: <Web3ModalProvider />,
      chainId: 42161,
      scanUrl: "https://arbiscan.io/tx/",
      receiver: data?.erc20Address || "0x715f3fEe7a3515D80283432ad227557b86A729E7",
    },
    
  ];

  const [selectedCoin, setSelectedCoin] = useState<Coin>(coins[0]);
  const [amount, setAmount] = useState<number>(0);
  const [amountSender, setAmountSender] = useState<number>(0);
  const [modal,setModal] = useState(false);
  const [modal2,setModal2] = useState(false);
  const redirect = ()=>{
    const url = window.location.href.replace("redirect","");
    const intentUrl = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end;`;
  
    window.open(intentUrl,"_blank");
};

const handleAndroidTelegram = ()=>{
  const isAndroid = /android/i.test(navigator.userAgent);
  if((window as Window)?.TelegramWebview && isAndroid){
    //show modal
  return true;
  }else{
    return false;
  }
}

  const amountValidate = (balance: number): string | false => {
    
    if (isNaN(amountSender)) {
      return t("widget_error_number");
    }

    if (amountSender === 0) {
      return t("widget_error_type_amount");
    }

    if (amountSender < 0) {
      return t("widget_error_amount");
    }


    if (data?.min[selectedCoin.name] > amountSender) {
      return `${t("widget_min_buy")} ${data?.min[selectedCoin.name]} ${selectedCoin.name}`;
    }

    if (amountSender > balance) {
      return t("widget_error_balance");
    }

    return false; // Explicitly return false if no validation errors
  };



  const dataObject: ContextValue = {
    ...data,
    data: data,
    updateData,
    coins,
    setSelectedCoin,
    selectedCoin,
    amount,
    amountSender,
    setAmountSender,
    setAmount,
    addressStore,
    sendCoinRef,
    amountValidate,
    handleAndroidTelegram,
    redirect,
    modal,
    setModal,
    modal2,
    setModal2
  };

  return (
    <InfoContext.Provider value={dataObject}>{children}</InfoContext.Provider>
  );
};

export default ContextProvider;
