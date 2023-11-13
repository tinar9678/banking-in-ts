function comboSum(array: number[], target: number, result: number[][], curr: number[], start: number) : void {
    if (target === 0) {
        result.push([...curr]);
        return;
    }

    for (let i = start; i < array.length; i++) {
        if (array[i] <= target) {
            curr.push(array[i]);
            comboSum(array, target-array[i], result, curr, i);
            curr.pop();
        }
    }
}

function mainCombo(array: number[], target: number) : number[][] {
    const result : number[][] = [];
    comboSum(array, target, result, [], 0);
    return result;
}

const candidates = [2,3,5];
const targett = 8;
console.log(mainCombo(candidates, targett));