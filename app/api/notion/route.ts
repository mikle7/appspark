import { QuestionnaireData } from "@/types/questionnaire";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });

    // If this is an update with questionnaire data, find and update the existing record
    if (body?.isUpdate && body?.questionnaire) {
      const questionnaire: QuestionnaireData = body.questionnaire;

      // First, find the existing page by email
      const database = await notion.databases.query({
        database_id: `${process.env.NOTION_DB}`,
        filter: {
          property: "Email",
          email: {
            equals: body.email,
          },
        },
      });

      if (database.results.length > 0) {
        const pageId = database.results[0].id;

        // Update the existing page with questionnaire data
        const updateResponse = await notion.pages.update({
          page_id: pageId,
          properties: {
            Interests: {
              type: "multi_select",
              multi_select: questionnaire.interests.map((interest) => ({
                name: interest,
              })),
            },
            "Previous Experience": {
              type: "select",
              select: questionnaire.previousExperience
                ? { name: questionnaire.previousExperience }
                : null,
            },
            "Skill Level": {
              type: "select",
              select: questionnaire.skillLevel
                ? { name: questionnaire.skillLevel }
                : null,
            },
            "App Type": {
              type: "rich_text",
              rich_text: questionnaire.appType
                ? [
                    {
                      type: "text",
                      text: { content: questionnaire.appType },
                    },
                  ]
                : [],
            },
            "Primary Goal": {
              type: "select",
              select: questionnaire.primaryGoal
                ? { name: questionnaire.primaryGoal }
                : null,
            },
            "Biggest Challenge": {
              type: "rich_text",
              rich_text: questionnaire.biggestChallenge
                ? [
                    {
                      type: "text",
                      text: { content: questionnaire.biggestChallenge },
                    },
                  ]
                : [],
            },
            "Beta Test": {
              type: "select",
              select: questionnaire.betaTest
                ? { name: questionnaire.betaTest }
                : null,
            },
            "Questionnaire Completed": {
              type: "checkbox",
              checkbox: true,
            },
            "Completed At": {
              type: "date",
              date: {
                start: new Date().toISOString(),
              },
            },
          },
        });

        if (!updateResponse) {
          throw new Error("Failed to update questionnaire data in Notion");
        }

        return NextResponse.json(
          { success: true, updated: true },
          { status: 200 },
        );
      } else {
        throw new Error("User not found for questionnaire update");
      }
    }

    // Create new user entry (initial signup)
    const response = await notion.pages.create({
      parent: {
        database_id: `${process.env.NOTION_DB}`,
      },
      properties: {
        Email: {
          type: "email",
          email: body?.email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: body?.name,
              },
            },
          ],
        },
        "Signed Up At": {
          type: "date",
          date: {
            start: new Date().toISOString(),
          },
        },
        "Questionnaire Completed": {
          type: "checkbox",
          checkbox: false,
        },
      },
    });

    if (!response) {
      throw new Error("Failed to add email to Notion");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Notion API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
