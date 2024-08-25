start by installing pnpm if haven't already
https://pnpm.io/installation

open powershell and run the following command to install pnpm, ignore if already installed.
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
and run 
npm i -g pnpm to install pnpm globally

then start with 
pnpm install
pnpm dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

use the following command to add required components to the project if not automatically added
(You probably wouldn't need to runt this if u got components folder from the repo)
npx shadcn-ui add -y card alert tabs progress button

