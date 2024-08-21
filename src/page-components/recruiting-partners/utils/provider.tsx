import type {
  ICardtype,
  IWhyChooseType,
} from "@/page-components/recruiting-partners/utils/types";
import Img1 from "$/images/partners/recruiting-partners-stories1.webp";
import Img2 from "$/images/partners/recruiting-partners-stories2.webp";
import Img3 from "$/images/partners/recruiting-partners-stories3.webp";
export const attractmorestudents: IWhyChooseType[] = [
  {
    title: (
      <>
        WiseScore® instantly matches your prospects with the best-fit programs
        from over 100 universities in our network.
      </>
    ),
  },
  {
    title: (
      <>WiseScore® provides your prospects with qualifying scholarships.</>
    ),
  },
  { title: "Complete the application lifecycle in just 7 days." },
];

export const servewithbetterefficiency: IWhyChooseType[] = [
  { title: "View all your leads in one integrated Wise Admit Platform." },
  { title: "Use one application form to apply to multiple universities." },
  { title: "Quick and easy communication with students and universities." },
];

export const maximizeyourreach: IWhyChooseType[] = [
  {
    title: "Highest commission in the industry - Guaranteed.",
  },
  {
    title: "Transparent and fast fund settlement.",
  },
  {
    title: "Generate individual invoices for each recruitment.",
  },
];

// styles

export const styles = {
  height: "100%",
  position: "relative",
  zIndex: 10,
  width: "100%",
  backgroundColor: "rgba(36, 16, 7, 1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  padding: "80px 0px 91px 0px",
};

// partner data

export const PartnerData: Array<ICardtype> = [
  {
    title: "Sign up",
    color: "primary.50",
    desc: "Fill up an application form and enter all the necessary details about your company (we keep your info secret!)",
  },
  {
    title: "Get reviewed",
    desc: "Our system will review your application and check if everything is in order",
    color: "secondary.50",
  },
  {
    title: "Start earning",
    desc: "Once approved, you can immediately start recruiting students and start earning commissions",
    color: "success.50",
  },
];

// success stories
export const SuccessStoriesData = [
  {
    name: "Ngongo Alima Jeanne, Congo",
    position: "Founder",
    partner: "NAJ Competitions",
    desc: "NAJ and WiseAdmit’s Partnership has been a strong force that has greatly benefited students from D.R. Congo.",
    img: Img1,
  },
  {
    name: "Oluwaseun Makinde Alo, Nigeria",
    position: "COO",
    partner: "Boss Academy",
    desc: "With WiseAdmit, we are able to provide students from our country with an affordable chance for higher education.",
    img: Img2,
  },
  {
    name: "Sid, Nepal",
    position: "Marketer",
    partner: " Excel Education ",
    desc: "We are excited about the opportunity giving access to the top universities not only form China but also North America and Europe.",
    img: Img3,
  },
];
