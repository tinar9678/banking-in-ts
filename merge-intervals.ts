function mergeIntervals(intervals: number[][]) : number[][] {
    intervals.sort((a, b) => a[0] - b[0])
    const result: number[][] = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        if (isOverlapping(result[result.length-1], intervals[i])) {
            result[result.length-1] = [result[result.length-1][0], Math.max(intervals[i][1], result[result.length-1][1])]
        } else {
            result.push(intervals[i]);
        }
    }
    
    return result;
}

function isOverlapping(interval1: number[], interval2: number[]) : boolean {
    return interval1[1] >= interval2[0];
}

function insertInterval(intervals: number[][], insertInterval: number[]) : number[][] {
    let left = 0;
    let right = intervals.length;
    let indexToInsert = 0;
    while (left <= right) {
        const mid = Math.floor((left+right)/2);
        if (intervals[mid][0] >= insertInterval[0]) {
            // search left
            indexToInsert = mid+1;
            right = mid-1;
        } else {
            // search right
            left = mid+1;
        }
    }

    // insert interval
    const newIntervals = intervals.slice(0,indexToInsert).concat([insertInterval]).concat(intervals.slice(indexToInsert));
    return mergeIntervals(newIntervals);
}

const intervals = [[1,3],[2,6],[8,10],[15,18]];
console.log(mergeIntervals(intervals));
const intervals2 = [[1, 3], [5, 9], [8, 10], [15, 18]];
console.log(mergeIntervals(intervals2));
const intervals3 = [[1, 3], [5, 7], [9, 11], [13, 15]];
console.log(mergeIntervals(intervals3));
const intervals4 = [[1, 3], [3, 6], [8, 10], [15, 18]];
console.log(mergeIntervals(intervals4));
const intervals8 = [[1, 1000], [1001, 2000], [2001, 3000], [3001, 4000]];
console.log(mergeIntervals(intervals8));

const intervalsInserted = [[1,3],[6,9]];
const newInterval = [2,5];
console.log(insertInterval(intervalsInserted, newInterval));
const intervalsInserted2 = [[1,2],[3,5],[6,7],[8,10],[12,16]];
const newInterval2 = [4,8];
console.log(insertInterval(intervalsInserted2, newInterval2));