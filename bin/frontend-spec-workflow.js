#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SUPPORTED_TOOLS = new Set(["codex"]);
const SKILLS_DIR = "skills";

function printUsage() {
  console.log(
    [
      "Usage:",
      "  npx @westernfastshooters/frontend-spec-workflow --tool codex [--dest /path/to/project] [--skill <name>]",
      "",
      "Options:",
      "  --tool <name>   Target AI tool. Currently supported: codex",
      "  --dest <path>   Project root to install into. Defaults to current working directory.",
      "  --skill <name>  Install only the named bundled skill. Repeatable. Defaults to all bundled skills.",
      "  --force         Overwrite existing skill directory if it already exists."
    ].join("\n")
  );
}

function parseArgs(argv) {
  const args = { dest: process.cwd(), force: false, skills: [] };

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

    if (token === "--skill") {
      args.skills.push(argv[i + 1]);
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

function toolSkillDir(projectRoot, tool, skillName) {
  if (tool === "codex") {
    return path.join(projectRoot, ".codex", "skills", skillName);
  }

  throw new Error(`Unsupported tool: ${tool}`);
}

function listBundledSkills(packageRoot) {
  const skillsRoot = path.join(packageRoot, SKILLS_DIR);

  if (!fs.existsSync(skillsRoot)) {
    return [];
  }

  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
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
  const bundledSkills = listBundledSkills(packageRoot);

  if (bundledSkills.length === 0) {
    console.error(`No bundled skills found under ${path.join(packageRoot, SKILLS_DIR)}`);
    process.exit(1);
  }

  const selectedSkills = args.skills.length > 0 ? args.skills : bundledSkills;
  const unknownSkills = selectedSkills.filter((skill) => !bundledSkills.includes(skill));

  if (unknownSkills.length > 0) {
    console.error(
      `Unknown bundled skill(s): ${unknownSkills.join(", ")}. Available skills: ${bundledSkills.join(", ")}`
    );
    process.exit(1);
  }

  for (const skillName of selectedSkills) {
    const sourceDir = path.join(packageRoot, SKILLS_DIR, skillName);
    const destinationDir = toolSkillDir(args.dest, args.tool, skillName);

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
    console.log(`Installed ${skillName} for ${args.tool}`);
    console.log(`Skill path: ${destinationDir}`);
    console.log("");
  }

  console.log(`Project root: ${args.dest}`);
  console.log("Next step inside Codex:");
  console.log("  Use the discussion-stage skills to write project-local draft assets under planning/frontend/,");
  console.log("  then use openspec-frontend-project to synthesize openspec/ from those draft artifacts and source documents.");
}

main();
