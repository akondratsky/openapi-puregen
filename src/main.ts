import { loadConfiguration, loadSpecification } from './files';
import { process as processData, checkPathsExist } from './func';
import { argv } from './argv';

const { spec, config, output } = argv;

if (!spec || !config) {
  console.error('Error: you should specify both config and specification files');
  process.exit();
}

checkPathsExist(spec, config);

try {
  processData({
    spec: loadSpecification(spec),
    cfg: loadConfiguration(config)
  });
} catch (e) {
  console.error(e);
}
