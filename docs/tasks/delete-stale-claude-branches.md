# Delete stale `claude/*` branches

These branches were created by Claude Code on the web sessions. They can't be
deleted from the web sessions themselves (the git relay hangs up on ref
deletion), so clean them up from your PC.

`claude/node-lts-upgrade-vwu0dk` is already merged into `main` (the Node 24 bump)
and is safe to delete. Verify the others are merged before deleting them.

## Delete command

```sh
git push origin --delete \
  claude/node-lts-upgrade-vwu0dk \
  claude/post-title-brainstorm-glh718 \
  claude/pre-commit-hooks-github-app-p9c7s4 \
  claude/slovak-depression-post-0x48q4 \
  claude/top-bar-gradient-glow-7ad1x4
```

## Check which are already merged into `main` first

```sh
git fetch origin
git branch -r --merged origin/main | grep claude/
```

Anything listed there is fully contained in `main` and safe to drop. For the
rest, check what unmerged work they carry before deleting.
