
import { TextInput } from '@livechat/ui-kit'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import createChat from '../graphql/createChat'

class ChatNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSending: false,
            textInput: '',
            chat: {
                id: '',
                name: '',
                userId: ''
            }
        }

        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.handleChange  = this.handleChange.bind(this)
        this.onCompleted   = this.onCompleted.bind(this)
    }
    

    handlerSubmit(mutation) {
        let { chat: { name } } = this.state
        let { user } = this.props
        let variables = {
            name,
            userId: user.id
        }
        
        this.setState({ isSending: true })
        return mutation({variables})
    }

    handleChange(e) {
        this.setState({chat: {...this.state.chat, [e.target.id]: e.target.value}})
    }

    onCompleted(result) {
        let { createChat: { chat, erros } } = result
        if (erros.length > 0) {
            alert('Erro ao criar criar.')
            return
        }

        this.setState({ isSending: false })
    }

    render() {
        let { isSending, textInput, chat: { name } } = this.state
        
        return (
            <div>
                <Card style={{margin: '20px'}}>
                    <Mutation
                            mutation={createChat}
                            onCompleted={this.onCompleted}>
                            { ( mutation, { data , loading } ) => {
                                if (isSending) {
                                    
                                }

                                if (loading)
                                    return (<CircularProgress/>) 

                                return (
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Create CHAT
                                        </Typography>
                                        <Typography component="p">
                                            New chat
                                        </Typography>
                                    
                                        <div>
                                            <form onSubmit={e => {
                                                e.preventDefault()
                                                this.handlerSubmit(mutation)
                                            }}>
                                                <TextField
                                                    id="name"
                                                    label="Chat name"
                                                    value={name}
                                                    onChange={this.handleChange}
                                                    margin="normal"
                                                    />
                                                <Button type={"submit"} style={{margin: '10px'}} variant="raised" color="primary">
                                                    Create chat
                                                </Button>                           
                                            </form>                          
                                        </div>
                                    </CardContent>
                                )
                            }}                        
                        </Mutation>
                    </Card>
                </div>
        )
    }
}

export default ChatNew