import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";

import "./assets/index.css";

import { Routes, Route } from "react-router-dom";

import "./App.css";

// context
import { ConfigContext } from "./src/context/config.context";
// Component
import Navbar from "./src/components/Navbar";
// Pages
import Home from "./src/pages/home";
import Login from "./src/pages/authentication/Login";
import Register from "./src/pages/authentication/Register";
import Profile from "./src/pages/profileForm";
import ProfileDisplay from "./src/pages/ProfileDisplay/display";
import Wallet from "./src/pages/profileConnect/ConnectWallet";
import IssueEndors from "./src/pages/profileConnect/IssueEndors";
import MintSuccess from "./src/pages/profileConnect/MintSuccess";
import EmailLogin from "./src/pages/authentication/EmailLogin";
import LandingPage from "./src/pages/Landingpage/IndexLandingPage";
import IndexJobListing from "./src/pages/JobList/IndexJobListing";
import ListJobDisplay from "./src/pages/JobList/ListJobDisplay";
import IndexRentTalent from "./src/pages/RentTalent/IndexRentTalent";
import RentTalentForm  from "./src/pages/RentTalent/RentTalentForm";
import IndexIssueNft from "./src/pages/IssueNFT/IndexIssueNft";
import NftLink from "./src/pages/IssueNFT/NftLink";
import BatchMint from "./src/pages/IssueNFT/BatchMint";
import { NearWalletContext } from "./src/context/wallet.context";
import useIpfsFactory from "./src/hooks/useIpfsFactory";
import useIpfs from "./src/hooks/useIpfs";
import NavbarLayout from "./src/components/Layout/NavbarLayout";
import FullScreenLayout from "./src/components/Layout/FullscreenLayout";
import ProtectedLayout from "./src/components/Layout/ProtectedLayout";
import JobMgmt from "./src/pages/JobManagement/JobMgmt";
import Form from './src/pages/profileForm/Form'
import Learning from "./src/pages/myPage/learning";
import MyJobHire from "./src/pages/JobManagement/myJobHire";
import Submited from "./src/pages/JobList/submited";


export default function App({ isSignedIn, wallet }) {
  const [config, setConfig] = useState({
    isAuthEnabled: true,
    isNavsEnabled: true,
  });

  const near = {
    isSignedIn,
    wallet,
  };

  const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ["id"] });
  // const id = useIpfs(ipfs, 'id')
  const [version, setVersion] = useState();

  useEffect(() => {
    if (!ipfs) return;

    const getVersion = async () => {
      const nodeId = await ipfs.version();
      setVersion(nodeId);
    };

    getVersion();
  }, [ipfs]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <NearWalletContext.Provider value={near}>
        <div className="App">
          <div className="w-full h-screen flex flex-col justify-start ">
            <Routes>
              <Route
                path="/"
                element={
                  <NavbarLayout
                    isNavEnabled={config.isNavsEnabled}
                    isAuthEnabled={config.isAuthEnabled}
                  />
                }
              >
                {/* Job Listing */}


                <Route index element={<ListJobDisplay />} />
                <Route exact path="/jobs" element={<ListJobDisplay />} />
                <Route exact path="/job/create" element={<IndexJobListing />} />
                <Route exact path='/IndexRentTalent' element={<IndexRentTalent/>}></Route>
              </Route>

              <Route path="/submited" element={<Submited/>}></Route>
              <Route path="/user" element={<ProtectedLayout />}>
                {/*<Route path="profile/form" element={<Profile />} />*/}
                {/*<Route path="job/manage" element={<JobMgmt />} />*/}
                <Route path="rental" element={<IndexRentTalent />} />
              </Route>

              <Route path="profile/form" element={<Profile />} />
              <Route path="job/manage" element={<JobMgmt />} />
              <Route path="/MyJobHire" element={<MyJobHire/>}></Route>

              <Route path="/" element={<FullScreenLayout />}>
                {/* Landing Page */}
                {/*<Route index element={<ListJobDisplay />} />*/}
                {/* Authentication */}
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/emailogin" element={<EmailLogin />} />
                <Route exact path="/Learning" element={<Learning />}></Route>
                <Route
                    path="profile/preview/:account"
                    element={<ProfileDisplay />}
                />
                <Route path="/Form" element={<Form/>}></Route>
              </Route>
              <Route exact path="/home" element={<Home />} />

              {/* NFT Endorsement */}
              <Route exact path="/wallet" element={<Wallet />} />
              <Route
                exact
                path="/issue"
                element={<IssueEndors/>}
              />
              <Route exact path="/mintSuccess" element={<MintSuccess />} />

              {/* Issue NFT */}
              <Route
                exact
                path="/indexissuenft"
                element={<IndexIssueNft/>}
              />
              <Route exact path="/nftlink" element={<NftLink />} />

              {/* Batch Minting */}
              <Route
                exact
                path="/batchmint"
                element={<BatchMint/>}
              />
              <Route path="*" element={<LandingPage />} />

            </Routes>
          </div>
        </div>
      </NearWalletContext.Provider>
    </ConfigContext.Provider>
  );
}
