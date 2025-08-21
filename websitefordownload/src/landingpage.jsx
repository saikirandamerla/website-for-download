import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../src/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

const techOptions = [
  { id: 1, name: "React.js", icon: <FaReact size={28} className="text-blue-500" /> },
  { id: 2, name: "Node.js", icon: <FaNodeJs size={28} className="text-green-500" /> },
  { id: 3, name: "Databases", icon: <FaDatabase size={28} className="text-yellow-500" /> },
];

export default function HeroSection() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-50">
      {/* LEFT SIDE - Animated Selection */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        {techOptions.map((tech) => (
          <motion.div
            key={tech.id}
            onClick={() => setSelected(tech.id)}
            className="relative p-4 rounded-lg cursor-pointer flex items-center gap-3 bg-white shadow hover:shadow-lg transition"
            animate={{
              scale: selected === tech.id ? 1.05 : 1,
              backgroundColor: selected === tech.id ? "rgb(219, 234, 254)" : "white",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {tech.icon}
            <span className="font-medium text-lg">{tech.name}</span>

            {selected === tech.id && (
              <motion.div
                layoutId="highlight"
                className="absolute inset-0 rounded-lg border-2 border-blue-400"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* RIGHT SIDE - Accordion */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-12">
        <Accordion>
  <AccordionItem>
    <AccordionTrigger>Accordion Item 1</AccordionTrigger>
    <AccordionPanel>Accordion Panel 1</AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>Accordion Item 2</AccordionTrigger>
    <AccordionPanel>Accordion Panel 2</AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>Accordion Item 3</AccordionTrigger>
    <AccordionPanel>Accordion Panel 3</AccordionPanel>
  </AccordionItem>
</Accordion>
        <Button className="mt-6">Get Started</Button>
      </div>
    </section>
  );
}
