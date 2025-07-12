"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface InsightsData {
  totalSignups: number;
  completedQuestionnaires: number;
  signupsByDate: Record<string, number>;
  interests: Record<string, number>;
  previousExperience: Record<string, number>;
  skillLevel: Record<string, number>;
  primaryGoal: Record<string, number>;
  betaTest: Record<string, number>;
}

const COLORS = [
  "#ff6b35",
  "#f7931e",
  "#ffd23f",
  "#06d6a0",
  "#118ab2",
  "#073b4c",
  "#8b5cf6",
  "#ec4899",
];

export default function InsightsPage() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/insights");
        if (!response.ok) {
          throw new Error("Failed to fetch insights data");
        }
        const insights = await response.json();
        setData(insights);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Transform data for charts
  const signupTimelineData = Object.entries(data.signupsByDate)
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      signups: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const interestsData = Object.entries(data.interests).map(([name, value]) => ({
    name: name.length > 30 ? name.substring(0, 30) + "..." : name,
    value,
    fullName: name,
  }));

  const experienceData = Object.entries(data.previousExperience).map(
    ([name, value]) => ({
      name: name.length > 25 ? name.substring(0, 25) + "..." : name,
      value,
      fullName: name,
    }),
  );

  const skillLevelData = Object.entries(data.skillLevel).map(
    ([name, value]) => ({
      name: name.length > 20 ? name.substring(0, 20) + "..." : name,
      value,
      fullName: name,
    }),
  );

  const primaryGoalData = Object.entries(data.primaryGoal).map(
    ([name, value]) => ({
      name: name.length > 25 ? name.substring(0, 25) + "..." : name,
      value,
      fullName: name,
    }),
  );

  const betaTestData = Object.entries(data.betaTest).map(([name, value]) => ({
    name,
    value,
  }));

  const completionRate =
    data.totalSignups > 0
      ? (data.completedQuestionnaires / data.totalSignups) * 100
      : 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            App Spark Insights
          </h1>
          <p className="text-muted-foreground">
            Local analytics dashboard for waitlist and questionnaire data
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Signups
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalSignups}</div>
                <p className="text-xs text-muted-foreground">
                  People on the waitlist
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Questionnaires
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.completedQuestionnaires}
                </div>
                <p className="text-xs text-muted-foreground">
                  {completionRate.toFixed(1)}% completion rate
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Beta Testers
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.betaTest[
                    "Yes - I'd be open to a quick call or early test"
                  ] || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Interested in beta testing
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Top Interest
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(...Object.values(data.interests))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Object.entries(data.interests)
                    .reduce((a, b) => (a[1] > b[1] ? a : b))[0]
                    ?.substring(0, 20)}
                  ...
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Signup Timeline */}
          {signupTimelineData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Signup Timeline</CardTitle>
                  <CardDescription>Daily signups over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      signups: {
                        label: "Signups",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={signupTimelineData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="signups"
                          stroke="#ff6b35"
                          fill="#ff6b35"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>Top Interests</CardTitle>
                <CardDescription>
                  What users are most interested in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interestsData} layout="horizontal">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value, name, props) => [
                          value,
                          props.payload.fullName,
                        ]}
                      />
                      <Bar dataKey="value" fill="#ff6b35" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Previous Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}>
            <Card>
              <CardHeader>
                <CardTitle>Previous Experience</CardTitle>
                <CardDescription>
                  Users&apos; app building background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={experienceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value">
                        {experienceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value, name, props) => [
                          value,
                          props.payload.fullName,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}>
            <Card>
              <CardHeader>
                <CardTitle>Skill Level Distribution</CardTitle>
                <CardDescription>
                  Technical skill levels of users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillLevelData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value, name, props) => [
                          value,
                          props.payload.fullName,
                        ]}
                      />
                      <Bar dataKey="value" fill="#06d6a0" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Primary Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Primary Goals</CardTitle>
                <CardDescription>What users want to achieve</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={primaryGoalData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value, name, props) => [
                          value,
                          props.payload.fullName,
                        ]}
                      />
                      <Bar dataKey="value" fill="#118ab2" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
