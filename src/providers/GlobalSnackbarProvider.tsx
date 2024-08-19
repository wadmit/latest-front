"use client";
import { SnackbarCloseButton } from "@/components/common/snackbar-close/SnackBarClose";
import { SnackbarProvider } from "notistack";

const GlobalSnackbarProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<SnackbarProvider
			maxSnack={5}
			action={(snackbarKey) => (
				<SnackbarCloseButton snackbarKey={snackbarKey} />
			)}
		>
			{children}
		</SnackbarProvider>
	);
};

export default GlobalSnackbarProvider;
