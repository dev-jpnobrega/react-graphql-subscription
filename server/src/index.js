import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import app from './app'
import { info } from './helpers/logger'

app.start().then(schema => {
    const server = createServer(app)  

    server.listen(app.port, () => {
        new SubscriptionServer({
            execute,
            subscribe,
            schema
        }, {
            server: server,
            path: '/',
        })
        
        server.setTimeout(10 * 60 * 1000)
        
        info(`Server starting port ${app.port}`)
    })    
})

export default app