export interface credentials{
    email : string ,
    password : string
}

export interface success {
    responseCode : number , 
    message : string ,
    data? : any
}

export interface failure {
    responseCode : number,
    message : string
}

export type composite = success | failure 

// Payload for accessToken
export interface Payload { 
    email : string ,
    id : string
}

export interface LoanDTO {
    amount : string ,
    term : string
}

export interface LoanidDTO{
    loanId : string
}