import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-auto flex w-full items-center justify-center gap-1 border-t bg-background p-6 text-muted-foreground md:justify-start">
      <motion.div variants={itemVariants}></motion.div>
    </motion.div>
  );
}
