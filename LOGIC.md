CRUD API for managing tasks

Create task
Read tasks
Update task
Delete task

Task {
title: string;
isComplete: boolean;
createdAt: dateTime;
updatedAt: dateTime;
}

Steps:

- setup Prisma
- configure neon db
- setup CRUD operations (module, controller, service)
- test with thunder client

Extras:

- Add user auth with jwt

New steps:

- Setup user authentication
- Add tasks on a per user basis
- A user can only view/update/delete their tasks
