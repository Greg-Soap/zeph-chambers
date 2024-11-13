"use client";

import { useAppStore } from "@/store/use-app-store";
import { redirect } from "next/navigation";

export default function DashboardPage() {
	const { user } = useAppStore();
	//   return (
	//     // <>
	//     //   <h1>
	//     //     Welcome {user?.fullName || "User"} with {user?.email}
	//     //   </h1>
	//     // </>

	//   );
	redirect("/dashboard/agreements");
}
