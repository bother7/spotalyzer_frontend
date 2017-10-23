

export const x = d => d.bin;
export const y = d => d.bins;
export const z = d => d.count;

export function theHeat (songData) {return songData.map( (item) => {
  return {bin: item.start,
    bins: [{bin: 0, count: item.timbre[0]},
    {bin: 1, count: item.timbre[1]},
    {bin: 2, count: item.timbre[2]},
    {bin: 3, count: item.timbre[3]},
    {bin: 4, count: item.timbre[4]},
    {bin: 5, count: item.timbre[5]},
    {bin: 6, count: item.timbre[6]},
    {bin: 7, count: item.timbre[7]},
    {bin: 8, count: item.timbre[8]},
    {bin: 9, count: item.timbre[9]},
    {bin: 10, count: item.timbre[10]},
    {bin: 11, count: item.timbre[11]}]
    }})
}
