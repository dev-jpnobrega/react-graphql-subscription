
const sendMessage = async(args, repository) => {
    let input = args.input
    let erros = []
    
    if (!input.text)
        erros.push({code: 1, key: 'text', message: 'Message Chat not null'})

    if (!input.sendingUser)
        erros.push({code: 1, key: 'sendingUser', message: 'User Message Chat not null'})

    if (erros.length > 0)
        throw erros
    
    return await repository.sendMessage(input)      
}

export default sendMessage