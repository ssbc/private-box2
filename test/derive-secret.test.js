const test = require('tape')
const vectors = [
  require('envelope-spec/vectors/derive_secret1.json'),
]
const labels = require('envelope-spec/derive_secret/constants.json')

const decodeLeaves = require('./helpers/decode-leaves')
const DeriveSecret = require('../util/derive-secret')

test('derive-secret', t => {
  vectors.forEach(vector => {
    decodeLeaves(vector)

    const { feed_id, prev_msg_id, msg_key } = vector.input
    const derive = DeriveSecret(feed_id, prev_msg_id)

    const read_key = derive(msg_key, [labels.read_key])
      const header_key = derive(read_key, [labels.header_key])
      const body_key   = derive(read_key, [labels.body_key])

    t.deepEqual(read_key, vector.output.read_key, 'derive read_key')
    t.deepEqual(header_key, vector.output.header_key, 'derive header_key')
    t.deepEqual(body_key, vector.output.body_key, 'derive body_key')
  })

  t.end()
})
