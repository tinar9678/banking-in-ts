function dfs_coins(coins: number[], target: number, memo: Record<number, number>) : number {
    if (target === 0) {
        return 0;
    }

    if (target in memo) {
        return memo[target];
    }

    let min = Infinity;
    for (let i = 0; i < coins.length; i++) {
        if (coins[i] <= target) {
            min = Math.min(dfs_coins(coins, target-coins[i], memo) + 1, min);
        }
    }
    
    memo[target] = min;
    return min;
}

function minCoins(coins: number[], target: number) : number {
    const result = dfs_coins(coins, target, {});
    return result === Infinity ? -1 : result;
}

const coins = [186, 419, 83, 408];
const amount = 6249
console.log(minCoins(coins, amount)); // 20