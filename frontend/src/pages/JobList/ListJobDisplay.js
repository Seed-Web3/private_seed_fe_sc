import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";


import ArticleCard from "./Article/index";
import Graphic1 from "../../../assets/img/bowl2.png";
import Graphic2 from "../../../assets/img/graphic.png";
import Search from "../../../assets/img/search.png";
import { ConfigContext } from "../../context/config.context";
import { useWallet } from "../../hooks/useWallet";
import { useNavigate } from "react-router-dom";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ToggleFilter(props) {

  return (
    <>
      <label htmlFor={props.label} className="relative h-6 w-14 cursor-pointer">
        <input type="checkbox" id={props.label} className="peer sr-only" />

        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-black" />

        <span className="absolute inset-0 m-1 h-4 w-6 rounded-full bg-white transition peer-checked:translate-x-6" />
      </label>
      <span className="px-2 text-sm">{props.label}</span>
    </>
  );
}

function SearchTag(prop) {
  return (
    <a
      className={classNames(
        prop.tag.selected
          ? "bg-black text-[#DAFF3E]"
          : "border-black text-black hover:bg-[#DAFF3E]",
        "border-2 rounded-full px-2 py-1 font-bold"
      )}
      key={prop.tag.name}
      href="#"
    >
      {prop.tag.name}
    </a>
  );
}

function JobsList(props) {

  useEffect(() => {
    console.log(props)
  },[])
  const { viewMethod } = useWallet()
  const navigate = useNavigate()

  const goToJobCreationPage = () => {
    navigate('/job/create')
  }

  const goToRentalPage = () => {
    navigate('/IndexRentTalent')
  }

  const [tags] = useState([
    { name: "Full Stack Dev", selected: false },
    { name: "Solidity", selected: false },
    { name: "Rust", selected: false },
    { name: "Tokenomics", selected: false },
    { name: "Javascript", selected: false },
    { name: "Product Manager", selected: false },
  ]);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const getAllJobs = async () => {
      const respond = await viewMethod('seed.bonebon.testnet', 'get_all_jobs')
      if(respond) {
        setJobs(respond.map((e) => e.detail))
      } else {
        setJobs([])
      }
    }

    getAllJobs()

  }, [setJobs, viewMethod])

  return (
    <>
      <div className="mx-8 font-robotoMono">
        <div className="flex flex-row justify-center w-full mt-[2rem]">
          <a onClick={goToJobCreationPage} href="" className="flex flex-col bg-[#DAFF3E] text-black w-[1077px]  md:h-[200px] justify-center items-center  mr-4 rounded-3xl">
            <p className="font-bold text-4xl">LIST JOB</p>
            <p className="font-bold text-normal">Unlock 7+ million talents</p>

            <img
              src={Graphic1}
              alt=""
              className="absolute scale-[0.3] mt-[3.7rem]"
            />
          </a>

          <a href="#" onClick={goToRentalPage}  className="static flex flex-col bg-black text-[#DAFF3E] w-[1077px]  md:h-[200px] justify-center items-center rounded-3xl">
            <p className="font-bold text-4xl">RENT TALENT</p>
            <p className="font-bold text-normal">
              Rent our dev team to churn out your dream project
            </p>
            <img
              src={Graphic2}
              alt=""
              className="absolute scale-[0.3] mt-[3.7rem] ml-[13.8rem]"
            />
          </a>
        </div>
        <div className="flex flex-row w-full mt-8">
          <div className="relative flex justify-start w-[50%]">
            <input
              type="search"
              name="Search"
              placeholder="Skill or Location"
              className="text-left w-full py-2 pl-10 text-sm rounded-md border-solid border-2 border-black focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <img src={Search} alt="" className="w-5 h-5" />
              </button>
            </span>
          </div>
          <div className="flex flex-row pl-4 justify-between">
            <div className="flex flex-row items-center px-1">
              <ToggleFilter label="Remote" />
            </div>
            <div className="flex flex-row items-center px-1">
              <ToggleFilter label="Full Time" />
            </div>
            <div className="flex flex-row items-center px-1">
              <ToggleFilter label="Freelance" />
            </div>
            <div className="flex flex-row items-center px-1">
              <ToggleFilter label="Internship" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 font-robotoMono mt-4">
          {tags.map((tag) => (
            <SearchTag tag={tag} key={tag.name} />
          ))}
        </div>
        <div className="my-4 text-[#EDEDED]">
          <hr />
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mt-8 mb-4">
          {jobs.map((job) => (
            <ArticleCard job={job} key={job.name} />
          ))}
        </div>
      </div>
    </>
  );
}
export default JobsList;
