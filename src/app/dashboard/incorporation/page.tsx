"use client";
import Image from "next/image";
import React from "react";
import logoIm from "../../../../public/assets/CAC-Logo.png";
import { Button } from "@/components/ui/button";

const Incorporation = () => {
	return (
		<div className="col-span-5 bg-[#d1cdb0] h-screen text-white grid content-center justify-items-center">
			<div className="w-full h-screen bg-color_primary-200 flex flex-col items-center">
				<Image src={logoIm} alt="logohere" className="relative w-64 m-auto" />
				<p className="mt-4 text-white max-w-[1000px] text-center font- text-2xl font-semibold">
					We provide all services covered by the Corporate Affairs Commission,
					from business registration through status report.Here you will
					discover information on how to proceed with A.N ZEPH & ASSOCIATES and
					how we can help you.
				</p>

				<div className="pt-20 lg:m-auto gap-10 flex flex-col md:flex-row justify-between">
					<div className=" text-white hover:border-white border-[2px] hover:scale-95 rounded-xl shadow-lg min-h-fit md:w-[49%] p-10">
						<h1 className=" text-[21px] mb-12 ">PRE-INCORPORATION</h1>
						<ul className=" font- text-xl h-full flex flex-col gap-6 list-disc ">
							<li>Alteration of memorandum or amendment of memorandum</li>
							<li>Payment of Annual returns</li>
							<li>Change of company Secretary</li>
							<li>Removal or Addition of Director</li>
							<li>Change or Re-allotment of shares</li>
							<li>Change of company's name</li>
							<li>Change of company's address</li>
							<li>Status Report</li>
							<li>Conversion or Re-registration of company</li>
						</ul>
					</div>
					<div className=" text-white hover:border-white border-[2px] hover:scale-95 rounded-xl shadow-lg min-h-fit md:w-[49%] p-10">
						<h1 className=" text-[21px]  text-color_secondary-50 mb-12">
							POST-INCORPORATION
						</h1>
						<ul className="text-white font- text-xl h-full flex flex-col gap-6 list-disc ">
							<li>Filing of Business Names</li>
							<li> Filing of Companies (Limited)</li>
							<li>Filing of Companies Limited by Guarantee (LTD/GTE)</li>
							<li>
								Filling of NGO's such as Church, Mosque, Foundation, Club, e.t.c
							</li>
						</ul>
					</div>
				</div>

				<hr className="bg-color_secondary-50 mt-10" />

				<div className="h-1/3 w-[70%] m-auto mt-8 flex flex-col justify-between items-center mb-10">
					<textarea
						name="CAC Info"
						id="CAC"
						rows={10}
						placeholder="Tell us how we may be of help to you"
						className="w-full bg-[#d1cdb0] border-white border-[1px] max-w-[800px] outline-none focus:outline-none p-5 text-2xl text-white font-Work Sans bg-[#d1cdb0]-100 mb-10"
					/>
					<Button>Submit</Button>
				</div>
			</div>
		</div>
	);
};

export default Incorporation;
