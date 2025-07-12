"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionnaireData } from "@/types/questionnaire";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const questions = [
  {
    id: "interests",
    title: "🧭 What interests you most about App Spark?",
    subtitle: "Select all that apply",
    type: "multiple",
    options: [
      "Learning how to build a real app from scratch",
      "Using AI (like ChatGPT and Copilot) to help me code",
      "Understanding just enough code to be dangerous",
      "Avoiding $30k–50k+ in development costs",
      "Building an MVP to test or launch my startup",
      "Gaining tech confidence as a non-technical founder",
      "Everything — I want to go all in",
    ],
  },
  {
    id: "previousExperience",
    title: "🛠️ Have you tried building an app before?",
    type: "single",
    options: [
      "Yes - I paid a developer or agency",
      "Yes - I tried a no-code tool like Bubble or Glide",
      "I attempted to code but didn't get far",
      "No - this is my first attempt",
    ],
  },
  {
    id: "skillLevel",
    title: "🔤 What's your current technical skill level?",
    type: "single",
    options: [
      "Total beginner — I've never coded",
      "I've tried some tutorials or used tools like Notion and Zapier",
      "I know the basics but can't build alone",
      "I'm comfortable editing code but not building from scratch",
    ],
  },
  {
    id: "appType",
    title: "💡 What type of app are you hoping to build?",
    subtitle: "Optional - tell us about your idea",
    type: "text",
  },
  {
    id: "primaryGoal",
    title: "🎯 What's your primary goal right now?",
    type: "single",
    options: [
      "Launch a side project or startup",
      "Learn to build apps so I can work faster",
      "Build a tool to solve a personal or business problem",
      "Prove out a startup idea",
      "Change careers or level up professionally",
    ],
  },
  {
    id: "biggestChallenge",
    title: "🔥 What's the biggest thing holding you back?",
    subtitle:
      "e.g., 'I don't know where to start' or 'I don't understand how to connect everything'",
    type: "text",
  },
  {
    id: "betaTest",
    title: "🧪 Want to beta test or chat with us?",
    type: "single",
    options: [
      "Yes - I'd be open to a quick call or early test",
      "Not right now",
    ],
  },
];

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({
    interests: [],
  });

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleMultipleChoice = (value: string) => {
    const currentInterests = answers.interests || [];
    const newInterests = currentInterests.includes(value)
      ? currentInterests.filter((item) => item !== value)
      : [...currentInterests, value];

    setAnswers((prev) => ({ ...prev, interests: newInterests }));
  };

  const handleSingleChoice = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleTextInput = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const canProceed = () => {
    const currentAnswer =
      answers[currentQuestion.id as keyof QuestionnaireData];
    if (currentQuestion.type === "multiple") {
      return (answers.interests || []).length > 0;
    }
    if (currentQuestion.type === "text") {
      return true; // Text inputs are optional
    }
    return currentAnswer !== undefined && currentAnswer !== "";
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(answers as QuestionnaireData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <motion.div
            className="h-2 rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              {currentQuestion.title}
            </h3>
            {currentQuestion.subtitle && (
              <p className="text-muted-foreground">
                {currentQuestion.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {currentQuestion.type === "multiple" && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMultipleChoice(option)}
                    className={`w-full rounded-lg border p-4 text-left transition-all duration-200 ${
                      (answers.interests || []).includes(option)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "single" && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSingleChoice(option)}
                    className={`w-full rounded-lg border p-4 text-left transition-all duration-200 ${
                      answers[currentQuestion.id as keyof QuestionnaireData] ===
                      option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "text" && (
              <Input
                placeholder="Tell us about your idea..."
                value={
                  (answers[
                    currentQuestion.id as keyof QuestionnaireData
                  ] as string) || ""
                }
                onChange={(e) => handleTextInput(e.target.value)}
                className="w-full"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2">
          {isLastStep ? "Complete" : "Next"}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
