---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and Push Changes

You will analyze the current git changes, generate a conventional commit message, and push to a feature branch.

## Input Parameters

**Branch Name** (REQUIRED): ${input:branch-name}

If no branch name is provided, **STOP** and ask the user to provide it.

Example branch names:
- `feature/add-post-endpoint`
- `feature/fix-toggle-bug`
- `feature/implement-delete`

## Workflow

### Step 1: Validate Branch Name

If branch name is not provided:
```
❌ Branch name is required!

Please provide a branch name following the pattern:
- feature/<descriptive-name>

Examples:
- feature/add-post-endpoint
- feature/fix-toggle-bug
- feature/implement-delete

Run the command again with a branch name.
```

**STOP execution** until branch name is provided.

### Step 2: Analyze Changes

Check what has changed:

```bash
git status
git diff
```

Analyze:
- Which files were modified?
- What functionality was added/changed?
- Are there any new files?
- Are there any deleted files?

### Step 3: Generate Conventional Commit Message

Based on the changes, create a commit message following the conventional commit format:

```
<type>: <subject>

<body>
```

**Commit Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Build, dependency, or tooling changes
- `docs:` - Documentation updates
- `refactor:` - Code refactoring without behavior change
- `test:` - Test additions or modifications
- `style:` - Code style changes (formatting, missing semicolons, etc.)

**Subject Line**:
- Lowercase, no period at end
- Imperative mood ("add feature" not "added feature")
- Max 50 characters
- Clear and descriptive

**Body** (optional):
- Explain what and why, not how
- Wrap at 72 characters
- Can include bullet points

**Examples**:
```
feat: add POST endpoint for creating todos

Implements todo creation with validation for title field.
Returns 201 with created todo object including auto-generated ID.
```

```
fix: correct toggle endpoint to actually toggle state

Previously always set completed to true. Now properly toggles
between true and false based on current state.
```

```
test: add validation tests for POST endpoint

- Test missing title returns 400
- Test empty title returns 400  
- Test valid title returns 201
```

### Step 4: Create or Switch to Branch

Check if branch exists:

```bash
git branch --list ${input:branch-name}
```

**If branch does NOT exist**:
```bash
git checkout -b ${input:branch-name}
```

**If branch EXISTS**:
```bash
git checkout ${input:branch-name}
```

### Step 5: Stage All Changes

```bash
git add .
```

### Step 6: Commit Changes

```bash
git commit -m "<generated commit message>"
```

### Step 7: Push to Branch

```bash
git push origin ${input:branch-name}
```

If this is the first push to this branch:
```bash
git push -u origin ${input:branch-name}
```

### Step 8: Report Success

```
✅ Changes committed and pushed successfully!

Branch: ${input:branch-name}
Commit: <commit-type>: <subject>

Files changed:
- <file1>
- <file2>
- ...

Next steps:
- Continue working on the next step, OR
- Create a Pull Request if the feature is complete
```

## Important Constraints

### Branch Safety

**NEVER commit directly to**:
- ❌ `main`
- ❌ `master`
- ❌ Any branch not explicitly provided by the user

**ALWAYS**:
- ✅ Use the branch name provided by the user
- ✅ Create feature branches with `feature/` prefix
- ✅ Push only to the specified branch

### Atomic Commits

**Stage all changes together**:
- ✅ Use `git add .` to stage everything
- ✅ One commit per logical change
- ✅ Keep commits focused and meaningful

**Reason**: Ensures related changes are committed atomically.

## Reference Documentation

This prompt inherits Git workflow knowledge from `.github/copilot-instructions.md`.

Key sections:
- **Git Workflow**: Conventional commits and branch strategy
- **Conventional Commits**: Commit type definitions and format
- **Staging and Pushing**: Git commands for commit workflow

## Example Execution

```
User runs: /commit-and-push feature/add-post-endpoint

Response:
"Analyzing changes...

[Runs: git status]
[Runs: git diff]

Changes detected:
- Modified: packages/backend/src/app.js (added POST endpoint)
- Modified: packages/backend/__tests__/app.test.js (added POST tests)

Generating commit message...

Recommended commit:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat: add POST endpoint for creating todos

Implements todo creation with validation for title field.
Returns 201 with created todo object including ID and timestamps.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creating/switching to branch: feature/add-post-endpoint

[Runs: git checkout -b feature/add-post-endpoint]

✅ Branch created

Staging changes...

[Runs: git add .]

✅ All changes staged

Committing...

[Runs: git commit -m "feat: add POST endpoint for creating todos

Implements todo creation with validation for title field.
Returns 201 with created todo object including ID and timestamps."]

✅ Changes committed

Pushing to remote...

[Runs: git push -u origin feature/add-post-endpoint]

✅ Pushed to origin/feature/add-post-endpoint

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Changes committed and pushed successfully!

Branch: feature/add-post-endpoint
Commit: feat: add POST endpoint for creating todos

Files changed:
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js

Next steps:
- Continue with /execute-step for the next step, OR
- Create a Pull Request if ready to merge"
```

## Error Handling

### No Changes to Commit

If `git status` shows no changes:
```
⚠️ No changes to commit

The working directory is clean. Make some changes first before committing.
```

### Branch Name Not Provided

If branch name is missing:
```
❌ Branch name is required!

Usage: /commit-and-push <branch-name>

Example: /commit-and-push feature/add-post-endpoint
```

### Merge Conflicts

If push fails due to conflicts:
```
⚠️ Push failed - conflicts detected

You may need to:
1. Pull the latest changes: git pull origin ${input:branch-name}
2. Resolve any conflicts
3. Try pushing again

Or contact your instructor for assistance.
```

## Success Criteria

Commit and push is successful when:
- ✅ Branch name is provided
- ✅ Changes are analyzed
- ✅ Conventional commit message is generated
- ✅ Correct branch is created/switched to
- ✅ All changes are staged
- ✅ Commit is created
- ✅ Changes are pushed to the specified branch
- ✅ User is informed of next steps
