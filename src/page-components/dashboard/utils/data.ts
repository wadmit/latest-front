import { Step } from "./type";

export const alertTexts = {
    applicationStartedButNoWiseScore:
      'We see that you have started an application but have not checked the WiseScore®. Please check your WiseScore® to check your eligibility to apply for the Program you have selected',
    programNotMatchWithWiseScore:
      'Sorry! According to yours detail or WiseScore® ,The Program that you had shortlisted previously is not a match for you.',
    programMatchWithWiseScore:
      'Hurray! It seems like you are eligible to start applying for this program please scroll down and start the application',
    inCompleteProfile:
      'It seems like your profile is incomplete. Applications are not going to be processed until the profile has been completed.',
  };

  

export const OnBoardingImage = [
    {
        label: 'Dashboard',
        imgPath: "/images/onboarding/first.webp",
        desc: "Get started by checking your WiseScore. Know your eligibility for admission and scholarship for university or program of your choice in just 3 minutes."
    },
    {
        label: 'Dashboard',
        imgPath: "/images/onboarding/second.webp",
        desc: "Now that you have checked your WiseScore, shortlist your favorite program and start application. It's all about making things happen on your terms."
    },
    //Remove this comment if you want to add consent on onboarding component
    // {
    //     label: 'Do you agree to get Whatsapp Messages from WiseAdmit ?',
    //     desc: "GNow that you have checked your WiseScore, shortlist your favorite program and start application. It's all about making things happen on your terms."
    // },
    {
        label: 'View or edit your profile',
        imgPath: '/images/onboarding/third.webp',
        desc: "You can edit personal information, address, guardian details. You can also change your profile photo and complete your profile from here."
    },
    {
        label: 'Shortlisted universities & programs',
        imgPath: '/images/onboarding/sixth.webp',
        desc: "You can edit personal information, address, guardian details. You can also change your profile photo and complete your profile from here."
    },
    {
        label: 'Check your applications',
        imgPath: '/images/onboarding/fifth.webp',
        desc: "Find all your shortlisted application and progress in one spot. Make sure you have uploaded all required documents. Stay tuned for further updates from university"
    },
    {
        label: 'Submit your documents.',
        imgPath: '/images/onboarding/fourth.webp',
        desc: "You can upload multiple documents at once if you have extra files or  more pages for the next steps. After you submit them to the university,  you can see them all in one place. Simple!"
    },


    // {
    //     label: 'If you have any questions, please contact us.',
    //     imgPath: Step6,
    // },
];

export const  HorizontalStepperSteps = [
    { id: 1, name: 'Check WiseScore' },
    { id: 2, name: 'Select Programs' },
    { id: 3, name: 'Complete Profile Details' },
];

export const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July ',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const activeSteps: Step[] = [
    {
        number: 0,
        name: 'Step 1',
        title: 'Check WiseScore®',
        desc: 'Hello Freshie! Get familiar with our Portal and Explore the Universities and Courses that interests you.',
        todos: ['Start your journey by Onboarding with us- Tell us more about yourself by checking WiseScore®.'],
    },
    {
        number: 1,
        name: 'Step 1',
        title: 'Check WiseScore®',
        desc: 'Hello Freshie! Get familiar with our Portal and Explore the Universities and Courses that interests you.',
        todos: ['You’ve already checked your WiseScore® but you can always recheck.'],
    },
    {
        number: 2,
        name: 'Step 2',
        title: 'Select Programs',
        desc: 'Check your eligibility and criteria for the courses, countries, and universities you want! Our team is always available to guide you in deciding and finding the perfect match.',
        todos: ['Shortlist your program that fits for you.'],
    },
    {
        number: 3,
        name: 'Step 2',
        title: 'Select Programs',
        desc: 'Check your eligibility and criteria for the courses, countries, and universities you want! Our team is always available to guide you in deciding and finding the perfect match.',
        todos: ['You can shortlist more program that fits for you.'],
    },
    {
        number: 4,
        name: 'Step 3',
        title: 'Complete Profile details',
        desc: 'Please fill out all the details your university requires before sending an application.',
        todos: ['Complete your profile details.', 'Fill out all the necessary information that is required for further processing.'],
    },
    {
        number: 5,
        name: 'Step 3',
        title: 'Complete Profile details',
        desc: 'Please fill out all the details your university requires before sending an application.',
        todos: ['Complete your profile details.', 'Fill out all the necessary information that is required for further processing.'],
    },
];