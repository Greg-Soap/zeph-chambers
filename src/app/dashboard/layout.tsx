// import MobileNav from "@/components/sidebar/MobileNav";
import Sidebar from "./_components/sidebar";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="h-screen bg-[#d1cdb0] flex flex-row overflow-hidden scrollbar">
			<Sidebar />
			<div className="overflow-y-scroll overflow-x-hidden bg-color_primary-200  w-full">
				<div className="p-10 pb-[80px] flex items-center justify-center">
					{" "}
					{children}
				</div>
				{/* <MobileNav role="customer" /> */}
			</div>
		</section>
	);
}
