import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { useOnClickOutside } from "./use-click-outside";

const Nav = styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  z-index: 10000;
`;

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: rgb(255, 255, 255);

  background: linear-gradient(
    162deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8813900560224089) 48%,
    rgba(255, 255, 255, 0) 77%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 400px;
  border-radius: 0px 0px 50px 0px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const sidebar = {
  open: (height = 500) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 40px 40px)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

type Item = {
  title: string;
  link: string;
};

export const SideNav: React.FC<{ items: Item[] }> = ({ items }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, () => {
    if (isOpen) {
      toggleOpen(); // close the nav when clicked outside
    }
  });

  return (
    <Nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={{ height: "200px" }}
      ref={containerRef}
    >
      <Background variants={sidebar} />
      <Navigation items={items} />
      <MenuToggle toggle={toggleOpen} />
    </Nav>
  );
};
