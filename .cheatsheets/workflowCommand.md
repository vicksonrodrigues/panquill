# Development Workflow

## First-Time Setup
```bash
pnpm install
docker compose up --build 
pnpm prisma migrate dev
```

## Daily Start
```bash
docker compose up 
docker compose exec app bash
```

---

## Prisma

| Command | Purpose |
|---|---|
| `pnpm prisma generate` | Generate client |
| `pnpm prisma format` | Format schema |
| `pnpm prisma validate` | Validate schema |
| `pnpm prisma migrate dev` | Create migration |
| `pnpm prisma migrate deploy` | Deploy migrations |
| `pnpm prisma db push` | Push schema (no migration) |
| `pnpm prisma migrate reset` | Reset database |
| `pnpm prisma studio --port 5555 --browser none` | Open Studio |
| `pnpm prisma db seed` | Run seed |

*Requires DB containers running.*

## Docker

| Command | Purpose |
|---|---|
| `docker compose up` | Start |
| `docker compose up --build` | Rebuild & start |
| `docker compose down` | Stop |
| `docker compose down -v` | Stop + delete volumes ⚠️ |
| `docker compose logs -f` | View logs |
| `docker compose restart app` | Restart app |
| `docker compose restart postgres` | Restart postgres |
| `docker compose exec app bash` | App shell |
| `docker compose exec postgres psql -U panquill -d panquill_db` | Postgres shell |
| `docker compose ps` | Verify containers |
| `docker system prune` | Remove unused resources |

---

## When You Change...

| Changed | Run |
|---|---|
| `package.json` / lockfile | `pnpm install` → `docker compose up --build -d` |
| `Dockerfile` / `docker-compose.yml` | `docker compose up --build -d` |
| Prisma schema | `pnpm prisma migrate dev` |
| `.env` | `docker compose down` → `docker compose up -d` |
| Prisma generator output | `pnpm prisma generate` (update imports if path changed) |
| Seed file | `pnpm prisma db seed` |

---

## Before Every Commit
```bash
pnpm prisma validate
pnpm prisma generate
pnpm typecheck
pnpm lint
pnpm build
```

## Helpful

| Command | Purpose |
|---|---|
| `pnpm outdated` | Check outdated deps |
| `pnpm update --latest` | Update deps |
| `pnpm peers check` | Check peer deps |

## Shutdown
```bash
docker compose down
```

---

# Linux / Node / Git Cheat Sheet

| Category | Command | Description |
|---|---|---|
| Navigation | `pwd` | Print current directory |
| | `ls -la` | List all files with details |
| | `cd folder` / `cd ..` / `cd ~` / `cd -` | Change / up / home / previous |
| Files | `touch file.txt` | Create file |
| | `mkdir -p a/b/c` | Create nested folders |
| | `cp -r src dest` | Copy folder |
| | `mv old new` | Move/rename |
| | `rm -rf folder` | Delete folder |
| View | `cat` / `less` / `head` / `tail` / `tail -f log.txt` | Print / page / first / last / follow |
| Search | `find . -name "*.ts"` | Find files |
| | `grep -rn "text" .` | Recursive search |
| Info | `whoami`, `date`, `df -h`, `du -sh .`, `env`, `echo $DATABASE_URL` | System/env info |
| Processes | `ps aux` | Running processes |
| | `kill PID` / `kill -9 PID` | Stop / force stop |
| Network | `ping google.com` | Test connectivity |
| | `hostname -I` | Show IP address |
| Permissions | `chmod +x file.sh` | Make executable |
| Shortcuts | `Ctrl+L`, `Ctrl+C`, `Ctrl+R`, `Tab`, `↑/↓`, `exit` | Clear, stop, history search, autocomplete, history nav, exit |
| pnpm | `pnpm add [-D] package`, `remove`, `update`, `list` | Package management |
| Git | `git status`, `add .`, `commit -m`, `push`, `pull` | Basic flow |
| | `git branch`, `switch branch`, `switch -c new-branch` | Branching |