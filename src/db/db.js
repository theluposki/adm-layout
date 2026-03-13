import Dexie from 'dexie'

export const db = new Dexie('appDatabase')

db.version(1).stores({
  profile: '++id, name, nickname, jobTitle, status, avatar, settings'
})

db.version(2).stores({
  profile: '++id, name, nickname, email, jobTitle, status, avatar, coverImage, settings'
})
