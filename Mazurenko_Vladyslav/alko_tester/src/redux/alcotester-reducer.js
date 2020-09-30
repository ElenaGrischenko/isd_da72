let CULC = 'CULC';

let initialState = {
    user: {id:1, sex:'male', age:18, weight:80, height:190},
    drink: {id:1, degree:40, volume:0.4}
};

const alcoTesterReducer = (state= initialState, action) =>{
    switch (action.type){
        case CULC:
            let stateCopy = {


            }
        default:
            return state;
    }
}

export const culcAC = () => ({type: CULC})


export default alcoTesterReducer;