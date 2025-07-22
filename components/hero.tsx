import Form from "@/components/form";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import TextBlur from "@/components/ui/text-blur";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";
import { ChangeEvent } from "react";

interface HeroProps {
  name: string;
  email: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function Hero({
  name,
  email,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  loading,
}: HeroProps) {
  return (
    <motion.div
      className="flex w-full max-w-4xl flex-col gap-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 to-accent/20">
            <AnimatedShinyText className="px-6 py-2 font-medium text-primary">
              <span>🔥 App Spark – Coming Soon!</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          text="Build Your App. Learn Just Enough Code. Use AI the Smart Way."
          duration={1.2}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl"
          text="App Spark is a course and toolkit for non-technical founders who want to turn ideas into real, working apps — fast, without spending tens of thousands on developers."
          duration={1.5}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-2xl text-base font-medium text-muted-foreground sm:text-lg"
          text="We'll teach you just enough code and how to use AI to get from idea → MVP → first customers."
          duration={1.8}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 flex justify-center">
        <Form
          name={name}
          email={email}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </motion.div>
    </motion.div>
  );
}
