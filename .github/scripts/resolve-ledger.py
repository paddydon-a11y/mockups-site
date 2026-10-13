"""Settle a cherry-pick that only conflicts in recipe-ledger.json.

Two mockups built at the same time each add an entry at the top of the ledger,
so their commits collide on those lines and nowhere else. Keep master's ledger,
add the entries this commit introduces (newest first) and take this commit's
version of any entry for a folder the commit itself touched.
"""
import json
import subprocess
import sys

commit = sys.argv[1]


def git(*args):
    return subprocess.run(["git", *args], check=True, capture_output=True, text=True).stdout


conflicted = [f for f in git("diff", "--name-only", "--diff-filter=U").split("\n") if f]
if conflicted != ["recipe-ledger.json"]:
    sys.exit(f"Conflict outside the ledger, needs a person: {conflicted}")

ours = json.loads(git("show", "HEAD:recipe-ledger.json"))
theirs = json.loads(git("show", f"{commit}:recipe-ledger.json"))
touched = {p.split("/")[0] for p in git("diff-tree", "--no-commit-id", "--name-only", "-r", commit).split("\n") if "/" in p}

by_slug = {e.get("slug"): i for i, e in enumerate(ours["entries"])}
new = []
for entry in theirs["entries"]:
    slug = entry.get("slug")
    if slug not in by_slug:
        new.append(entry)
    elif slug in touched:
        ours["entries"][by_slug[slug]] = entry
ours["entries"] = new + ours["entries"]

with open("recipe-ledger.json", "w") as f:
    f.write(json.dumps(ours, indent=1, ensure_ascii=True) + "\n")
git("add", "recipe-ledger.json")
print(f"Ledger settled: {len(new)} new, folders touched {sorted(touched)}")
