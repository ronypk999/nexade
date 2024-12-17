import { useWeb3Modal } from "@web3modal/wagmi/react";
import { t } from "i18next";
import { useAccount } from "wagmi";
import { useInfoContext } from "../hook/ContextHook";

export const MainConnectBtn = () => {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const {modal2,redirect,setModal2,handleAndroidTelegram} = useInfoContext();
  return (
    <>
     
      <div>
      {modal2 && <div className="modal">
        <div className="modal-content">
            <p className="modal-text">This site is requesting to open a link in an external browser.</p>
            <div className="modal-buttons">
                <button onClick={redirect} className="allow-btn">Allow</button>
                <button onClick={()=>setModal2(false)} className="deny-btn">Don't allow</button>
            </div>
        </div>
    </div>}
        {isConnected ? (
       <w3m-button size="md" />
        ) : (
          <button
            onClick={() => {
              if(!handleAndroidTelegram()){
                open({ view: "Connect" });
              }else{
                setModal2(true);
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
