import { iterateRenderables } from './func/prepare';
import { FileService } from './FileService';

export const fileService = new FileService();

try {
  const result = iterateRenderables({
    spec: fileService.useSpec('./src/integration/spec.yaml'),
    cfg: fileService.useConfig('./src/integration/cfg.yaml')
  });

  console.dir(result, {
    depth: 100
  });
} catch (e) {
  console.error(e);
}
