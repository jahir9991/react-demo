import { Schema, arrayOf } from 'normalizr'

export const list = new Schema('lists')
export const arrayOfLists = arrayOf(list)
