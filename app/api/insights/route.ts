import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });

    // Fetch all records from the database
    const database = await notion.databases.query({
      database_id: `${process.env.NOTION_DB}`,
    });

    // Process the data for insights
    const insights = {
      totalSignups: database.results.length,
      completedQuestionnaires: 0,
      signupsByDate: {} as Record<string, number>,
      interests: {} as Record<string, number>,
      previousExperience: {} as Record<string, number>,
      skillLevel: {} as Record<string, number>,
      primaryGoal: {} as Record<string, number>,
      betaTest: {} as Record<string, number>,
    };

    database.results.forEach((page: any) => {
      const properties = page.properties;

      // Count completed questionnaires
      if (properties["Questionnaire Completed"]?.checkbox) {
        insights.completedQuestionnaires++;
      }

      // Group signups by date
      const signupDate = properties["Signed Up At"]?.date?.start;
      if (signupDate) {
        const date = new Date(signupDate).toISOString().split("T")[0];
        insights.signupsByDate[date] = (insights.signupsByDate[date] || 0) + 1;
      }

      // Process interests (multi-select)
      if (properties["Interests"]?.multi_select) {
        properties["Interests"].multi_select.forEach((interest: any) => {
          insights.interests[interest.name] =
            (insights.interests[interest.name] || 0) + 1;
        });
      }

      // Process single-select fields
      if (properties["Previous Experience"]?.select?.name) {
        const exp = properties["Previous Experience"].select.name;
        insights.previousExperience[exp] =
          (insights.previousExperience[exp] || 0) + 1;
      }

      if (properties["Skill Level"]?.select?.name) {
        const skill = properties["Skill Level"].select.name;
        insights.skillLevel[skill] = (insights.skillLevel[skill] || 0) + 1;
      }

      if (properties["Primary Goal"]?.select?.name) {
        const goal = properties["Primary Goal"].select.name;
        insights.primaryGoal[goal] = (insights.primaryGoal[goal] || 0) + 1;
      }

      if (properties["Beta Test"]?.select?.name) {
        const beta = properties["Beta Test"].select.name;
        insights.betaTest[beta] = (insights.betaTest[beta] || 0) + 1;
      }
    });

    return NextResponse.json(insights);
  } catch (error) {
    console.error("Insights API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch insights data" },
      { status: 500 },
    );
  }
}
