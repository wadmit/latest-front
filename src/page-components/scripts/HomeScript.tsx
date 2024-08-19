import Script from "next/script";

const HomeScript = () => {
  return (
    <Script
      strategy="lazyOnload"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `{
          "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
        {
        "@type": "Question",
        "name": "What are the admission requirements for international students in China?",
        "acceptedAnswer": 
          {
          "@type": "Answer",
          "text": "For students to get admission, there are a few essential things to keep in mind.The following documents are required:\nPassport\nPP-sized Photo\nHigh School Transcript\nHigh School Certificate\nNon-Criminal Report\nMedical Report"
          }
        },
        {
        "@type": "Question",
        "name": "How much does it cost to study in China?",
        "acceptedAnswer": 
          {
          "@type": "Answer",
          "text": "Cost varies according to the subjects and universities. Approximately, the tuition fee is usually less than $3500 per year in Top-Chinese Universities; which in comparison to USA, Australia, UK, is more than 10 times affordable. WiseAdmit can also ensure upto 40% scholarship in one of the partnered universities."
          }
        },
        {
        "@type": "Question",
        "name": "How safe is it for international students in China?",
        "acceptedAnswer": 
          {
          "@type": "Answer",
          "text": "China is well known for being very safe for international students and tourists. To put things into perspective, Global Peace Index 2022 has ranked China 40 places higher than USA."
          }
        },
        {
        "@type": "Question",
        "name": "What is the language of instruction in universities in China?",
        "acceptedAnswer": 
          {
          "@type": "Answer",
          "text": "Students can choose between Chinese-taught as well as English-taught programs in China. You can apply for programs of your choice in English-taught module through our platform."
          }
        }
        ]
          }`,
      }}
    />
  );
};

export default HomeScript;
