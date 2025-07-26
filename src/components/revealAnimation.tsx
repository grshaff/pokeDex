import React, { useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  width?: string;
}

export const Reveal = ({ children, width = "fit-content" }: Props) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <Box
      ref={ref}
      sx={{
        width,
        overflow: "hidden", 
        display: "inline-block", 
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          display: "block", // no extra box/flex
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
};
