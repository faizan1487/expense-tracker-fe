class Solution(object):
    def search(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        left = 0
        right = len(nums)-1
        mid = len(nums) // 2
        # print("mid", mid)

        # print(3//2)
        # print(1//2)

        while left < right:
            print("left", left)
            print("right", right)
            print("mid", mid)
            # nums = [4,5,6,7,0,1,2]
            if target == nums[left]:
                return left
            if target == nums[mid]:
                return mid
            if target == nums[right]:
                return right
            if nums[left] < nums[mid]:
                print("sorted side")
                if target >= nums[left] and target <= nums[mid]:
                    if nums[mid] > target:
                        right = mid - 1
                    elif nums[mid] < target:
                        left = mid + 1
                    mid = (right-left) // 2
                    mid = left + mid
                else:
                    left = mid + 1
                    mid = (right-left) // 2
                    mid = left + mid
            else:
                print("other side is sroted")
                # lets find target in sorted side
                if target == nums[right]:
                    return right

                if target >= nums[mid] and target <=nums[right]:
                    # target in sorted side
                    if nums[mid] > target:
                        right = mid - 1
                    elif nums[mid] < target:
                        left = mid + 1
                else:
                    # target is in unsorted side from left to mid
                    right = mid-1
                    mid = (right-left) // 2



            print("-------------")
        return -1

nums = [4,5,6,7,0,1,2]
target = 1
sol = Solution()
print("answer", sol.search(nums, target))
