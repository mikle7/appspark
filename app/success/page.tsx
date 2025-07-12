"use client";

import { EnhancedButton } from "@/components/ui/enhanced-btn";
import Particles from "@/components/ui/particles";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Mail, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-clip px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-2xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {/* Success Icon */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/20">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
            You're All Set! 🎉
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xl text-muted-foreground sm:text-2xl">
            Welcome to the App Spark community! We're excited to help you build
            your dream app.
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            What happens next?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-lg bg-card p-6 text-left">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  We'll be in touch soon
                </h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive updates about App Spark's launch and exclusive
                  early access opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg bg-card p-6 text-left">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Join the community
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other non-technical founders building their apps
                  with AI and code.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg bg-card p-6 text-left">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Beta testing opportunity
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you opted in, we'll reach out about early access and
                  feedback opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg bg-card p-6 text-left">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  Personalized content
                </h3>
                <p className="text-sm text-muted-foreground">
                  Based on your responses, we'll tailor App Spark to your
                  specific needs and goals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Ready to start building?
            </h3>
            <p className="mb-4 text-muted-foreground">
              While you wait for App Spark, here are some resources to get you
              started on your app-building journey.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <EnhancedButton
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                asChild>
                <Link
                  href="https://twitter.com/appspark"
                  target="_blank"
                  rel="noopener noreferrer">
                  Follow us on Twitter
                </Link>
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                asChild>
                <Link href="/" className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Back to Home
                </Link>
              </EnhancedButton>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div variants={itemVariants}>
          <p className="text-sm text-muted-foreground">
            Thank you for joining the App Spark waitlist! We can't wait to help
            you build something amazing. 🚀
          </p>
        </motion.div>
      </motion.div>

      <Particles
        quantityDesktop={200}
        quantityMobile={50}
        ease={80}
        color={"#ff6b35"}
        refresh
      />
    </main>
  );
}
