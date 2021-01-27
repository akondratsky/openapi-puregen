import { iterateRenderables, render } from './func';
import { FileService } from './FileService';
import { writeFiles } from './func/writeFiles';
import { flow } from 'lodash';

export const fileService = new FileService();

const process = flow(
  iterateRenderables,
  render,
  writeFiles
);

try {
  process({
    spec: fileService.useSpec('./src/integration/spec.yaml'),
    cfg: fileService.useConfig('./src/integration/cfg.yaml')
  });
} catch (e) {
  console.error(e);
}
