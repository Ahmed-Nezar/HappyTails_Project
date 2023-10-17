# HappyTails_Project
### Guidelines for Commits:

1. Download the following file and copy it to the local directory of your repository:
   [Download commit-msg file](https://drive.google.com/file/d/11UX6EJgjsDzLRXtu7NbwRawQwIMiF_vQ/view?usp=sharing)

2. Open Visual Studio Code (VSCode) in the repository.

3. Open the terminal in VSCode.

4. Write the following commands one by one:
   ```bash
   mv commit-msg .git/hooks
   cd .git/hooks
   cd ..
   cd ..
   ```

Now, commits must start with one of the following prefixes:
- `add:`
- `feat:`
- `update:`
- `delete:`
- `merged:`
