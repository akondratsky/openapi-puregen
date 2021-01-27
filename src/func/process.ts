import { iterateRenderables, render } from './index';
import { writeFiles } from './writeFiles';
import { flow } from 'lodash';

export const process = flow(
  iterateRenderables,
  render,
  writeFiles
);
