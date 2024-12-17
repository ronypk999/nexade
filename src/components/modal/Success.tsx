
import { useTranslation } from "react-i18next";
import saleLogo from '../../assetsDao/logo.svg';
interface Purchase {
  amountInDXE: string | number;
  amountInBNB: string | number;
  hash: string;
  address: string;
  dxeicon: string;
  coin: {
    icon: string;
    scanUrl: string;
  };
}

interface PropTypes {
  purchase: Purchase;
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
}

const Success = ({ openModal, setOpenModal, purchase }: PropTypes) => {
  const { amountInDXE, amountInBNB, hash, address, dxeicon, coin } = purchase;
  const { t } = useTranslation();
  return (
    <div>
      
      <div className={`i-modal-overlay ${openModal ? "":"hidden"}`}>
      <div className="i-modal-content">
        <div className="i-close-modal-container">
          <button className="i-close-modal" onClick={()=>setOpenModal(false)}>X</button>
        </div>

        {/* Sale Ticket Section */}
        <div className="i-sale-ticket">
          <div className="i-logo-container">
            <img src={saleLogo} alt="Logo" className="i-sale-logo" />
          </div>
          <h2 className="i-h2">{t("success_modal_headline")}</h2>
          <h3 className="i-h3">{t("success_modal_subline")}</h3>
          <br/>
          <br/>

          {/* Status Row */}
          <div className="i-ticket-item">
            <span>{t("success_modal_paid")}</span>
            <span id="status" className="i-status-right"> {amountInBNB}<img src={coin.icon} className="i-token-logo" /></span>
          </div>

          <hr className="i-separator" />

          {/* Price Row */}
          <div className="i-ticket-item">
            <span>{t("success_modal_receive")}</span>
            <span id="private-price"> {amountInDXE} <img src={dxeicon} className="i-token-logo" /></span>
          </div>
          <hr className="i-separator" />

          <div className="i-ticket-item">
            <span>{t("success_modal_coin_address")}</span>
            <span><span className="i-highlight">{address.substring(2)}</span></span>
          </div>
          
          <span>{t("success_modal_instruction")}</span>
          <br/>
          <br/>
          <span>{t("success_modal_welcome")}</span>
          <br/>
          <br/>
          <a
                className="i-btn"
                href={`${coin.scanUrl}${hash.substring(2)}`}
                target="_blank"
              >
                {t("success_modal_explorer_btn_txt")}
              </a>
      
          
        </div>

       
      
      </div>
    </div>

    </div>
    
  );
};

export default Success;
