"use client";

import { EnhancedButton } from "@/components/ui/enhanced-btn";
import Particles from "@/components/ui/particles";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";
import { Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-clip px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-lg text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {/* 404 Number */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-8xl font-bold text-primary/20 sm:text-9xl">
            404
          </h1>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Page Not Found
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-lg text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
            Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <EnhancedButton
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </EnhancedButton>

          <EnhancedButton
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Join Waitlist
            </Link>
          </EnhancedButton>
        </motion.div>

        {/* Footer Message */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-sm text-muted-foreground">
            Ready to build your app? Join the App Spark waitlist and get
            started! 🚀
          </p>
        </motion.div>
      </motion.div>

      <Particles
        quantityDesktop={150}
        quantityMobile={50}
        ease={80}
        color={"#ff6b35"}
        refresh
      />
    </main>
  );
}
