import mixpanel from "mixpanel-browser";

import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { mixpanelSubmit } from "@/api/web/mixpanel.action";
import { TLocation } from "@/types/analytics";
import { socket } from "@/global-states/store";
import { auth } from "@/auth/auth";
import { getSession } from "next-auth/react";

const KEY_ANALYTICS = process.env.NEXT_PUBLIC_ANALYTICS_KEY as string;

try {
  mixpanel.init(KEY_ANALYTICS, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
} catch (error) {
  console.error("Mixpanel initialization failed:", error);
}

export const analytics = {
  trackPageView: (params: any) => mixpanel.track_pageview(params),

  trackEvent: (eventName: EAnalyticsEvents, params = {}) => {
    mixpanel.track(eventName as string, params);
  },

  timeEvent: (eventName: EAnalyticsEvents) =>
    mixpanel.time_event(eventName as string),

  logout: ({ location }: { location: TLocation }) => {
    let leadId = "";
    let email = "";
    let data = "";
    leadId = localStorage.getItem("leadId") ?? "";
    email = localStorage.getItem("email") ?? "";
    data = localStorage.getItem("startInfo") ?? "";

    if (data) {
      const startInfo = JSON.parse(data);
      const endTime = Date.now();
      const totalTime = (endTime - startInfo.startTime) / 1000; // Convert milliseconds to seconds
      if (leadId && email) {
        socket.emit("websiteUserTime", {
          timeSpend: totalTime,
          userId: leadId,
          reference: "Lead",
          description: `User logged out of the system after ${(
            totalTime / 60
          ).toFixed(2)} minutes of session starting from ${
            startInfo.startDate
          }`,
          location,
          email,
          date: new Date(Date.now()).toISOString(),
        });
        localStorage.removeItem("startInfo");
      }
    }
    mixpanel.reset(); // Reset Mixpanel tracking for the current user
    mixpanel.time_event(EAnalyticsEvents.LOGOUT); // Track logout event
    mixpanel.register({ "User Status": "Anonymous" }); // Set user status as anonymous
  },

  login: (userId: string, userInfo: any) => {
    mixpanel.identify(userId);
    mixpanel.people.set(userInfo);
    mixpanel.time_event(EAnalyticsEvents.SIGN_IN);
    mixpanel.register({ "User Status": "Logged In" });
  },

  enterWebsite: () => {
    analytics.trackEvent(EAnalyticsEvents.ENTER_WEBSITE);
  },

   navigationSelect: async(
    location: TLocation,
    navigationOption: string,
    urlPath: string,
    event_type: EAnalyticsEvents,
    status: EAnalyticsStatus,
    redirectPath: string
  ) => {
    const session = await getSession();
   
    const email = localStorage.getItem("email") ||  session?.user?.email;
    const leadId = localStorage.getItem("leadId") || session?.user?.leadId;
    console.log("email", email,leadId);
    if (email && leadId) {
      mixpanelSubmit({
        email,
        event_title: EAnalyticsEvents.NAVIGATION_SELECT,
        event_type,
        status,
        reference: "Lead",
        url_path: urlPath,
        redirectPath,
        location,
        description: `User navigated to ${navigationOption}`,
      });
    }
    analytics.trackEvent(EAnalyticsEvents.NAVIGATION_SELECT, {
      navigationOption,
      urlPath,
    });
  },

  // User Activity: Website Button Interactions
  websiteButtonInteractions: async({
    buttonName,
    location,
    source,
    urlPath,
    redirectPath,
    event_type,
    status,
    ...rest
  }: {
    buttonName: string;
    location: TLocation;
    source: string;
    urlPath: string;
    redirectPath: string;
    event_type: EAnalyticsEvents;
    status: EAnalyticsStatus;
    [key: string]: any;
  }) => {
    const session = await getSession();
   
    const email = localStorage.getItem("email") ||  session?.user?.email;
    const leadId = localStorage.getItem("leadId") || session?.user?.leadId;
    if (email && leadId) {
      mixpanelSubmit({
        email,
        event_type,
        status,
        event_title: EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
        reference: "Lead",
        user_id: leadId,
        url_path: urlPath,
        redirectPath,
        location,
        description: source,
      });
    }
    analytics.trackEvent(EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS, {
      buttonName,
      source,
      ...rest,
    });
  },

  searchKeyword: ({
    keyword,
    source,
  }: {
    keyword: string;
    source?: string;
  }) => {
    analytics.trackEvent(EAnalyticsEvents.SEARCH_KEYWORD, {
      keyword,
      source,
    });
  },
  wisescoreSubmit: (userId: string, userInfo: any) => {
    mixpanel.identify(userId);
    mixpanel.people.set(userInfo);
    mixpanel.time_event(EAnalyticsEvents.WISESCORE_RESULT);
  },
};
