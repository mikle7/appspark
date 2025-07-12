"use client";

import Features from "@/components/features";
import Footer from "@/components/footer";
import Form from "@/components/form";
import Hero from "@/components/hero";
import Questionnaire from "@/components/questionnaire";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import Particles from "@/components/ui/particles";
import { QuestionnaireData } from "@/types/questionnaire";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState<boolean>(false);
  const [questionnaireData, setQuestionnaireData] =
    useState<QuestionnaireData | null>(null);
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInitialSubmit = async () => {
    if (!name || !email) {
      toast.error("Please fill in all fields 😠");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address 😠");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // If email sending is successful, proceed to insert into Notion
        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (!notionResponse.ok) {
          if (notionResponse.status === 429) {
            reject("Rate limited");
          } else {
            reject("Notion insertion failed");
          }
        } else {
          resolve({ name });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Getting you on the waitlist... 🚀",
      success: (data) => {
        setShowQuestionnaire(true);
        return "Great! Now let's learn more about you 🎉";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "You're doing that too much. Please try again later";
        } else if (error === "Notion insertion failed") {
          return "Failed to save your details. Please try again 😢.";
        }
        return "An error occurred. Please try again 😢.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
    setQuestionnaireData(data);

    // Save questionnaire data to Notion with loading state
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            questionnaire: data,
            isUpdate: true,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          resolve(result);
        } else {
          reject(result.error || "Failed to save questionnaire");
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Saving your responses... 💾",
      success: () => {
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push("/success");
        }, 1500);
        return "Thank you! We'll be in touch soon 🚀";
      },
      error: (error) => {
        console.error("Error saving questionnaire:", error);
        return "Oops! Something went wrong. Please try again 😢";
      },
    });
  };

  if (showQuestionnaire) {
    return (
      <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
        <section className="flex w-full max-w-4xl flex-col items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Tell us what you&apos;re building and where you&apos;re at
            </h2>
            <p className="text-lg text-muted-foreground">
              We&apos;ll tailor App Spark to you.
            </p>
          </motion.div>

          <Questionnaire onComplete={handleQuestionnaireComplete} />
        </section>

        <Footer />

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

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <section className="flex flex-col items-center space-y-16 px-4 sm:px-6 lg:px-8">
        <Hero />

        <Features />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            🚀 Get Early Access — Join the Waitlist
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            Be the first to know when App Spark launches. Get exclusive early
            access and special pricing.
          </p>
        </motion.div>

        <Form
          name={name}
          email={email}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleInitialSubmit}
          loading={loading}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center">
          <EnhancedButton
            variant="outline"
            onClick={() => setShowQuestionnaire(true)}
            className="border-primary text-primary hover:bg-primary/10">
            <Sparkles className="mr-2 h-4 w-4" />
            Skip to Questions
          </EnhancedButton>
        </motion.div>
      </section>

      <Footer />

      <Particles
        quantityDesktop={300}
        quantityMobile={80}
        ease={80}
        color={"#ff6b35"}
        refresh
      />
    </main>
  );
}
