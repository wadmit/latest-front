import React from "react";
import Script from "next/script";

const MainLayoutScript = () => {
  return (
    <>
      {/* --------------------------GOOGLE ANALYTICS SCRIPT----------------------- */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`  
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}");
          `}
      </Script>

      {/* --------------------------GOOGLE TAG MANAGER----------------------- */}
      <Script strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','G-KNNC1LDNGC')
        `}
      </Script>

      {/* --------------------------Clarity----------------------- */}
      <Script strategy="lazyOnload">
        {`
        (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
         })(window, document, "clarity", "script", "lqqmvi3w50")`}
      </Script>

      {/* --------------------------AMPLITUDE SCRIPT----------------------- */}
      <Script strategy="lazyOnload" type="text/javascript">
        {`  
          !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-GS6YJWyepBi+TL3uXx5i7xx1UTA9iHaZr9q+5uNsuhzMb8c1SfkKW4Wee/IxZOW5",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-1.0.0-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function v(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)v(o,i[a]);r.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],l=0;l<c.length;l++)v(u,c[l]);r.Revenue=u;var p=["getDeviceId","setDeviceId","regenerateDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue"];function f(e){function t(t,r){e[t]=function(){var n={promise:new Promise((r=>{e._q.push({name:t,args:Array.prototype.slice.call(arguments,0),resolve:r})}))};if(r)return n}}for(var r=0;r<p.length;r++)t(p[r],!1);for(var n=0;n<d.length;n++)t(d[n],!0)}f(r),e.amplitude=r}}(window,document)}();
          amplitude.init("578122414806a6c5416a724f9494e326");
        `}
      </Script>

      {/* --------------------------Organizational Schema------------------------------- */}
      <Script
        strategy="lazyOnload"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WISEADMIT TECHNOLOGY INC.",
          "url": "https://www.wiseadmit.io",
          "logo": "",
          "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+1-604-767-4559",
            "contactType": "customer service",
            "areaServed": "US"
          },{
            "@type": "ContactPoint",
            "telephone": "+86-185-5169-1860",
            "contactType": "customer service",
            "areaServed": "CN"
          },{
            "@type": "ContactPoint",
            "telephone": "+977-9802356756",
            "contactType": "customer service",
            "areaServed": "NP"
          }],
          "sameAs": [
            "https://www.facebook.com/wiseadmit/",
            "https://www.instagram.com/wiseadmit/",
            "https://www.youtube.com/@wiseadmit_",
            "https://www.linkedin.com/company/wise-admit/?originalSubdomain=ca"
          ]
        }`,
        }}
      />

      {/* --------------------------Footer Sitemap------------------------------- */}
      <Script
        src="https://www.mysitemapgenerator.com/api/embedmap.min.js"
        strategy="lazyOnload"
      />
      {/* --------------------------END OF SCRIPT---------------------------- */}
    </>
  );
};

export default MainLayoutScript;
