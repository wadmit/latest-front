"use client";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import React, {
	ChangeEvent,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { useQuery } from "@tanstack/react-query";
import { getDisciplines, getSubDisciplines } from "@/api/web/wisescore.action";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import {
	Box,
	debounce,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import { SearchIcon } from "../../svgs";
import CheckboxInput from "../../components/CheckboxInput";
import { StyledBox } from "../../utils/provider";
import GoBackButton from "../GoBackButton";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { CacheConfigKey } from "@/constants";
import { setSubjectsNeeded } from "@/global-states/reducers/wisescore";

function SubDisciplinesSelect({
	handleNext,
	value,
	handleGoBack,
}: IScreenProps) {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [filteredSubDisciplines, setFilteredSubDisciplines] = React.useState<
		any[]
	>([]);
	const { primaryColor, secondaryColor, variant } = useContext(
		WiseScoreDetailsContext,
	);
	const { setFieldValue, values } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const {
		data: subDisciplines,
		isLoading: subDisciplinesLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: [CacheConfigKey.SUBDISCIPLINES_QUERY_KEY, values.discipline],
		queryFn: () => getSubDisciplines(values.discipline, variant),
		enabled: values.discipline !== "",
	});
	const dispatch = useAppDispatch();

	const {
		data: subjects,
		isLoading,
		isSuccess,
		status,
	} = useQuery({
		queryKey: [CacheConfigKey.DISCIPLINES_QUERY_KEY, values.discipline],
		queryFn: () => getDisciplines(values.discipline),
		enabled: values.discipline !== "",
	});

	useMemo(() => {
		if (isSuccess && subjects) {
			if (subjects.eligibilitySubjects?.length > 0) {
				dispatch(
					setSubjectsNeeded(
						subjects.eligibilitySubjects?.map((sub: any) => sub.toLowerCase()),
					),
				);
			} else {
				dispatch(
					setSubjectsNeeded([
						"work_experience",
						"conference_presentation",
						"journal_publication",
						"awards",
					]),
				);
			}
		}
	}, [subjects]);

	useEffect(() => {
		if (subDisciplines) {
			setFilteredSubDisciplines(subDisciplines);
		}
	}, [subDisciplines]);

	const ref = useRef<HTMLDivElement>(null);
	if (subDisciplinesLoading) {
		return (
			<Stack mt={30} alignItems="center">
				<Loader />
			</Stack>
		);
	}
	// add id to checkbox
	const handleOnChange = (id: string) => {
		// see if it is in the array if it is remove it else add it even if subdiscipine tpye is never
		// cinvert subdiscipline type to array of string
		// check if id is present in the array if it is remove it else add it

		const isPresent = (values.sub_disciplines as string[]).includes(id);
		if (isPresent) {
			setFieldValue(
				"sub_disciplines",
				values.sub_disciplines.filter((item) => item !== id),
			);
			return;
		}
		setFieldValue("sub_disciplines", [...values.sub_disciplines, id]);

	};

	const debouncedFilterSearchTerm = debounce((search) => {
		if (search === "") setFilteredSubDisciplines(subDisciplines);
		if (subDisciplines) {
			const filter = subDisciplines.filter((subDiscipline: any) =>
				subDiscipline.name.toLowerCase().includes(search.toLowerCase()),
			);
			setFilteredSubDisciplines(filter);
		}
	}, 300);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		debouncedFilterSearchTerm(e.target.value);
	};

	return (
		<Box ref={ref}>
			<Box
				display="flex"
				mt="48px"
				padding={{
					lg: "0px 60px",
					md: "0px 60px",
					sm: "0 16px",
					xs: "0 16px 0px 16px",
				}}
				justifyContent="center"
				width="100%"
			>
				<TextField
					onChange={handleSearchChange}
					placeholder="Search Sub-disciplines"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end">
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{
						width: { sm: "100%", xs: "100%", md: "auto", lg: "auto" },

						"& .MuiInputBase-root": {
							width: { lg: "445px", md: "445px", sm: "100%", xs: "100%" },
							height: "48px",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							borderRadius: "8px !important",
							borderColor: "rgba(173, 173, 173, 1) !important",
						},
					}}
				/>
				{/* <TextField
                    placeholder='Search Sub-disciplines'

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton

                                    edge="end"
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: { sm: '100%', xs: '100%', md: 'auto', lg: 'auto' },
                        '& .MuiInputBase-root': {

                            width: { lg: '445px', md: '445px', sm: '100%', xs: '100%' },
                            height: '48px',
                            '& input': {
                                fontSize: '14px',
                                color: 'rgba(173, 173, 173, 1)',
                                borderRadius: '8px !important',
                            }
                        }
                    }}
                /> */}
			</Box>
			{/* <StyledBox
                gap={{ lg: '25px', md: '25px', sm: '32px', xs: '32px' }}
                alignItems="center"
                justifyContent="center"
                height={{ lg: '220px', md: '220px', sm: '100%', xs: '100%' }}
                overflow="auto"
                // bgcolor={"blue"}
                mt={{ lg: '64px', md: '64px', sm: '46px', xs: '32px' }}
                display="flex"
                flexWrap="wrap"
                padding={{
                    lg: '0px 60px',
                    md: '0px 60px',
                    sm: '0 16px',
                    xs: '0 16px 50px 16px',
                }}
                flexDirection={{ xs: 'column', sm: 'column', lg: 'row', md: 'row' }}
            >
                {filteredSubDisciplines &&
                    filteredSubDisciplines.length > 0 &&
                    filteredSubDisciplines.map((subDiscipline: any) => (
                        <CheckboxInput
                            id={subDiscipline.id}
                            key={subDiscipline.id}
                            name={subDiscipline.name}
                            isChecked={(values.sub_disciplines as string[]).includes(
                                subDiscipline.id
                            )}
                            onClick={() => handleOnChange(subDiscipline.id)}
                            checkBoxLabel={subDiscipline.name}
                        />
                    ))}
            </StyledBox> */}

			<StyledBox
				gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
				alignItems="center"
				justifyContent="center"
				height={{ lg: "220px", md: "220px", sm: "100%", xs: "100%" }}
				overflow="auto"
				mt={{ lg: "64px", md: "64px", sm: "46px", xs: "32px" }}
				display="flex"
				flexWrap="wrap"
				padding={{
					lg: "0px 60px",
					md: "0px 60px",
					sm: "0 16px",
					xs: "0 16px 50px 16px",
				}}
				flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
			>
				{filteredSubDisciplines.length === 0 ? (
					<Box textAlign="center" width="100%" py={2}>
						<Typography
							component={"p"}
							fontFamily="HankenGroteskSemiBold"
							fontWeight={600}
							fontSize="16px"
						>
							{" "}
							No SubDiscipline Found
						</Typography>
					</Box>
				) : (
					filteredSubDisciplines.map((subDiscipline: any) => (
						<CheckboxInput
							id={subDiscipline.id}
							key={subDiscipline.id}
							name={subDiscipline.name}
							isChecked={(values.sub_disciplines as string[]).includes(
								subDiscipline.id,
							)}
							onClick={() => handleOnChange(subDiscipline.id)}
							checkBoxLabel={subDiscipline.name}
						/>
					))
				)}
			</StyledBox>

			<Box
				display={{
					lg: "flex",
					md: "flex",
					sm: "flex",
					xs: "none",
				}}
				justifyContent="center"
				width="100%"
				padding="0 16px"
				gap={4}
				mt={{ lg: "8px", md: "8px", sm: "8px", xs: "8px" }}
			>
				<GoBackButton handleGoBack={handleGoBack} />
				<Box
					disabled={values.sub_disciplines.length === 0}
					// onClick={onClick}
					onClick={() => {
						analytics.trackEvent(
							EAnalyticsEvents.WISESCORE_SUBDISCIPLINE_SELECTION,
							{
								subDisciplines: values.sub_disciplines,
							},
						);
						handleNext();
					}}
					borderRadius="8px"
					bgcolor={primaryColor}
					padding="16px 42px"
					border="none"
					sx={{
						cursor: "pointer",
						"&:disabled": {
							bgcolor: secondaryColor,
							color: "#fff",
						},
					}}
					color="#fff"
					fontFamily="HankenGroteskSemiBold"
					minWidth="161px"
					width={{
						lg: "fit-content",
						md: "fit-content",
						sm: "100%",
						xs: "100%",
					}}
					mt={{ lg: "60px", md: "60px", sm: "30px", xs: "30px" }}
					component="button"
				>
					Next
				</Box>
			</Box>
		</Box>
	);
}

export default SubDisciplinesSelect;
