"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const MotionFade = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
      key={pathname}
    >
      {children}
    </motion.div>
  );
};

export default MotionFade;
