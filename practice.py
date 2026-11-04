class Solution(object):
    def coinChange(self, coins, amount):
        """
        :type coins: List[int]
        :type amount: int
        :rtype: int
        """
        coins_needed = {}

        for i in range(amount+1):
            print("i",i)
            for coin in coins:
                # ±3 subtract current coin form amount
                if coin > i:
                    print("skipping")
                    continue

                remaining = i - coin
                if remaining == 0:
                    coins_needed[i] = 1
                else:
                    if remaining in coins_needed:
                        if i in coins_needed:
                            print("coins_needed", coins_needed)
                            print("i in coins", i)
                            print("coins_needed[i]", coins_needed[i])
                            print("remaining", remaining)
                            if coins_needed[remaining] + 1 < coins_needed[i]:
                                coins_needed[i] = coins_needed[remaining] + 1
                        else:
                            print("i not in coins")
                            coins_needed[i] = coins_needed[remaining] + 1
                    
        print(coins_needed)
        if coins_needed[amount]:
            return coins_needed[amount]
        else:
            return -1

coins = [5, 3]
amount = 11
sol = Solution()
print("answer", sol.coinChange(coins, amount))
