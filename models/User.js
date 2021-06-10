class User {
  constructor(id, ws) {
    this.id = id;
    this.ws = ws;
    this.roomId = null;
    this.disconnect = null;
  }
}

module.exports = User;