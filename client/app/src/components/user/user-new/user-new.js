
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

import createUser from './graphql/createUser'

class UserNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSending: false,
            textInput: '',
            user: {
                id: '',
                username: '',
                email: ''
            }
        }

        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.handleChange  = this.handleChange.bind(this)
        this.onCompleted   = this.onCompleted.bind(this)
    }
    

    handlerSubmit(mutation) {
        let { user: { username, email } } = this.state
        let variables = {
            name: username,
            email: email
        }
        
        this.setState({ isSending: true })
        return mutation({variables})
    }

    handleChange(e) {
        this.setState({user: {...this.state.user, [e.target.id]: e.target.value}})
    }

    onCompleted(result) {
        let { createUser: { user, erros } } = result
        if (erros.length > 0) {
            alert('Erro ao criar usuário.')
            return
        }

        this.saveUser(user)
        this.setState({ isSending: false })
    }

    saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        window.location.reload()
    }

    render() {
        let { isSending, textInput, user: { username, email } } = this.state
        
        return (
            <div>
                <Card style={{margin: '20px'}}>
                    <Mutation
                            mutation={createUser}
                            onCompleted={this.onCompleted}>
                            { ( mutation, { data , loading } ) => {
                                if (isSending) {
                                    
                                }

                                if (loading)
                                    return (<CircularProgress/>) 

                                return (
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Create user
                                        </Typography>
                                        <Typography component="p">
                                            Create user to use in chat
                                        </Typography>
                                    
                                        <div>
                                            <form onSubmit={e => {
                                                e.preventDefault()
                                                this.handlerSubmit(mutation)
                                            }}>
                                                <TextField
                                                    id="username"
                                                    label="User name"
                                                    value={username}
                                                    onChange={this.handleChange}
                                                    margin="normal"
                                                    />
                                                <TextField
                                                    id="email"
                                                    label="E-mail"
                                                    style={{margin: '10px'}}
                                                    value={email}
                                                    onChange={this.handleChange}
                                                    margin="normal"
                                                    style={{margin: '10px'}}
                                                    />
                                                <Button type={"submit"} style={{margin: '10px'}} variant="raised" color="primary">
                                                    Create user
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

export default UserNew