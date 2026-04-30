#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SUPPORTED_TOOLS = new Set(["codex"]);
const SKILL_NAME = "openspec-frontend-project";

function printUsage() {
  console.log(
    [
      "Usage:",
      "  npx @your-org/openspec-frontend-project --tool codex [--dest /path/to/project]",
      "",
      "Options:",
      "  --tool <name>   Target AI tool. Currently supported: codex",
      "  --dest <path>   Project root to install into. Defaults to current working directory.",
      "  --force         Overwrite existing skill directory if it already exists."
    ].join("\n")
  );
}

function parseArgs(argv) {
  const args = { dest: process.cwd(), force: false };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--tool") {
      args.tool = argv[i + 1];
      i += 1;
      continue;
    }

    if (token === "--dest") {
      args.dest = path.resolve(argv[i + 1]);
      i += 1;
      continue;
    }

    if (token === "--force") {
      args.force = true;
      continue;
    }

    if (token === "--help" || token === "-h") {
      args.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirectory(sourceDir, targetDir) {
  ensureDir(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

function toolSkillDir(projectRoot, tool) {
  if (tool === "codex") {
    return path.join(projectRoot, ".codex", "skills", SKILL_NAME);
  }

  throw new Error(`Unsupported tool: ${tool}`);
}

function main() {
  let args;

  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error("");
    printUsage();
    process.exit(1);
  }

  if (args.help) {
    printUsage();
    process.exit(0);
  }

  if (!args.tool) {
    console.error("Missing required argument: --tool");
    console.error("");
    printUsage();
    process.exit(1);
  }

  if (!SUPPORTED_TOOLS.has(args.tool)) {
    console.error(
      `Unsupported tool "${args.tool}". Supported tools: ${Array.from(SUPPORTED_TOOLS).join(", ")}`
    );
    process.exit(1);
  }

  const packageRoot = path.resolve(__dirname, "..");
  const sourceDir = path.join(packageRoot, "skills", SKILL_NAME);
  const destinationDir = toolSkillDir(args.dest, args.tool);

  if (!fs.existsSync(sourceDir)) {
    console.error(`Bundled skill not found: ${sourceDir}`);
    process.exit(1);
  }

  if (fs.existsSync(destinationDir)) {
    if (!args.force) {
      console.error(
        `Skill already exists at ${destinationDir}. Re-run with --force to overwrite it.`
      );
      process.exit(1);
    }

    fs.rmSync(destinationDir, { recursive: true, force: true });
  }

  copyDirectory(sourceDir, destinationDir);

  console.log(`Installed ${SKILL_NAME} for ${args.tool}`);
  console.log(`Project root: ${args.dest}`);
  console.log(`Skill path: ${destinationDir}`);
  console.log("");
  console.log("Next step inside Codex:");
  console.log("  Use the installed skill to synthesize an openspec/ tree from your discussion context and source documents.");
}

main();
