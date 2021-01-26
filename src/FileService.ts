import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import { Configuration, Specification } from 'app/types';
import { validateConfiguration } from 'app/validation';


const InitializationError = new Error('Configuration file was not loaded properly');

export class FileService {
  private configFolder?: string;

  private parseFile(filename: string): unknown {
    const content = fs.readFileSync(filename, 'utf-8');
    return YAML.parse(content);
  }

  private loadTemplate(filePath: string): string {
    if (!this.configFolder) {
      throw InitializationError;
    }
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(this.configFolder, filePath);
    return fs.readFileSync(absolutePath, 'utf-8');
  }

  public useConfig(filePath: string): Configuration {
    const { dir } = path.parse(filePath);
    this.configFolder = dir;
    const cfg = this.parseFile(filePath) as Configuration;
    validateConfiguration(cfg);
    return cfg;
  }

  public useSpec(filePath: string): Specification {
    return this.parseFile(filePath) as Specification;
  }

  public loadTemplates(paths: string | Array<string>): string | Array<string> {
    return Array.isArray(paths) ?
      paths.map(this.loadTemplate)
      : this.loadTemplate(paths);
  }
}

