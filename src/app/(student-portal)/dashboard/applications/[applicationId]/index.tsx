"use client";
import { getSingleApplication } from "@/api/web/application.action";
import Loader from "@/components/common/circular-loader/Loader";
import { CacheConfigKey } from "@/constants";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { setSingleApplication } from "@/global-states/reducers/applicationReducer";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { analytics } from "@/services/analytics.service";
import {
  EAnalyticsEvents,
  EAnalyticsFieldName,
} from "@/types/mix-panel-analytic";
import dynamic from "next/dynamic";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const ApplicationDetailPageComponent = dynamic<any>(
  () =>
    import(
      "@/page-components/dashboard/applications/components/ApplicationDetailPageComponent"
    )
);

const index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const applicationId = params.applicationId;
  const dispatch = useAppDispatch();

  const { isError } = useCustomQuery({
    queryKey: [CacheConfigKey.APPLICATION_GET_QUERY_KEY,applicationId],
    queryFn: () => getSingleApplication(applicationId as string),
    onSuccess: (res) => {
      dispatch(setSingleApplication(res));
      setIsLoading(false);
    },
    onError: (err) => {
      setIsLoading(false);
    },
    enabled: !!applicationId,
    
  });
  const queryApplications = searchParams.get("applications");
  useEffect(() => {
    if (queryApplications) {
      analytics.trackEvent(EAnalyticsEvents.PAY_APPLICATION_FEE, {
        [EAnalyticsFieldName.APPLICATION_ID]: applicationId,
        [EAnalyticsFieldName.STATUS]: true,
      });
      // router.replace(`/dashboard/applications/${applicationId}`);
    }
  }, [router]);

  return (
    <Suspense fallback={<Loader center />}>
      <ApplicationDetailPageComponent isLoading={isLoading} isError={isError} />
    </Suspense>
  );
};

export default index;
