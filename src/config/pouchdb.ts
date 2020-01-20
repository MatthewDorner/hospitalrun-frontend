import PouchDB from 'pouchdb'

import store from '../store'
import { changeOnline } from './connection-slice'

/* eslint-disable */
const memoryAdapter = require('pouchdb-adapter-memory')
const search = require('pouchdb-quick-search')
import PouchdbFind from 'pouchdb-find'
/* eslint-enable */

PouchDB.plugin(search)
PouchDB.plugin(memoryAdapter)
PouchDB.plugin(PouchdbFind)

function createDb(name: string) {
  if (process.env.NODE_ENV === 'test') {
    return new PouchDB(name, { adapter: 'memory' })
  }

  const db = new PouchDB(name)
  db.sync(
    `https://a27fa3db-db4d-4456-8465-da953aee0f5b-bluemix:cd6f332d39f24d2b7cfc89d82f6836d46012ef3188698319b0d5fff177cb2ddc@a27fa3db-db4d-4456-8465-da953aee0f5b-bluemix.cloudantnosqldb.appdomain.cloud/${name}`,
    {
      live: true,
      retry: true,
    },
  )
    .on('change', (info) => {
      // handle change
      console.log(info)
    })
    .on('paused', (err) => {
      store.dispatch(changeOnline(false))
      // replication paused (e.g. replication up to date, user went offline)
      console.log(err)
    })
    .on('active', () => {
      store.dispatch(changeOnline(true))
      // replicate resumed (e.g. new changes replicating, user went back online)
    })
    .on('denied', (err) => {
      // a document failed to replicate (e.g. due to permissions)
      console.log(err)
    })
    .on('complete', (info) => {
      // handle complete
      console.log(info)
    })
    .on('error', (err) => {
      // handle error
      console.log(err)
    })

  return db
}

export const patients = createDb('patients')
export const appointments = createDb('appointments')
