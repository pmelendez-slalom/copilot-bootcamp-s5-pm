# Memory System

## Purpose

This memory system helps track patterns, decisions, and lessons learned during development. It creates a knowledge base that both you and AI assistants can reference to make better decisions over time.

## Memory Architecture

This project uses a **two-tier memory system**:

### Persistent Memory (Foundation)
- **Location**: `.github/copilot-instructions.md`
- **Purpose**: Core principles, workflows, and permanent project guidelines
- **Lifespan**: Long-term, rarely changes
- **Examples**: TDD workflow, coding standards, project architecture
- **Committed**: Yes, always

### Working Memory (Discoveries)
- **Location**: `.github/memory/` directory
- **Purpose**: Accumulated learnings, patterns, and session-specific discoveries
- **Lifespan**: Grows over time as patterns emerge
- **Examples**: API design patterns, bug solutions, implementation decisions
- **Committed**: Partially (see below)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical summaries of completed sessions (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns and solutions (COMMITTED)
└── scratch/                     # Active session work (NOT COMMITTED)
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Current session notes (EPHEMERAL)
```

### File Purposes

#### `session-notes.md` (Committed Historical Record)
- **What**: Summaries of completed development sessions
- **When to Use**: At the end of each work session
- **Content**: What was accomplished, key findings, decisions made, outcomes
- **Lifecycle**: Append new session summaries; becomes historical reference
- **Git Status**: Committed to repository

#### `patterns-discovered.md` (Committed Knowledge Base)
- **What**: Reusable code patterns, solutions, and best practices discovered during development
- **When to Use**: When you discover a pattern worth remembering
- **Content**: Pattern name, context, problem, solution, example code, related files
- **Lifecycle**: Grows incrementally as patterns are identified
- **Git Status**: Committed to repository

#### `scratch/working-notes.md` (Ephemeral Active Work)
- **What**: Real-time notes during active development
- **When to Use**: During your current work session
- **Content**: Current task, approach, findings, decisions, blockers, next steps
- **Lifecycle**: Created/updated during session, then summarized into session-notes.md
- **Git Status**: NOT committed (kept local via .gitignore)

## When to Use Each File

### During TDD Workflows

**While Writing Tests** → `scratch/working-notes.md`
- Document which tests you're implementing
- Note unexpected test failures and hypotheses
- Track decisions about test structure

**After Tests Pass** → `patterns-discovered.md`
- Document reusable test patterns
- Note common edge cases for future reference

**End of TDD Session** → `session-notes.md`
- Summarize which features were completed
- Record key testing insights

### During Linting/Code Quality Work

**While Fixing Lint Errors** → `scratch/working-notes.md`
- Track categories of errors found
- Note systematic fixes applied
- Document any ESLint rule decisions

**After Clean Lint Run** → `patterns-discovered.md`
- Document patterns for avoiding common lint errors
- Note any custom lint configurations added

**End of Cleanup Session** → `session-notes.md`
- Summarize what was cleaned up
- Record any tooling changes made

### During Debugging Workflows

**While Investigating Bugs** → `scratch/working-notes.md`
- Document symptoms and error messages
- Track hypotheses and tests performed
- Note what worked and what didn't

**After Bug Fix** → `patterns-discovered.md`
- Document the root cause and solution pattern
- Note how to prevent similar bugs

**End of Debug Session** → `session-notes.md`
- Summarize bugs fixed
- Record key insights about the codebase

### During Implementation Work

**While Building Features** → `scratch/working-notes.md`
- Track implementation approach
- Note API design decisions
- Document blockers and workarounds

**After Feature Complete** → `patterns-discovered.md`
- Document architectural patterns used
- Note reusable component structures

**End of Implementation Session** → `session-notes.md`
- Summarize features completed
- Record key technical decisions

## How AI Reads and Applies These Patterns

### Context Loading
When you start a conversation with GitHub Copilot:
1. AI loads `.github/copilot-instructions.md` (persistent memory)
2. You can reference specific memory files for additional context
3. AI uses these patterns to provide context-aware suggestions

### Pattern Recognition
When AI references `patterns-discovered.md`:
- Suggests solutions based on previously successful patterns
- Warns about issues encountered before
- Recommends consistent approaches across the codebase

### Historical Context
When AI references `session-notes.md`:
- Understands what was tried before
- Avoids suggesting already-rejected approaches
- Builds on previous decisions

### Active Session Collaboration
When working with `scratch/working-notes.md`:
- Helps maintain focus on current task
- Tracks progress within the session
- Provides continuity across conversation restarts

## Best Practices

### Commit Strategy

**Always Commit**:
- `session-notes.md` - Historical record of progress
- `patterns-discovered.md` - Accumulated knowledge base
- `README.md` - Documentation

**Never Commit**:
- `scratch/working-notes.md` - Ephemeral, session-specific
- `scratch/*.md` - Any active work files

**Why**: Committed files become part of the team's shared knowledge. Scratch files are personal, exploratory, and may contain incomplete thoughts.

### Writing Effective Notes

**In working-notes.md** (Active Session):
- Write quickly, don't worry about polish
- Use bullet points and fragments
- Include code snippets and error messages
- Track what you're currently thinking

**In session-notes.md** (Historical Summary):
- Write clearly for future reference
- Focus on outcomes and decisions
- Be concise but complete
- Date each session entry

**In patterns-discovered.md** (Knowledge Base):
- Write as documentation
- Include concrete examples
- Explain the "why" behind patterns
- Cross-reference related files

### Workflow Example

```
START SESSION
→ Open scratch/working-notes.md
→ Document current task and approach
→ Work iteratively, updating notes as you go

DISCOVER PATTERN
→ Add to patterns-discovered.md immediately
→ Reference it in working-notes.md

END SESSION
→ Review scratch/working-notes.md
→ Extract key findings → session-notes.md
→ Commit session-notes.md and patterns-discovered.md
→ Leave scratch/working-notes.md for next session or delete
```

## Evolution Over Time

### Week 1
- `scratch/working-notes.md`: Lots of exploratory notes
- `session-notes.md`: Few entries
- `patterns-discovered.md`: Emerging patterns

### Month 1
- `scratch/working-notes.md`: Still ephemeral (daily use)
- `session-notes.md`: Rich historical record
- `patterns-discovered.md`: Comprehensive pattern library

### Month 3+
- `scratch/working-notes.md`: Still ephemeral (never grows)
- `session-notes.md`: Complete project history
- `patterns-discovered.md`: Mature knowledge base

**Key Insight**: Scratch files stay ephemeral. Historical files grow. This separation keeps the system manageable.

## Tips for Success

1. **Start Small**: Don't try to document everything. Focus on surprising discoveries.

2. **Be Consistent**: Make it a habit to update notes during natural breaks (test passes, lint clean, feature complete).

3. **Reference Often**: When asking AI for help, say "Check patterns-discovered.md for similar issues."

4. **Clean Up Weekly**: Review patterns-discovered.md and consolidate similar patterns.

5. **Trust the System**: The memory system works best when used consistently over time.

## Example AI Prompts

```
"Check session-notes.md - did we try this approach before?"

"Add this pattern to patterns-discovered.md:
[Pattern Name]: API Error Handling
[Solution]: ..."

"Review scratch/working-notes.md and help me prioritize next steps."

"Based on patterns-discovered.md, what's the best way to implement this feature?"
```

## Summary

- **Persistent Memory** = What we always know (copilot-instructions.md)
- **Working Memory** = What we've learned (session-notes.md, patterns-discovered.md)
- **Active Scratch** = What we're currently thinking (scratch/working-notes.md)

This three-tier system helps you and AI work together more effectively by building shared context over time.
