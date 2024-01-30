import nats, { Stan } from "node-nats-streaming"

class NatsClient {

  _client?: Stan;

  get client() {
    if(!this._client) {
      throw new Error("Cannot access NATS client before it is connected")
    }

    return this._client
  }


  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, {url})

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log("Connected to NATS")
        resolve()
      })

      this.client.on('error',(err) => {
        console.log("Failed to connect to NATS", err);
        reject(err)
      })
    })

   
  }


}

export default new NatsClient()