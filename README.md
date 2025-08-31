# FileTracker

A simple command-line tool to track file changes, similar to a basic version control system.

## Features

- Initialize a tracking repository
- Add files to the staging area
- Commit changes with messages
- View commit logs
- Show differences between commits

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/parthbinwal/fileTracker.git
   cd fileTracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

Run commands using Node.js:

```sh
node FileTracker.mjs init
node FileTracker.mjs add <filename>
node FileTracker.mjs commit "your message"
node FileTracker.mjs log
node FileTracker.mjs show <commitHash>
```

## Dependencies

- chalk
- commander
- diff

## License

ISC
