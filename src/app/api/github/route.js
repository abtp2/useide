import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function GET(req) {
  try {
    const path ="README.md";
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    const { data } = await octokit.rest.repos.getContent({
      owner: "abtp2",
      repo: "cpp-notes",
      path,
      mediaType: { format: "raw" },
    });

    return NextResponse.json({ content: data, path });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}