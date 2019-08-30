
const create = async(args, repository) => {
    let input = args.input
    let erros = []
    
    if (!input.name)
        erros.push({code: 1, key: 'name', message: 'Name Chat not null'})

    if (erros.length > 0)
        throw erros
    
    return await repository.create(input)      
}

export default create