# This line is known as the shebang (#!) and it specifies the interpreter for the script that follows.
#!/usr/bin/env zsh

# provides command-line auto-completion for Git commands. The source command reads and executes commands from the given file.
echo 'source /usr/share/bash-completion/completions/git' >> ~/.zshrc

# for performance reasons, a git "dirty" indicator that tells there are uncommitted changes is disabled by default. so this git command turns it on for smaller repositories.
git config devcontainers-theme.show-dirty 1

# generates the client and the schema inside the container
npx prisma db push