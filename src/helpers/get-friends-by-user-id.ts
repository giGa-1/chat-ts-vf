import { fetchRedis } from "./redis"

export const getFriendsByUserId = async (userId: string) => {
    // retrieve friends for current user
    const friendIds = await fetchRedis('smembers', `user:${userId}:friends`) as string[];

    const friends = await Promise.all(
        friendIds.map(async (friendId) => {
            const dataFriend = await fetchRedis('get', `user:${friendId}`) as string
            const friend = JSON.parse(dataFriend) as User
            return friend 
        })
    )

    return friends
}