"use client";
import React, { useState } from "react";
// import { ChevronLeft, ChevronRight, Home, Book, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FaRegHandshake } from "react-icons/fa";
import { GiHumanTarget } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { MdOutlineRealEstateAgent } from "react-icons/md";
4;
// import { FaHamburger } from "react-icons/fa";
import { HambergerMenu, Text } from "iconsax-react";

const Sidebar = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const router = useRouter();
	const currentPath = usePathname();

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded);
	};

	const sideNavItems = [
		{
			title: "Agreements",
			icon: FaRegHandshake,
			link: "/dashboard/agreements",
		},
		{
			title: "Litigations",
			icon: HiCubeTransparent,
			link: "/dashboard/litigations",
		},
		{
			title: "Incorporation",
			icon: GiHumanTarget,
			link: "/dashboard/incorporation",
		},
		{
			title: "Property",
			icon: MdOutlineRealEstateAgent,
			link: "/dashboard/property",
		},
	];

	const isActive = sideNavItems.some((item) =>
		currentPath.includes(item.title.toLowerCase())
	);

	return (
		<div
			className={` h-screen     transition-all duration-300 bg-[#b5ac72]   py-4  border-r-2 border-slate-200 flex flex-col gap-12   drop-shadow-lg ${
				isExpanded ? "w-64" : "w-16"
			}`}>
			<div
				className={`w-full flex justify-between ${
					isExpanded === true ? "px-1" : ""
				} `}>
				<img
					className={`w-14 h-14  ${isExpanded === true ? "" : "hidden"}`}
					src="/assets/logo.svg"
					alt="zeph-logo"
				/>
				<button
					type="button"
					onClick={toggleSidebar}
					className={`w-fit  p-3  rounded-full `}>
					<HambergerMenu color="#ffffff" size={24} />
				</button>
			</div>

			<nav className="flex flex-col gap-10 text-white">
				{/* <ul className="space-y-4">
					<li>
						<a
							href="#"
							className="flex items-center space-x-4 text-gray-300 hover:text-white">
							<Home size={20} />
							{isExpanded && <span>Home</span>}
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center space-x-4 text-gray-300 hover:text-white">
							<Book size={20} />
							{isExpanded && <span>Library</span>}
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center space-x-4 text-gray-300 hover:text-white">
							<Settings size={20} />
							{isExpanded && <span>Settings</span>}
						</a>
					</li>
				</ul> */}
				{sideNavItems.map((item) => (
					<button
						type="button"
						onClick={() => router.push(item.link)}
						className={`flex gap-4 h-11 hover:border-[1px] hover:shadow-lg hover:scale-105 p-3 cursor-pointer hover:border-primary   rounded-r-[10px] ${
							currentPath.includes(item.link.toLowerCase())
								? "text-[#fde047]"
								: "#ffffff"
						}`}
						key={item.title}>
						<item.icon
							size="24"
							color={
								currentPath.includes(item.title.toLowerCase()) ||
								(!isActive && item.title === "Home")
									? "#fde047"
									: ""
							}
						/>
						<h3 className="">{isExpanded && item.title}</h3>
					</button>
				))}
			</nav>
		</div>
	);
};

export default Sidebar;
