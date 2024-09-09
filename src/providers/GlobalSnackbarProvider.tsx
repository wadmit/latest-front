"use client";
import { SnackbarCloseButton } from "@/components/common/snackbar-close/SnackBarClose";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

const GlobalSnackbarProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Box>
			<SnackbarProvider
			maxSnack={5}
			action={(snackbarKey) => (
				<SnackbarCloseButton snackbarKey={snackbarKey} />
			)}
			style={{
				zIndex: 10000
			}}
		>
			{children}
		</SnackbarProvider>
		</Box>
	);
};

export default GlobalSnackbarProvider;
