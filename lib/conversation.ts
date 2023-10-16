import { db } from '@/lib/db'

export async function findOrCreateNewConversation(
  member1Id: string,
  member2Id: string
) {
  // calls twice by switching args in case the conversation is not found
  let conversation =
    (await findConversation(member1Id, member2Id)) ||
    (await findConversation(member2Id, member1Id))

  if (!conversation) {
    conversation = await createNewConversation(member1Id, member2Id)
  }
  return conversation
}

async function findConversation(member1Id: string, member2Id: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [
          {
            member1Id,
          },
          {
            member2Id,
          },
        ],
      },
      include: {
        member1: {
          include: {
            profile: true,
          },
        },
        member2: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}

async function createNewConversation(member1Id: string, member2Id: string) {
  try {
    return await db.conversation.create({
      data: {
        member1Id,
        member2Id,
      },
      include: {
        member1: {
          include: {
            profile: true,
          },
        },
        member2: {
          include: {
            profile: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
}
