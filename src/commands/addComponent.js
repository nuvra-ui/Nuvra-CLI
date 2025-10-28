import chalk from 'chalk'

export default function addComponent() {
    const positionalArgument = process.argv[3] //e.g npx @nuvra-ui/nuvra-ui add <positionalArgument>

    console.log(chalk.yellow(`Searching for ${positionalArgument}-Component...`))
}