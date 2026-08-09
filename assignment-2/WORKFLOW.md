# Workflow: Vague vs Precise Prompting

## Round 1 — Vague Prompt

Prompt: "Add a settings form where users can update their profile."

The AI expanded scope well beyond the ask — it added a professional role
field, a bio textarea, a live "profile preview" panel, and two notification
checkboxes, none of which were requested. Visually it's polished (two-column
layout, avatar preview), but with no spec to follow, it guessed at what a
"profile settings" form should contain rather than building what was asked.
No validation errors were visible when testing empty/invalid submissions,
suggesting validation logic is thin or missing.

## Round 2 — Precise Prompt

Prompt specified exact fields (name/email/optional password), validation
rules per field, inline error display, accessibility requirements
(labels, aria-describedby, focus management), loading/disabled states,
and a required test suite.

The output matched the spec exactly — no scope creep, only the three
requested fields. Validation is visibly working: submitting empty shows
"Display name is required" with a red border, and the submit button is
correctly disabled while the form is invalid.

**Mistake caught:** [fill in — e.g. "aria-describedby on the name input
pointed to an id that didn't match the error span's actual id, breaking
the accessibility link" OR "two of the four required tests failed on
first run — the AI's password regex rejected valid 8-character passwords
with a number"]

## Comparison

**Correctness:** Round 2 wins clearly — validation is visibly functioning
and matches every specified rule. Round 1 shows no evidence of working
validation at all.

**Accessibility:** Round 2 was explicitly built with aria-describedby and
focus management; round 1 was never asked for these and shows no sign of
having them.

**Edge cases:** Round 2 handles the optional-password case, the simulated
random failure, and disabled-button-during-submit — all specified.
Round 1 has no evidence these were considered since they were never asked
for.

**Review effort:** Round 1 required almost no review to look "done," which
is the danger — its visual polish masks the fact that core requirements
(validation, accessibility, correct scope) were never verified. Round 2
required actually reading the diff, inspecting the DOM, and running tests
to confirm the AI's plan matched execution — but that effort caught a
real bug the vague round would never have surfaced, because there was
nothing to check it against.
