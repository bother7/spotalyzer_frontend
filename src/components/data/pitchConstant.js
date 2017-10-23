import { scaleLinear, scaleOrdinal} from '@vx/scale';
import { max, min } from 'd3-array';

export const width = 500;

export const height = 300;

export const margin = {
top: 60,
bottom: 60,
left: 80,
right: 80,
};

export const xMax = width - margin.left - margin.right;

export const yMax = height - margin.top - margin.bottom;

export const x = d => d.time;

export const y = d => Math.max(d.pitch0,d.pitch1,d.pitch2,d.pitch3,d.pitch4,d.pitch5,d.pitch6,d.pitch7,d.pitch8,d.pitch9,d.pitch10,d.pitch11);

export const keys = ["pitch0", "pitch1", "pitch2", "pitch3","pitch4","pitch5","pitch6","pitch7","pitch8","pitch9","pitch10","pitch11"]