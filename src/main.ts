import { iterateRenderables, render } from './func';
import { useConfig, useSpec } from './FileService';
import { writeFiles } from './func/writeFiles';
import { flow } from 'lodash';

const process = flow(
  iterateRenderables,
  render,
  writeFiles
);

try {
  process({
    spec: useSpec('./src/integration/spec.yaml'),
    cfg: useConfig('./src/integration/cfg.yaml')
  });
} catch (e) {
  console.error(e);
}
