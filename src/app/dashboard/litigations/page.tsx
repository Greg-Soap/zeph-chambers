/* eslint-disable react/no-unescaped-entities */
/* espnt-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";

import { useEffect, useState } from "react";

interface Litigation {
	header: string;
	body: string[];
}

export default function Litigation() {
	const LitigationList: Litigation[] = [
		{
			header: "Commercial Litigation",
			body: [
				"Business Disputes: Cases involving disputes among businesses, partners, shareholders, or competitors.",
				"Intellectual Property: Litigation related to patents, trademarks, copyrights, and trade secrets.",
				"Antitrust and Competition Law: Cases involving allegations of anticompetitive behavior or monopolistic practices.",
			],
		},
		{
			header: "Criminal Litigation",
			body: [
				"Prosecution: Cases where government entities, such as the state, bring charges against individuals or entities accused of committing crimes.",
				"Criminal Defense: Cases where individuals are accused of committing crimes and require defense representation in court.",
			],
		},

		{
			header: "Administrative Litigation",
			body: [
				"Regulatory Disputes: Cases challenging decisions made by government agencies or regulatory bodies.",
				"Professional License Issues: Litigation related to the suspension or revocation of professional licenses.",
			],
		},
		{
			header: "Environmental Litigation:",
			body: [
				"Environmental Disputes: Cases related to environmental regulations, pollution, land use, and natural resource management.",
			],
		},
		{
			header: "Class Action Litigation",
			body: [
				"Mass Torts: Cases involving a large number of plaintiffs with similar claims against a common defendant.",
				"Consumer Protection: Litigation aimed at protecting consumers' rights against unfair business practices.",
			],
		},
		{
			header: "Real Estate Litigation",
			body: [
				"Landlord-Tenant Disputes: Cases involving disputes between landlords and tenants over lease agreements, rent, or property conditions.",
				"Foreclosure: Litigation related to property foreclosure proceedings.",
			],
		},
		{
			header: "International Litigation",
			body: [
				"Cross-Border Disputes: Cases involving parties from different countries, often dealing with jurisdictional and international law issues.",
			],
		},
		{
			header: "Appellate Litigation",
			body: [
				"Appeals: Cases brought before appellate courts to challenge decisions made in lower courts.",
			],
		},

		{
			header: "Civil Litigation",
			body: [
				"Personal Injury: Cases involving injuries or harm caused by negligence, accidents, or intentional actions.",
				"Contract Disputes: Disputes arising from the breach of a contract's terms or conditions.",
				"Property Disputes: Cases involving real estate or property ownership disputes.",
				"Employment Law: Cases related to workplace disputes, such as wrongful termination, discrimination, or harassment claims.",
				"Family Law: Litigation involving divorce, child custody, alimony,and other family-related matters.",
			],
		},
	];

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSendEmail = (content: any) => {
		// Replace this with your email sending logic
		console.log("Sending email with content:", content);

		// useEffect(() => {
		// 	if (isLoading) {
		// 		setLoading(true);
		// 	}

		// 	setTimeout(() => {
		// 		setLoading(false);
		// 	}, 5000);
		// }, [isLoading]);
	};
	return (
		<div className="col-span-5 bg-[#d1cdb0] max-w-[1440px]  h-screen text-black grid content-center justify-items-center">
			<div className="w-full h-screen bg-color_primary-200 gap-10 md:gap-[80px] flex flex-col">
				<div className="flex flex-col items-center ">
					<h1 className=" text-6xl text-white font-semibold text-center mb-2 p-10">
						LITIGATIONS
					</h1>

					<p className="mt-4 text-white text-center  max-w-[70%] text-2xl font-bold mb-[30px]">
						Navigating the complex landscape of legal disputes requires
						strategic expertise and a deep understanding of the law.
					</p>

					<p className="text-white text-center lg:max-w-[70%] font-semibold text-[20px]">
						Our Litigation Center is your trusted resource for comprehensive
						insights and guidance on various litigation matters. Whether you are
						a legal professional or an individual seeking information, our
						dashboard provides a streamlined and informative experience.
					</p>
				</div>

				<div className=" m-auto  text-center flex flex-wrap flex-col md:flex-row gap-16  items-center justify-center">
					{LitigationList.map((litt, index) => (
						<button
							type="button"
							key={index}
							className="bg-color_primary-100 p-10 hover:scale-110 transition bg-[#cfc899] flex flex-col hover:border hover:border-color_secondary-50 ease-in delay-50 md:w-[46%] xl:w-[48%] max-w-[600px]"
							onClick={handleOpenModal}>
							<h1 className=" text-4xl text-white font-semibold text-center mb-2 p-10 w-full">
								{litt.header}
							</h1>

							{litt.body.map((item, index) => (
								<div key={index}>
									<p className="text-lg text-slate-100 text-left">{item}</p>
									<hr className="border-px border-color_secondary-50 p-4 mt-2" />
								</div>
							))}

							{/* <p className="text-[1.5rem] text-slate-100 text-left">
								Landlord-Tenant Disputes: Cases involving disputes between
								landlords and tenants over lease agreements, rent, or property
								conditions.
							</p>
							<hr className="border-px border-color_secondary-50 p-4 mt-2" />
							<p className="text-[1.5rem] text-slate-100 text-left">
								Foreclosure: Litigation related to property foreclosure
								proceedings.
							</p> */}
							{/* <hr className="border-px border-color_secondary-50 p-4 mt-2" /> */}
						</button>
					))}
				</div>

				<hr className="bg-color_secondary-50 mt-10" />

				{/* <Modal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					onSendEmail={handleSendEmail}
				/> */}
			</div>
		</div>
	);
}
