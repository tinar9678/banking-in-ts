function wordBreak(target: string, words: Set<string>) : boolean {
    return dfs(target, words, {}, 0);
}

function dfs(target: string, words: Set<string>, memo: Record<number, boolean>, index: number) : boolean {
    if (index in memo) {
        return memo[index];
    }

    if (words.has(target)) {
        return true;
    }

    for (let i = 1; i < target.length; i++) {
        if (words.has(target.slice(0, i))) {
            const result = dfs(target.slice(i), words, memo, i);
            if (result) {
                memo[index] = true;
                return true;
            }
        }
    }
    memo[index] = false;
    return false;
}

const target = "algomonster";
const words = ["algo", "monster"];
console.log(wordBreak(target, new Set(words)));
const target2 = "aab";
const words2 = ["a", "c"];
console.log(wordBreak(target2, new Set(words2)));
const target3 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab";
const words3 = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"];
console.log(wordBreak(target3, new Set(words3)));
