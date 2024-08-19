import { mixpanelSubmit } from "@/api/web/mixpanel.action";
import { signInUser } from "@/api/web/signin.action";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export function useSignIn() {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const country = useAppSelector((state) => state.currency.currentCountry);
	const city = useAppSelector((state) => state.currency.city);

	const signInMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			const res = await signInUser({ email, password });
			if (!res || res.error) {
				throw new Error(res?.error || "Sign-in failed");
			}
			return res;
		},
		onSuccess: (res: any) => {
			const startTime = Date.now();
			const startDate = moment(startTime).format("DD MMMM YYYY HH:mm:ss");
			const leadId = localStorage.getItem("leadId");
			if (res?.data?.leadId) localStorage.setItem("leadId", res.data.leadId);

			const startInfo = localStorage.getItem("startInfo");
			if (!startInfo || leadId !== res?.data?.leadId) {
				localStorage.setItem(
					"startInfo",
					JSON.stringify({
						startDate,
						startTime,
					}),
				);
			}
			if (res?.data?.data?.email) {
				mixpanelSubmit({
					email: res?.data?.data?.email,
					event_title: EAnalyticsEvents.SIGN_IN,
					event_type: EAnalyticsEvents.SIGN_IN,
					status: EAnalyticsStatus.SUCCESS,
					reference: res.data.leadId ? "Lead" : "Student",
					user_id: res.data.leadId ? res.data.leadId : res?.data?.data?.id,
					url_path: window.location.href,
					location: {
						countryName: country,
						city,
					},
					description: "Sign In",
				});
			}
			analytics.login(res.data.data.id, {
				$email: res.data.data.email ?? "",
				$first_name: res.data.data.first_name ?? "",
				$last_name: res.data.data.last_name ?? "",
				phone: res.data.data.phone ?? "",
			});
			analytics.trackEvent(EAnalyticsEvents.SIGN_IN);
			enqueueSnackbar("Login Successful", {
				variant: "success",
				anchorOrigin: {
					vertical: "top",
					horizontal: "right",
				},
			});
			router.push("/dashboard");
		},
		onError: (err: any) => {
			analytics.trackEvent(EAnalyticsEvents.ERROR, {
				source: "Login Form",
				message: err.message,
			});
			enqueueSnackbar("Login Failed", {
				variant: "error",
				anchorOrigin: {
					vertical: "top",
					horizontal: "right",
				},
			});
		},
	});

	return signInMutation;
}
