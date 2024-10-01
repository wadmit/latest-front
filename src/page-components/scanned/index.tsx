'use client'
import React, { useEffect } from 'react'
import API from "@/constants/app"
import { Typography } from '@mui/material';
import { Loader, RootContainer } from '@/page-components/scanned/styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';


const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${API.API_VERSION}`;

const ScannedHome = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

    const uuid = searchParams.get('uuid');
    const source = searchParams.get('source');
    console.log(uuid, source);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL}/web/qr-data/${uuid}`);
            if (response) {
                // console.log(response);

        // Data retrieval successful
        // Process the data here if needed
        router.push(`${source}`);
      } else {
        // Data retrieval failed
        router.push("/");
      }
    } catch (error) {
      // Error occurred while fetching data
      router.push("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <RootContainer>
      <Loader />
      <Typography variant="h6" component="p">
        Wait, we are redirecting...
      </Typography>
    </RootContainer>
  );
};

export default ScannedHome;
