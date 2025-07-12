import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { Input } from "@/components/ui/input";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";
import { ChangeEvent } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface FormProps {
  name: string;
  email: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function Form({
  name,
  email,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  loading,
}: FormProps) {
  return (
    <motion.div
      className="mt-6 flex w-full max-w-[24rem] flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className="h-12 text-base"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={handleEmailChange}
          className="h-12 text-base"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRightLong}
          onClick={handleSubmit}
          iconPlacement="right"
          className="mt-2 h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
          disabled={loading}>
          {loading ? "Joining..." : "Join the Waitlist"}
        </EnhancedButton>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="mt-2 text-center text-sm text-muted-foreground">
        <p>We'll never spam you. Unsubscribe anytime.</p>
      </motion.div>
    </motion.div>
  );
}
