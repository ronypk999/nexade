import React from 'react';

import metaLogo from '../assetsDao/logo_meta.webp';

import saleLogo from '../assetsDao/logo.svg';

import heroInfoImage from '../assetsDao/hero_info.webp';
import heroInfoImage1 from '../assetsDao/hero_info1_1.webp';
import heroInfo1Image from '../assetsDao/hero_info1.webp';
import heroInfo2Image from '../assetsDao/hero_info2.webp';


import MainConnect from '../web3/MainConnect';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from '../web3/evm/WalletSetup';
import { MainConnectBtn } from '../web3/MainConnectBtn';

export const Dao: React.FC = () => {



  return (
    <div>



      <header>
        <div className="header-content">
          <div className="logo">
            <img src={saleLogo} alt="DAO Maker Logo" />
          </div>

          <div>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <MainConnectBtn></MainConnectBtn>
              </QueryClientProvider>
            </WagmiProvider>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="live-badge">LIVE</div>
        <div className="hero-overlay">
          <div className="hero-content">
            <img src={metaLogo} alt="MetaVirus Logo" className="hero-logo" />
            <h1>Nexade</h1>

            {/* Social Icons */}
            <div className="social-icons">
              {/* First Row */}
              <a href="https://nexade.finance/" target="_self" className="icon active" aria-label="Website">
                <i className="fas fa-globe"></i>
              </a>
              <span className="icon inactive" aria-label="Location">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <a href="https://x.com/nexade_official" target="_blank" rel="noopener noreferrer" className="icon active" aria-label="X">
                <i className="fab fa-x-twitter"></i>
              </a>

              <a href="https://t.me/nexade_official" target="_blank" rel="noopener noreferrer" className="icon active" aria-label="Telegram">
                <i className="fab fa-telegram-plane"></i>
              </a>
              <span className="icon inactive" aria-label="Discord">
                <i className="fab fa-discord"></i>
              </span>
              <span className="icon inactive" aria-label="Medium">
                <i className="fab fa-medium"></i>
              </span>

              {/* Second Row */}

              <span className="icon inactive" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </span>
              <a href="https://www.linkedin.com/company/nexade" target="_blank" rel="noopener noreferrer" className="icon active" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <span className="icon inactive" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </span>
              <span className="icon inactive" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </span>
              <span className="icon inactive" aria-label="Reddit">
                <i className="fab fa-reddit-alien"></i>
              </span>
            </div>
          </div>
        </div>
      </section>




      <section className="project-details">
        <h2>Project Details</h2>
        <div className="separator">
          <div className="blue-line"></div>
          <div className="gray-line"></div>
        </div>
      </section>




      <MainConnect></MainConnect>

      <section className="section-wrapper">
        {/* Left Column */}
        <div className="left-column">
          {/* First Card */}
          <div className="card public-round-card">
            <h3>Public Round</h3>
            <p>Registrations are opened to anyone with more than $500 worth of tokens in their wallet.</p>
            <p className="status">Sale Open</p>
          </div>

          <div className="card second-round-card">
            <h3>Public Round</h3>
            <p>Registrations are opened to anyone with more than $500 worth of tokens in their wallet.</p>
            <p className="status">Sale Open</p>
          </div>
          <div className="card strong-hold-card">
            <h3>Strong Hold Offer</h3>
            <p>Premium round offerings for DAO holders only. Higher winning chances with lower fees.</p>
            <p>Registration ends in:</p>

            <button className="join-button">Participate</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Existing content */}

          <h2 className="section-title">What is Nexade (NEXD)?</h2>
          <p className="section-paragraph">
            NEXADE is an RWA protocol which avails stablecoin yields through institutional-grade portfolios of real-world trade finance assets. The on-chain platform provides insured and risk-adjusted yield solutions attractive to institutional investors, stablecoin issuers, protocol treasuries and mass retail investors seeking real yield.
          </p>
          <p className="section-paragraph">
            Nexade provides trade financing solutions for importers, and exporters operated by the team at Incomlend which has processed over $1B in financing since 2016. Nexade has completed over $40M in receivables financing through a PoC RWA platform (LC Lite) positioning it to now offer a token that provides LPs and stakers access to stablecoin yields.
          </p>
          <img src={heroInfoImage} alt="MetaVirus Banner" className="content-image" />
          <img src={heroInfoImage1} alt="MetaVirus Banner" className="content-image" />



          {/* Game Basics Section */}
          <div className="content-section">
            <h2 className="section-title">What makes Nexade (NEXD) unique?</h2>
            <img src={heroInfo1Image} alt="Game Basics" className="content-image" />
            <div className="section-paragraph">
              <ul className="bullet-list">
                <li>
                  <strong>Launch Date:</strong> MetaVirus launched Pre-charge on the Web3 gaming platform NexGami on June 15, 2024.
                </li>
                <li>
                  <strong>Successful Fundraising:</strong> The first Launchpad Pre-charge product successfully raised $10 million within six hours.
                </li>
                <li>
                  <strong>Innovative Model:</strong> This Pre-charge adopted an innovative <em>"recharge is fundraising"</em> model.
                </li>
                <li>
                  <strong>User Rewards:</strong> All users participating in the fundraising received <em>two types of project tokens</em>.
                </li>
              </ul>
            </div>
            <br></br>
            <h2 className="section-title">What is Nexade (NEXD) roadmap?</h2>
            <div className="phase-details">
              {/* Phase 1 */}
              <h3 className="phase-title">
                <strong>Phase 1:</strong> Token Launch (Expected TGE – Q4 2024)
              </h3>
              <ul className="phase-list">
                <li>
                  <strong>Initial Launch:</strong> The release of the $NEXD token will introduce basic platform features, marking the start of Nexade’s operations.
                </li>
                <li>
                  <strong>Establishing Treasury and Insurance:</strong> This phase will establish the platform’s financial infrastructure, including the treasury for operational management and an insurance pool to enhance participant security.
                </li>
              </ul>

              {/* Phase 2 */}
              <h3 className="phase-title">
                <strong>Phase 2:</strong> Enabling Stablecoin Investments in Trade Finance RWA (Q4 2024)
              </h3>
              <ul className="phase-list">
                <li>
                  <strong>First RWA Investment Pool:</strong> The launch of the initial trade receivables-backed investment pool, providing access to stable, asset-backed yields.
                </li>
                <li>
                  <strong>Expansion of RWA Pools:</strong> Additional Trade Finance RWA pools will be introduced, broadening investment opportunities and diversifying the platform’s offerings.
                </li>
              </ul>

              {/* Phase 3 */}
              <h3 className="phase-title">
                <strong>Phase 3:</strong> Scaling Up (H1 2025)
              </h3>
              <ul className="phase-list">
                <li>
                  <strong>Liquidity Provider Partnership Expansion:</strong> Strengthening partnerships for greater liquidity.
                </li>
                <li>
                  <strong>Target $200M Loans Financed by December 2025:</strong> Accelerating growth in the trade finance sector.
                </li>
                <li>
                  <strong>Expansion into Multi-Chain Ecosystems:</strong> Broadening Nexade's reach and interoperability.
                </li>
              </ul>
            </div>
            <div>
              {/* Main Section Title */}
              <br></br>
              <h2 className="section-title">Nexade (NEXD) revenue streams</h2>

              {/* Receivable Financing Strategy */}
              <h3 className="sub-section-title">Receivable Financing Strategy:</h3>
              <p className="section-paragraph">
                • NEXADE implements a receivable financing model where businesses accessing liquidity through the platform agree to a discount rate on their receivables. The discount rate provides an additional revenue stream for the protocol, ensuring profitability while delivering value to businesses.
              </p>

              {/* Management Fees */}
              <h3 className="sub-section-title">Management Fees:</h3>
              <p className="section-paragraph">
                • NEXADE charges a percentage of the yields generated by tokenized RWAs.<br />
                • For example, trade receivables funded through the platform generate predictable cash flows, from which a small management fee is deducted.
              </p>

              {/* Transaction Fees */}
              <h3 className="sub-section-title">Transaction Fees:</h3>
              <p className="section-paragraph">
                • Fees are charged for transactions on the protocol, including staking, yield withdrawals, and asset tokenization.<br />
                • This ensures ongoing revenue from active participants in the ecosystem.
              </p>
            </div>
            <div>
              <br></br>
              {/* Main Section Title */}
              <h2 className="section-title">What is Nexade (NEXD) marketing strategy?</h2>

              {/* Pre-IDO Strategy */}
              <h3 className="sub-section-title">Pre-IDO Strategy:</h3>
              <p className="section-paragraph">
                • Collaborations with KOLs, social media campaigns, and community engagement through airdrops and AMAs.<br />
                • Creation of educational content on Nexade's features.
              </p>

              {/* Post-IDO Strategy */}
              <h3 className="sub-section-title">Post-IDO Strategy:</h3>
              <p className="section-paragraph">
                • Aggressive user acquisition via exchange promotions, KOLs, and global partnerships.<br />
                • Ongoing community activities and incentivized staking programs.
              </p>
            </div><br></br>
            <div>
              {/* Main Section Title */}
              <h2 className="section-title">Who is Nexade (NEXD) team?</h2>
              <br></br>

              <h3 className="sub-section-title">Morgan Terigi - Co-Founder</h3>
              <ul className="section-paragraph team-list">
                <li>2016-Now: Co-founder & CEO of Incomlend, a global invoice financing marketplace backed by Sequoia Capital and EDBI</li>
                <li>2018-now: Co-founder and director for LC Lite, a blockchain-based trade finance platform; launch of the Lite token on the LC Lite ecosystem</li>
                <li>2023-now: Co-founder & director of Nexade</li>
              </ul>

              <h3 className="sub-section-title">Jean-Charles Devin - Co-Founder</h3>
              <ul className="section-paragraph team-list">
                <li>2016-Now: Partner and head of funds and assets acquisition of Incomlend, a global invoice financing marketplace backed by Sequoia Capital and EDBI</li>
                <li>2018-now: Co-founder and director for LC Lite, a blockchain-based trade finance platform; launch of the Lite token on the LC Lite ecosystem</li>
                <li>2023-now: Co-founder & director of Nexade</li>
              </ul>

              <h3 className="sub-section-title">Dmitri Kouchnirenko - Co-Founder</h3>
              <ul className="section-paragraph team-list">
                <li>2011-2016: Head of Cash Management Sales for Commodity Finance at Bnp Paribas Singapore</li>
                <li>2016-2020: Director and co-Founder at Incomlend, Trade Finance fintech</li>
                <li>2020-2022: CEO and founder of Rednet Global, digital marketing agency</li>
                <li>2018-current: Co-Founder at LC Lite</li>
                <li>2023-current: Co-Founder at Nexade</li>
                <li>2023-current: Senior Consultant at PowerinU, management consulting agency</li>
              </ul>
            </div><br></br>

            <div>
              {/* Section Title */}
              <h2 className="section-title">Who are the partners of Nexade (NEXD)?</h2>

              {/* Partners List */}
              <ul className="section-paragraph aligned-list">
                <li><strong>Plume Network</strong> - Products and services integration with the Technology made available by Plume</li>
                <li><strong>PolyTrade</strong> - Tokenized pool of invoices to be listed on the PolyTrade marketplace</li>
                <li><strong>Request Network</strong> - Providing financing to SMEs using the Request Network solution</li>
                <li><strong>ClearPool</strong> - Yield generator for the Ozeane Ecosystem</li>
                <li><strong>Ledgity</strong> - Onboarded on the Nexade Protocol</li>
                <li><strong>TradeTogether</strong> - Onboarded on the Nexade Protocol</li>
                <li><strong>IBC Group</strong> - Strategic partnership to scale Nexade Protocol</li>
              </ul>
            </div><br></br>
            <div>
              {/* Section Title */}
              <h2 className="section-title">What are Nexade (NEXD) token metrics?</h2>

              <img src={heroInfo2Image} alt="Game Basics" className="content-image" />
            </div>


          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <img src={saleLogo} alt="DAO Maker Logo" className="footer-logo" />
            <p>Tokenizing the Future</p>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#">DAO Launchpad</a></li>
              <li><a href="#">Stake DAO</a></li>
              <li><a href="#">Community Voted</a></li>
              <li><a href="#">Farms and Vestings</a></li>
              <li><a href="#">DAO Swap</a></li>
              <li><a href="#">Governance</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Brand assetsDao</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">DAO Bridge</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Social</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="disclaimer">
            * Past performances do not indicate future success. This web page and any other contents published on
            this website shall not constitute investment advice, financial advice, trading advice, or any other kind of
            advice. You alone assume the sole responsibility of evaluating the merits and risks associated with using any
            information or other content on this website before making any decisions based on such information.
          </p>
          <p>&copy; 2024 DAO Maker. All rights reserved.</p>
          <div className="footer-social-icons">
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-telegram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-tiktok"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-discord"></i></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
