#!/usr/bin/env node
import {program} from 'commander';
import packageJson from '../../package.json';
import {createCommand} from "../commands";

program
  .version(packageJson.version, '-v, --version')
  .usage('<command> [options]')

createCommand(program)

program.parse(process.argv);
