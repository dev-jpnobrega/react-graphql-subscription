
const addParticipant = async(args, repository) => {
    let input = args.input
    
    return await repository.addParticipant(input)      
}

export default addParticipant