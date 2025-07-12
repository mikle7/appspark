import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  "Use AI to write and understand code",
  "Learn the fundamentals of web/app development",
  "Build and launch a working MVP you actually own",
  "Save $40k+ you'd spend hiring devs or agencies",
  "Validate your idea and get users fast",
];

export default function Features() {
  return (
    <motion.div
      className="w-full max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
          ✅ You&apos;ll Learn How To:
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4 transition-colors duration-200 hover:border-primary/30">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-base font-medium text-card-foreground sm:text-lg">
              {feature}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
