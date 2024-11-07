"use client";
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

const HomeLayout = () => {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <Link href="/builder" passHref>
        <Button variant="contained" className="bg-resume-800 mb-2">
          BUILD YOUR RESUME
        </Button>
      </Link>
    </motion.div>
  );
};

export default HomeLayout;