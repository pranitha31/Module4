# Understanding Project Management in NodeJS

## a. Package Managers

### What is a package manager?
package manager is a tool that helps developers install, update, and manage external libraries or modules in their projects. It automates the process of downloading code and ensures compatibility between different packages.

### Why do we need package managers in backend development?
- They simplify dependency management.
- They allow easy installation of third-party libraries.
- They ensure consistent versions across environments.
- They make collaboration easier by standardizing dependencies.

### Problems faced if package managers are not used
- Developers would need to manually download and manage libraries.
- Version conflicts could arise without proper tracking.
- Collaboration becomes harder since teammates may use different versions.
- Updating libraries would be time-consuming and error-prone.

## b. NPM (Node Package Manager)

### What is NPM?
NPM is the default package manager for Node.js. It provides access to a huge registry of open-source packages.

### Why is NPM important for Node.js applications?
- It allows developers to quickly add functionality without reinventing the wheel.
- It manages dependencies efficiently.
- It supports scripts for automation (like running tests or starting servers).

### How NPM helps in managing dependencies
- Maintains a `package.json` file listing all dependencies.
- Automatically installs required versions of packages.
- Provides commands to update or remove packages easily.


## c. Backend Project Initialization

### Command used to initialize a backend (Node.js) project
```bash
npm init
What npm init and npm init -y do
npm init: Starts an interactive process asking details like project name, version, description, entry point, etc.

npm init -y: Skips questions and creates a package.json file with default values.
###d. Files and Folders Created After Project Initialization ###
package.json
Contains metadata about the project (name, version, description).
Lists dependencies and scripts.
Acts as the blueprint of the project.
node_modules
Directory where all installed packages are stored.
Contains actual code of dependencies.
Can be very large and is regenerated using package.json