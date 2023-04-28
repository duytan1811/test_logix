'use strict';

var fs = require('fs');
var users = JSON.parse(fs.readFileSync('./collections/users.json', 'utf8'));
var videos = JSON.parse(fs.readFileSync('./collections/videos.json', 'utf8'));
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.dropCollection('users');
  db.createCollection('users');
  db.insert('users', users);

  db.dropCollection('videos');
  db.createCollection('videos');
  db.insert('videos', videos);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
