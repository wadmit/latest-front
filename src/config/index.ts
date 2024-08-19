// export * from './config';

const applicationConfig = {
  frontendUrlConfig: process.env.NEXT_PUBLIC_FRONTEND_URL!,
  distributionKey: process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY!,
};

Object.freeze(applicationConfig);

export default applicationConfig;
