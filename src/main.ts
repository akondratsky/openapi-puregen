import { loadConfiguration, loadSpecification } from './files';
import { process } from './func';

try {
  process({
    spec: loadSpecification('./src/integration/spec.yaml'),
    cfg: loadConfiguration('./src/integration/cfg.yaml')
  });
} catch (e) {
  console.error(e);
}
