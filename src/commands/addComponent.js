import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

export default function addComponent() {
    const positionalArgument = process.argv[3] //e.g npx @nuvra-ui/nuvra-ui add <positionalArgument>
    const rootDir = path.resolve() // e.g /home/joe/my-project

    console.log(chalk.yellow(`Searching for ${positionalArgument}-Component...`))

    fs.mkdir(`${rootDir}/src/ui/${positionalArgument}`, { recursive: true }, (err) => {
        if (err) throw err;
        console.log("Created Folder.")
    })
}