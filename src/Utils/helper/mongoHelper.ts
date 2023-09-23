import {Types} from "mongoose";

type _TPayload = {
    [key: string]: string | Types.ObjectId
}
type TConvertObjectIdResponse = {
    [key: string]: Types.ObjectId
}
// const convertToObjectId = (data: _TPayload): TConvertObjectIdResponse => {
//     let modifyPayload: any = {}
//     Object.entries(data).map(([key, value]) => {
//         modifyPayload[key] = new Types.ObjectId(value)
//     })
//     return modifyPayload
// }

const convertToObjectId = (id: string | Types.ObjectId): Types.ObjectId => {
    return new Types.ObjectId(id)
}

export const MongoHelper = {
    convertToObjectId
}