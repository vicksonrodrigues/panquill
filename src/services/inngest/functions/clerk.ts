import { eventType, NonRetriableError, staticSchema } from 'inngest'
import { inngest } from '../client'
/* import { env } from "@/data/env/server";*/
import {
    deleteUser,
    insertUser,
    updateUser,
} from '@/features/users/db/mutations'

import { DeletedObjectJSON, UserJSON } from '@clerk/nextjs/server'
import { ClerkWebhookData } from './types';


const createUserEvent = eventType("clerk/user.created", {
    schema: staticSchema<ClerkWebhookData<UserJSON>>(),
});

const updateUserEvent = eventType("clerk/user.updated", {
    schema: staticSchema<ClerkWebhookData<UserJSON>>(),
});

const deleteUserEvent = eventType("clerk/user.deleted", {
    schema: staticSchema<ClerkWebhookData<DeletedObjectJSON>>(),
});

export const clerkCreateUser = inngest.createFunction(
    {
        id: 'clerk/create-db-user',
        name: 'Clerk - Create DB User',
        triggers: [createUserEvent],
    },

    async ({ event, step }) => {
        await step.run('create-user', async () => {
            const userData = event.data.data
            const email = userData.email_addresses.find(
                (email) => email.id === userData.primary_email_address_id
            )

            if (email == null) {
                throw new NonRetriableError('No primary email address found')
            }

            if (userData.first_name == null) {
                throw new NonRetriableError('No first name found')
            }

            await insertUser({
                id: userData.id,
                firstName: userData.first_name,
                lastName: userData.last_name || '',
                profileImageUrl: userData.image_url,
                email: email.email_address,
                createdAt: new Date(userData.created_at),
                updatedAt: new Date(userData.updated_at),
                isAdmin: false,
            })

            return userData.id
        })
    }
)

export const clerkUpdateUser = inngest.createFunction(
    {
        id: 'clerk/update-db-user',
        name: 'Clerk - Update DB User',
        triggers: [updateUserEvent],
    },

    async ({ event, step }) => {
        await step.run('update-user', async () => {
            const userData = event.data.data
            const email = userData.email_addresses.find(
                (email) => email.id === userData.primary_email_address_id
            )

            if (email == null) {
                throw new NonRetriableError('No primary email address found')
            }

            if (userData.first_name == null) {
                throw new NonRetriableError('No first name found')
            }

            await updateUser(userData.id, {
                firstName: userData.first_name,
                lastName: userData.last_name || '',
                profileImageUrl: userData.image_url,
                email: email.email_address,
                updatedAt: new Date(userData.updated_at),
            })
        })
    }
)

export const clerkDeleteUser = inngest.createFunction(
    {
        id: 'clerk/delete-db-user',
        name: 'Clerk - Delete DB User',
        triggers: [deleteUserEvent],
    },

    async ({ event, step }) => {
        await step.run('delete-user', async () => {
            const { id } = event.data.data

            if (id == null) {
                throw new NonRetriableError('No id found')
            }

            await deleteUser(id)
        })
    }
)
