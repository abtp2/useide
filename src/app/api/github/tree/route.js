import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = "abtp2";
const REPO = "cpp-notes";

export async function GET() {
  try {
    // Fetch the tree of default branch (usually "main")
    const { data } = await octokit.rest.git.getTree({
      owner: OWNER,
      repo: REPO,
      tree_sha: "main", // branch name
      recursive: "1",   // get full file list
    });

    // Filter out only files (not directories)
    const files = data.tree
      .filter((item) => item.type === "blob")
      .map((item) => item.path);

    return NextResponse.json({ files });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}